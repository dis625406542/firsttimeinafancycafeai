const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const root = join(__dirname, '..');
const read = file => readFileSync(join(root, file), 'utf8');
const prompt = sql => sql.match(/\$prompt\$([\s\S]*?)\$prompt\$/)?.[1]?.trim().split(/\r?\n/);

test('new v4 prompt changes only keyboardist expression and solo lead framing from v2', () => {
 const old = prompt(read('src/lib/tiny-desk-v2.sql'));
 const current = prompt(read('src/lib/tiny-desk-v4.sql'));
 assert.ok(old && current);
 assert.equal(current.length, old.length);
 for (let i = 0; i < old.length; i++) if (i !== 3 && i !== 4) assert.equal(current[i], old[i], `prompt line ${i + 1} changed`);
 assert.match(current[3], /eyes naturally open, smiles with expressive singing mouth movements/);
 assert.match(current[4], /lead-singer solo close-up/);
 assert.match(current[4], /mirror reflection.*softly blurred and out of focus/);
 assert.match(read('src/lib/r2.ts'), /version === "tiny-desk-v2" \|\| version === "tiny-desk-v4"/);
});

test('paid history, optional email, progress and expiry have dedicated routes', () => {
 const studio = read('src/components/tiny-studio.tsx');
 const worker = read('src/app/api/internal/video-worker/route.ts');
 assert.match(studio, /Math\.min\(92,/);
 assert.match(studio, /className="tiny-history-grid"/);
 assert.match(studio, /href=\{`\/api\/video\/file\?code=\$\{job\.code\}&download=1`\}/);
 assert.match(studio, /name="aspect-ratio"/);
 assert.match(studio, /type="email"/);
 assert.match(worker, /deleteGeneratedVideo\(old\.r2_key\)/);
 assert.match(read('src/app/api/video/email/route.ts'), /videoForEmailLink/);
});
