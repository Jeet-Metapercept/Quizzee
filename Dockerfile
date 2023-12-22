# Use specific version of Node.js
ARG NODE_VERSION=18.14.2

###
# Stage 1, Base
###
FROM node:${NODE_VERSION}-slim as base-stage

# Set Node environment as production
ENV NODE_ENV=production

# Set working directory in container
WORKDIR /src

# Install a specific version of pnpm
ARG PNPM_VERSION=<version>  # replace <version> with the desired version number
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=${PNPM_VERSION} sh - && \
    apt-get remove -y curl && apt-get autoremove -y

###
# Stage 2, Build
###
FROM base-stage as build-stage

# Copy pnpm-lock.yaml file into the image
COPY pnpm-lock.yaml ./

# Install all dependencies (including dev dependencies)
RUN pnpm install --frozen-lockfile --prod=false

# Copy the rest of the application
COPY . .

# Run the build script to compile the application
RUN pnpm run build

# Prune dev dependencies to minimize image size
RUN pnpm prune --prod

###
# Stage 3, Run
###
FROM base-stage

# Define the port argument for this stage
ARG PORT=3000

# Set the port environment variable
ENV HOST=0.0.0.0
ENV PORT=$PORT

# Copy the built application from the build stage
COPY --from=build-stage /src/.output /src/.output

# Optional: Copy the node_modules folder if unbundled dependencies are needed
# COPY --from=build-stage /src/node_modules /src/node_modules

# Command to start the server
CMD [ "node", ".output/server/index.mjs" ]
