var updateGraphs = function(results){
    console.log(results);
    let times = [];
    results.forEach(result => {
        times.push(result.date.getMinutes() + ":" + result.date.getSeconds());
    });

    var ctx = document.getElementById('CO2Chart').getContext('2d');
    let readings = [];
    
            results.forEach(result => {
                readings.push(result.CO2.toString());
            });
    var airChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        

        // The data for our dataset
        data: {
            labels: times,
            datasets: [{
                label: "CO2",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: readings,
            }]
        },
    
        // Configuration options go here
        options: {}
    });

    var ctx = document.getElementById('VOCChart').getContext('2d');
    let readings = [];
    
            results.forEach(result => {
                readings.push(result.totalVOC.toString());
            });
    var airChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        

        // The data for our dataset
        data: {
            labels: times,
            datasets: [{
                label: "VOC",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: readings,
            }]
        },
    
        // Configuration options go here
        options: {}
    });
    var ctx = document.getElementById('humidityChart').getContext('2d');
    let readings = [];
    
            results.forEach(result => {
                readings.push(result.humidity.toString());
            });
    var airChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        

        // The data for our dataset
        data: {
            labels: times,
            datasets: [{
                label: "humidity",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: readings,
            }]
        },
    
        // Configuration options go here
        options: {}
    });

    var ctx = document.getElementById('temperatureChart').getContext('2d');
    let readings = [];
    
            results.forEach(result => {
                readings.push(result.temperature.toString());
            });
    var airChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        

        // The data for our dataset
        data: {
            labels: times,
            datasets: [{
                label: "CO2",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: readings,
            }]
        },
    
        // Configuration options go here
        options: {}
    });
    
}
