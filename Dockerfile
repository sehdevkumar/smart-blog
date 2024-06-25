# Use the official Node.js image as the base image
FROM node:19

# Set the working directory inside the container
WORKDIR /count-dashboard

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package.json ./
COPY package-lock.json ./
# If you are using Yarn, uncomment the following line and comment the previous line

# Install dependencies
RUN npm install
# If you are using Yarn, uncomment the following line and comment the previous line
# RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
# If you are using Yarn, uncomment the following line and comment the previous line
# RUN yarn build

# Expose the port the app runs on
EXPOSE 3002

# Start the Next.js server
CMD  ["/bin/sh", "./runner.sh"]
# If you are using Yarn, uncomment the following line and comment the previous line
# CMD ["yarn", "start"]
