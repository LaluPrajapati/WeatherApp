const path = require("path");
const express = require("express");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 5000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../../frontend/build");
console.log(publicDirectoryPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render(path.resolve(__dirname, "../../frontend/build", "index.html"));
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide a address for weather",
    });
  }

  geocode(address, (error, geoData) => {
    if (error) {
      return res.send({ error });
    }
    res.send(geoData);
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
