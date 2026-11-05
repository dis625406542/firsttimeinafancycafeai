const test=require('node:test'),assert=require('node:assert/strict');
const {load,read}=require('./site-test-helpers.cjs');
test('only the new cafe migration runs, with no old products or customer copies',()=>{
 const script=read('scripts/migrate-billing.mjs'),sql=read('src/lib/fancy-cafe.sql');
 assert.match(script,/firsttimeinafancycafeai_test/);assert.match(script,/fancy-cafe.sql/);assert.doesNotMatch(script,/tiny-desk.*\.sql/);
 assert.match(sql,/fancy-cafe-ai-480p/);assert.match(sql,/fancy-cafe-ai-720p/);assert.match(sql,/fancy-cafe-v1/);
 assert.doesNotMatch(sql,/tinydeskaivideo_pro|zombievideolab_pro|zombie-couple|SELECT \* FROM|\bDROP\b|\bTRUNCATE\b/i);
});
test('runtime schema is explicitly site-bound and rejects old or injected identifiers',()=>{
 const {dbSchema,resolveSchemaSql}=load('src/lib/db-schema.ts');const saved=process.env.DATABASE_PRO_NAME;
 try {process.env.DATABASE_PRO_NAME='firsttimeinafancycafeai_pro';assert.equal(dbSchema(),process.env.DATABASE_PRO_NAME);assert.equal(resolveSchemaSql('SELECT * FROM {schema}.products'),'SELECT * FROM firsttimeinafancycafeai_pro.products');
 process.env.DATABASE_PRO_NAME='firsttimeinafancycafeai_test';assert.equal(dbSchema(),'firsttimeinafancycafeai_test');assert.equal(resolveSchemaSql('SELECT * FROM {schema}.products'),'SELECT * FROM firsttimeinafancycafeai_test.products');
 for(const name of ['tinydeskaivideo_pro','zombievideolab_pro','bad-name;drop']){process.env.DATABASE_PRO_NAME=name;assert.throws(()=>dbSchema());}
 delete process.env.DATABASE_PRO_NAME;assert.throws(()=>dbSchema(),/required/);
 }finally{if(saved===undefined)delete process.env.DATABASE_PRO_NAME;else process.env.DATABASE_PRO_NAME=saved;}
});
test('private R2 writes have site-specific prefixes and no shared generated prefix',()=>{
 const s=read('src/lib/r2.ts');for(const prefix of ['generated','inputs','composition-inputs'])assert.ok(s.includes('`fancy-cafe-ai/'+prefix+'/'));
 assert.doesNotMatch(s,/`(?:generated|inputs|composition-inputs)\//);
});
