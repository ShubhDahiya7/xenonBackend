const router = require("express").Router();
let RentPropertyDB = require("../models/RentPropertyDetail.models");

router.route("/").get((req, res) => {
  RentPropertyDB.find()
    .then((RentProperty) => res.json(RentProperty))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/property-details-rent/:id").get(async function (req, res) {
  const id = req.params.id;
  const property = await RentPropertyDB.findById(id);
  if (!property) {
    return res.json("Property not found :(").end();
  }
  return res.json(property).end();
});

module.exports = router;
