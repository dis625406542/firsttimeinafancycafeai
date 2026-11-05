const fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
function load(file,stubs={}) {
 const code=ts.transpileModule(read(file),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
 const m={exports:{}};
 const req=n=>{if(Object.hasOwn(stubs,n))return stubs[n];if(n==='server-only')return {};if(n.startsWith('@/')||n.startsWith('./')){const base=n.startsWith('@/')?'src/'+n.slice(2):path.join(path.dirname(file),n);return load(fs.existsSync(path.join(root,base+'.ts'))?base+'.ts':base+'.tsx',stubs);}return require(n);};
 new Function('exports','module','require',code)(m.exports,m,req);return m.exports;
}
module.exports={read,load,root};
