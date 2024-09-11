const router = require("express").Router();
let SalePropertyDB = require("../models/SalePropertyDetail.models");

router.route("/").get((req, res) => {
  SalePropertyDB.find()
    .then((SaleProperty) => res.json(SaleProperty))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/property-details-sale/:id").get(async function (req, res) {
  const id = req.params.id;
  const property = await SalePropertyDB.findById(id);
  if (!property) {
    return res.json("Property not found :(").end();
  }
  return res.json(property).end();
});

module.exports = router;
