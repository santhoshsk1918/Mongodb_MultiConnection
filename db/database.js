let connection = require("./connection");

module.exports.findvalues = async (databaseName, collectionName, query, projection, limit = 20, skip = 0) => {
    //Open and get connection to collection
    let { collection, client } = await connection.getConnection(databaseName, collectionName);
    let results = await collection.find(query, projection).skip(parseInt(skip)).limit(parseInt(limit)).toArray();
    //Close collection
    await connection.closeConnection(client);
    return results;
}

module.exports.findvalue = async (databaseName, collectionName, query, projection) => {
    //Open and get connection to collection
    let { collection, client } = await connection.getConnection(databaseName, collectionName);
    let results = await collection.findOne(query, projection).toJSON();
    //Close collection
    connection.closeConnection(client);
    return results;
}


module.exports.insertvalues = async (databaseName, collectionName, values) => {
    //Open and get connection to collection
    let { collection, client } = await connection.getConnection(databaseName, collectionName);
    let results = await collection.insertMany(Array.isArray(values) ? values : [values]);
    //Close collection
    connection.closeConnection(client);
    return results;
}

// Connectionpool
// TLS 