const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://arkarshwebaw:${password}@cluster0.dthv9hx.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)

const phoneBook = new PhoneBook({
  name:  process.argv[3],
  number:  process.argv[4],
})

if(process.argv.length <= 3){
     PhoneBook.find({}).then(result => {
          console.log(`phonebook: `)
          result.forEach(phoneBook => {
            console.log(`${phoneBook.name} ${phoneBook.number}`)
          })
          mongoose.connection.close()
        })   
     // console.log("less than 3")
}else{
     phoneBook.save().then(result => {
          console.log('new phonebook saved!')
          // mongoose.connection.close()
        })
     
     PhoneBook.find({}).then(result => {
       result.forEach(phoneBook => {
         console.log(`added ${phoneBook.name} number ${phoneBook.number} to phonebook`)
         mongoose.connection.close()
       })
       
     })
     // console.log("greater than 3", process.argv.length)
}