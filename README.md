# Headbands
Web version of headbands using [SvelteKit](https://kit.svelte.dev/) and [Socket.IO](https://socket.io/)

## Client

The client uses [SvelteKit](https://kit.svelte.dev/)

### Developing

From the client-folder:
```
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

Before creating a production version, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then, from the client-folder:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Server
The server is a node.js server. To 

### Developing

From the server-folder
```bash
npm run dev
```

### Starting

From the server-folder
```bash
npm run start
```