import * as Plotly from 'plotly.js-dist-min';
import { Bacterium } from './bacteria/Bacterium';
import { getLast, hexToRGB } from '../util';
import { bacteriaCountAllTimeToggle } from '../constants/uiElements';

export class PlotlyManager {
    private name: string
    private chartYValues: number[][]
    private chartData: Partial<Plotly.ScatterData>[] = [];
    private recentCount: number = 20;
    private layout: Partial<Plotly.Layout> = {
        title: 'Bacteria Count Over Time',
        showlegend: true,
        modebar: {
            add: ['hoverclosest', 'hovercompare']
        },
        xaxis: {
            autotick: false,
            tickvals: [],
            ticktext: [],
            rangemode: 'nonnegative',
            showticklabels: false,
            showgrid: false,
        },
        yaxis: {
            title: 'Bacteria Count',
            autotick: true,
            ticks: 'outside',
            nticks: 10,
            dtick: 1,
            ticklen: 8,
            tickwidth: 4,
            tickcolor: '#000',
            showgrid: false,
            rangemode: 'nonnegative',
        }
    };
    
    constructor(
        containerId: string, 
        bacteria: typeof Bacterium[]
    ) {
        this.name = containerId
        this.chartYValues = bacteria.map((_) => [])
        this.chartData = bacteria.map((bacterium) => this._createChartData(bacterium))
        Plotly.newPlot(containerId, this.chartData.slice(), this.layout, {
            displaylogo: false,
        });
    }

    pushNewValue(
        bacterium: typeof Bacterium,
        value: number
    ) {
        for (let idx = 0; idx < this.chartData.length; idx ++) {
            if (this.chartData[idx].name === bacterium.name) {
                this.chartYValues[idx].push(value);
                this._updateChart(idx)
                return
            }
        }
        // If bacterium didn't list earlier
        this.chartData.push(this._createChartData(bacterium))
        this.chartYValues.push([])
        this._updateChart(this.chartData.length - 1)
    }

    private _createChartData(
        bacterium: typeof Bacterium
    ): Partial<Plotly.ScatterData> {
        return {
            name: bacterium.name,
            line: {
                shape: 'spline',
                smoothing: 2,
                color: bacterium.color,
                width: 2
            },
            fill: 'tozeroy',
            fillcolor: hexToRGB(bacterium.color, 0.5),
            y: [],
            mode: 'lines',
            hovertemplate: `<b>${bacterium.name}</b>: %{y}<extra></extra>`, // Custom hover template
        }
    }

    private _updateChart(index: number) {
        // Use Plotly.update to update the chart with new data and the stored layout
        Plotly.update(
            this.name,
            { y: [
                bacteriaCountAllTimeToggle.checked
                ? this.chartYValues[index].slice()
                : getLast(this.chartYValues[index], this.recentCount)
            ] },
            this.layout,
            [index]
        );
    }


}

