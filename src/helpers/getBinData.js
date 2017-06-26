var getFootballData = {};

var rp = require('request-promise');

getFootballData.query = function(apiKey,query,teamID) {
	var thisPath = "/v1/" + query
	if(teamID != 0) {
		thisPath = thisPath.replace('@@',teamID);
	}
	console.log(thisPath);
	var options = {
		uri: 'https://api.football-data.org'+thisPath,
		method: 'GET',
		headers: {
			'X-Auth-Token': apiKey
		},
	};

	return rp(options);

}

module.exports = getFootballData;