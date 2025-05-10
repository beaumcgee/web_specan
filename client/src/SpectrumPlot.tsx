
import Plot from 'react-plotly.js';

interface Props {
    xData: number[]
    yData: number[]
}

export function SpectrumPlot(props: Props) {
    return (
        <Plot
            data={[
                {
                    x: props.xData,
                    y: props.yData,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'yellow' },
                },
            ]}
            layout={{
                font: { color: 'white' },
                plot_bgcolor: 'black',
                paper_bgcolor: 'black',
                xaxis: { gridcolor: 'white', title: { text: 'Frequency (MHz)' } },
                yaxis: { gridcolor: 'white', title: { text: 'Power (dBm)' } },
                autosize: true,
            }}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
