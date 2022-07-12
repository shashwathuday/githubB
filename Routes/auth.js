/**
 * This route deals with authorization.
 * This route also saves the refresh token of the user in the DB.
 */

const express =  require('express')
const querystring = require('querystring');
const axios = require('axios');
const router =  express.Router()

let token = null;

const { db } = require('../Models/db');

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

/**
 * When pressed the login button or
 * When the user wants to view the main features of the application
*/
router.get('/login', function(req, res) {
    res.redirect('https://github.com/login/oauth/authorize?' +
    querystring.stringify({
      client_id: clientId,
      scope: 'repo,admin:org',
    }))
})


/**
 * When pressed the login button or
 * When the user wants to view the main features of the application
*/

router.get('/callback', function(req, res) {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code
  };
  const opts = { headers: { accept: 'application/json' } };
  axios.post(`https://github.com/login/oauth/access_token`, body, opts).
    then(res => res.data['access_token']).
    then(_token => {
      token = _token;
      console.log('My token:', token);
      let uri = process.env.MAIN_URI        //localhost or heroku
      res.redirect(uri + '?access_token='+token)
    }).
    catch(err => res.status(500).json({ message: err.message }));
})



module.exports = router
