import { Chart } from 'chart.js/auto';
import { STEP_SCALE } from './constants/geometry';
import { Bacterium } from './types/bacteria/Bacterium';

export const step = (): number => (Math.random() - 0.5) * STEP_SCALE

function hexToRGB(hex: string, alpha: number) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16)

    if (alpha) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
    } else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')'
    }
}

export const buildChart = (
    ctx: HTMLCanvasElement,
    bacteria: typeof Bacterium[]
) => {

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: [], // Remove x-axis labels
                datasets: bacteria.map((bacterium) => {
                    return {
                        fill: true,
                        label: bacterium.name,
                        data: [],
                        borderColor: bacterium.color,
                        borderWidth: 2,
                        backgroundColor: hexToRGB(bacterium.color, 0.2),
                        lineTension: 0.4,
                        pointRadius: 0,
                    }
                })
            },
            options: {
                responsive: true,
                maintainAspectRatio: true, // Set to false to allow custom aspect ratio
                animation: {
                    duration: 4, // Turn off animations for smoother updates
                },
                scales: {
                    x: {
                        type: 'linear', // Use 'linear' scale for the x-axis
                        suggestedMin: 0,         // Minimum x-axis value
                        min: null,
                        suggestedMax: 19,       // Maximum x-axis value
                        ticks: {
                            display: false,
                        }, // Hide x-axis
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            display: true,
                            font: {
                                size: 30,
                            }
                        },
                        suggestedMin: 1,         // Minimum x-axis value
                        min: null,
                        suggestedMax: 10,
                        max: null,
                    },
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: {
                                size: 30
                            }
                        }
                    },
                },
            },
        });   
    }

export const pushChartData = (
    chart: Chart,
    bacterium: typeof Bacterium,
    value: number
) => {
    // chart.data.datasets[0].data = [1, 4, 6, 50, 60, 100]
    // chart.data.datasets[1].data = [1, 4, 6, 50, 60, 100]
    console.log(chart.data)
    const datasets = chart.data.datasets.filter(
        dataset => dataset.label === bacterium.name
    )
    if (datasets.length === 0) {
        chart.data.labels = [0]
        chart.data.datasets.push(
            {
                label: bacterium.name,
                data: [value],
                borderColor: bacterium.color.toString(),
                borderWidth: 2,
                backgroundColor: hexToRGB(bacterium.color, 0.2),
                pointRadius: 0,
            }
        )
    } else {
        const data = datasets[0].data
        if (data.length >= 20) {
            data.shift()
        }
        chart.data.labels = Array.from({ length: data.length + 1 }, (_, i) => i)
        data.push(value)
        chart.update()
    }
}