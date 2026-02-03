---
title: Agent Quick Reference
description: Quick reference guide for AI agents working with Ampt.
---

This page provides a structured reference for AI agents working with Ampt applications. Designed for quick parsing and common workflow automation.

---

## CLI Commands (Structured)

### Authentication
| Command | Purpose | Output Format |
|---------|---------|---------------|
| `ampt login` | Authenticate via browser | Text with URL and code |
| `ampt logout` | End session | Confirmation text |
| `ampt whoami` | Show current user | JSON: `{user, orgs[]}` |

### Development
| Command | Purpose | Args | Notes |
|---------|---------|------|-------|
| `ampt` | Start interactive shell | - | Blocks, hot-reload enabled |
| `ampt run <script>` | Execute npm script | script name from package.json | Runs in Ampt environment |
| `ampt install [pkg]` | Install dependencies | optional package name | Uses npm underneath |

### Deployment
| Command | Purpose | Args | Output |
|---------|---------|------|--------|
| `ampt share [name]` | Create preview env | optional `--container` | Preview URL |
| `ampt deploy [name]` | Deploy to permanent env | optional `--container` | Deployment status |
| `ampt deploy prod` | Deploy to production | - | ⚠️ Critical operation |
| `ampt delete <name>` | Delete environment | environment name | Confirmation required |

### Environment Management
| Command | Purpose | Output |
|---------|---------|--------|
| `ampt params set <key> <value>` | Set app parameter | Success/error |
| `ampt params get <key>` | Get parameter value | Value or null |
| `ampt params list` | List all parameters | Key-value table |
| `ampt stages` | List environments | Table: name, url, status |
| `ampt url` | Get current env URL | URL string |

### Information
| Command | Purpose | Output Format |
|---------|---------|---------------|
| `ampt version` | CLI version | Semver string |
| `ampt logs` | Stream logs | Real-time text |
| `ampt metrics` | Show metrics | JSON metrics object |
| `ampt status` | Environment status | Health check result |

---

## Environment Variables

### Ampt-Provided (Read-Only)
```bash
AMPT_URL              # Current environment URL
AMPT_STAGE            # Current stage name (e.g., prod, staging)
AMPT_ORG              # Organization name
AMPT_APP              # Application name
AMPT_REGION           # AWS region (e.g., us-east-1)
AMPT_API_KEY          # API key for SDK operations
```

### User-Defined (via `ampt params`)
```bash
# Any key-value pairs set via CLI or dashboard
# Accessed via: process.env.PARAM_NAME
```

### Common Patterns
```javascript
// Check environment
const isProd = process.env.AMPT_STAGE === 'prod';

// Get required param
const apiKey = process.env.API_KEY || throw new Error('API_KEY required');

// Conditional config
const dbConfig = {
  endpoint: process.env.AMPT_STAGE === 'prod' 
    ? 'prod.db.com' 
    : 'dev.db.com'
};
```

---

## Common Workflows

### New Project Setup
```bash
# 1. Create directory and init
mkdir my-app && cd my-app
npm init -y

# 2. Install Ampt
npm i -g @ampt/cli

# 3. Start development
ampt

# 4. Install SDKs as needed
ampt install @ampt/sdk @ampt/data
```

### Deployment Pipeline
```bash
# 1. Build (if needed)
ampt run build

# 2. Share for review
ampt share feature-branch-name

# 3. Deploy to staging
ampt deploy staging

# 4. Deploy to production
ampt deploy prod
```

### Parameter Management
```bash
# Set secrets before deploy
ampt params set DATABASE_URL "postgres://..."
ampt params set API_KEY "sk-..."

# Verify
ampt params list

# Deploy
ampt deploy prod
```

### Debugging Workflow
```bash
# Check current env
ampt status
ampt url

# View logs
ampt logs --tail

# Check metrics
ampt metrics
```

---

## Exit Codes

| Code | Meaning | Agent Action |
|------|---------|--------------|
| `0` | Success | Continue workflow |
| `1` | General error | Check stderr, retry or escalate |
| `2` | Auth required | Run `ampt login` |
| `3` | Invalid arguments | Check command syntax |
| `4` | Environment not found | Verify env name, create if needed |
| `5` | Deployment failed | Check logs, fix issues, retry |
| `6` | Network error | Retry with backoff |
| `130` | Interrupted (Ctrl+C) | Clean up, exit gracefully |

---

## Error Patterns

### Common Errors & Solutions

```
Error: Not authenticated
Solution: Run 'ampt login' first

Error: Environment 'prod' not found
Solution: Run 'ampt deploy prod' to create it

Error: Stage name already exists
Solution: Use 'ampt delete <name>' or choose different name

Error: Build failed
Solution: Check 'ampt:build' script in package.json

Error: Parameter not found
Solution: Set with 'ampt params set <key> <value>'
```

### Log Patterns to Watch
```
✓ Build completed          # Success indicator
✗ Build failed             # Failure - check details
⚠ Warning: ...             # Non-fatal issue
ℹ Info: ...                # Informational
→ Deploying to ...         # In-progress
✓ Deployed to ...          # Success
```

---

## File Structure Reference

### Required Files
```
project/
├── package.json          # Must have 'ampt' config
├── ampt.config.js        # Optional: advanced config
└── index.js              # Entry point (configurable)
```

### Ampt Config (package.json)
```json
{
  "ampt": {
    "app": "my-app",
    "org": "my-org",
    "runtime": "nodejs20"
  }
}
```

### Important Paths
| Path | Purpose |
|------|---------|
| `.ampt/` | Local Ampt data (gitignored) |
| `node_modules/` | Dependencies |
| `dist/` or `build/` | Build output (if applicable) |

---

## SDK Quick Reference

### @ampt/sdk
```javascript
import { api, storage, params } from "@ampt/sdk";

// HTTP API
api().router("/api").get("/hello", async (event) => {
  return event.body("Hello World");
});

// Storage
const files = storage("files");
await files.write("file.txt", "content");
const content = await files.read("file.txt");

// Parameters
const dbUrl = await params("DATABASE_URL");
```

### @ampt/data
```javascript
import { data } from "@ampt/data";

// CRUD operations
await data.set("user:123", { name: "John" });
const user = await data.get("user:123");
await data.remove("user:123");

// Query
const users = await data.get("user:*");
```

### @ampt/ai
```javascript
import { chat, render, embed } from "@ampt/ai";

// Chat
const response = await chat([{ role: "human", content: "Hello" }]);

// Image generation
const image = await render("a cat", { width: 512, height: 512 });

// Embeddings
const { embedding } = await embed("text to embed");
```

---

## Agent Decision Tree

```
Starting new Ampt task?
├── Does ampt.config.json exist?
│   ├── No → Run 'ampt login' first
│   └── Yes → Continue
├── Need to deploy?
│   ├── Preview → 'ampt share <name>'
│   └── Permanent → 'ampt deploy <name>'
├── Checking status?
│   └── 'ampt status' + 'ampt logs'
└── Setting secrets?
    └── 'ampt params set <key> <value>'
```

---

## Quick Commands Cheat Sheet

```bash
# Full deploy cycle
ampt login && ampt params list && ampt deploy prod

# Quick preview
ampt share "$(git branch --show-current)"

# Check everything
ampt status && ampt url && ampt params list

# Reset local
rm -rf .ampt/ && ampt login
```

---

## Resources

- [Full CLI Reference](/docs/cli-standard-mode/)
- [Interactive Shell](/docs/cli-interactive-shell/)
- [Environment Setup](/docs/environments/)
- [Parameters Guide](/docs/parameters/)
