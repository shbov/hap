# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
ENV NODE_ENV production
ENV PORT 3000

# Setting up the work directory
WORKDIR /hap-api

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN yarn install

# Building our application
RUN yarn run build

# Starting our application
CMD [ "yarn", "run", "start" ]

# Exposing server port
EXPOSE $PORT
