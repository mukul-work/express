document.addEventListener("DOMContentLoaded", function() {
  var h1 = document.querySelector("h1");
  var cityInput = document.querySelector("input[name='city']");

  document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    var cityName = cityInput.value.trim();
    h1.textContent = "Loading...";

    fetch("/weather?city=" + cityName)
      .then(function(res) { return res.json(); })
      .then(function(data) {
        h1.innerHTML = "It is " + data.temperature + "&#176; in " + cityName + ".";
      })
      .catch(function() {
        h1.textContent = "Error!";
      });
  });
});