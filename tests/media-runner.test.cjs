const {test}=require('node:test');
const assert=require('node:assert/strict');
const {spawnSync}=require('node:child_process');
test('media runner drains large stderr output without blocking the child',()=>{
 const source=`import {run} from './services/video-composer/media.mjs'; console.log(await run(process.execPath,['-e',"process.stderr.write('x'.repeat(2*1024*1024),()=>{process.stdout.write('drained')})"]));`;
 const child=spawnSync(process.execPath,['--input-type=module','-e',source],{cwd:require('node:path').resolve(__dirname,'..'),timeout:4000,encoding:'utf8'});
 assert.equal(child.error,undefined,'stderr drain should not deadlock');
 assert.equal(child.status,0);assert.match(child.stdout,/drained/);
});
