const weatherForm = document.querySelector("form");
const searchTerm = document.querySelector("input");
const forecast = document.querySelector("#forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchTerm.value;
  forecast.textContent = "LOADING...";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (forecast.textContent = data.error);
        }
        forecast.textContent = data.forecast;
      });
    }
  );
});
