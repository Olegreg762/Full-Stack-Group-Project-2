const plot_data = document.querySelector("#expense-chart").getAttribute("data-budget");

const plot_json = JSON.parse(plot_data);


// Creates the pie chart
const ctx = document.getElementById('expense-chart').getContext('2d');

function generate_color() {
    const random_number = Math.floor(Math.random()*16777216);
    const hex_color = random_number.toString(16);
    return "#" + hex_color;
  }
  

// Plot data
const data = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: []
    }]
};

for(let i = 0; i < plot_json.length; i++){
    const expenses = plot_json[i].Expenses;
    for (let u = 0; u < expenses.length; u++){
        data.labels.push(expenses[u].expense_name);
        data.datasets[0].data.push(expenses[u].expense_amount);
        data.datasets[0].backgroundColor[u] =(generate_color())
    }
}


const options = {
    responsive: true,
    maintainAspectRatio: false,
};

const expense_chart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options,
});