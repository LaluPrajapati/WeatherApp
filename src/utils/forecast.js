const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1e8c2e284fb93f4d9c3d64f28ba800fc&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { weather_descriptions, temperature, precip } =
        response.body.current;
      callback(
        undefined,
        weather_descriptions +
          ". It is currently " +
          temperature +
          " degress out. There is a " +
          precip +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
