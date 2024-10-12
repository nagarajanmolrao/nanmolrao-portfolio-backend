const request_data = require("../helping_data.json");

function getSfCertications() {
  let reqOptions = {
    method: "POST",
    body: JSON.stringify(request_data["SfCerticationsRequestBody"]),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(request_data["trailhead_post_url"], reqOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response was not OK");
      }
      return response.json();
    })
    .then((data) => {
      let resVar = data["data"]["profile"]["credential"]["certifications"];
      resVar.forEach((eachCert) => {
        delete eachCert["cta"];
        delete eachCert["product"];
        eachCert["status"] = eachCert["status"]["title"];
      });
      return resVar;
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      throw err;
    });
}

function getSfLatestBadges(count = 10) {
  request_data["SfLatestBadgesRequestBody"]["variables"]["count"] =
    Number(count);
  let reqOptions = {
    method: "POST",
    body: JSON.stringify(request_data["SfLatestBadgesRequestBody"]),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(request_data["trailhead_post_url"], reqOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response was not OK");
      }
      return response.json();
    })
    .then((data) => {
      let resVar = data["data"]["profile"];
      let tempBadges = [];
      resVar["earnedAwards"]["edges"].forEach((eachBadge) => {
        if (eachBadge["node"]["award"] != null) {
          tempBadges.push(eachBadge);
        }
      });
      resVar = tempBadges;
      return resVar;
    })
    .catch((err) => {
      throw err;
    });
}

function getSfSuperBadges(count = 30) {
  request_data["SfSuperbadgesRequestBody"]["variables"]["count"] =
    Number(count);
  let reqOptions = {
    method: "POST",
    body: JSON.stringify(request_data["SfSuperbadgesRequestBody"]),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(request_data["trailhead_post_url"], reqOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response was not OK");
      }
      return response.json();
    })
    .then((data) => {
      let resVar = data["data"]["profile"];
      let tempBadges = [];
      resVar["earnedAwards"]["edges"].forEach((eachBadge) => {
        if (eachBadge["node"]["award"] != null) {
          tempBadges.push(eachBadge);
        }
      });
      resVar = tempBadges;
      return resVar;
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = { getSfCertications, getSfLatestBadges, getSfSuperBadges };
