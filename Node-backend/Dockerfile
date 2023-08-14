# specify the node base image with your desired version
FROM node:16

# create a directory to hold the application code inside the image
WORKDIR /usr/src/app

# copy both package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy application files
COPY . .

# expose port 8080
EXPOSE 8080

# run the app
CMD [ "node", "app.js" ]
