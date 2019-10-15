# FROM node:11.10
# WORKDIR /app
# COPY ./ /app/
# RUN npm install
# EXPOSE 4200
# ENTRYPOINT npm start
    
    FROM node:11.10


# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN yarn install


# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0




