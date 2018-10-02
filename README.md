# editable-ft
UI for easier editing of Google Fusion Tables

# Live demo

There is live a demo at https://friends-of-fusion-tables.github.io/editable-ft. Be mindful that 
the demo uses a shared API key with freebie quota.

# Installation
1.  Clone this repository
2.  Get an OAuth 2.0 client ID  by [following instructions](https://support.google.com/googleapi/answer/6158849?hl=en&ref_topic=7013279). Enable
    Fusion Tables API and People API for your project. For development, I recommend
    registering <http://localhost:8080> among the "Authorized JavaScript
    origins". Write the client ID in file 'client.id'. 
3.  Get a Google API key by [following instructions](https://support.google.com/googleapi/answer/6158862?hl=en&ref_topic=7013279). 
    Include localhost:8080 among the "HTTP referrers". Place the API key in a file 'api.key'.
4.  [Install npm](https://www.npmjs.com/get-npm)
5.  Install http server and webpack globally
```bash
npm install -g webpack webpack-cli http-server
```
6.  Update local node repository
```bash
npm update
```
7.  Build and run a local demo
```bash
npm run build
npm run run
```
8.  Open http://localhost:8080/debug.html
