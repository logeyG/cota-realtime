## OneBusAway Java API Server
- download / install Java 1.7
- download [onebusaway-quickstart-assembly-1.1.13-api-webapp.war](https://github.com/OneBusAway/onebusaway-application-modules/wiki/OneBusAway-Quickstart-Guide) to COTA-RFP/OneBusAway folder
- `$ cd COTA-RFP/OneBusAway`
- `$ java -jar onebusaway-quickstart-assembly-1.1.13-api-webapp.war -webapp -gtfsRealtimeAlertsUrl=http://realtime.cota.com/TMGTFSRealTimeWebService/Vehicle/VehiclePositions.pb -gtfsRealtimeTripUpdatesUrl=http://realtime.cota.com/TMGTFSRealTimeWebService/TripUpdate/TripUpdates.pb TransitBundle`

## Node Application
- download / install node.js
- `$ cd COTA-RFP`
- `$ npm install`
- `$ npm start`
