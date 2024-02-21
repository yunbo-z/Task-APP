//CRUD create read update delete

//initialize the connection
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

// using distructure, grab xxx from object mongodb
const { MongoClient, ObjectID } = require('mongodb')


const connectionURL = 'mongodb://root:your_own_password@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.3'

const client = new MongoClient(connectionURL)

async function main() {
    //use connect method to connect to the server
    // await client.connect();

    const db = client.db('task-manager')
    const collectionName = db.collection('users')

    // find document
    const filter = { age: 23 }
    // Set the upsert option to insert a document if no documents match the filter
    // const options = { upsert: true }
    // const updateDoc = {
    //     $set: {
    //         plot: `A harvest of random numbers, such as: ${Math.random()}`
    //     }
    // }
    const result = await collectionName.deleteOne(filter)

    console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );

    //for await...of syntax: iterate through results rather than returning all documents at once.
    // for await (const doc of users) {
    //     console.dir(doc)
    // }

    // all documents matched by a query to be held in memory at the same time
    // console.log(await users.toArray())
}

main()
    .then(console.log)
    .catch(console.dir)
    .finally(() => client.close());
