FROM node:22

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

ENV DOCKERIZE_VERSION v0.9.3

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*


# Install app dependencies
RUN npm install && \
    npm install mysql



EXPOSE 3000

# Start the app
ENTRYPOINT [ "node", "index.js" ]
# CMD [ "node", "index.js" ]



