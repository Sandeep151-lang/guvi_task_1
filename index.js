const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const app = express()

var indexRouter = require('./routes/userRoutes');

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = 5000
app.listen(PORT,()=>{
    console.log('server is running')
})


require('./routes/dbconn/conn')

app.use('/',(req,res)=>{
  res.send({message: 'res is working '})
})

// app.use('/',indexRouter)