const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan('tiny')

let persons = [
     { 
       "id": 1,
       "name": "Arto Hellas", 
       "number": "040-123456"
     },
     { 
       "id": 2,
       "name": "Ada Lovelace", 
       "number": "39-44-5323523"
     },
     { 
       "id": 3,
       "name": "Dan Abramov", 
       "number": "12-43-234345"
     },
     { 
       "id": 4,
       "name": "Mary Poppendieck", 
       "number": "39-23-6423122"
     },
     {
          "id": 5,
          "name": "Mary update backened Poppendieck", 
          "number": "5151653122"
     },
     {
          "id": 6,
          "name": "After deploy on render cloud and make changes from local", 
          "number": "1651684"
     }
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

app.get('/', (req, res) => {
     res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
     res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
     const id = Number(req.params.id)
     const person = persons.find(person => {
          return person.id === id
     })
     if(person){
          res.json(person)
     }else{
          res.status(404).end()
     }
})

app.get('/info', (req, res) => {
     const date = new Date()
     res.send(`<h3>Phonebook has info for ${persons.length} people.</h3><p>${date}</p>`)
})

app.delete('/api/persons/:id', (req, res) => {
     const id = Number(req.params.id);
     persons = persons.filter(person => person.id !== id);
     res.status(204).end();
   });

const generateId = () => {
const min = 1000000000;
const max = 9999999999;
return Math.floor(Math.random() * (max - min + 1) + min);
};

app.post('/api/persons', (req, res) => {
     const body = req.body
     if(!body.number || !body.name){
          return res.status(400).json({
               error: ' name or number is missing...'
          })
     }

     const isSamePerson = persons.find(person => {
          return person.name === body.name
     })
     if(isSamePerson){
          return res.status(400).json({
               error: 'name must be unique'
          })
     }

     const person = {
          id: generateId(),
          name: body.name,
          number: body.number
     }
     // console.log(body)
     persons = persons.concat(person)
     res.json(person)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3002
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)