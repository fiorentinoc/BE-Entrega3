const express = require('express')
const app = express()

/* app.get('/', function(req, res) {
    res.send('Hola mundo')
}) */

app.get('/productos', (req, res) => {
    res.send('productos')
})

app.get('/productoRandom', (req, res) => {
    res.send('random')
})

const PORT = 8080
app.listen(PORT, console.log(`Listening on port ${PORT}` ))