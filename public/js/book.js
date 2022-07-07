var apiLoad = "http://127.0.0.1:5000/api/loader?url=";
var dc = "Lagos";
var center;
var capi =
  "http://127.0.0.1:5000/api/search/add?subKey=4e2e-96f9-a1a439da366f1cNBOj91GihLAImq&add=";
var ds, layers, data, map, ugeo, city, popup;
var avail = false;
var rsq =
  "http://127.0.0.1:5000/api/salons/location?subKey=4e2e-96f9-a1a439da366f1cNBOj91GihLAImq&pos=";
//"http://127.0.0.1:5000/api/loader/search?subKey=4e2e-96f9-a1a439da366f1cNBOj91GihLAImq&pos=";
var routeUrl = "http://127.0.0.1:5000/api/routeB/calculate";
var center = [6.48937, 3.37709];
var coordinates = [],
  directions = [],
  distances = {};
var results = [],
  schedules = {};
var feats = [];
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
    center: [3.37709, 6.48937],
    transformRequest: loader,

    language: "en-US",

    authOptions: {
      authType: "subscriptionKey",
      subscriptionKey: "jKBfaAqvGOa99Tm9n_od4_5pidxDQmZ5OHV_8A7vTgE", //"4e2e-96f9-a1a439da366f1cNBOj91GihLAImq",
    },
  });
  popup = new atlas.Popup();
  map.events.add("ready", async (e) => {
    ds = new atlas.source.DataSource(null, {
      cluster: true,
      clusterMaxLevel: 10,
    });

    map.sources.add(ds);
    map.controls.add(new atlas.control.ZoomControl(), {
      position: "top-right",
    });
    map.layers.add(
      new atlas.layer.LineLayer(ds, null, {
        strokeColor: "#2272B9",
        strokeWidth: 5,
        lineJoin: "round",
        lineCap: "round",
        filter: [
          "any",
          ["==", ["geometry-type"], "LineString"],
          ["==", ["geometry-type"], "MultiLineString"],
        ],
      }),

      "labels"
    );
    layers = getLayer(ds);
    map.layers.add(layers);

    map.events.add("click", [layers], (e) => {
      console.log(e.shapes[0]);
    });
    // getCenter();
  });

  // map.events.add("click", layers, (e) => {
  // if (e.shapes && e.shapes.length > 0) showPop(e.shapes[0]);
  //});
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

function reverseGeo(pos) {
  rsq = rsq + pos.join(",");
  fetch(rsq, { method: "get", headers: { "Content-Type": "text/html" } })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      // console.log(res);
      var features = makeFeatures(res.salons);
      // console.log(features);
      features = getDistance(pos, features);
      // console.log(features);
      var data = new atlas.data.FeatureCollection(features);
      //  console.log(data);
      ds.add(data);
      // city = res.city;

      // console.log(features.bbox);
      //  var bbox = new atlas.data.BoundingBox.fromData(data);
      //   console.log(ugeo);
      map.setCamera({
        center: ugeo,
        zoom: 10,
      });

      //  map.setShapes(ds);
      document.getElementById("listPanel").innerHTML = results.join("");
      //getDirections(ugeo, features);
      getRoutes();
      //console.log(resp);
      // ds.add(feats[3]);
      // map.setShapes(ds);
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

function mkDS(pos, cus) {
  return new atlas.data.Feature(new atlas.data.Point(pos), cus);
}
function getLayer(ds) {
  const resultLayer = new atlas.layer.SymbolLayer(ds, null, {
    iconOptions: {
      // image: "pin-round-darkblue",
      image: ["get", "icon"],
      //  anchor: "center",
      allowOverlap: true,
    },
    textOptions: {
      anchor: "top",
    },
    filter: [
      "any",
      ["==", ["geometry-type"], "Point"],
      ["==", ["geometry-type"], "MultiPoint"],
    ],
  });

  return resultLayer;
}
function itemClicked(item) {
  console.log("clicked", item);
  item = parseInt(item);
  ds.add(directions[item]);
  map.setShapes(ds);
}

function geoLocation() {
  navigator.geolocation.getCurrentPosition(sucLoc, errLoc);
}
function sucLoc(coords) {
  let coord = coords.coords;
  const geo = [coord.longitude, coord.latitude];
  ugeo = geo;
  avail = true;

  if (ugeo) {
    reverseGeo(ugeo);
  }
}

function errLoc(err) {
  if (err) console.log(err);
}

function showPop(shapes) {
  const props = shapes.getProperties();
  const position = shapes.getCoordinates();
  const content = salonHtml(props);
  popup.setOptions({
    content,
    position,
  });

  popup.open(map);
}

function salonHtml(props, ind) {
  var html = [];
  html.push("<div class='listItem' onclick=\"itemClicked('", ind, "')\">");
  var attrs = Object.keys(props);
  attrs = attrs.filter((val) => val !== "coordinate" || val !== "id");

  for (var i = 0; i < attrs.length; i++) {
    var val = attrs[i];
    html.push("<span class='seItem'>", val, props[val], "</span>");
  }
  html.push("<span class='seItem'>", distances[props.id], "miles away</span>");
  html.push("</div>");

  return html.join("");
}

function getRoutes() {
  //var featuresCol = [];
  var datas = [];
  var pipeline = atlas.service.MapsURL.newPipeline(
    new atlas.service.MapControlCredential(map)
  );
  //Construct the RouteURL object
  var routeURL = new atlas.service.RouteURL(pipeline);

  coordinates = coordinates.filter((val) => ugeo !== val);

  coordinates.forEach((val, ind) => {
    var coordinate = [ugeo, val];
    routeURL
      .calculateRouteDirections(
        atlas.service.Aborter.timeout(10000),
        coordinate
      )
      .then((directions) => {
        //Get data features from response
        var data = directions.geojson.getFeatures();
        console.log(data);

        ds.add(data.features[0]);

        //   feats.push(data);
      });
  });

  // return featuresCol;
}
function getDirections(origin, datasets) {
  var url = routeUrl;
  //  var feats = [];
  fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ datasets, origin }),
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log(data.result);
      data.result.forEach((val, ind) => {
        let routes = val.routes;
        // console.log(routes[0]);
        let legs = routes[0];
        legs = legs["legs"];
        let pts = legs[0];
        let points = pts["points"];
        points = points.map((point) => {
          return [point.latitude, point.longitude];
        });
        //  let bbox = new atlas.data.BoundingBox.fromData(points);
        feats.push([
          {
            geometry: { type: "MultiLineString", coordinates: points },
            type: "Feature",
            //id: ind,
          },
        ]);

        //return feats;

        //console.log(routes[0]);
        // directions.push(routes[0]);
      });
      ds.add(feats);
      // console.log(directions[0].routes["0"]);
      // let aa = directions[0].routes["0"];
      // ds.add(directions);
      // console.log(feats);
    })
    .catch(console);
}
function makeFeatures(salons) {
  const features = [];

  salons.forEach((salon, ind) => {
    var coords = [
      parseFloat(salon["coordinate"][0]),
      parseFloat(salon["coordinate"][1]),
    ];

    coordinates.push(coords);
    //   if (coords !== ugeo) {
    features.push({
      id: salon["id"],
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: coords,
      },
      properties: {
        name: salon["name"],
        address: salon["address"],
        sex: salon["sex"],
        phone: salon["phone"],
        city: salon["city"],
        icon: coords !== ugeo ? "pin-round-blue" : "pin-blue",
      },
    });
    schedules[salon["id"]] = sch(salon["schedules"]);

    results.push(salonHtml(salon, ind));
    // }
  });
  //  console.log(results);
  /*
  features.push({
    id: "location",
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: ugeo,
    },
    properties: {
      icon: "pin-blue",
    },
  });
  */
  return features;
}

function getDistance(center, datasets) {
  // console.log(datasets);
  const dist = {};
  datasets.forEach((dataset) => {
    dist[dataset.id] =
      Math.round(
        atlas.math.getDistanceTo(
          center,
          dataset.geometry.coordinates,
          "miles"
        ) * 100
      ) / 100;
  });

  distances = dist;
  datasets = datasets.sort((x, y) => dist[x.id] - dist[y.id]);
  // console.log(datasets);
  return datasets;
}

function sch(schedules) {
  var schF = {};
  Object.keys(schedules).forEach((schedule) => {
    var tarr = schedules[schedule];
    var opening = tformat(tarr[0]);
    var closing = tformat(tarr[1]);

    schF[schedule] = [opening, closing];
    // filter from backend to include on the current day schedule
  });
  return schF;
}
function tformat(dt) {
  dt = parseInt(dt);

  let tf = dt >= 12 ? "PM" : "AM";
  let ch = dt % 12;
  ch = ch >= 10 ? ch : "0" + ch;
  return ch + ":" + "00" + " " + tf;
}
