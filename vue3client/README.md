# vue3client

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```


###
CORS: 
in server->default.json add:
  "origins": [
    "http://localhost:3030",
    "http://localhost:5173"
  ],


On server: 
    npm run bundle:client
    npm link

On Client:
  //npm link feathers-server  // Virker ikke????, 
  npm install http:/localhost:3030/feathers-server-0.0.0.tgz --save

  
