#!/bin/bash

set -e

tsc

webpack --entry $PWD/js/$1.js -o dist/$1.js --mode ${2:-production}

case $(uname -s) in
    (Linux) SED=(sed -i);;
    (Darwin) SED=(sed -i .bak);;
esac

"${SED[@]}" -e s/YOUR_API_KEY/$(cat api.key)/ -e s/YOUR_CLIENT_ID/$(cat client.id)/ dist/main.js

