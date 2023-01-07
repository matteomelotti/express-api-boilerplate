# express Auth Service

## Setup

```bash
  make setup
```

## Commands list

```bash
  make help
```

## Useful Commands

- Start containers
```bash
  make start / make startd
```
- Stop containers
```bash
  make stop
```
- Recreate containers
```bash
  make recreate / make recreated
```

- Install node modules
```bash
  make npm_install
```

- Add node module
```bash
  PACKAGE="one or more package names" make npm_add_dep -> save into dependencies 
  PACKAGE="one or more package names" make npm_add_dev_dep -> save into dev dependencies
```

- Add node module
```bash
  PACKAGE="one or more package names" make npm_remove -> remove node module
```