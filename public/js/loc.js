var api = "http://127.0.0.1:5000/api/";
var datas;
var pos;
var ret;
function geoLocation() {
  navigator.geolocation.getCurrentPosition(sucLoc, errLoc);
}
function sucLoc(coords) {
  let coord = coords.coords;
  const geo = { lat: coord.latitude, long: coord.longitude };
  reverse("location", geo);
  setVal(".lon", geo.long);
  setVal(".lat", geo.lat);

  // if (ret) {
  //  clearInterval(ret);
  // }
}
function errLoc(err) {
  console.log(err);
  // if (!ret) Retry(geoLocation, 1000);
}
function setVal(cls, val) {
  document.querySelector(cls).value = val;
}

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
    .then((res) => {
      console.log(res);
      let add = res.data.addresses[0];
      datas = add.address;
      loadLoc(datas);
      //  console.log(datas);
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadLoc(data) {
  setVal(".addr", data.freeformAddress);
  setVal(".cit", data.municipality);
  // setVal(".ln", data.localName);
}

function Retry(req, interval) {
  ret = setInterval(req, interval);
}
