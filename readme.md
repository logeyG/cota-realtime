## OneBusAway Java API Server
- download / install Java 1.7
- download [onebusaway-quickstart-assembly-1.1.13-api-webapp.war](https://github.com/OneBusAway/onebusaway-application-modules/wiki/OneBusAway-Quickstart-Guide) to cota-realtime/OneBusAway folder
- `$ cd cota-realtime/OneBusAway`
- `$ java -jar onebusaway-quickstart-assembly-1.1.13-api-webapp.war -webapp -gtfsRealtimeAlertsUrl=http://realtime.cota.com/TMGTFSRealTimeWebService/Vehicle/VehiclePositions.pb -gtfsRealtimeTripUpdatesUrl=http://realtime.cota.com/TMGTFSRealTimeWebService/TripUpdate/TripUpdates.pb TransitBundle`
- see http://developer.onebusaway.org/modules/onebusaway-application-modules/current/api/where/index.html for more details on OneBusAway API

## Node Application
- download / install node.js
- `$ cd cota-realtime`
- `$ npm install`
- `$ npm start`
- navigate in web browser to [http://localhost:3000/](http://localhost:3000/)
- cota-realtime lets you see all the currently active COTA vehicles and select which vehicle you want to recieve realtime updates on. View the web console for more details.
