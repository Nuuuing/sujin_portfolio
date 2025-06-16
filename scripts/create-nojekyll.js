const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'out');
const nojekyllPath = path.join(outDir, '.nojekyll');

if (!fs.existsSync(outDir)) {
    console.error(`Error: 'out' directory not found at ${outDir}. Please run 'npm run build' first.`);
    process.exit(1);
}

fs.writeFileSync(nojekyllPath, '', 'utf8');
console.log(`Created .nojekyll file at ${nojekyllPath}`);