const getLocation = async () => {
  const coord = navigator.geolocation.getCurrentPosition(
    (coords) => {
      console.log(coords);
      return coords.coord;
    },
    (err) => {
      console.log(err);
    }
  );

  const geo = { lat: coord.latitude, long: coord.longitude };
  const loc = reverse("location", geo);

  return loc;
};

const api = "http://127.0.0.1:5000/api/";
const reverse = (url, data) => {
  url = api + url;

  fetch(url, { method: "post", body: json.Stringify(data) })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const createMap = (con, coord) => {
  const map = new atlas.Map(con);
  map.setCamera({
    center: [coord.lat, coord.long],
  });

  map.setServiceOptions({
    transformRequest: proxy,
  });
  return map;
};
