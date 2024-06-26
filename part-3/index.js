require('dotenv').config()
const express = require('express')
const PhoneBook = require('./models/phonebook')
const cors = require('cors')
var morgan = require('morgan')
const app = express()
app.use(express.static('dist'))
app.use(cors())
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

const requestLogger = (request, response, next) => {
console.log('Method:', request.method)
console.log('Path:  ', request.path)
console.log('Body:  ', request.body)
console.log('---')
next()
}
   
const errorHandler = (error, request, response, next) => {
     console.log(error.name , error.name === 'ValidationError')

     if (error.name === 'CastError') {
          return response.status(400).send({ error: 'malformatted id' })
     }else if (error.name === 'ValidationError') {
          console.log('====')
          return res.status(400).json({ error: error.message })
     }

     next(error)
}
   
app.use(express.json())
app.use(requestLogger)
   
const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
     response.send('<h1>Hello World!</h1>')
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
     PhoneBook.countDocuments({})
       .then(count => {
         response.send(`<h3>Phonebook has info for ${count} people.</h3></h3><p>${date}</p>`);
       })
       .catch(error => {
         console.error(error);
         response.status(500).send({ error: 'something went wrong' });
       });
   });

app.delete('/api/persons/:id', (request, response, next) => {
     PhoneBook.findByIdAndDelete(request.params.id)
     .then(result  => {
          response.status(204).end()
     })
     .catch(error => next(error))
});

app.post('/api/persons', (request, response, next) => {
     const body = request.body
     if(body.name === undefined || body.name.length < 3){
     return response.status(400).json({ error: 'name lenght must be grater than 3' })
     }
     const person = new PhoneBook({
     name: body.name,
     number: body.number
     })

     person.save()
     .then(savedPersoon => {
     response.json(savedPersoon)
     })
     .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
     const body = request.body
     const person = {
          name: body.name,
          number: body.number,
        }

     PhoneBook.findByIdAndUpdate(request.params.id, person, {new: true})
     .then(updatedPerson => {
          response.json(updatedPerson)
     })
     .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)