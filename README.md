Live Auckland Buses
===================

This app is built partially off [create-react-app](README-cra.md)

This app shows the live locations of buses in Auckland. This currently has a max delay of 1 minute, as the frontend polls at 30 second intervals and the api has a 30 second update interval (based on Auckland Transport)

This app uses the create react app + node express server structure.
It doesn't make sense to use server side rendering, which I've outlined in another repo

Install
-------
```
yarn
# Build frontend
yarn run build
# Server
PORT=5050 NODE_ENV=production yarn run start:server
```

Development
-----------
Development is using create react app's webpack build, which is pretty sweet

```
# frontend
yarn start
# server
PORT=3001 yarn run start:server
```
