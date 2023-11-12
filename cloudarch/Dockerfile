FROM node:18

RUN mkdir -p /home/app
WORKDIR /home/app

COPY . /home/app

RUN npm install -g @angular/cli


EXPOSE 4200


CMD ["ng", "serve", "--host", "0.0.0.0"]