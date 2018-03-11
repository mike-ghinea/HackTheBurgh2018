window.onload = function() {

  var dps = [];
  var chart = new CanvasJS.Chart("lineChartContainer", {
    title: {
      text: "Sample data"
    },
    axisY: {
      // Change to true if we want to see zero on the
      // y-axis
      includeZero: false,
      title: "y-axis"
    },
    axisX: {
      // Change to true if we want to see zero on the
      // x-axis
      title: "x-axis",
    },
    data: [{
      type: "area",
      dataPoints: dps
    }]
  });

  // Change according to context.
  var xValue = 0;
  var yValue = 100;

  // Data refresh rate, in milliseconds.
  var updateInterval = 1000;

  // Maximum number of data points visible on the graph at a time.
  let dataLengthLimit = 20;
  var dataLength = 0;

  var updateChart = function (count) {

    // If count is non-zero, keep it as count, otherwise
    // treat as 1.
    count = count || 1;

    for (var i = 0; i < count; i++)
    {
      yValue = randomValue;
      // yValue += Math.round(5 * Math.random() * (Math.round(Math.random()) == 1 ? 1 : -1));
      dps.push({
        x: xValue,
        y: yValue
      });
      xValue++;
    }

    if (dps.length > dataLengthLimit)
    {
      dps.shift();
    }

    chart.render();
  };

  updateChart(dataLength);
  setInterval(function(){updateChart()}, updateInterval);
};

// Usage:
/*
  <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
  <div id="chartContainer" style="height: ...px; width: ...%;"></div>
  <script src="datahistorytemplate.js"></script>
*/
