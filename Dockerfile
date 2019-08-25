FROM node:11.10
WORKDIR /app
COPY ./ /app/
RUN npm install
EXPOSE 4200
ENTRYPOINT npm start