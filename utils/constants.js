export const mapProxy = "http://127.0.0.1:5000/map/proxy";

export const Sex = {
  0: "male",
  1: "female",
  2: "unisex",
};

export const endpoints = {
  reverse:
    "https://atlas.microsoft.com/search/address/reverse/json?typeahead=true&api-version=1.0&language=en-US&number=1&entityType=Municipality&subscription-key=",
  postSyncBR:
    "https://atlas.microsoft.com/search/address/reverse/batch/sync/json?api-version=1.0&subscription-key=",
  postAsyncBR:
    "https://atlas.microsoft.com/search/address/reverse/batch/json?api-version=1.0&subscription-key=",
  polygon:
    "https://atlas.microsoft.com/search/polygon/json?api-version=1.0&subscription-key=",
};

/*
post body
{
    "batchItems": [
        {"query": "?query=400 Broad St, Seattle, WA 98109&limit=3"},
        {"query": "?query=One, Microsoft Way, Redmond, WA 98052&limit=3"},
        {"query": "?query=350 5th Ave, New York, NY 10118&limit=1"},
        {"query": "?query=Pike Pl, Seattle, WA 98101&lat=47.610970&lon=-122.342469&radius=1000"},
        {"query": "?query=Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France&limit=1"}
    ]
}
*/
