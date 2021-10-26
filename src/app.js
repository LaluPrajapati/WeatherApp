const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Lalu Prajapati",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Lalu Prajapati",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Need help",
    name: "Lalu prajapati",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    errorMessage: "Help article not found",
  });
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
    const { latitude, longitude, location } = geoData;
    forecast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forcastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
