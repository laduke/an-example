'use strict'

const environment = (process.env.NODE_ENV)

const path = require('path')
const fastify = require('fastify')({ logger: { level: 'trace' } })

const os = require('os')
const { readFileSync } = require('node:fs')

let port = process.env.PORT || 3000

let tokenfile = process.env.TOKEN_FILE
let token

if (tokenfile) {
  try {
    token = readFileSync(tokenfile, 'utf8')
  } catch (e) {
    console.error(`
Could not read token file at ${tokenfile}, specified by the TOKEN_FILE environment variable.
Do you have permission? The correct path?

    `)
    process.exit(1)
  }
} else {
  if (os.type() === 'Darwin') tokenfile = os.homedir() + '/Library/Application\ Support/ZeroTier/authtoken.secret'
  if (os.type() === 'Linux') tokenfile = '/var/lib/zerotier-one/authtoken.secret'
  if (os.type() === 'Windows_NT') tokenfile = ''

  try {
    token = readFileSync(tokenfile, 'utf8')
  } catch (e) {
    console.error(`
Could not read token file at default location: ${tokenfile}.
Do you have permission?
You can alternatively use the TOKEN_FILE="path" environment var.
    `)
    process.exit(1)
  }
}

fastify.register(require('@fastify/http-proxy'), {
  upstream: 'http://localhost:9993',
  prefix: '/one',
  http2: false,
  replyOptions: {
    rewriteRequestHeaders: (_originalReq, headers) => ({ ...headers, 'X-ZT1-Auth': token })
  },
  preHandler: (_, __, done) => {
    // fake latency on api
    if (environment === 'development') { setTimeout(done, 1000) } else (done())
  }
})

fastify
  .register(require('@fastify/static'), {
    root: path.join(__dirname, '/public'),
    etag: environment !== 'development'
  })
  .listen({ port, host: '0.0.0.0' }, err => {
    if (err) throw err
  })

fastify.setNotFoundHandler((_, res) => {
  res.sendFile('index.html')
})
