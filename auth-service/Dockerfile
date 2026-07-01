# Step 1: Bring in Node.js (version 18) as our base
FROM node:18-alpine

# Step 2: Create a folder inside the container where our code will live
WORKDIR /app

# Step 3: Copy package.json into the container
COPY package.json ./

# Step 4: Run the install command to download all packages inside the container
RUN npm install

# Step 5: Copy all the remaining project code files into the container
COPY . .

# Step 6: Expose the port our app runs on
EXPOSE 3001

# Step 7: Command to start the app
CMD ["npm", "start"]