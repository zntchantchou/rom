FROM node:16.13-alpine

WORKDIR /api 

COPY . .

EXPOSE 5000

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

CMD ["npm", "start"]

