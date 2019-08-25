<!-- ![Logo of the project](./images/logo.sample.png) -->

# Auth Now

> An exploration into serverless

This is the main repo for @tomfa, @andrroy and @rix1's serverless adventure

## Api Reference

<!-- If the api is external, link to api documentation. If not describe your api including authentication methods as well as explaining all the endpoints with their required parameters. -->

Currently, the API only supports `GET` requests.

- `GET /api/hello?name=world` 👉 Hello world!
- `GET /api/sendgrid/send/test@info.com` 👉 Send email using [SendGrid](https://sendgrid.com) as provider to test@info.com.
  Specify subject and body using query parameters. Example `GET /api/sendgrid/send/test@info.com?title=Hello&text=how%20is%20it%20going?
- `GET /api/mailgun/send/test@info.com` 👉 Send email using [MailGun](https://www.mailgun.com) as provider to test@info.com.
  Specify subject and body using query parameters. Example `GET /api/mailgun/send/test@info.com?title=Hello&text=how%20is%20it%20going?

## Developing

### Built With

This project defines a series of serverless functions to be hosted by [ZEIT Now](https://zeit.co/docs/v2/serverless-functions/introduction/).

### Prerequisites

You will need to have Node and `now` installedd globally:

- `Node >=8.x`
- `npm install -g now`

### Setting up Dev

To get started, clone the repo and install dependencies:

```shell
git clone https://github.com/rix1/auth-now.git
cd auth-now/
yarn install
```

### Building

Before building, you need to copy `dev-template.env` to `.env`

```shell
cp dev-template.env .env
```

ZEIT Now provides an additional command with Now CLI to help you develop
serverless functions locally by replicating the production environment on Now
with your localhost.

```shell
now dev
```

This supports hot reloading.

### Deploying / Publishing

To deploy serverless functions you just have to run

```shell
now
```

from the root directory of the project. This will upload the repository to
ZEIT's servers, build the project and serve the serverless API functions at
https://auth-now.rix1.now.sh/api/.

## Configuration

You can configure the build and deployment settings in `now.json`. See
[ZEIT docs](https://zeit.co/docs/v2/advanced/configuration/) for API reference
and more info.

### Aliases

You can easily alias you deployment to different domains. See
[custom domains](https://zeit.co/docs/v2/custom-domains/#deploying-with-your-domain)
for more info.

## Tests

Todo

<!-- Describe and show how to run the tests with code examples.
Explain what these tests test and why.

```shell
Give an example
``` -->

## Licensing

MIT
