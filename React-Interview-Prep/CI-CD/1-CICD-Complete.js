// ============================================================
// CI/CD PIPELINE - INTERVIEW PREPARATION
// ============================================================

/**
 * CI/CD is critical for production apps
 * Used by Google, Meta, Amazon, TCS, Cognizant
 * Interview focus: GitHub Actions, GitLab CI, Jenkins
 */

// ============================================================
// 1. CI/CD FUNDAMENTALS
// ============================================================

/*
Q1: What is CI/CD and why is it important?
A: CI/CD: Continuous Integration / Continuous Deployment
   - Automate testing and deployment
   - Catch bugs early
   - Faster release cycles
   - Consistent deployments
   - Reduced human error

   CI (Continuous Integration):
   - Code merged frequently
   - Automated tests run
   - Code quality checks
   - Build automation

   CD (Continuous Deployment):
   - Automated deployment to production
   - Every commit that passes tests goes live
   - Fast feedback

Q2: What are the stages of a CI/CD pipeline?
A: 1. Trigger: Code push/PR
   2. Build: Compile code
   3. Test: Run unit, integration tests
   4. Lint: Code quality checks
   5. Build artifacts: Create bundle
   6. Deploy staging: Test in staging
   7. Manual approval: (optional)
   8. Deploy production: Release to users

Q3: What's GitHub Actions?
A: GitHub's built-in CI/CD:
   - Workflow files in .github/workflows/
   - Triggered by events (push, PR, schedule)
   - Jobs with steps
   - Runs on GitHub servers

Q4: What's GitLab CI?
A: GitLab's CI/CD (similar to GitHub Actions):
   - .gitlab-ci.yml file
   - Pipelines with stages
   - Runners (can be self-hosted)
   - More powerful than GitHub Actions

Q5: What's Jenkins?
A: Self-hosted CI/CD server:
   - Runs on your servers
   - Highly customizable
   - Used by enterprises
   - Requires setup and maintenance
*/

// ============================================================
// 2. GITHUB ACTIONS WORKFLOW
// ============================================================

/*
Q6: How to create a GitHub Actions workflow?
A: Create .github/workflows/ci.yml:
   ```yaml
   name: CI

   on:
     push:
       branches: [main, dev]
     pull_request:
       branches: [main]

   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm install
         - run: npm test
         - run: npm run lint
   ```

Q7: How to run tests in CI pipeline?
A: ```yaml
   - name: Run tests
     run: npm test -- --coverage

   - name: Upload coverage
     uses: codecov/codecov-action@v3
     with:
       files: ./coverage/lcov.info
   ```

Q8: How to build and deploy?
A: ```yaml
   - name: Build
     run: npm run build

   - name: Deploy to Vercel
     uses: vercel/actions/deploy-production@main
     with:
       github-token: ${{ secrets.GITHUB_TOKEN }}
   ```

Q9: How to handle secrets in CI?
A: ```yaml
   - name: Deploy
     run: npm run deploy
     env:
       API_KEY: ${{ secrets.API_KEY }}
       DATABASE_URL: ${{ secrets.DATABASE_URL }}

   # Add secrets in GitHub Settings > Secrets
   ```

Q10: How to run jobs in parallel?
A: ```yaml
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - run: npm test

     lint:
       runs-on: ubuntu-latest
       steps:
         - run: npm run lint

     build:
       runs-on: ubuntu-latest
       steps:
         - run: npm run build

   # All three run simultaneously
   ```
*/

// ============================================================
// 3. ADVANCED CI/CD PATTERNS
// ============================================================

/*
Q11: How to implement matrix testing?
A: Test on multiple versions:
   ```yaml
   jobs:
     test:
       runs-on: ubuntu-latest
       strategy:
         matrix:
           node-version: [16, 18, 20]
           os: [ubuntu-latest, windows-latest, macos-latest]
       steps:
         - uses: actions/setup-node@v3
           with:
             node-version: ${{ matrix.node-version }}
         - run: npm test
   ```

Q12: How to deploy only on successful tests?
A: Use job dependencies:
   ```yaml
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - run: npm test

     deploy:
       needs: test
       runs-on: ubuntu-latest
       steps:
         - run: npm run deploy
   ```

Q13: How to notify on pipeline failure?
A: ```yaml
   - name: Notify Slack on failure
     if: failure()
     uses: slackapi/slack-github-action@v1
     with:
       payload: |
         {
           "text": "Build failed: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
         }
     env:
       SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
   ```

Q14: How to cache dependencies?
A: ```yaml
   - uses: actions/setup-node@v3
     with:
       node-version: '18'
       cache: 'npm'

   # Or manual caching
   - uses: actions/cache@v3
     with:
       path: ~/.npm
       key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
   ```

Q15: How to run conditional steps?
A: ```yaml
   - name: Run only on main branch
     if: github.ref == 'refs/heads/main'
     run: npm run deploy

   - name: Run on PR
     if: github.event_name == 'pull_request'
     run: npm run preview-deploy
   ```
*/

// ============================================================
// 4. DOCKER & CONTAINERIZATION
// ============================================================

/*
Q16: What is Docker?
A: Container platform:
   - Package app + dependencies
   - Consistent environment (dev = prod)
   - Easy scaling
   - Isolated containers

Q17: What's a Dockerfile?
A: Blueprint for Docker image:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

Q18: How to use Docker in CI/CD?
A: ```yaml
   - name: Build Docker image
     run: docker build -t myapp:latest .

   - name: Push to registry
     run: |
       docker tag myapp:latest gcr.io/project/myapp:latest
       docker push gcr.io/project/myapp:latest
   ```

Q19: What's Docker Compose?
A: Run multiple containers:
   ```yaml
   version: '3'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       depends_on:
         - db
     db:
       image: postgres:15
       environment:
         POSTGRES_PASSWORD: secret
   ```

Q20: Docker best practices
A: 1. Use slim base images (alpine)
   2. Multi-stage builds
   3. Don't run as root
   4. Use .dockerignore
   5. Pin dependency versions
   6. Keep layers minimal
   7. Scan for vulnerabilities
*/

// ============================================================
// 5. DEPLOYMENT STRATEGIES
// ============================================================

/*
Q21: What are deployment strategies?
A: 1. Blue-Green: Two identical environments, switch traffic
   2. Canary: Gradual rollout to small % of users
   3. Rolling: Gradually replace old with new
   4. A/B Testing: Route to different versions
   5. Feature Flags: Toggle features without deploy

Q22: How to implement blue-green deployment?
A: ```yaml
   - name: Deploy to blue
     run: deploy-to-blue.sh

   - name: Run tests
     run: run-tests.sh

   - name: Switch traffic to blue
     run: switch-traffic.sh
   ```

Q23: How to implement canary deployment?
A: ```yaml
   - name: Deploy to canary
     run: deploy-canary.sh

   - name: Monitor metrics
     run: check-canary-health.sh

   - name: If healthy, roll out to 100%
     run: rollout-full.sh
   ```

Q24: What's rollback strategy?
A: ```yaml
   - name: If deployment fails
     if: failure()
     run: rollback-to-previous.sh

   - name: Notify team
     run: notify-slack.sh "Deployment rolled back"
   ```

Q25: Pipeline for React app (complete example)
A: ```yaml
   name: Deploy React App

   on:
     push:
       branches: [main]
     pull_request:
       branches: [main]

   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
         - run: npm install
         - run: npm test -- --coverage
         - run: npm run lint
         - run: npm run build

     deploy:
       needs: test
       if: github.ref == 'refs/heads/main'
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Deploy to Vercel
           run: npx vercel --prod
           env:
             VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
   ```
*/

// ============================================================
// CI/CD INTERVIEW TIPS
// ============================================================

/*
TCS/Cognizant (Junior to Mid):
- Know CI/CD concepts
- Can write basic GitHub Actions
- Understand pipeline stages
- Know when to deploy

Big4 (Mid to Senior):
- Complex pipelines
- Deployment strategies
- Docker expertise
- Monitoring and rollback
- Performance optimization
- Infrastructure as Code

Most asked questions:

1. "What's the difference between CI and CD?"
   - CI: Testing on commits, CD: Automated deployment

2. "How to run parallel jobs?"
   - Multiple jobs in workflow or matrix strategy

3. "How to handle secrets?"
   - Use GitHub Secrets, reference with ${{ secrets.NAME }}

4. "What's blue-green deployment?"
   - Two identical environments, switch traffic

5. "How to cache npm dependencies?"
   - Use actions/cache or node cache option

6. "Why use Docker?"
   - Consistent environment, easy scaling, isolation
*/

export const CICD_INTERVIEW_TOPICS = {
  FUNDAMENTALS: [1, 2, 3, 4, 5],
  GITHUB_ACTIONS: [6, 7, 8, 9, 10],
  ADVANCED: [11, 12, 13, 14, 15],
  DOCKER: [16, 17, 18, 19, 20],
  DEPLOYMENT: [21, 22, 23, 24, 25],
};
