#!/bin/bash

set -e

tsc

case $(uname -s) in
    (Linux) SED=(sed -i);;
    (Darwin) SED=(sed -i .bak);;
esac

"${SED[@]}" -e s/YOUR_API_KEY/$(cat api.key)/ -e s/YOUR_CLIENT_ID/$(cat client.id)/ js/main.js

rollup -c

