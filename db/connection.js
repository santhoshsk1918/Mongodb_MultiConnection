require('dotenv').config();
const { MongoClient } = require('mongodb');
const connectionString = process.env.MONGODB_URL;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let connected = false;

module.exports.createConnection = async () => {
    try{
        if(connected) {
            return;
        } else {
            console.log("Connection");
            connection = await client.connect();
            connected = true;
            return;
        }
    } catch (err) {
        console.error("Error in connecting to db", err);
    }
}

module.exports.getConnection = async (database, collectionName) => {
    // await client.connect(); //TLS Handshake
    await this.createConnection();
    const db = client.db(database);
    
    return { collection: db.collection(collectionName), client };
};

module.exports.closeConnection = async (currentClient) => {
    // currentClient.close();
    console.log("Closing Connection")
    client.close();
    return;
}