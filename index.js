const express = require('express')
const app = express()
const createCustomerRoute = require('./routers/create-customer')

const port = 3000
app.use(express.json())
app.use(createCustomerRoute)


app.listen(port , ()=>{
    console.log('Server is up on port ' + port)
})