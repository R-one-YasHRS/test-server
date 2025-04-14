const express = require('express')
const cors = require('cors')

//user defined modules
const authorization = require('./routes/authorization')
const bookingRouter = require('./routes/booking')
const categoryRouter = require('./routes/category')
const userRouter = require('./routes/user')

//creating the express object
const app = express()

//add the middlewares
app.use(cors())
app.use(express.static('images'))
app.use(express.json())
app.use(authorization)

app.use('/blogs', blogsRouter)
app.use('/category', categoryRouter)
app.use('/user', userRouter)

//startig the server at port 4000
app.listen(4000, 'localhost', () => {
  console.log('server started at port 4000')
})
