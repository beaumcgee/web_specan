
import Plot from 'react-plotly.js';

interface Props {
    waterfallXData: number[][]
    waterfallYData: number[][]
}

export function WaterfallPlot(props: Props) {
    return (
        <Plot
            data={[
                {
                    x: props.waterfallXData, // Array of array of frequency values
                    y: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Vertical Rows
                    z: props.waterfallYData, // Array of array of power values
                    type: 'heatmap',
                    colorscale: 'Jet',
                    showscale: false // TODO: make user configurable via a control
                },
            ]}
            layout={{
                font: { color: 'white' },
                plot_bgcolor: 'black',
                paper_bgcolor: 'black',
                xaxis: { gridcolor: 'white', showticklabels: false },
                yaxis: { gridcolor: 'white' },
                autosize: true,
            }}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
