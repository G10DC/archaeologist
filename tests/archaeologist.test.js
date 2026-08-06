import test from 'node:test';
import assert from 'node:assert/strict';
import { ArchaeologistAnalyzer } from '../lib/archaeologist.js';

test('ArchaeologistAnalyzer analyzes git log for churn hotspots', () => {
  const arch = new ArchaeologistAnalyzer();
  const res = arch.analyzeGitHistory(process.cwd(), 20);

  assert.ok(res.commitsAnalyzed >= 1);
  assert.ok(Array.isArray(res.hotspots));
});
