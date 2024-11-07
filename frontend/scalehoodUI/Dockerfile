# frontend/scalehoodUI/Dockerfile
FROM node:20.17.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the port React runs on (Vite default is 5173)
EXPOSE 5173

# Command to start the development server
# CMD ["npm", "run", "dev"]
# CMD ["npm", "run", "preview"]
# CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
CMD ["npm", "run", "dev","--","--host","0.0.0.0"]
