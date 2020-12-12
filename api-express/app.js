const express = require('express')
const app = express()
var cors = require('cors')

const port = process.env.PORT || 3000

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.use(express.json());
app.use(cors())

//Null get response
app.get('/', (req, res) => {
  res.send('n/a')
})

app.post('/', (req,res) => {

  //Create each element of string
  let decafString = (req.body.decaf) ? (req.body.decaf + ' ') : ''
  let drinkString = (req.body.drink) ? (req.body.drink + ', ') : ''
  let customString = (req.body.custom) ? (req.body.custom + ', ') : ''
  let shotString = (req.body.shots) ? (req.body.shots + ' shots, ') : ''
  let milkString = (req.body.milk) ? (req.body.milk + ' milk, ') : ''
  let syrupString = (req.body.syrup) ? (req.body.syrup + ' syrup') : ''

  //Concatenate strings into one
  let textString = decafString
  + drinkString
  + customString
  + shotString
  + milkString
  + syrupString

  let phoneNumber = '+' + req.body.phone
 
  //Send message using Twilio
  client.messages
    .create({
      body: textString,
      from: '+12184384163',
      to: phoneNumber
    })
    .then(message => console.log(message.sid));
    
  res.send(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})