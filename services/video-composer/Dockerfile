FROM node:22-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY media.mjs server.mjs ./
RUN mkdir -p /data/jobs && chown -R node:node /data
USER node
ENV NODE_ENV=production PORT=8787 JOB_DIR=/data/jobs
EXPOSE 8787
CMD ["node", "server.mjs"]
