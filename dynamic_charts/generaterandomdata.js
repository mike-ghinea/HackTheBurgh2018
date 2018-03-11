// Sample program that feeds randomly generated data into the dynamic
// charts.
var randomValue = 0;
let updateInterval = 1000;

setInterval(function() {
  randomValue = Math.random() * -220 + 220;
}, updateInterval);
