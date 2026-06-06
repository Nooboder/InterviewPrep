// ============================================================
// DOCKER - INTERVIEW PREPARATION
// ============================================================

/**
 * Docker is essential for modern web development
 * Used by Google, Meta, Amazon, TCS, Cognizant
 * Interview focus: Containers, images, networking, orchestration
 */

// ============================================================
// 1. DOCKER FUNDAMENTALS
// ============================================================

/*
Q1: What is Docker and why use it?
A: Docker is containerization platform:
   - Lightweight virtual machines
   - Consistent environment (dev = staging = prod)
   - Easy scaling
   - Isolated applications
   - Fast startup (seconds vs minutes)

   Benefits:
   - "Works on my machine" problem solved
   - Easier onboarding
   - Microservices architecture
   - CI/CD automation
   - Cost effective

Q2: What's the difference between Docker image and container?
A: Image:
   - Blueprint (immutable)
   - Built from Dockerfile
   - Stored in registry
   - Reusable

   Container:
   - Running instance of image
   - Mutable (can change)
   - One image → many containers
   - Ephemeral (can be deleted)

   Analogy: Class → Object

Q3: What is Dockerfile and what are its key commands?
A: Dockerfile: Instructions to build image
   ```dockerfile
   FROM node:18-alpine         # Base image
   WORKDIR /app                # Set working directory
   COPY package*.json ./       # Copy files
   RUN npm install             # Run command
   COPY . .                    # Copy source
   RUN npm run build           # Build step
   EXPOSE 3000                 # Document port
   ENV NODE_ENV=production     # Environment variable
   CMD ["npm", "start"]        # Default command
   ```

Q4: What are best practices for Dockerfile?
A: 1. Use specific base image versions
      ❌ FROM node (latest)
      ✅ FROM node:18-alpine

   2. Multi-stage builds (reduce size)
   3. Don't run as root
   4. Use .dockerignore
   5. Minimize layers (combine RUN commands)
   6. Use alpine images (smaller)
   7. Keep secrets out of image

Q5: What's Docker registry?
A: Repository for Docker images:
   - Docker Hub (public)
   - Amazon ECR (AWS)
   - Google Container Registry (GCP)
   - GitLab Registry
   - Private registries
*/

// ============================================================
// 2. DOCKERFILE & IMAGE BUILDING
// ============================================================

/*
Q6: How to build a React app with Docker?
A: ```dockerfile
   # Build stage
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   # Runtime stage
   FROM nginx:alpine
   COPY --from=builder /app/build /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

Q7: What's multi-stage build?
A: Use multiple FROM statements:
   ```dockerfile
   # Stage 1: Build
   FROM node:18 AS builder
   WORKDIR /app
   COPY . .
   RUN npm install && npm run build

   # Stage 2: Runtime (no build tools)
   FROM node:18-alpine
   COPY --from=builder /app/build ./build
   CMD ["node", "./build/server.js"]
   ```
   Benefits:
   - Smaller final image
   - No build dependencies in production

Q8: How to optimize Docker image size?
A: 1. Use alpine base images
   2. Multi-stage builds
   3. Combine RUN commands
   4. Use .dockerignore
   5. Remove unnecessary files
   6. Cache npm install separately

Q9: How to build Docker image?
A: ```bash
   docker build -t myapp:1.0 .
   docker build -t myapp:latest .
   docker build --build-arg NODE_ENV=production .
   ```

Q10: How to run Docker container?
A: ```bash
   docker run -d -p 3000:3000 --name myapp myapp:latest
   docker run -it ubuntu bash  # Interactive
   docker run -e API_KEY=value # Environment variable
   docker run -v /host:/container # Volume mount
   ```
*/

// ============================================================
// 3. DOCKER NETWORKING & VOLUMES
// ============================================================

/*
Q11: How do containers communicate?
A: Docker networking:
   ```bash
   docker network create mynet
   docker run --network mynet --name app1 app:latest
   docker run --network mynet --name app2 app:latest
   ```
   Containers can reach each other by name (DNS)

Q12: What are Docker volumes?
A: Persist data outside container:
   ```bash
   docker volume create mydata
   docker run -v mydata:/app/data app:latest

   # Or bind mount (host directory)
   docker run -v /host/path:/container/path app:latest

   # Anonymous volume
   docker run -v /app/data app:latest
   ```

Q13: How to use Docker Compose?
A: Multi-container application:
   ```yaml
   version: '3.9'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         DATABASE_URL: postgres://db:5432/mydb
       depends_on:
         - db
     db:
       image: postgres:15
       environment:
         POSTGRES_PASSWORD: secret
       volumes:
         - db_data:/var/lib/postgresql/data
   volumes:
     db_data:
   ```

Q14: How to pass environment variables?
A: ```bash
   # Command line
   docker run -e API_KEY=secret app:latest

   # From file
   docker run --env-file .env app:latest

   # In docker-compose
   environment:
     NODE_ENV: production
     API_KEY: ${API_KEY}
   ```

Q15: How to debug Docker container?
A: ```bash
   docker logs myapp              # See logs
   docker exec -it myapp sh       # Enter shell
   docker ps                      # List running
   docker inspect myapp           # Details
   docker stats myapp             # Resource usage
   ```
*/

// ============================================================
// 4. DOCKER PRODUCTION PATTERNS
// ============================================================

/*
Q16: What's Docker health check?
A: Monitor container health:
   ```dockerfile
   HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
     CMD curl -f http://localhost:3000/health || exit 1
   ```

Q17: How to handle secrets in Docker?
A: Options:
   1. Docker Secrets (Docker Swarm)
   2. Environment variables (not secure)
   3. Secret management service (Vault, AWS Secrets)
   4. Build-time args (not for production secrets)

   ✅ SAFE:
   ```bash
   docker run --secret db_password app:latest
   ```

Q18: What's Docker registry?
A: Central repository:
   ```bash
   docker tag myapp:latest myregistry.com/myapp:latest
   docker push myregistry.com/myapp:latest
   docker pull myregistry.com/myapp:latest
   ```

Q19: How to reduce Docker image security vulnerabilities?
A: 1. Use minimal base images (alpine)
   2. Don't run as root
   3. Use specific version tags
   4. Scan images for vulnerabilities
   5. Keep dependencies updated
   6. Use Docker secrets for credentials
   7. Use read-only filesystems

Q20: Docker best practices checklist
A: ✅ Non-root user
   ✅ Health checks
   ✅ Proper logging
   ✅ Resource limits
   ✅ Multi-stage builds
   ✅ Alpine base images
   ✅ .dockerignore file
   ✅ Specific version tags
   ✅ Vulnerability scanning
   ✅ No hardcoded secrets
*/

// ============================================================
// 5. KUBERNETES & ORCHESTRATION
// ============================================================

/*
Q21: What is Kubernetes?
A: Container orchestration platform:
   - Manage many containers
   - Auto-scaling
   - Self-healing
   - Load balancing
   - Rolling updates
   - Service discovery

Q22: What's the difference between Docker Compose and Kubernetes?
A: Docker Compose:
   - Single machine
   - Simple
   - Development/testing
   - Limited orchestration

   Kubernetes:
   - Distributed (many machines)
   - Complex
   - Production-grade
   - Full orchestration

Q23: What's a Kubernetes Pod?
A: Smallest unit:
   - One or more containers
   - Shared network namespace
   - Ephemeral (can be deleted)

Q24: What's Kubernetes Deployment?
A: Manage pod replicas:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: myapp
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: myapp
     template:
       metadata:
         labels:
           app: myapp
       spec:
         containers:
         - name: myapp
           image: myapp:latest
           ports:
           - containerPort: 3000
   ```

Q25: Docker + Kubernetes workflow
A: 1. Build Docker image
   2. Push to registry
   3. Create Kubernetes manifests
   4. Deploy to cluster
   5. Kubernetes manages scaling/health
   6. Update image in registry
   7. Kubernetes rolls out new version
   8. Auto-scales based on load
*/

// ============================================================
// DOCKER FOR REACT - COMPLETE EXAMPLE
// ============================================================

/*
Q26: Complete React + Docker setup
A: Dockerfile:
   ```dockerfile
   FROM node:18-alpine AS build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/build /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   HEALTHCHECK --interval=10s CMD curl -f http://localhost || exit 1
   CMD ["nginx", "-g", "daemon off;"]
   ```

   nginx.conf:
   ```nginx
   server {
     listen 80;
     location / {
       root /usr/share/nginx/html;
       try_files $uri $uri/ /index.html;
     }
   }
   ```

   .dockerignore:
   ```
   node_modules
   npm-debug.log
   build
   .git
   .env
   ```

   docker-compose.yml:
   ```yaml
   version: '3.9'
   services:
     app:
       build: .
       ports:
         - "80:80"
       environment:
         NODE_ENV: production
   ```

Q27: Docker in GitHub Actions
A: ```yaml
   - name: Build Docker image
     run: docker build -t myapp:${{ github.sha }} .

   - name: Push to registry
     run: |
       docker tag myapp:${{ github.sha }} gcr.io/project/myapp:latest
       docker push gcr.io/project/myapp:latest

   - name: Deploy
     run: kubectl set image deployment/myapp myapp=gcr.io/project/myapp:latest
   ```
*/

// ============================================================
// DOCKER INTERVIEW TIPS
// ============================================================

/*
TCS/Cognizant (Junior to Mid):
- Know Docker basics
- Can write Dockerfile
- Understand image vs container
- Can run containers
- Know docker-compose basics

Big4 (Mid to Senior):
- Multi-stage builds
- Docker networking
- Kubernetes basics
- Production best practices
- Security concerns
- Performance optimization
- Container monitoring

Most asked questions:

1. "What's the difference between image and container?"
   - Image is blueprint, container is running instance

2. "How to reduce Docker image size?"
   - Alpine images, multi-stage builds, .dockerignore

3. "How do containers communicate?"
   - Docker network, containers discover by name

4. "What's docker-compose for?"
   - Define multi-container applications

5. "How to handle secrets?"
   - Use Docker secrets or env vars (not hardcoded)

6. "Why Kubernetes over Docker Compose?"
   - Kubernetes: distributed, scaling, production-grade
*/

export const DOCKER_INTERVIEW_TOPICS = {
  FUNDAMENTALS: [1, 2, 3, 4, 5],
  DOCKERFILE: [6, 7, 8, 9, 10],
  NETWORKING: [11, 12, 13, 14, 15],
  PRODUCTION: [16, 17, 18, 19, 20],
  ORCHESTRATION: [21, 22, 23, 24, 25],
};
