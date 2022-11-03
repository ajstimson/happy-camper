const path = require("path")
const { chain } = require("stream-chain")
const { parser } = require("stream-json")
const { streamValues } = require("stream-json/streamers/StreamValues")
const { streamObject } = require("stream-json/streamers/StreamObject")
const { pick } = require("stream-json/filters/Pick")
const fs = require("fs")
const zlib = require("zlib")
const NodeGeocoder = require("node-geocoder")
require("dotenv").config({ path: "../.env" })

const options = {
	provider: "google",
	apiKey: process.env.GOOGLE_MAPS_API_KEY,
}

const geocoder = NodeGeocoder(options)

const file = fs.createReadStream(
	path.resolve(__dirname, "Campsites_API_v1.json.gz")
)

let count = 0
const pipeline = chain([
	file,
	zlib.createGunzip(),
	parser({ jsonStreaming: true }),
	pick({ filter: "RECDATA" }),
	streamValues(),
	(data) => {
		Object.entries(data.value).forEach(([key, value]) => {
			console.log(key, value)
		})
		return data
		// 	console.log(data)

		//avoid rate limit
		// await new Promise((resolve) => setTimeout(resolve, 1000))

		// const value = data.value
		// console.log(value)
		// const lat = data.CampsiteLatitude
		// const long = data.CampsiteLongitude
		// console.log({ lat: lat, lon: long })
		// const res = await geocoder.reverse({ lat: lat, lon: long })

		// console.log(res)
		// keep data only for the accounting department
	},
])

// let objectCounter = 0
// pipeline.on("data", () => ++objectCounter)
// pipeline.on("end", console.log(`Found ${objectCounter} objects.`))

let counter = 0
pipeline.on("data", () => ++counter)
pipeline.on("end", () => console.log(`Processed ${counter} rows.`))
