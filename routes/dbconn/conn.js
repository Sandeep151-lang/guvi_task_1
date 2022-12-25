const mongoose = require('mongoose')

//var mongoose.connect(`mongodb+srv://nandan:nandan>@cluster0.bzv5woc.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true }).then(console.log('connection successfull')).catch((error) => console.log('error'))
//const url=`mongodb+srv://nandan:nandan>@cluster0.bzv5woc.mongodb.net/?retryWrites=true&w=majority`
var url = `mongodb+srv://sand:sand@cluster0.l7bit.mongodb.net/test`
const dbs = mongoose.connect(url, { useNewUrlParser: true }).then(console.log('connection successfull')).catch((error) => console.log('error'));

module.exports=dbs