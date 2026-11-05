const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
const sharp=require('sharp');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,f);
const {normalizeTinyPortrait}=require('../src/lib/portrait-normalization.ts');
test('small demo portraits become decodable 768px JPEGs, without cropping identities',async()=>{
 const input=new File([await fs.promises.readFile('public/tiny-band/lead.webp')],'lead.webp',{type:'image/webp'});
 const out=await normalizeTinyPortrait(input);
 const m=await sharp(Buffer.from(await out.arrayBuffer())).metadata();
 assert.equal(out.type,'image/jpeg'); assert.equal(m.width,768); assert.equal(m.height,768);
 assert.ok(out.size<1800000);assert.equal(m.format,'jpeg');
});
test('normalize tall portraits using padding instead of cropping',async()=>{
 const b=await sharp({create:{width:300,height:900,channels:3,background:'#ff0000'}}).png().toBuffer();
 const out=await normalizeTinyPortrait(new File([b],'tall.png',{type:'image/png'}));
 const m=await sharp(Buffer.from(await out.arrayBuffer())).metadata();
 assert.equal(m.width,768);assert.equal(m.height,768);
 const {data}=await sharp(Buffer.from(await out.arrayBuffer())).raw().toBuffer({resolveWithObject:true});
 assert.ok(data[0]>240 && data[1]>240); // white padding, not a full red crop
});
test('invalid, tiny or extreme-aspect images are rejected before checkout',async()=>{
 await assert.rejects(normalizeTinyPortrait(new File([Uint8Array.from([255,216,255,0,0,0])],'bad.jpg',{type:'image/jpeg'})),/Photo/);
 for(const [w,h] of [[32,32],[129,4000]]){
  const b=await sharp({create:{width:w,height:h,channels:3,background:'#fff'}}).png().toBuffer();
  await assert.rejects(normalizeTinyPortrait(new File([b],'bad.png',{type:'image/png'})),/Photo/);
 }
});
