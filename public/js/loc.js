var api = "http://127.0.0.1:5000/api/";
var datas;
var pos;
function geoLocation() {
  const loc = navigator.geolocation.getCurrentPosition(
    (coords) => {
      let coord = coords.coords;
      const geo = { lat: coord.latitude, long: coord.longitude };
      reverse("location", geo);
      setVal(".lon", geo.long);
      setVal(".lat", geo.lat);
      loadLoc(datas);
    },
    (err) => {
      console.log(err);
    }
  );

  return loc;
}
function setVal(cls, val) {
  document.querySelector(cls).value = val;
}
function cb(data) {}
function reverse(url, data) {
  url = api + url;

  fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      datas = data;
      // return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadLoc(data) {
  setVal(".addr", data.freeformAddress);
  setVal(".cit", data.municipality);
  setVal(".ln", data.localName);
}
