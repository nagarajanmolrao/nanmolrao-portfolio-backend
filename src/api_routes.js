const express = require("express");
const router = express.Router();
const Helper = require("./helper.js");

// Ding Dong API endpoint
router.get("/ding", (req, res) => {
  res.set("Content-Type", "text/html");
  res.status(200).send("<h1>Dong !!</h1>");
});

// Trailhead Certifications Endpoint
router.get("/sf-certifications", (req, res) => {
  console.log("/sf-certifications");
  res.set("Content-Type", "application/json");
  Helper.getSfCertications()
    .then((resVar) => {
      console.log("/sf-certifications: success");
      res.status(200).send(resVar);
    })
    .catch((err) => {
      console.log("/sf-certifications: error");
      console.error("Error fetching data:", err);
      res.status(500).send(err);
    });
});

// Trailhead Latest Badges Endpoint
router.get("/sf-latest-badges", (req, res) => {
  console.log("/sf-latest-badges");
  res.set("Content-Type", "application/json");
  let count = req.query.count ? req.query.count : 10;
  if (count > 50) {
    console.log("/sf-latest-badges: count: " + count + ": 400 - Bad request");
    res.status(400).send({ message: "Count should be less or equal to 50" });
  } else {
    console.log("/sf-latest-badges: count: " + count);
    Helper.getSfLatestBadges(count)
      .then((resVar) => {
        console.log("/sf-latest-badges: success");
        res.status(200).send(resVar);
      })
      .catch((err) => {
        console.log("/sf-latest-badges: error");
        console.log(JSON.stringify(err));
        console.error("Error fetching data:", err);
        res.status(500).send(err);
      });
  }
});

// Trailhead Latest SuperBadges Endpoint
router.get("/sf-super-badges", (req, res) => {
  console.log("/sf-super-badges");
  res.set("Content-Type", "application/json");
  let count = req.query.count ? req.query.count : 30;
  if (count > 50) {
    console.log("/sf-super-badges: count: " + count + ": 400 - Bad request");
    res.status(400).send({ message: "Count should be less or equal to 50" });
  } else {
    console.log("/sf-super-badges: count: " + count);
    Helper.getSfSuperBadges(count)
      .then((resVar) => {
        console.log("/sf-super-badges: success");
        res.status(200).send(resVar);
      })
      .catch((err) => {
        console.log("/sf-super-badges: error");
        console.log(JSON.stringify(err));
        console.error("Error fetching data:", err);
        res.status(500).send(err);
      });
  }
});

module.exports = router;
