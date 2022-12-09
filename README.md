[![CircleCI](https://dl.circleci.com/status-badge/img/gh/commercelayer/core-app-imports/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/commercelayer/core-app-imports/tree/master)

# core-app-imports

## Tests and build

A git tag `vX.Y.Z` triggers the CI pipeline which executes tests, build and push on a s3 bucket `s3://infra-cl-static-assets/core-app-imports/vX.Y.Z`
Adding `-beta.k` suffix let you specify different parameters for the build

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

workflows section:

```js
    ...
    - build:
        public-domain: commercelayer.co
        requires:
            - test
    ...
```
