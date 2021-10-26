const weatherForm = document.querySelector("form");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = document.getElementById("address").value;
  p1.textContent = "Loading...";
  p2.textContent = "";

  if (!searchValue) {
    return (p1.textContent = "address required");
  }

  fetch(`/weather?address=${searchValue}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        p1.textContent = "";
        return (p2.textContent = data.error);
      }
      const { location, forecast } = data;
      p1.textContent = location;
      p2.textContent = forecast;
      document.getElementById("address").value = "";
    });
  });
});
