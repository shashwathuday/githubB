/**
 * This route doesn't interact with the database.
 * This only calls the spotify API to get basic user info like profile, topArtists, topTracks and recentlyPlayed.
 */

const express = require('express')
const router = express.Router()
const { github } = require('../Models/github')
// const { getStats } = require('../Models/stats')

/**
 * Fetches user profile
 */
router.get('/', async (req, res) => {
  try{
    const access_token = req.token;
    const user = await github.getUserProfile(access_token)
    return res.status(200).json({
      success: true,
      message: "Data successfully Fetched",
      data: user
    });
  }catch(err){
    console.log(err.stack);
    return res.status(401).json({
      success: false,
      message: "Failed to fetch data",
      data: null
    });
  }
})


/**
 * Fetches user orgs
 */
 router.get('/orgs', async (req, res) => {
  try{
    const access_token = req.token;
    const raw_orgs_data = await github.getUserOrgs(access_token)
    const orgs = []
    for(let i = 0; i < raw_orgs_data.length; i++){
      let org_data = raw_orgs_data[i];
      let org_name = org_data.login;
      let org = await github.getPublicOrg(access_token, org_name);
      orgs.push(org)
    }
    return res.status(200).json({
      success: true,
      message: "Data successfully Fetched",
      data: orgs
    });
  }catch(err){
    console.log(err.stack);
    return res.status(401).json({
      success: false,
      message: "Failed to fetch data",
      data: null
    });
  }
})

/**
 * Fetches user repos
 */
 router.get('/repos', async (req, res) => {
  try{
    const access_token = req.token;
    const repos = await github.getUserRepos(access_token)
    return res.status(200).json({
      success: true,
      message: "Data successfully Fetched",
      data: repos
    });
  }catch(err){
    console.log(err.stack);
    return res.status(401).json({
      success: false,
      message: "Failed to fetch data",
      data: null
    });
  }
})


/**
 * Fetches user repos
 */
 router.get('/watchlist', async (req, res) => {
  try{
    const access_token = req.token;
    const watchlist = await github.getUserWatchlist(access_token)
    return res.status(200).json({
      success: true,
      message: "Data successfully Fetched",
      data: watchlist
    });
  }catch(err){
    console.log(err.stack);
    return res.status(401).json({
      success: false,
      message: "Failed to fetch data",
      data: null
    });
  }
})


module.exports = router
