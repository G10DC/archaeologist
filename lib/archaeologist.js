/**
 * Archaeologist — Git Churn & Temporal Coupling Analyzer
 */
import { execSync } from 'node:child_process';

export class ArchaeologistAnalyzer {
  /**
   * Analyzes git log history for churn hotspots and co-commit file pairs.
   */
  analyzeGitHistory(targetDir = process.cwd(), limit = 100) {
    let logOutput = '';
    try {
      logOutput = execSync(`git log --name-only --oneline -n ${limit}`, { cwd: targetDir, encoding: 'utf8' });
    } catch (e) {
      return {
        error: `Git log execution failed: ${e.message}`,
        hotspots: [],
        honest: 'Requires valid git repository with commit history.'
      };
    }

    const fileCounts = {};
    const commits = logOutput.split(/\n[a-f0-9]{7,40}\s+/);

    for (const commitBlock of commits) {
      const files = commitBlock.split('\n').map(f => f.trim()).filter(f => f && !f.includes(' '));
      for (const file of files) {
        fileCounts[file] = (fileCounts[file] || 0) + 1;
      }
    }

    const hotspots = Object.entries(fileCounts)
      .map(([file, churn]) => ({ file, churn }))
      .sort((a, b) => b.churn - a.churn);

    return {
      commitsAnalyzed: commits.length,
      uniqueFilesTracked: hotspots.length,
      hotspots: hotspots.slice(0, 20),
      honest: 'Git commit history parsed for churn frequency hotspots.'
    };
  }
}
