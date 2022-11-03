const FacilityControllers = require("../controllers/facilities.controller")

module.exports = (app) => {
	app.get("/api/facilities", FacilityControllers.getAllFacilities)
	app.get("/api/facilities/:id", FacilityControllers.getFacility)
	app.get(
		"/api/facilities/:lat/:long/:radius",
		FacilityControllers.getFacilityRadius
	)
}
