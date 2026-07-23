# 🏺 Archaeologist — Git History, Churn & Hotspot Analyzer

> **Zero-Checkout In-Memory Mining of Git DAG Histories to Uncover Architectural Hotspots, Temporal Coupling, and Technical Debt.**

Inspired by [Code Maat](https://github.com/adamtornhill/code-maat) (*Code as a Crime Scene*), [Hercules](https://github.com/src-d/hercules), and [Git-of-Theseus](https://github.com/erikbern/git-of-theseus).

---

## 📌 Problem Statement

Static code analysis shows what code looks like *today*, but fails to reveal *where* bugs frequently originate, which files suffer from excessive churn, or which components are implicitly coupled together across separate directories.

## 💡 Solution

Archaeologist mines raw Git VCS history using **zero-checkout in-memory streaming**:
1. Reads raw Git commit packfiles (`.pack`/`.idx`) directly in RAM without checking out files to physical disk.
2. Computes **Temporal Coupling** ($P(A \cap B)$) to detect hidden co-change dependencies between modules.
3. Ranks **Hotspots** using a composite score ($Complexity \times Revisions$) to pinpoint technical debt.

---

## 🎯 Key Features

- 🏎️ **Zero-Checkout In-Memory Streaming**: Bypasses filesystem disk I/O bottlenecks by analyzing Git DAG streams directly.
- 🔗 **Temporal Coupling Matrix**: Identifies files that consistently change together in joint commits despite living in separate folders.
- 🔥 **Hotspot Identification**: Highlights high-risk files combining high modification frequency with structural complexity.
- 📈 **Code Survival Analysis**: Tracks line-level survival and churn trends across commit cohorts.

---

## 🚀 Installation & Usage

### Prerequisites
- Node.js >= 18.0.0
- Git installed on host environment

### Run Audit
```bash
# Mine churn and hotspots in repository
node lib/archaeologist.js --repo "/path/to/repo" --months 6
```

### CLI Options
- `--repo <path>`: Path to the target Git repository (default: `.`).
- `--months <N>`: Time window in months for Git commit log analysis (default: `6`).

---

## 📄 Output Artifacts

Archaeologist produces `archaeologist-report.md` containing:
1. **Top 10 Technical Debt Hotspots**: Ranked list of high-churn, high-complexity target files.
2. **Temporal Coupling Matrix**: Pairs of files with high co-change probability.
3. **Actionable Recommendations**: Refactoring priorities and test-coverage suggestions.

---

## 📄 License

MIT © [G10DC](https://github.com/G10DC)
