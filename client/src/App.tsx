
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SpectrumPlot } from './SpectrumPlot';
import { useEffect, useState } from 'react';
import { WaterfallPlot } from './WaterfallPlot';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function App() {
    const numRows = 30;

    const [xData, setXData] = useState<number[]>([])
    const [yData, setYData] = useState<number[]>([])

    const [waterfallRows] = useState<number[]>(range(1, numRows))
    const [waterfallXData] = useState<number[][]>([]) // TODO: make this array contain numRows number of blank arrays on initial render
    const [waterfallYData] = useState<number[][]>([]) // TODO: make this array contain numRows number of blank arrays on initial render

    function range(start: number, end: number, step: number = 1): number[] {
        const result: number[] = [];
        for (let i = start; i <= end; i += step) {
            result.push(i);
        }
        return result;
    }

    function distribute_values(start: number, end: number, count: number): number[] {
        if (count <= 0) {
            return [];
        }

        const step = (end - start) / (count - 1);
        const result: number[] = [];

        for (let i = 0; i < count; i++) {
            result.push(start + step * i);
        }

        return result;
    }

    function get_random_float(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    function gen_data() {
        let tempXData: number[] = [];
        let tempYData: number[] = [];

        // Generate frequency values
        tempXData = distribute_values(0, 2000, 1024)

        // Generate power values at each frequency value
        tempXData.forEach((x) => {
            if (x > 250 && x < 350) {
                tempYData.push(get_random_float(-40, -50))
            } else if (x > 1000 && x < 1400) {
                tempYData.push(get_random_float(-30, -40))
            } else {
                tempYData.push(get_random_float(-70, -80))
            }
        })

        // Set x and y data for spectrum plots
        setXData(tempXData);
        setYData(tempYData);

        // Update waterfall plot arrays of arrays
        waterfallXData.unshift(tempXData);
        waterfallYData.unshift(tempYData);

        if (waterfallXData.length > numRows) {
            waterfallXData.pop()
        }

        if (waterfallYData.length > numRows) {
            waterfallYData.pop()
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            gen_data();
        }, 100);

        return () => clearInterval(interval);
    }, [])

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div>
                <SpectrumPlot xData={xData} yData={yData} />
                <WaterfallPlot waterfallXData={waterfallXData} waterfallYData={waterfallYData} waterfallRows={waterfallRows} />
            </div>
        </ThemeProvider>
    )
}

export default App
