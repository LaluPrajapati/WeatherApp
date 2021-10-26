const request = require("request");

const geocode = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1e8c2e284fb93f4d9c3d64f28ba800fc&query=${address}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { lat, lon, name } = response.body.location;
      callback(undefined, {
        latitude: lat,
        longitude: lon,
        location: name,
      });
    }
  });
};

module.exports = geocode;
