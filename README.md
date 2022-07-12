# Github-Leaderboard

https://githubtrackr.herokuapp.com/

1. Add a list of orgs/repositories to your watch list. (We push this to database)
2. Cron task watches these repositories for new events and updates the github stats on these repositories.
3. Add a button next to user repos/orgs and add a watch button.
4. Once you start watching, you can access the leaderboards for the following github repositories.


Cache:

Save the last call for the repo/org on the browser local storage. If the call is less than 10 mins old then just call the data from session storage


Key Point

This only accounts for contributions that end up in mainline after code review.
