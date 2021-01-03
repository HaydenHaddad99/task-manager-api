const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
})

//------------------------------------------exampe-------------------------------------

//const me = new User({
//    name: 'Hayden',
//    age: '39',
//    email: 'hayden.haddad@gmail.com',
//    password:'44415dddddEEddd'
//})

//me.save().then(() => {
//    console.log(me)
//}).catch((error) => {
//    console.log(error)
//    })
//----------------------------------------------End Example-----------------------


//const myTask = new Tasks({

//    description: 'Sleep for 60 minutes  ',
  

//})
//myTask.save().then(() => {

//    console.log(myTask)
//}).catch((error) => {
//    console.log(error)
//})