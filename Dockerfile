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

###
# Stage 2, Build
###
FROM base-stage as build-stage

# Copy pnpm-lock.yaml file into the image
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev dependencies)
RUN npm install -g pnpm
RUN pnpm install

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
