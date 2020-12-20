const mongodb = require('mongodb')
//const MongoClient = mongodb.MongoClient

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = process.env.CONNECTION_URL
const databaseName = process.env.DATABASE_NAME

MongoClient.connect(connectionURL, { useNewUrlParser: true }, { useUnifiedTopology: true }, (error, client) => {

    if (error) {

        return console.log('unable to connect to the database')
    }

    const db = client.db(databaseName)

    //--------Fetch-----------------------------
    //db.collection('tasks').findOne({ _id: new ObjectID("5f8f269d61ab77186c2f1205") },(error, task) => {
    //        if(error) {
    //            return console.log('Unable to fetch')

    //        }

    //    console.log(task)
    //    })

    db.collection('tasks').find({ completed: true }).toArray((error, tasks) => {

        console.log(tasks)

    })

    //--------------------------------------------------------insert one doc--------------------------------------------
    //db.collection('users').insertOne({
    //    name: 'Hayden',
    //    age: 39
    //}, (error, results) => {

    //    if (error) {
    //        return console.log('Unable to insert document!')
    //    }

    //    console.log(results.ops)

    //    })
    ////----------------------------------------------------use insert Many --------------------------------------
    //db.collection('users').insertMany([
    //    {
    //        name: 'Saari',
    //        age: 9
    //    }, {
    //        name: 'Melek',
    //        age: 14
    //    }
    //]), (error, results) => {

    //    if (error) {
    //        return console.log('unable to insert documents!')
    //    }

    //    console.log(results.ops)

    //}

    //    db.collection('tasks').insertMany([
    //    {
    //        description: 'watch Udemy class',
    //        completed: true
    //    }, {
    //            description: 'Go vote',
    //            completed: true
    //        }, {
    //            description: 'Read 10 minutes',
    //            completed: false
    //        }
    //]), (error, results) => {

    //    if (error) {
    //        return console.log('unable to insert documents!')
    //    }

    //    console.log(results.ops)

    //}

    //-------------------------------  UPDATE ------------------------------------------------------------

    //db.collection('tasks').updateMany(
    //    { completed: false }, {
    //    $set: {completed:true}
    //}).then((result) => {
    //    console.log(result.modifiedCount)
    //    }).catch((error) => {
    //        console.log(error)
    //    })

    //------------------------delete -------------------------------------

    //    db.collection('users').deleteMany({
    //        age: "39"
    //    }).then((result) => {

    //        console.log(result)
    //        }).catch((error) => {

    //            console.log(error)
    //        })
    //})
    //----------------------Delete one --------------------
    db.collection('users').deleteOne({

        _id: new ObjectID("5f8f253ed5c547522c8340ec")
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})