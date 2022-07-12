/**
 * Contains functions that filter unecessary data to prevent space wastage.
 */
const moment = require('moment');
const axios = require('axios');

const getCommits = async (access_token, event) => {

    const commits = []
    
    let total = event.payload.commits.length

    const urls = [] 

    for(let i = 0; i < total; i++){
        let url = event.payload.commits[i].url;
        urls.push(url)
    }

    for(let i = 0; i < urls.length; i++){
        const response = await axios.get(urls[i], {
            headers: {
                authorization: "token " + access_token
            }
        });
        const data = response.data;
        
        const stats = data.stats;
        const message = data.commit.message;
        const author = data.commit.author.name;
        const created_at = data.commit.author.date;

        const schema = {
            "author": author, 
            "stats": stats,
            "message": message,
            "created_at": new Date(moment(created_at).utc())
        }

        commits.push(schema)
    }

    return commits;
    
}

module.exports = {getCommits}