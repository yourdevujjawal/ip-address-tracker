const ipForm = document.getElementById("ipForm");
const ipField = document.getElementById("ipForm");
const searchIp = document.getElementById("search-ip");

let ip;
var mymap = L.map("mapid");

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoidWpqd2FsMjU4NTE4IiwiYSI6ImNrZ21oOG9jMDA2Zmoycm13bWc5ang4bWgifQ.UgdOFcrB0YKFcLC3HGn3LA",
  }
).addTo(mymap);

const initialURL = "https://api.ipify.org?format=json";

fetch(initialURL)
  .then((res) => res.json())
  .then((data) => getIP(data));

ipForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const ipValue = e.target.elements.ipField.value;
  const url1 = `https://geo.ipify.org/api/v1?apiKey=at_K26NxyPcEKgZngTl334sagNQ7NmCw&ipAddress=${ipValue}`;
  fetch(url1)
    .then((res) => res.json())
    .then((data) => getIP(data));
});

function getIP(json) {
  ip = json.ip;

  const url = `https://geo.ipify.org/api/v1?apiKey=at_K26NxyPcEKgZngTl334sagNQ7NmCw&ipAddress=${ip}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      refreshData(data);
    });
}

function refreshData(data) {
  const isp = data.isp;
  const timezone = data.location.timezone;
  const location = `${data.location.city}, ${data.location.country}`;
  const pincode = data.location.postalCode;

  document.querySelector(".ip-value").textContent = ip;
  document.querySelector(".location").textContent = location;
  document.querySelector(".pincode").textContent = pincode;
  document.querySelector(".timezone").textContent = timezone;
  document.querySelector(".isp").textContent = isp;

  mymap.setView([data.location.lat, data.location.lng], 13);

  L.marker([data.location.lat, data.location.lng]).addTo(mymap);
}
