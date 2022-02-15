const path = require('path')
const express = require('express')
const jsonServer = require('json-server')
const app = express()
const PORT = process.env.PORT || 3000

app.use('/api', jsonServer.router(path.join(__dirname, 'db.json')))
app.use(express.static(path.join(__dirname, 'build')))

app.get('/health', (req, res) => res.send('ok'))

app.get('/version', (req, res) => res.send('V1.1'))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
