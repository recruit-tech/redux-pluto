analytics
---
    npx sonarish src

build
---

    npx cross-env NODE_ENV=production RS_ENV=prd npx saku clean build:client build:server build:size

build-storybook
---
    npx build-storybook

build:client
---
    npx webpack --verbose --colors --display-error-details --config src/webpack/prod.client.config.js

build:csr
---
    npx cross-env DISABLE_SSR=1 npx saku build

build:link-css
---
    npx cross-env DISABLE_INLINE_CSS=1 npx saku build

build:offload
---
    npx cross-env ENABLE_OFFLOAD=1 npx saku build

build:server
---
    npx webpack --verbose --colors --display-error-details --config src/webpack/prod.server.config.js

build:size
---
    npx webpack-bundle-size-analyzer build/client/stats.json

check:secure
---
    npx nsp check

clean
---
    npx rimraf build/*

clean-start
---
    npx saku clean build start:prod

fix
---
    npx saku fix:js

fix:js
---
    npx eslint bin src --fix

lint
---
    npx saku lint:js lint:style

lint:js
---
    npx eslint bin src

lint:style
---
    npx stylelint src

flow
---
    npx flow

prod
---
    npx saku clean build start:prod

screenshot
---
    npx rimraf __screenshots__; storybook-chrome-screenshot -p 9001 -c .storybook/screenshot

start
---
    npx saku start:dev

start:csr
---
    npx cross-env DISABLE_SSR=1 npx saku start:dev

start:dev
---
    npx cross-env NODE_ENV=development npx saku -p start:dev:server start:dev:agreed

start:dev:agreed
---
    npx agreed-server --path ./spec/agreed/agreed.js --port 3010

start:dev:server
---
    npx cross-env DEBUG=express:*,app:* node bin/start-server.js

start:offload
---
    npx cross-env ENABLE_OFFLOAD=1 npx saku start:dev

start:prod
---
    npx cross-env NODE_ENV=production saku -p start:prod:server start:dev:agreed

start:prod:server
---
    node bin/start-server.js

storybook
---
    npx start-storybook -p 6006

test
---
    npx jest

test:agreed
---
    npx agreed-server --path ./spec/agreed/agreed.js --port 3020

test:old
---
    npx saku -p test:agreed test:wait-on -r --print-label

test:wait-on
---
    npx wait-on tcp:3020 && npx cross-env NODE_ENV=test BABEL_ENV=test:unit eater
