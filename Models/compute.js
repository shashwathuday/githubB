const axios = require("axios");

/**
 * Update DB
 * @param {array} commits
 * @returns
 */
const getCommitsStats = async (commits) => {
  const contributions = {};

  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    const author = commit["author"];
    const stats = commit.stats;


    if (contributions.hasOwnProperty(author)) {
      contributions[author].additions += stats.additions;
      contributions[author].deletions += stats.deletions;
      contributions[author].total += stats.total;
    } else {
      contributions[author] = stats;
    }
  }

  const contributors = []

  const authors = Object.keys(contributions)
  for(let i = 0; i < authors.length; i++){
    let author = authors[i];
    let stats = contributions[author];
    contributors.push({author, stats})
  }

  return contributors;
}

module.exports = { getCommitsStats };
