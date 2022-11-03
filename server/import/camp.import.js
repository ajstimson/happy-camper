var request = require("request"),
	JSONStream = require("JSONStream"),
	es = require("event-stream")

request({ url: "//readfrom/Campsites_API_v1.json", json: true })
	.pipe(JSONStream.parse("rows.*"))
	.pipe(
		es.mapSync(function (data) {
			console.error(data)
			return data
		})
	)
