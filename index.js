const path = require('path')
const express = require('express')
const anecdotes = require('./db.json')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'build')))

app.get('/health', (req, res) => res.send('ok'))

app.get('/version', (req, res) => res.send('V1.1'))

app.get('/anecdotes', (req, res) => {
  res.send(anecdotes) // change this string to ensure a new version deployed
})

app.post('/anecdotes', (req, res) => {
  try {
    const newAnecdote = { ...req.body, id: uuid.v1() }
    anecdotes.push(newAnecdote)
    res.send(newAnecdote)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.put('/anecdotes/:id', (req, res) => {
  try {
    const idx = anecdotes.findIndex((obj => obj.id === req.params.id))
    anecdotes[idx].votes += 1
    res.send(anecdotes[idx])
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})