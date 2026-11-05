# Tiny Desk AI：站内 FFmpeg 合成部署

## 当前生成链路

1. 支付校验通过，从数据库读取订单对应版本的完整提示词。
2. 五张头像按 `back-left → back-right → keys → lead → sax` 上传，另附首 15 秒的无声参考视频。
3. Yir 使用 `bytedance/seedance-2.5`，15 秒、480p 或 720p。**询价和正式提交都传 `generate_audio: false`。** 如接口不支持静音或将参数改为 true，会在正式付费提交前停止，不自动降级为有声生成。
4. 同一个站点的 Node 后端下载生成结果，用 FFmpeg 替换为固定音轨的前 15 秒，正常速度，不拉伸、不拼接尾部。
5. 上传最终 MP4 到私有 R2；校验对象元数据与当前任务匹配后才标记完成、允许下载。合成失败重试沿用已有生成结果，不重新提交付费生成。

不需要配置或单独部署 HTTP 合成服务。`services/video-composer/server.mjs` 等旧服务文件保留用于兼容，但 Tiny Desk v2 不再调用它们，也不需要其 URL/token。

仓库内另保存了首 15 秒的已处理素材：`assets/tiny-desk/v2/reference-first15-silent.mp4` 与 `assets/tiny-desk/v2/soundtrack-first15.mp3`。这两个文件不会暴露为 `/public` 静态资源；**它们不会随 Next.js 运行时自动上传到 R2**。生成任务仍通过私有 R2 URL 读取固定素材。仓库是公开的情况下，请先确认你有权分发原视频、音轨与人物肖像；非公开 HTTP 路径并不等于 Git 仓库内文件保密。

## 运行环境

部署的是完整 Next.js **Node** 应用，不是静态导出或 Edge Runtime。宿主机需要（容器/自部署亦适用）：

- 项目 Next.js 版本兼容的 Node.js（建议 Node 22 LTS 或更高的受支持版本）。
- 已安装的 npm 平台包提供 `ffmpeg` 和 `ffprobe` 可执行文件；FFmpeg 需包含 `libx264`、`aac` 编码器。可选 `FFMPEG_PATH` / `FFPROBE_PATH` 显式覆盖。
- 允许 Node `child_process.spawn`，允许读写系统临时目录。
- 支持至少 **300 秒**的路由执行时间；平台/网关不能提前杀掉函数。代码中单次合成总预算 220 秒。Next `after()` 不是独立任务队列，也不能绕过平台超时。
- 有足够 CPU、内存与临时磁盘。建议从 2 vCPU、2 GB 内存、1 GB 可用临时空间起步，再按并发压测调整；不是硬件性能保证。每个 Node 进程最多同时合成一个视频，多进程仍会分别占用资源。

Linux/Debian 或 Ubuntu 示例（在实际运行镜像/宿主机安装，不只是构建机）：

```sh
apt-get update && apt-get install -y --no-install-recommends ffmpeg
ffmpeg -version
ffprobe -version
ffmpeg -hide_banner -encoders
```

Windows 可安装包含这两个程序的 FFmpeg 发行包。路径不存在或编码器不全时，支付订单的生成准备会停止，不进入模型付费提交。

若平台不允许运行二进制、临时目录不可写或执行时间不足，需要更换到兼容的 Node 容器/服务器；不能仅配置一个环境变量就获得这些运行能力。

### Vercel 部署：确认二进制已经打包并可运行

`@ffmpeg-installer/ffmpeg` 和 `@ffprobe-installer/ffprobe` 是正式项目依赖；Next.js 对支付、Webhook、视频轮询、worker 与健康检查函数的输出追踪显式包含平台可执行文件。**无需在 Vercel 设置 `FFMPEG_PATH`/`FFPROBE_PATH`**，尤其不要填写不存在的 `/usr/bin/ffmpeg`。部署时必须使用与锁文件一致的依赖安装（如 `npm ci`）；不要禁用 optional dependencies，Linux 可执行文件位于按平台选择的 npm 包中。使用 `npm run build` 会在构建结束时检查 6 个函数的追踪文件，Build Logs 会有 `media.trace` 日志；如果未纳入相应的二进制，部署构建会失败。若自定义 Build Command 是裸 `next build`，则需改为 `npm run build` 才能得到这项构建检查。

**构建日志只能证明文件纳入函数包，不能证明生产运行时可执行**。部署完成后（在 Vercel Project → Logs 查看对应 Production Deployment 的运行日志）用已有的 32 字节以上 `CRON_SECRET` 调用私有诊断接口：

```powershell
# 本地 PowerShell：先安全地在当前会话中设置 $env:CRON_SECRET，不要提交或公开。
$headers = @{ Authorization = "Bearer $env:CRON_SECRET" }
Invoke-RestMethod -Uri 'https://tinydeskaivideos.com/api/internal/media-health' -Headers $headers
```

返回 HTTP 200 且 `ok: true`、`source: "packaged"`、`encoders.libx264: true`、`encoders.aac: true`，表示生产环境两套二进制可启动、编码器齐备，并成功创建临时工作目录。版本、系统平台与架构也会返回，且写入 Vercel Function Logs 的 `media.health` 日志；有错误会返回 HTTP 503，并在日志写 `media.health`（没有登录密钥/R2 签名 URL）。没有提供正确密钥会返回 HTTP 401，诊断接口不会公开运行信息。实际视频合成日志可过滤 `media.compose.start`、`media.compose.staged`、`media.compose.finished` 及已有的 `Video delivery pending`；日志不包含视频或音频 URL。

**注意**：部署本身不会自动启动 Function；需调用一次诊断接口才能检验生产运行时。健康检查成功也不等于 15 秒/720p 合成能在约 220 秒内完成；首次上线仍须做实际链路压测，并在函数体积、CPU、内存、临时磁盘、账单与超时方面确认可用。Vercel 免费 Hobby 仅适用于非商业个人使用，不适合本站的 Stripe 付费生成；Hobby Cron 频率也不足以替代每分钟的后台补偿调度。旧的独立 Composer Docker 文件保留兼容用途，并未改成必须部署的服务。

## 环境变量

现有 Stripe、数据库、图片审核、R2、Yir 配置继续保留。对照 `.env.example` 设置，**不要把密钥提交到 Git**。

```dotenv
NEXT_PUBLIC_SITE_URL=https://tinydeskaivideos.com
VIDEO_PROVIDER=yir
YIR_MODEL_ID=bytedance/seedance-2.5
VIDEO_GENERATION_ENABLED=true

# Vercel 请留空：默认使用随项目打包的 FFmpeg / ffprobe。
# FFMPEG_PATH=
# FFPROBE_PATH=

# 另需现有的 YIR_API_KEY、VIDEO_HANDLE_SECRET、DATABASE_PRO_URL、图片审核配置、
# R2_*、PROVIDER_VIDEO_HOSTS、STRIPE_*、CRON_SECRET 等，详见 .env.example。
```

`generate_audio: false` 已由 Tiny Desk v2 代码强制，无需额外音频开关。Tiny Desk v2 的模型也固定为 Seedance 2.5，不会因其他旧模板的环境配置而切换。

`PROVIDER_VIDEO_HOSTS` 必须是实际模型结果 URL 的精确可信主机名，不能填通配符或整个 R2 域名后缀。R2 桶名保留实际配置即可，不要求与站点域名相同。

## 数据库提示词和固定素材

以下是部署人员需要确认的准备项，**本次开发验证不会自动写生产数据库或上传 R2**：

- 应用隔离 schema 为 `tinydeskaivideo_pro`。
- 数据库需有已启用的 `tiny-desk-ai / tiny-desk-v2` 提示词记录，保留完整的 15 秒分镜。已有迁移脚本可通过 `npm run db:migrate` 执行，执行前确认目标库与备份。
- 私有 R2 需存在以下固定素材（仓库中的 `assets/tiny-desk/v2/` 有已裁好的副本，不能以仓库副本代替 R2 对象）：
  - `tiny-desk-ai/v2/reference-first15-silent.mp4`
  - `tiny-desk-ai/v2/soundtrack-first15.mp3`
- 音轨来自 `docs/sample-dogs.mp3` 的前 15 秒。丢掉最后约 2.7 秒，不加速、不延长。请确保拥有公开使用该音乐、参考素材及人物肖像的权限。

首次准备素材（仅本地生成，不上传）：

```sh
node scripts/prepare-tiny-assets.mjs --source="/absolute/path/to/sample-dogs.mp4"
```

确认输出正确、目标 R2 配置无误后，部署人员可显式加 `--upload` 将两份固定素材写入私有桶。该命令还会使用 `libmp3lame` 编码器，标准 FFmpeg 发行包通常包含它。`docs/` 默认被 Git 忽略，本地 MP3/MP4 不会自动随代码部署；运行时使用的是 R2 固定素材，不是本地 docs 路径。

## Stripe 商品映射与 scripts 目录

`scripts/` 中的代码要随项目一起提交：`npm run build` 会执行 `scripts/verify-media-trace.mjs` 检查 FFmpeg/ffprobe 运行文件是否进入函数追踪。`scripts/migrate-billing.mjs`、`scripts/configure-stripe-products.mjs` 和 `scripts/prepare-tiny-assets.mjs` 是**部署人员手动运行**的准备工具；Next.js 启动和网页请求不会自动执行数据库迁移、Stripe 配置或 R2 素材上传。

完成数据库备份并确认 `DIRECT_PRO_URL` 指向 `tinydeskaivideo_pro` 后，手动执行 `npm run db:migrate`。再在**同一 Stripe 测试或正式环境**中准备两项一次性商品/价格（480p：USD 5.99，720p：USD 8.99），用对应的非公开密钥运行：

```sh
npm run stripe:configure -- --480p-price=price_... --480p-product=prod_... --720p-price=price_... --720p-product=prod_...
```

该脚本默认只配置 `tiny-desk-ai`；写入前会验证目标数据库名称/schema、Stripe 商品、价格金额、币种以及测试/正式环境，失败会回滚。它**不会**在 `npm run build` 时自动执行，也不会替你创建 Stripe 商品；不要将真实密钥或数据库连接串写进命令或 Git。Stripe 后台还需为 `https://tinydeskaivideos.com/api/webhooks/stripe` 设置对应环境的 webhook，并将其签名密钥配置为 `STRIPE_WEBHOOK_SECRET`。事件至少覆盖 `checkout.session.completed`、`checkout.session.async_payment_succeeded`、`checkout.session.expired` 和 `checkout.session.async_payment_failed`；退款/争议事件按 `src/lib/billing-orders.ts` 的处理分支配置。最后确认 `TINY_DESK_CHECKOUT_ENABLED=true`、`STRIPE_ENABLED=true`，再进行测试模式支付验收。
## 后台补偿任务必须配置

仓库根目录 `vercel.json` 已注册 Vercel Hobby 允许的每日一次兜底 Cron：`0 3 * * *`（UTC 03:00，上海时间约 11:00；Hobby 执行可能在该小时内延后）。部署时必须在 Vercel Project → Settings → Environment Variables 为 Production 配置至少 32 字符的 `CRON_SECRET`，重新部署后在 Project → Cron Jobs 核对 `/api/internal/video-worker` 已出现；Vercel 调用时自动附加 `Authorization: Bearer <CRON_SECRET>`。缺失或长度不足会返回 HTTP 401，Cron 调用不会处理订单。修改 `vercel.json` 后必须触发新的生产部署。`CRON_SECRET` 也用于私有媒体健康检查，不要提交密钥。

Hobby 每日一次只能兜底，**不能作为支付订单及时生成/合成的可靠队列**。若要每分钟补偿，使用支持更高频率的 Vercel 方案或独立调度器；外部调度器访问同一站点的 worker，应设置请求超时允许 300 秒以上：

```sh
curl --fail --max-time 310 \
  -H "Authorization: Bearer $CRON_SECRET" \
  https://tinydeskaivideos.com/api/internal/video-worker
```

`CRON_SECRET` 至少 32 个字符，不能暴露给前端。worker 优先处理已有生成/合成任务，每次最多处理一个重任务，仅轻量查询供应商状态时仍可启动排队的支付订单；实际尝试合成或归档时不叠加新生成。现有订单锁、提交幂等与持久化退避继续生效。

用户刷新状态及 Webhook 后的 `after()` 可以推动站内处理，但不能替代可靠队列与足够频率的后台补偿：用户离开页面、函数中断或暂时合成失败后，仅依靠 Hobby Cron 可能需要等到次日才恢复。

## 验收

```sh
npm ci
npm run typecheck
node --test tests/*.test.cjs
npm run build
npm start
```

上线后用 Stripe 测试模式进行一次真实流程验收。**Stripe 测试支付不代表模型免费**：调用 Yir 仍会消耗余额。核对 quote/submit 的 `generate_audio=false`，最终 MP4 含 15 秒音轨，刷新/重试不会新增付费生成任务。
