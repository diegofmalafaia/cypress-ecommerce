# cypress-ecommerce

## Description

An end-to-end testing framework tailored for ecommerce platforms. Designed specifically for the AQA Javascript role.

We utilize the e-commerce demo available at: [https://demo.sylius.com/en_US/](https://demo.sylius.com/en_US/)

## Prerequisites

Before you begin, ensure you have met the following requirements:

### Node.js

This project uses Node.js. If you don't have Node.js installed, you can download and install it from [here](https://nodejs.org/). The version used for this project is `v16.14.0`.

## Setup

* **Clone the repository**

 ```bash
 git clone https://github.com/diegofmalafaia/cypress-ecommerce
 cd cypress-ecommerce
 ```

* **Install dependencies**

   Once you've cloned the repository and navigated into the directory, run the following command to install the necessary dependencies:

 ```bash
 npm install
 ```

## Running the Tests

* **Headless Mode**

    To execute the Cypress tests in headless mode (without opening the graphical interface):

 ```bash
 npm run cypress:run
 ```

* **Graphical Interface**

    To open the graphical interface of Cypress:

 ```bash
 npm run cypress:open
 ```

## Additional Configurations

While the above instructions should get you started, remember that Cypress provides a rich set of configurations that can be tailored to your specific needs. You can check out the official [Cypress documentation](https://docs.cypress.io/) for more advanced configurations and options.
