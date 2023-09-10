# Sample nuxt app

This is a simple nuxt application use to fetch, submit and edit data from an external database.

The employees app is reachable via https://local.fe.asknicely.com/

_App is not production ready_

## Setup

This project runs using DDEV, below are the steps to get project running on Mac (similar steps for Windows/Linux, check the link below for reference).

[Get started](https://ddev.com/get-started/)

### Install Docker

Only needed if you don't already have docker in your environment.

```sh
brew install homebrew/cask/docker
```

### Docker Provider

You will also need to install a docker provider. There are a few options out there, but here are our top 3 options

- [Colima](https://github.com/abiosoft/colima) - Recommended by ddev, but does not have GUI
- [Docker Desktop App](https://www.docker.com/products/docker-desktop/)
- [Orbstack](https://orbstack.dev/) - Alternative to Docker Desktop and claims to run lighter, faster and less cpu/hd hungry (Soon to become paid)

If using Colima, you can start docker with:

```
colima start --cpu 4 --memory 6 --disk 100 --vm-type=qemu --mount-type=sshfs --dns=1.1.1.1
```

### Install DDEV

```sh
brew install ddev/ddev/ddev
```

### Install mkcert (required for localhost SSL)

Only needed if you don't already have mkcert in your environment.

```sh
brew install mkcert nss
mkcert -install
```

_Firefox will still flag custom https localhost domains as not having valid certificate_

### Start project

```sh
ddev start
```

_The first time you start your project or after machine restarts, you can be prompted to provide your password in order to add the custom domain to your hosts file._

Once the project is running, you'll need to first install the npm dependencies.

```sh
ddev yarn install
```

Once the dependencies are installed you can start the frontend in dev mode using `ddev yarn dev`

If you wish to run the build version you will need to build the app and then start it

```sh
ddev yarn build
ddev yarn start
```

# Todo - Improvements

- [ ] Playwright & Vitest tests
- [ ] Graph for companies average salaries
- [ ] Better error handling for file upload and API errors (Raygun implementation?)
- [ ] Better indicator and animations for file upload
