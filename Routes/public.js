/**
 * This route doesn't interact with the database.
 * This route contains the open-source repo type calls
 */

const express = require('express')
const router = express.Router()
const { github } = require('../Models/github')
const { getCommitsStats } = require('../Models/compute')
const { db } = require('../Models/db')


/**
* Fetches all public orgs
*/
router.get('/orgs', async (req, res) => {
  try{
    const access_token = req.token;
    const orgs = await github.getPublicOrgs(access_token)
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
* Fetches the specified org
*/
  router.get('/orgs/:org_name', async (req, res) => {
  try{
    const access_token = req.token;
    const org_name = req.params.org_name
    const org = await github.getPublicOrg(access_token, org_name)
    return res.status(200).json({
      success: true,
      message: "Data successfully Fetched",
      data: org
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
* Fetches the specified org's stats
*/
    router.get('/orgs/:org_name/stats', async (req, res) => {
    try{
      const access_token = req.token;
      const org_name = req.params.org_name
      //Change this to fetch and update the github database
      // const commits = await github.getPublicOrgPushEvents(access_token, org_name)
      let commits = await db.getOrgCommits(org_name)
      if(commits.length < 1){
        commits = await github.getPublicOrgPushEvents(access_token, org_name)
      }
      const stats = await getCommitsStats(commits)
      return res.status(200).json({
        success: true,
        message: "Data successfully Fetched",
        data: stats
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
