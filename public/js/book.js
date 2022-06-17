var apiLoad = "http://127.0.0.1:5000/api/loader?url=";
var ds, layers, data, map, ugeo, city;
var avail = false;
var rsq =
  "http://127.0.0.1:5000/api/loader/search?subKey=4e2e-96f9-a1a439da366f1cNBOj91GihLAImq&pos=";
var center = [6.7, 3.4];
function loader(url, type) {
  if (url.indexOf("subscription-key") < 0) {
    return { url };
  }
  url = apiLoad + url;

  return { url };
}

function createMap() {
  map = new atlas.Map("bm", {
    view: "Auto",
    zoom: 14,
    center: [6.605874, 3.349149],
    language: "en-US",
    transformRequest: loader,
    authOptions: {
      authType: "subscriptionKey",
      subscriptionKey: "4e2e-96f9-a1a439da366f1cNBOj91GihLAImq",
    },
  });

  map.events.add("ready", async (e) => {
    ds = new atlas.source.DataSource();
    map.sources.add(ds);
    layers = getLayer(ds);
    map.layers.add(layers);
  });
  //console.log(data);
  // ds.add(data);

  /*
    map.setCamera({
      bounds: data.bbox,
      padding: 15,
      zoom: 10,
    }); 
  });*/

  //return map;
}
function newPipe(map) {
  const pipeline = atlas.service.MapsURL.newPipeline(
    new atlas.service.MapControlCredential(map)
  );

  return pipeline;
}
function searchService(pipeline) {
  const ss = new atlas.service.SearchURL(pipeline);

  return ss;
}

function reverseGeo(pos) {
  rsq = rsq + pos.join(",");
  fetch(rsq, { method: "get", headers: { "Content-Type": "text/html" } })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      //  const address = res.data.addresses[0];
      // console.log(address.dataSources);
      // const dataS = address.dataSources;
      //  console.log(dataS);
      //  data = dataS.toJson();
      //  console.log(res);
      ds.clear();
      ds.add(res.result);
      city = res.city;

      console.log(res.result.bbox);
      map.setCamera({
        bounds: res.result.bbox,
      });

      // console.log(res);
      //  return address.dataSources;
    })
    .catch((err) => {
      console.log(err);
    });
}
function dataSource() {
  return new atlas.source.DataSource();
}
function getLayer(ds) {
  const resultLayer = new atlas.layer.SymbolLayer(ds, null, {
    iconOptions: {
      image: "pin-round-darkblue",
      anchor: "center",
      allowOverlap: true,
    },
    textOptions: {
      anchor: "top",
    },
  });

  return resultLayer;
}

function POI(ss, lat, lon) {
  const query = { query: "Salon", lat: lat, lon: lon, radius: 9000 };
}

function mapRoute() {
  return "ROUTING";
}

function geoLocation() {
  navigator.geolocation.getCurrentPosition(sucLoc, errLoc);
}
function sucLoc(coords) {
  let coord = coords.coords;
  const geo = [coord.latitude, coord.longitude];
  ugeo = geo;
  avail = true;
  if (ugeo) {
    reverseGeo(ugeo);
  }
}

function errLoc(err) {
  if (err) console.log(err);
}
