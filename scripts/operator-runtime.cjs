// CLI only. Never import this transpilation hook from the application.
const fs=require('node:fs'),ts=require('typescript'),Module=require('node:module');
const original=Module._load;
Module._load=function(id,...rest){if(id==='server-only')return {};return original.call(this,id,...rest)};
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,f);
require('@next/env').loadEnvConfig(process.cwd());
