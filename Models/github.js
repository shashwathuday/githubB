const axios = require('axios');

const {db} = require('./db')
const {getCommits} = require('./filter')

/**
 * 
 * @param {string} access_token 
 * @returns The basic profile of the current user
 */
const getUserProfile = async (access_token) => {
  const url = "https://api.github.com/user"
  const response = await axios.get(url, {
    headers: {
        authorization: "token " + access_token
    }
  });
  return response.data
}

/**
 * 
 * @param {string} access_token 
 * @returns The orgs that the user is part of
 */
 const getUserOrgs = async (access_token) => {
  // const user = await getUserProfile(access_token);
  // const username = user.login;
  const url = "https://api.github.com/user/orgs";
  const response = await axios.get(url, {
    headers: {
        authorization: "token " + access_token
    }
  });
  return response.data
}

/**
 * 
 * @param {string} access_token 
 * @returns The repos that the user has
 */
 const getUserRepos = async (access_token) => {
  // const user = await getUserProfile(access_token);
  // const username = user.login;
  const url = "https://api.github.com/user/repos";
  const response = await axios.get(url, {
    headers: {
        authorization: "token " + access_token
    }
  });
  return response.data
}


/**
 * 
 * @param {string} access_token 
 * @returns All public orgs
 */
 const getPublicOrgs = async (access_token) => {
  const url = "https://api.github.com/organizations"
  const response = await axios.get(url, {
    headers: {
        authorization: "token " + access_token
    }
  });
  return response.data
}


/**
 * 
 * @param {string} access_token 
 * @returns The repos that the user has
 */
 const getUserWatchlist = async (access_token) => {
  const user = await getUserProfile(access_token);
  const username = user.login;
  const url = "https://api.github.com/users/" + username + "/subscriptions"
  const response = await axios.get(url, {
    headers: {
        authorization: "token " + access_token
    }
  });
  return response.data
}




/**
 * 
 * @param {string} access_token 
 * @param {string} org_name
 * @returns The basic profile of the org
 */
 const getPublicOrg = async (access_token, org_name) => {
  const url = "https://api.github.com/orgs/" + org_name;
  const response = await axios.get(url, {
    headers: {
        authorization: "token " + access_token
    }
  });
  return response.data
}


/**
 * 
 * @param {string} access_token 
 * @param {string} org_name
 * @returns The basic profile of the org
 */
 const getPublicOrgPushEvents = async (access_token, org_name) => {

  let events = []

  for(let page = 1; page <= 3; page++){
    
    const url = "https://api.github.com/orgs/" + org_name + "/events" + "?per_page=100&page="+page;
    const response = await axios.get(url, {
      headers: {
          authorization: "token " + access_token
      }
    });

    if(response.data){ 
      for(let i = 0; i < response.data.length; i++){
        let event = response.data[i];
        if(event.type == "PushEvent"){
          let commits = await getCommits(access_token, event);
          events.push(...commits);
        }
      }
    }

  }

  db.putOrgCommits(events, org_name);
  return events
}


const github = {
  getUserProfile,
  getUserOrgs,
  getUserRepos,
  getPublicOrgs,
  getPublicOrg,
  getPublicOrgPushEvents,
  getUserWatchlist
}

module.exports = { github }
