const moment = require('moment');

// Mongo Imports
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

/**
 * Put all recent events into the org_events for the specific org
 * @param {String} access_token 
 * @param {Array} commits 
 * @returns null
 */
const putOrgCommits = async(commits, org_name) => {
    const url = process.env.MONGO_URI;
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try{
        const dbName = "Orgs";
        const collectionName = org_name + "-commits";

        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collectionName);
        //To prevent duplicates while inserting in 1 insert
        await col.createIndex( { "created_at": 1 }, { unique: true } )
        await col.insertMany(commits,{ordered: false})
        return;
    } catch (err) {
        
        if( err && err.code === 11000 ) {
            return;
        }
        else{
            console.log(err.stack);
        }

    } finally {
        await client.close();
    }

} 

/**
 * Get all recent events into the org_events for the specific org
 * @param {Date} start 
 * @param {Date} end 
 * 
 * Currently timezone agnostic
 */
const getOrgCommits = async(org_name) => {

    const url = process.env.MONGO_URI;
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try{
        const dbName = "Orgs";
        const collectionName = org_name + "-commits";

        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collectionName);
        const events = [];
        await col.find().forEach(event => events.push(event));
        return events;
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}


// const getUserWatchlist = async(access_token) => {

//     const url = process.env.MONGO_URI;
//     const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

//     try{

//         const user = await github.getUserProfile(access_token);
//         const user_id = user.login;

//         const dbName = "Watchlist";
//         const collectionName = user_id;

//         await client.connect();
//         const db = client.db(dbName);
//         const col = db.collection(collectionName);

//         const watchlist = [];
//         await col.find().forEach(user_token => user_tokens.push(user_token))
//         return watchlist;

//     }catch(err) {
//         console.log(err.stack);
//     } finally {
//         await client.close();
//     }

// }


//  const putUserWatchlist = async(access_token, org_name) => {

//     const url = process.env.MONGO_URI;
//     const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

//     try{

//         const user = await github.getUserProfile(access_token);
//         const user_id = user.login;

//         const dbName = "Watchlist";
//         const collectionName = user_id;

//         await client.connect();
//         const db = client.db(dbName);
//         const col = db.collection(collectionName);

//         const Watchlist = [];
//         await col.find({track_history: true}).forEach(user_token => user_tokens.push(user_token))
//         return user_tokens;

//     }catch(err) {
//         console.log(err.stack);
//     } finally {
//         await client.close();
//     }

// }


const db = {
    putOrgCommits,
    getOrgCommits,
}

module.exports = {db};