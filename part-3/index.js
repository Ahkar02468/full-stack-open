const express = require('express')
require('dotenv').config()
const PhoneBook = require('./models/phonebook')
const cors = require('cors')
var morgan = require('morgan')
const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan('tiny')

let persons = [
     
 ]

 app.use(morgan((tokens, req, res) => {
     return [
       tokens.method(req, res),
       tokens.url(req, res),
       tokens.status(req, res),
       tokens.res(req, res, 'content-length'), '-',
       tokens['response-time'](req, res), 'ms',
       JSON.stringify(req.body)
     ].join(' ')
   }))

//  const requestLogger = (request, response, next) => {
//      console.log('Method:', request.method)
//      console.log('Path:  ', request.path)
//      console.log('Body:  ', request.body)
//      console.log('---')
//      next()
//    }
   
   app.use(express.json())
//    app.use(requestLogger)
   
   const unknownEndpoint = (request, response) => {
     response.status(404).send({ error: 'unknown endpoint' })
   }

app.get('/', (request, response) => {
     res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
     PhoneBook.find({}).then(persons => {
          response.json(persons)
        })
})

app.get('/api/persons/:id', (request, response) => {
     PhoneBook.findById(request.params.id).then(person => {
          response.json(person)
        })
})

app.get('/info', (request, response) => {
     const date = new Date()
     res.send(`<h3>Phonebook has info for ${persons.length} people.</h3><p>${date}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
     const id = Number(request.params.id);
     persons = persons.filter(person => person.id !== id);
     response.status(204).end();
   });

const generateId = () => {
const min = 1000000000;
const max = 9999999999;
return Math.floor(Math.random() * (max - min + 1) + min);
};

app.post('/api/persons', (request, response) => {
     const body = request.body
     if(body.name === undefined){
     return response.status(400).json({ error: 'name missing' })
     }
     const person = new PhoneBook({
     name: body.name,
     number: body.number
     })

     person.save().then(savedPersoon => {
     response.json(savedPersoon)
     })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)