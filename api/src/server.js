const express = require('express')
const app = express()
const cors = require('cors')

const routes = require('./routes/routes')

const port = 6666

app.use(cors())
app.use(express.json())
app.use("/", routes)

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})