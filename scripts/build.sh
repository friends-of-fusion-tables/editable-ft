#!/bin/bash

tsc

case $(uname -s) in
    (Linux) SED=(sed -i);;
    (Darwin) SED=(sed -i .bak);;
esac

"${SED[@]}" -e s/YOUR_API_KEY/$(cat api.key)/ -e s/YOUR_CLIENT_ID/$(cat client.id)/ js/main.js

if [[ -n "$2" ]]; then
    rollup -f esm -i js/$1.js -o dist/$1.js --sourcemap
else
    rollup -i js/$1.js -o dist/$1.js -c
fi


