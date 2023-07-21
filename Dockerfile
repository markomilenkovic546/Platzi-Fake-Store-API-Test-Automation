# Use an official cypress image as the base image
FROM cypress/browsers:node-18.16.0-chrome-114.0.5735.133-1-ff-114.0.2-edge-114.0.1823.51-1 

# Create a folder where project will be stored
RUN mkdir /platzy-fake-store-api-test-automation

# Set the working directory inside the container
WORKDIR /platzy-fake-store-api-test-automation

# Copy files
COPY ./package.json .
COPY ./package-lock.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress


# Install project dependencies, including Cypress
RUN npm install


ENTRYPOINT ["npx", "cypress", "run"]


CMD [""]
