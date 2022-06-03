const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (coords) => {
      console.log(coords);
      return coords;
    },
    (err) => {
      console.log(err);

      return { err: err };
    }
  );
};
const api = "http://127.0.0.1:5000/map/proxy";
const proxy = (url, type) => {
  url = api + "?url=" + url;
  const tok = localStorage.getItem("token");
  const cookies = document.cookie;
  return {
    url: url,
    credentials: "same-origin",
    headers: {
      referral: "",
      token: tok,
      cookie: cookies,
    },
  };
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
