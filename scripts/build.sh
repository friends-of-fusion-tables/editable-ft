#!/bin/bash

set -e

tsc

webpack --entry $PWD/js/main.js -o dist/main.js --mode ${1:-production}

sed -i .bak -e s/YOUR_API_KEY/$(cat api.key)/ -e s/YOUR_CLIENT_ID/$(cat client.id)/ dist/main.js

