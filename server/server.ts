import express = require('express')
import path = require('path')

const app = express()

app.get('/api/fonts', (req, res) => {
  res.set('content-type', 'application/json')
  res.sendFile(path.join(__dirname, 'fonts.json'))
})

app.listen(9000)
