const chart = document.getElementById('canvas').getContext('2d');
const config = {
    type: 'line',
    data: {
        labels: ['Task1', 'Task2', 'Task3', 'Task4', 'Task5', 'Task6', 
            'Task7', 'Task8', 'Task9', 'Task10', 'Task11', 'Task12', 'Task13'],
        datasets: [],
    },
    options: {
        title: {
            display: true,
            text: 'The results of experiment',
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}
const myChart = new Chart(chart, config);

const addBtn = document.getElementById('add');
const removeBtn = document.getElementById('remove');
const nameInput = document.getElementById('name');

let colorSet = new Set();

addBtn.addEventListener('click', addChart);
removeBtn.addEventListener('click', removeChart);

function addChart() {

    const random = function(a, b) {
        return Math.floor(Math.random() * (b - a)) + a;
    }
    let name = nameInput.value;
    
    if (nameInput.value) {
        nameInput.value = '';
    } else {
        name = nameRandom();
    }

    function nameRandom() {
        const length = random(4, 8);
        const nameArr = Array(length).fill(1).map((item) => random(97, 122));
        return String.fromCharCode(...nameArr);
    }

    const data = Array(config.data.labels.length).fill(1).map((item) => random(10, 230));
    
    const randomColor = () => {
        let color = '#';
        for (let i = 1; i <= 3; i +=1) {
            color += random(1, 255).toString(16);
        }
        return color;
    }

    let color = randomColor();

    while (colorSet.has(color)) {
        color = randomColor();
    }

    colorSet.add(color);

    const chartData = {
        label: name,
        data: data,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 2,
        fill: false,
    };

    console.log(chartData);
    config.data.datasets.push(chartData);

    myChart.update();
}

function removeChart() {
    if (!nameInput.value) return;
    const name = nameInput.value;
    nameInput.value = '';
    const index = config.data.datasets.findIndex((element) => element.label === name);
    if (index !== -1) config.data.datasets.splice(index, 1);
    myChart.update();
}
