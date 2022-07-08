var ugeo = [];
var stores = [];
var salons = [
  {
    id: "62a9ad89e2180160b3b5b1dc",
    name: "Divine Touch",
    email: "div@divine.com",
    address: "Lagos Island, Lagos",
    city: "Lagos",
    locName: "Island",
    country: "Nigeria",
    coordinate: ["6.537216", "3.3718272"],
    phone: "080902211011",
    description: "Unisex Salon",
    sex: "2",
  },
  {
    id: "62c2f98a350d4f0a659e8385",
    name: "Immaculate",
    email: "imma@imma.com",
    address: "Lekki, Lagos",
    city: "Lagos",
    locName: "Lekki",
    country: "Nigeria",
    coordinate: ["6.44614", "3.46019"],
    phone: "08020998811",
    description: "High class salon",
    sex: "2",
  },
  {
    id: "62c2f9cd350d4f0a659e8386",
    name: "Brain Beauty",
    email: "ella@brain.com",
    address: "Magodo, Lagos",
    city: "Lagos",
    locName: "Magodo",
    country: "Nigeria",
    coordinate: ["6.61398", "3.37528"],
    phone: "08020998822",
    description: "Exclusive touch",
    sex: "0",
  },
  {
    id: "62c2fa04350d4f0a659e8387",
    name: "Oluomo Salons",
    email: "mc@nurtw.com",
    address: "Oshodi, Lagos",
    city: "Lagos",
    locName: "Oshodi",
    country: "Nigeria",
    coordinate: ["5.74117", "6.88042"],
    phone: "09020998822",
    description: "MC Oluomo",
    sex: "1",
  },
  {
    id: "62c2fa31350d4f0a659e8388",
    name: "Westminister Salons",
    email: "west@west.com",
    address: "Apapa, Lagos",
    city: "Lagos",
    locName: "Apapa",
    country: "Nigeria",
    coordinate: ["6.44519", "3.36837"],
    phone: "08130998822",
    description: "Shipping Yard",
    sex: "0",
  },
  {
    id: "62c2fa59350d4f0a659e8389",
    name: "Awa Wa Salons",
    email: "base@ikd.com",
    address: "Ikorodu, Lagos",
    city: "Lagos",
    locName: "Ikorodu",
    country: "Nigeria",
    coordinate: ["6.60357", "3.57703"],
    phone: "08130991231",
    description: "Headquarter",
    sex: "0",
  },
  {
    id: "62c2faa9350d4f0a659e838b",
    name: "BestHair Salon",
    email: "info@besthair.com",
    address: "Ojodu, Berger",
    city: "Lagos",
    locName: "Ojodu",
    country: "Nigeria",
    coordinate: ["6.6470", "3.3742"],
    phone: "08130001231",
    description: "Headquarter",
    sex: "0",
  },
  {
    id: "62c2fadd350d4f0a659e838c",
    name: "Excellent Salon",
    email: "info@excel.com",
    address: "Ikotun, Egbe",
    city: "Lagos",
    locName: "Ikotun",
    country: "Nigeria",
    coordinate: ["6.5631", "3.2506"],
    phone: "090802211011",
    description: "Unisex Salon",
    sex: "2",
  },
  {
    id: "62c2fb09350d4f0a659e838d",
    name: "Angels Palace",
    email: "info@angels.com",
    address: "Ilupeju, Lagos",
    city: "Lagos",
    locName: "Ilupeju",
    country: "Nigeria",
    coordinate: ["6.5536", "3.3567"],
    phone: "090802211342",
    description: "Unisex Salon",
    sex: "2",
  },
  {
    id: "62c2fb65350d4f0a659e838f",
    name: "Art Land touch",
    email: "art@landtouch.com",
    address: "Festac Town, Lagos",
    city: "Lagos",
    locName: "Festac",
    country: "Nigeria",
    coordinate: ["6.4703", "3.2818"],
    phone: "080902211011",
    description: "Unisex Salon",
    sex: "2",
  },
  {
    id: "62c2fb93350d4f0a659e8390",
    name: "Homeland Touch",
    email: "info@homeland.com",
    address: "Onilu, Lagos",
    city: "Lagos",
    locName: "Onilu",
    country: "Nigeria",
    coordinate: ["6.5359", "3.2483"],
    phone: "080230011011",
    description: "Unisex Salon",
    sex: "2",
  },
];
var coordinates = [];
var routes = {};
var salonsHtml = [];
var pipeline;
var ds,
  map,
  popup,
  features = [];
var cline;
const getMap = (ds, layers) => {
  const map = new atlas.Map("mp", {
    center: [3.37709, 6.48937],
    view: "Auto",
    language: "en-US",
    zoom: 14,
    authOptions: {
      authType: "subscriptionKey",
      subscriptionKey: "jKBfaAqvGOa99Tm9n_od4_5pidxDQmZ5OHV_8A7vTgE", //"4e2e-96f9-a1a439da366f1cNBOj91GihLAImq",
    },
  });
  popup = new atlas.Popup();
  map.events.add("ready", async (e) => {
    map.sources.add(ds);
    map.controls.add(new atlas.control.ZoomControl(), {
      position: "top-right",
    });
    map.layers.add(layers);
    // getCenter();
  });
  map.events.add("click", [layers[0]], (e) => {
    var id = e.shapes[0].data.id;
    // let ind = e.shapes[0].data.properties.ind;
    // ind = parseInt(ind);
    getDirection(id);
    console.log(id);
  });
  map.events.add("mouseover", [layers[0]], (e) => {
    var data = e.shapes[0].data;
    popHtml(data);
  });

  map.events.add("mouseover", [layers[0]], (e) => {
    popup.dismiss();
  });
  return map;
};
const initialise = () => {
  ds = datasource();
  var layers = [symbolLayer(ds), lineLayer(ds)];
  map = getMap(ds, layers);
  pipeline = getPipeLine(map);
};
const datasource = () => {
  const ds = new atlas.source.DataSource();
  return ds;
};
const symbolLayer = (ds) => {
  return new atlas.layer.SymbolLayer(ds, null, {
    iconOptions: {
      image: "pin-round-darkblue",
      anchor: "center",
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
};
const lineLayer = (ds) => {
  return new atlas.layer.LineLayer(
    ds,
    null,
    {
      strokeColor: "#2272B9",
      strokeWidth: 5,
      lineJoin: "round",
      lineCap: "round",
    },
    "labels"
  );
};

const geoLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (coords) => {
      let coord = coords.coords;
      const geo = [coord.longitude, coord.latitude];
      ugeo = geo;
      loadData();
    },
    (err) => {
      console.log(err);
    }
  );
};
const loadData = () => {
  //  ds.add(new atlas.data.LineString([ugeo, [3.37528, 6.61398]]));
  var feats = makeFeatures(salons, ugeo);
  feats = new atlas.data.FeatureCollection(feats);
  features = feats;
  ds.add(features);
  map.setCamera({
    center: ugeo,
    zoom: 10,
  });
};
function makeFeatures(salons) {
  const features = [];

  // const results = [];
  salons.forEach((salon, ind) => {
    var coords = [
      parseFloat(salon["coordinate"][1]),
      parseFloat(salon["coordinate"][0]),
    ];

    let id = salon["id"];
    var at = {};
    at[id] = coords;
    coordinates.push(at);

    var feature = new atlas.data.Feature(new atlas.data.Point(coords), {
      name: salon["name"],
      address: salon["address"],
      sex: salon["sex"],
      phone: salon["phone"],
      city: salon["city"],
      ind: ind,
    });
    salonsHtml.push(salonHtml(salon));
    feature["id"] = salon["id"];
    features.push(feature);
  });

  return features;
}

function salonHtml(props, ind) {
  var disList = ["address", "phone", "sex", "description"];
  var html = [];

  html.push("<div class='listItem' onclick=\"itemClicked('", ind, "')\">");
  //var attrs = Object.keys(props);
  //attrs = attrs.filter((val) => val !== "coordinate" || val !== "id");
  html.push("<div class='listItem-title'>", props["name"], "</div>");
  // html.push("<span class='seItem'>", val, " ", props[val], "</span><br>");
  for (var i = 0; i < disList.length; i++) {
    var val = disList[i];
    html.push("<span class='seItem'>", val, ": ", props[val], "</span><br>");
  }

  html.push("</div>");

  return html.join("");
}

const getPipeLine = (map) => {
  var pipeline = atlas.service.MapsURL.newPipeline(
    new atlas.service.MapControlCredential(map)
  );
  return pipeline;
};

const route = () => {
  var routeURL = new atlas.service.RouteURL(pipeline);

  coordinates.forEach((val, ind) => {
    // let en = [val[1], val[0]];
    var kid = Object.keys(val);
    var id = kid.join("");
    var coord = val[id];
    var coordinate = [ugeo, coord];
    console.log(coordinate);
    routeURL
      .calculateRouteDirections(
        atlas.service.Aborter.timeout(10000),
        coordinate
      )
      .then((directions) => {
        var data = directions.geojson.getFeatures();
        //  console.log(data);

        routes[id] = data; //.features[0]);
      });
  });
  // ds.add(routes[3]);
  // console.log(routes);
};

const getDirection = (id) => {
  ds.setShapes(features);
  ds.add(routes[id]);
};

const popHtml = (data) => {
  console.log(data);
  var sex = ["Unisex", "Male", "Female"];
  var properties = data.properties;
  let ind = properties["sex"];
  ind = parseInt(ind);
  var html = ['<div class="storePopup">'];
  html.push(
    '<div class="popupTitle">',
    properties["name"],
    '<div class="popupSubTitle">',
    properties["address"],
    "</div></div>"
  );

  html.push(
    '<div class="popupContent">',
    properties["phone"],
    "<br>",
    sex[ind],
    " Salon",
    "</div></div>"
  );
  popup.setOptions({
    content: html.join(""),
    position: data.geometry.coordinates,
  });

  popup.open(map);
  //Convert the closing time to a format that's easier to read.
  //getOpenTillTime(properties),
};

// dummy use array but real reverse
const addressReverse = (address) => {
  const searchUrl = new atlas.service.SearchURL(pipeline);

  searchUrl
    .searchAddress(atlas.service.Aborter.timeout(10000), address, {
      countrySet: ["NG"],
      entityType: "municipality",
      view: "Auto",
      limit: 3,
    })
    .then((result) => {
      var data = result.geojson.getFeatures();
      console.log("Done");
      var feature = data.features[0];
      var mun = feature.properties.address.municipality;
      var subMun = feature.properties.address.municipalitySubdivision;
      console.log(mun, subMun);
      console.log(data);
    });
};
//Load from DB
const fetchSalon = (address) => {
  //addressReverse(address)

  stores = salons.filter((val) => {
    let locname = val.locName;

    return locname.includes(address);
  });
  var results = [];
  let c = 0;
  stores.forEach((salon) => {
    //console.log(salon);
    let html = salonHtml(salon, c);
    c += 1;
    results.push(html);
  });
  let panel = document.getElementById("listPanel");
  panel.innerHTML = results.join("");
  var feats = makeFeatures(salons);
  features = new atlas.data.FeatureCollection(feats);
  var cen = stores[0];
  var coords = [
    parseFloat(cen["coordinate"][1]),
    parseFloat(cen["coordinate"][0]),
  ];
  ds.add(features);
  map.setCamera({
    center: coords,
  });
  //ds.setShapes(features);
  /* 
  var url = "search Url"
  fetch(url, {method:"post", })
  */
};

const itemClicked = (ind) => {
  var salon = stores[ind];

  var coords = [
    parseFloat(salon["coordinate"][1]),
    parseFloat(salon["coordinate"][0]),
  ];
  map.setCamera({
    center: coords,
  });
  // Center map around the selected salon
};
