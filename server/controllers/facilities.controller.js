const Facility = require("../models/facilities.model")

module.exports = {
	getAllFacilities: async (req, res) => {
		try {
			const facilities = await Facility.find()
			console.log("facilities", facilities)
			res.json(facilities)
		} catch (err) {
			res.status(400).json(err)
		}
	},
	getFacility: async (req, res) => {
		try {
			const facility = await Facility.findById(req.params.id)
			res.json(facility)
		} catch (err) {
			res.status(400).json(err)
		}
	},
	//Find a facility radius latitude and longitude
	getFacilityRadius: async (req, res) => {
		console.log("req.params", req.params)
		const centerPoint = {
			lat: req.params.lat,
			lng: req.params.long,
		}
		const radius = parseInt(req.params.radius) * 1.6

		try {
			const facilities = await Facility.find()
			// map through the facilities and return the ones that are within the radius
			const facilitiesWithinRadius = facilities
				.map((facility) => {
					const checkPoint = {
						lat: facility.FacilityLatitude,
						lng: facility.FacilityLongitude,
					}
					const within = withinRadius(checkPoint, centerPoint, radius)
					if (within) {
						return facility
					}
				})
				.filter((n) => n)

			res.json(facilitiesWithinRadius)
		} catch (err) {
			res.status(400).json(err)
		}
	},
}

const withinRadius = (checkPoint, centerPoint, radius) => {
	var ky = 40000 / 360
	var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky
	var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx
	var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky
	return Math.sqrt(dx * dx + dy * dy) <= radius
}
