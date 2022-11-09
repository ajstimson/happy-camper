const mongoose = require("mongoose")

const FacilitySchema = new mongoose.Schema({
	Enabled: Boolean,
	FacilityAdaAccess: String,
	FacilityDescription: String,
	FacilityDirections: String,
	FacilityEmail: String,
	FacilityID: Number,
	FacilityLatitude: Number,
	FacilityLongitude: Number,
	FacilityMapURL: String,
	FacilityName: String,
	FacilityPhone: String,
	FacilityReservationURL: String,
	FacilityTypeDescription: String,
	FacilityUseFeeDescription: String,
	GEOJSON: {
		COORDINATES: Array,
		TYPE: String,
	},
	Keywords: String,
	LastUpdatedDate: String,
	LegacyFacilityID: Number,
	OrgFacilityID: String,
	ParentOrgID: Number,
	ParentRecAreaID: Number,
	Reservable: Boolean,
	StayLimit: String,
})

const Facility = mongoose.model("Facility", FacilitySchema)

module.exports = Facility

