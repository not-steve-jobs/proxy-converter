# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:20

# Install necessary libs for Puppeteer
RUN apt-get update && apt-get install -y wget gnupg ca-certificates procps libxss1 \
    fonts-liberation libappindicator3-1 xdg-utils libasound2 libatk-bridge2.0-0 \
    libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 libcups2 libxkbcommon0 \
    libwayland-client0 libpango-1.0-0 libcairo2 libgbm1


# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "npm", "run", "start:dev" ]

# Use port 3000 to match the app's default port.
EXPOSE 5000