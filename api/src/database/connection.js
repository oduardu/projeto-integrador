const pgp = require("pg-promise")({})

const user = process.env.DATABASE_USER
const password = process.env.DATABASE_PASSWORD
const host = process.env.DATABASE_HOST
const port = process.env.DATABASE_PORT
const database = process.env.DATABASE_NAME
 
const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`)

module.exports = { db }