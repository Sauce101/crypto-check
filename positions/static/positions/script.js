// Michael Saucedo cs50W 2020
$(document).ready(function(){
// $(() => {

    var myArray = []

    $.ajax({
        method: 'GET',
        url: '',
        success: function(response) {
            // $("#myTable").empty();
            myArray = response.data
            buildTable(myArray)
            buildChart(myArray)
            console.log(myArray)
        }
    }),
    setInterval(function(){
        $.ajax({
            method: 'GET',
            url: '',
            success: function(response) {
                $("#myTable").empty();
                $("#myChart").empty();
                myArray = response.data
                buildTable(myArray)
                buildChart(myArray)
                console.log(myArray)
            }
        })
    // 30 sec in milliseconds
    }, 30000);

});

let buildTable = (data) => {
    const table = document.getElementById('myTable')

    for (i = 0; i < data.length; i++){
        const row = `<tr>
                        <th scope="row"><img src=${data[i].image} height='20'></th>
                        <td>${data[i].name}</td>
                        <td>${data[i].market_cap_rank}</td>
                        <td>${data[i].market_cap}</td>
                        <td>${data[i].current_price}</td>
                    </tr>`
        table.innerHTML += row
    }
}

let buildChart = (data) => {
    // Name of crypto currency
    var res_names = []; 
    for(i in data) 
        res_names.push(data[i].name);
    // Last 24hr percentage change  
    var res_day = []; 
    for(i in data) 
        res_day.push(data[i].price_change_percentage_24h);

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: res_names.slice(0, 10),
            datasets: [{
                label: 'Last 24h %',
                data: res_day,
                backgroundColor: [
                    'rgba(247, 147, 26, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(11, 168, 123, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(145, 145, 145, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(0, 202, 224, 0.2)',
                    'rgba(87, 112, 255, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(51, 82, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(247, 147, 26, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(11, 168, 123, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(145, 145, 145, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(0, 202, 224, 1)',
                    'rgba(87, 112, 255, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(51, 82, 255, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Crypto Check - Last 24h',
                fontSize: 20,
                fontColor: 'rgb(71, 109, 109)',
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 3,
                        callback: function(value) {
                            return value + "%"
                        }
                    }
                }]
            },
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    fontColor: 'rgb(71, 109, 109)'
                }
            },
            elements: {
                point: {
                    radius: 5,
                    hoverRadius: 18,
                    pointStyle: 'rectRot'
                }
            }
        }
    });
}
