/* @flow */
import os from "os";
import path from "path";
import ms from "ms";

const rootDir = path.resolve(__dirname, "../../..");
const tmpDir = os.tmpdir();

export default {
  // https://github.com/expressjs/body-parser
  bodyParser: {
    // https://github.com/expressjs/body-parser#bodyparserjsonoptions
    json: {},

    // https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
    urlencoded: {
      extended: true
    }
  },

  // https://github.com/jshttp/cookie
  cookieParser: null,

  // https://github.com/expressjs/session
  session: {
    secret: "redux-proto",
    resave: false,
    saveUninitialized: false
  },

  // https://github.com/expressjs/csurf
  csurf: {
    cookie: true
  },

  // https://github.com/expressjs/serve-favicon
  favicon: path.resolve(rootDir, "statics/favicon.ico"),

  // https://github.com/expressjs/serve-static
  assets: [
    {
      mount: "/public",
      path: path.resolve(rootDir, "statics")
    },
    {
      mount: "/public",
      path: path.resolve(rootDir, "build/client"),
      buildOutput: true
    },
    {
      mount: "/public",
      path: path.resolve(tmpDir)
    }
  ].filter(Boolean),

  // https://github.com/yahoo/fetchr
  fetchr: {},

  // https://github.com/mzabriskie/axios#request-config
  axios: {
    baseURL: "http://beauty.sda.hotpepper.jp/",
    params: {
      key: "hK8GrzWsq80d",
      format: "json"
    },
    timeout: 10000
  },

  offload: {
    limit: 5,
    window: ms("1m"),
    cache: {
      maxAge: ms("3m")
    }
  },

  auth: {
    maxAge: ms("3m"),
    key: `
      -----BEGIN RSA PRIVATE KEY-----
      MIIEogIBAAKCAQEAzEmHXt1PR4N4nFMrmvl8jv8k1IfEPZsnXIDFNywE1yblxqQE
      hl9jn4Pqq7Ac8Fad8tloeanVYqJBqoqHaEDMqRNVmbB2u+UwDKui5tlyiP+WqZMP
      /FLgoHLThmlJUepLPGIIodi4xssByQWtDqYViYccn91lHNpvxf5T4CItRY19Fo/3
      Ew4jD0rfNPx3yfjQEHh5enBkNVyHg4H9DxyfVHMApefGcIUz5bq1TfMA0obWaB8d
      vn5nHntKb06E1ji1KVXHtYFh1/olJa6pwajDc70poixG32dAYuKthf70sqvJcdFq
      j9nikhRpWffLlilrvvYrcb5DJGMjvRbRTssCSwIDAQABAoIBAEmEeJwSJvLEhIY1
      hC7MdB/+ACIgDeZhzMOEb/TP+Zn4HJ7k7d/xuidw0OYihfeUJFl+FhQao3lQjTMz
      kVFaaIy8MYUStVgfPbCBoClVvdtBp9W03/7dUItNZ4QqpcE+AP9lBFhCZxTbf/P4
      //OSn5OTtSBvC3FbxvfI9CRoCETL5otgoRh/E2t/lRJc48Tuo1M9UrG6+SGslSar
      DjwxhbXJGFg5MRvv9AdEgvAQcGB+NnGigjfjkhYB9T7JW4CQGO25PkAhD5MiztZj
      cz0GDIX9AK1KqWy+Pj9c6KprmBKMGYN5Plu93fuBqDpybi4YW+Bqgy0LtwzquGSd
      MjKlKRECgYEA8bZ8Aly+xTBZNDRLBsU60LVDd28AZk3JUYHC/+jyf/PHhkOJwbIa
      ICM0j1EVsCwlZ67kRwsGqzNjkri4Fk063CZSgItUK61KoRBU2V1rLqT2gcLE5Ftq
      R3BS9+s2G0gopnu5sZHwhodmaAC3FKF3urgwPvakibnNkjKcudMoM8kCgYEA2Fy7
      oP261inZk3MIiRAXZutFGEjgccdXOIh9YtzQPRq3Mwj8lhJHQhg+8Qt4a0P6vXk7
      qkqjfP1F8Y8SO8JiBzAqQZpwmUEH08jpTUQLHQpUATu/wNMeuscsv/pSYSX0SuYs
      BagEwkkjvAgWbh4N4LvaJlxwKA8NTLAoJ3vnR3MCgYBqWVMYqvvYwNwOxw9XrEGj
      gI1tqC4x1PnF3eUROcowl+7q2R5sVdN+3l6KzC9RsyrGAsI3q9dETjj6XkHItjQ2
      lrnoCuV+ziEu2oOqm5rEDBrVnv+IRdxuEDLBGAFXYZlZHsjmIwMD/eEF04K6Fg0a
      312C5nwgiNq0/4XLkOd4WQKBgGwo33s5nD8XqLb3WJr8Olau4lmjhOAcINQYF2Zm
      sIr7Yf3XTj3PYWP/LufdLhOhZiV2B4e3zEbdbiu1tA2/vLWPNHCbPhK+2aTb2RVR
      IKUh1qDPN6qzX7dLfmlyP+Bk0tzmd7dUKRze50hGWsAtsg5YmlN2/nJoI+PkZA5o
      +FNVAoGANpVTogrAm1uUYQzGeZCM3N2SZwmEWhwRcZDa4Me2WaAPJ0GWjjenkHCB
      Bv1zzug8U4kzlIugMowA+SC7DLkc6d81Sx2iGH1ASkOw+xshJpZMpx9u4Cu8EpSK
      tMjlRQ76w+rxG81/8bUwncR3Y6GLASjuMZYF3a52amXTC4Qf+eE=
      -----END RSA PRIVATE KEY-----
    `.replace(/^[ \t\n]*/gm, ""),
    secret: `
      -----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzEmHXt1PR4N4nFMrmvl8
      jv8k1IfEPZsnXIDFNywE1yblxqQEhl9jn4Pqq7Ac8Fad8tloeanVYqJBqoqHaEDM
      qRNVmbB2u+UwDKui5tlyiP+WqZMP/FLgoHLThmlJUepLPGIIodi4xssByQWtDqYV
      iYccn91lHNpvxf5T4CItRY19Fo/3Ew4jD0rfNPx3yfjQEHh5enBkNVyHg4H9Dxyf
      VHMApefGcIUz5bq1TfMA0obWaB8dvn5nHntKb06E1ji1KVXHtYFh1/olJa6pwajD
      c70poixG32dAYuKthf70sqvJcdFqj9nikhRpWffLlilrvvYrcb5DJGMjvRbRTssC
      SwIDAQAB
      -----END PUBLIC KEY-----
    `.replace(/^[ \t\n]*/gm, "")
  },

  clientConfig: {
    // https://github.com/yahoo/fetchr
    fetchr: {
      xhrPath: "/api",
      xhrTimeout: 1000000,
      context: {},
      contextPicker: {
        GET: []
      }
    },

    fetchrCache: {
      max: 100,
      maxAge: ms("10m"),
      excludes: []
    }
  },

  agreed: {
    config: {
      axios: {
        baseURL: "http://localhost:3010/",
        timeout: 10000
      }
    }
  },

  multer: {
    dest: tmpDir
  },

  upload: {
    path: "/upload"
  }
};
