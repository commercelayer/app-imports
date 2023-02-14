![https://dl.circleci.com/status-badge/redirect/gh/commercelayer/core-app-imports/tree/master](https://dl.circleci.com/status-badge/img/gh/commercelayer/core-app-imports/tree/master.svg?style=svg)

# Commerce Layer App Imports

The Commerce Layer imports application (React) provides you with a simple GUI to handle [imports](https://docs.commercelayer.io/core/importing-resources).

![imports list](https://user-images.githubusercontent.com/30926550/218682458-d7fd4000-552f-43e7-bacf-4607684267fd.png)

## What is Commerce Layer?

[Commerce Layer](https://commercelayer.io) is a multi-market commerce API and order management system that lets you add global shopping capabilities to any website, mobile app, chatbot, wearable, voice, or IoT device, with ease. Compose your stack with the best-of-breed tools you already mastered and love. Make any experience shoppable, anywhere, through a blazing-fast, enterprise-grade, and secure API.

## Table of contents

- [Getting started](#getting-started)
- [Environments](#environments)
- [Build and Test in CI](#build-and-test-in-ci)
- [Help and support](#need-help)
- [License](#license)

---

## Getting started

1. First, install dependencies and run the development server:

```
pnpm install
pnpm dev
```

2. Set your environment with `.env.local` starting from `.env.local.sample`.

3. Configure your `/public/config.json` with the runtime configuration required

4. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result. You can use the following format to open the app: `http://localhost:5173/imports?accessToken=<your-access-token>`

## Environments

PUBLIC_TOKEN_KIND=integration
PUBLIC_PROJECT_PATH=imports
PUBLIC_ENABLE_MOCKS=false

| env name            | sample vaule | description                                                                                                                                                                                                                                                          |
| ------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PUBLIC_TOKEN_KIND   | integration  | (Optional) Defines the kind of token to be used and validated. <br />Possible values: `integration` or `webapp`. <br />Default value is `webapp`.                                                                                                                    |
| PUBLIC_PROJECT_PATH | imports      | (Optional) Defines the base root path where the app will be served.<br/> `https://<slug>.commercelayer.app/<PUBLIC_PROJECT_PATH>`<br /> It's used at build time to reference assets folder and at runtime as base router path. <br />No leading or trailing slashes. |
| PUBLIC_ENABLE_MOCKS | false        | (Optional) Enables mock server when set to `true`.<br /> Mocks are defined in `./src/mocks/handlers.ts`                                                                                                                                                              |

## Build and Test in CI

A git tag `vX.Y.Z` triggers the CI pipeline which executes tests, build and push on a s3 bucket `s3://infra-cl-static-assets/core-app-imports/vX.Y.Z`
Adding `-stg.k` suffix let you specify different parameters for the build.
When adding `[skip ci]` in commit message, pipeline will not run.

Paramenters are assigned to an env variable in the build section of the `.circleci/config.yaml` and passed in the workflow section:

build section:

```yaml
    ...
    parameters:
      PUBLIC_PROJECT_PATH:
        type: string
    environment:
      PUBLIC_PROJECT_PATH: << parameters.PUBLIC_PROJECT_PATH >>
    ...
```

Use `pnpm bumpver` or `pnpm lerna version` to generate a new tag and automatically keep package.json synched. Lerna will automatically push on remote the new tag and it will trigger the CI pipeline.

## Need help?

1. Join [Commerce Layer's Slack community](https://slack.commercelayer.app).

2. Create an [issue](https://github.com/commercelayer/commercelayer-cart/issues) in this repository.

3. Ping us [on Twitter](https://twitter.com/commercelayer).

## License

This repository is published under the [MIT](LICENSE) license.
