# Use the latest Node.js LTS version as the base image
FROM node:lts-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies using npm
RUN npm install --production

# Copy the rest of the application files to the container
COPY . .

# Set the environment variables for the Telegram bot API token
ENV TELEGRAM_BOT_TOKEN=6076645834:AAFdAywjaqczijwyKN_LXeI5FgIw-feTkyw
ENV OPENAI_API_KEY=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

# Start the application using npm
CMD ["npm", "start"]
