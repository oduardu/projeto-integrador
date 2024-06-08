const express = require('express')
const app = express()

const port = process.env.SERVER_PORT

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})