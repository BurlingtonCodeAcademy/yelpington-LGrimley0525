const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8080

app.use(express.static('.'))

app.get('/yelp/:id', (req, res) => {
    //fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
    res.sendFile(path.resolve('yelp.html'))
})

app.listen(port, () => console.log(`Running on port: ${port}!`))