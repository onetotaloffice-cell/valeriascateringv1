# Valeria's Catering (valeriascatering.com)

Bespoke modern Filipino haute cuisine catering and event planning for luxury weddings, debuts, and grand corporate celebrations across the Philippines.

## CI/CD & Deploying with GitHub

This project includes pre-configured **GitHub Actions** workflows located in `.github/workflows/`:

### 1. Automated GitHub Actions Workflows

- **`.github/workflows/firebase-hosting-merge.yml`**:
  - Automatically triggers when you push or merge changes into the `main` branch (and can also be manually triggered via GitHub's "Run workflow" button).
  - Installs dependencies, runs TypeScript lint checks (`npm run lint`), compiles the production build (`npm run build`), and deploys directly to the live Firebase Hosting channel.

- **`.github/workflows/firebase-hosting-pull-request.yml`**:
  - Triggers on any Pull Request.
  - Validates code compilation, executes type checks, and deploys a temporary preview URL on Firebase Hosting for review before merging.

### 2. Exporting to GitHub from AI Studio

1. In the AI Studio editor header, click on the **Project Settings** (gear icon) or **Export** menu.
2. Select **Export to GitHub** (or connect your GitHub account).
3. Choose your repository destination and sync.

### 3. Setting Up Repository Secrets on GitHub

To enable automated Firebase deployments from GitHub Actions, configure the following secret in your repository (**Settings > Secrets and variables > Actions > New repository secret**):

- `FIREBASE_SERVICE_ACCOUNT_VALERIAS_CATERING`: Your Firebase Service Account private key JSON string (generate via Firebase Console > Project Settings > Service Accounts > Generate new private key).
- `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API key if using AI Menu Concierge in external server environments.

### 4. Container Deployment (Docker / Cloud Run)

A production-ready multi-stage `Dockerfile` and `.dockerignore` are included. You can build and run the containerized application anywhere:

```bash
# Build Docker image
docker build -t valerias-catering .

# Run container locally on port 3000
docker run -p 3000:3000 valerias-catering
```
