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

  routeDR:
    //GET https://atlas.microsoft.com/route/directions/{format}?api-version=1.0&query={query}&maxAlternatives={maxAlternatives}&alternativeType={alternativeType}&minDeviationDistance={minDeviationDistance}&arriveAt={arriveAt}&departAt={departAt}&minDeviationTime={minDeviationTime}&instructionsType={instructionsType}&language={language}&computeBestOrder={computeBestOrder}&routeRepresentation={routeRepresentation}&computeTravelTimeFor={computeTravelTimeFor}&vehicleHeading={vehicleHeading}&report=effectiveSettings&sectionType={sectionType}&vehicleAxleWeight={vehicleAxleWeight}&vehicleWidth={vehicleWidth}&vehicleHeight={vehicleHeight}&vehicleLength={vehicleLength}&vehicleMaxSpeed={vehicleMaxSpeed}&vehicleWeight={vehicleWeight}&vehicleCommercial={vehicleCommercial}&windingness={windingness}&hilliness={hilliness}&travelMode={travelMode}&avoid={avoid}&traffic={traffic}&routeType={routeType}&vehicleLoadType={vehicleLoadType}&vehicleEngineType={vehicleEngineType}&constantSpeedConsumptionInLitersPerHundredkm={constantSpeedConsumptionInLitersPerHundredkm}&currentFuelInLiters={currentFuelInLiters}&auxiliaryPowerInLitersPerHour={auxiliaryPowerInLitersPerHour}&fuelEnergyDensityInMJoulesPerLiter={fuelEnergyDensityInMJoulesPerLiter}&accelerationEfficiency={accelerationEfficiency}&decelerationEfficiency={decelerationEfficiency}&uphillEfficiency={uphillEfficiency}&downhillEfficiency={downhillEfficiency}&constantSpeedConsumptionInkWhPerHundredkm={constantSpeedConsumptionInkWhPerHundredkm}&currentChargeInkWh={currentChargeInkWh}&maxChargeInkWh={maxChargeInkWh}&auxiliaryPowerInkW={auxiliaryPowerInkW}
    "https://atlas.microsoft.com/route/directions/json?api-version=1.0&subscription-key=",
  address:
    "https://atlas.microsoft.com/search/address/json?api-version=1.0&number=1&language=en-US&countrySet=NG&subscription-key=",
};

// https://atlas.microsoft.com/route/directions/json?subscription-key={Your-Azure-Maps-Primary-Subscription-key}&api-version=1.0&query=51.368752,-0.118332:51.385426,-0.128929&travelMode=car&traffic=true&departAt=2025-03-29T08:00:20&computeTravelTimeFor=all
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
