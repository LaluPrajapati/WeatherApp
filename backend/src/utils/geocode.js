const request = require("request");

const geocode = (address, callback) => {
  // const url = `http://api.weatherstack.com/current?access_key=1e8c2e284fb93f4d9c3d64f28ba800fc&query=${address}`;
  const url = `https://api.weatherapi.com/v1/current.json?key=39a4a19b649e4290885103555210512&q=${address}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      // const { lat, lon, name, country, region } = response.body.location;
      // callback(undefined, {
      //   latitude: lat,
      //   longitude: lon,
      //   location: `${name}, ${region}, ${country}`,
      // });
      callback(undefined, response.body);
    }
  });
};

module.exports = geocode;
