

- download / install Java 1.7
- cd to COTA-FRP/OneBusAway
- run this command to start OneBusAway API Server:

java -jar onebusaway-quickstart-assembly-1.1.13-api-webapp.war -webapp -gtfsRealtimeAlertsUrl=http://realtime.cota.com/TMGTFSRealTimeWebService/Vehicle/VehiclePositions.pb -gtfsRealtimeTripUpdatesUrl=http://realtime.cota.com/TMGTFSRealTimeWebService/TripUpdate/TripUpdates.pb TransitBundle

- download / install node.js
- cd to project root directory
- run `npm install`
- run `npm start`