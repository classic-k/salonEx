var apiLoad = "http://127.0.0.1:5000/loader?url=";
function loader(url, type) {
  url = apiLoad + url;
  headers = {
    "Content-Type": "application/json",
  };
  return { url: url, header: headers };
}

function createMap(con, coord) {
  const map = new atlas.Map(con, {
    center: [coord.lat, coord.long],
    view: auto,
    authOptions: {
      authType: "subscriptionKey",
      subscriptionKey: "4e2e-96f9-a1a439da366f1cNBOj91GihLAImq",
    },
  });

  map.setServiceOptions({
    transformRequest: loader,
  });
  return map;
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
