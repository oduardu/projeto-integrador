const express = require('express')
const app = express()

const routes = require('./routes/routes')

const port = process.env.SERVER_PORT

app.use(express.json())
app.use("/", routes)

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})