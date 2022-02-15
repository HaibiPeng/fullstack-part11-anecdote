const path = require('path')
const express = require('express')
const anecdotes = require('./db.json')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'build')))

app.get('/health', (req, res) => res.send('ok'))

app.get('/version', (req, res) => res.send('V1.1'))

app.get('/anecdotes', (req, res) => {
  res.send(anecdotes)
})

app.post('/anecdotes', (req, res) => {
  try {
    const newAnecdote = { ...req.body, id: req.body.content }
    anecdotes.push(newAnecdote)
    res.send(newAnecdote)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.use(express.static('build'))

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
