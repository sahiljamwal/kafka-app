# Stage1: Build the app
FROM node:20 as build

# set workdirectory
WORKDIR /app

# copy package.json and package.lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application
COPY . .

# build typescript
RUN npm run build

# Stage-2: run the application
FROM node:20-slim

# set container work directory
WORKDIR /app

# copy the necessary files from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# run only production dependencies
RUN npm install --omit=dev

# expose port 3000
EXPOSE 3000

# run server start command
CMD [ "node", "dist/server.js" ]