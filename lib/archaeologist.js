#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const repoIndex = args.indexOf('--repo');
const repoDir = repoIndex !== -1 ? args[repoIndex + 1] : '.';

console.log(`[Archaeologist] Mining Git churn & hotspots in: ${repoDir}`);

let gitLog = '';
try {
  gitLog = execSync('git log --name-only --oneline -n 100', { cwd: repoDir, encoding: 'utf8' });
} catch {
  console.log('[Archaeologist] Git repository log unavailable, creating dry-run hotspot model.');
}

const fileCounts = {};
if (gitLog) {
  const lines = gitLog.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.includes(' ') && trimmed.includes('.')) {
      fileCounts[trimmed] = (fileCounts[trimmed] || 0) + 1;
    }
  }
}

const sortedFiles = Object.entries(fileCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

const report = `# 🏺 Archaeologist Hotspot Report

## Top Churn & Technical Debt Hotspots
${sortedFiles.length > 0 ? sortedFiles.map(([f, count], i) => `${i + 1}. \`${f}\` - **${count} revisions**`).join('\n') : '*No recent git commit churn recorded.*'}

## Analysis Recommendations
- Refactor high-churn files to reduce coupling.
- Add unit test coverage around top revision hotspots.
`;

const outputPath = path.resolve('archaeologist-report.md');
fs.writeFileSync(outputPath, report, 'utf8');
console.log(`[Archaeologist] Hotspot report written to: ${outputPath}`);
