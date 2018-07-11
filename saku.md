analytics
---
    $(npm bin)/sonarish src

build
---

    $(npm bin)/cross-env NODE_ENV=production RS_ENV=prd saku clean build:client build:server build:size

build-storybook
---
    $(npm bin)/build-storybook

build:client
---
    $(npm bin)/webpack --verbose --colors --display-error-details --config src/webpack/prod.client.config.js

build:csr
---
    $(npm bin)/cross-env DISABLE_SSR=1 $(npm bin)/saku build

build:link-css
---
    $(npm bin)/cross-env DISABLE_INLINE_CSS=1 $(npm bin)/saku build

build:offload
---
    $(npm bin)/cross-env ENABLE_OFFLOAD=1 $(npm bin)/saku build

build:server
---
    $(npm bin)/webpack --verbose --colors --display-error-details --config src/webpack/prod.server.config.js

build:size
---
    $(npm bin)/webpack-bundle-size-analyzer build/client/stats.json

check:secure
---
    $(npm bin)/nsp check

clean
---
    $(npm bin)/rimraf build/*

clean-start
---
    $(npm bin)/saku clean build start:prod

fix
---
    $(npm bin)/saku fix:js

fix:js
---
    $(npm bin)/eslint bin src --fix

lint
---
    $(npm bin)/saku lint:js lint:style

lint:js
---
    $(npm bin)/eslint bin src

lint:style
---
    $(npm bin)/stylelint src

prod
---
    $(npm bin)/saku clean build start:prod

screenshot
---
    $(npm bin)/rimraf __screenshots__; storybook-chrome-screenshot -p 9001 -c .storybook/screenshot

start
---
    $(npm bin)/saku start:dev

start:csr
---
    $(npm bin)/cross-env DISABLE_SSR=1 $(npm bin)/saku start:dev

start:dev
---
    $(npm bin)/cross-env NODE_ENV=development $(npm bin)/saku -p start:dev:server start:dev:agreed

start:dev:agreed
---
    $(npm bin)/agreed-server --path ./spec/agreed/agreed.js --port 3010

start:dev:server
---
    $(npm bin)/cross-env DEBUG=express:*,app:* node bin/start-server.js

start:offload
---
    $(npm bin)/cross-env ENABLE_OFFLOAD=1 $(npm bin)/saku start:dev

start:prod
---
    $(npm bin)/cross-env NODE_ENV=production saku -p start:prod:server start:dev:agreed

start:prod:server
---
    node bin/start-server.js

storybook
---
    $(npm bin)/start-storybook -p 6006

test
---
    $(npm bin)/jest

test:agreed
---
    $(npm bin)/agreed-server --path ./spec/agreed/agreed.js --port 3020

test:old
---
    $(npm bin)/saku -p test:agreed test:wait-on -r --print-label

test:wait-on
---
    $(npm bin)/wait-on tcp:3020 && $(npm bin)/cross-env NODE_ENV=test BABEL_ENV=test:unit eater
