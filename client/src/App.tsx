
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SpectrumPlot } from './SpectrumPlot';
import { useEffect, useState } from 'react';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function App() {
    const [xData, setXData] = useState<number[]>([])
    const [yData, setYData] = useState<number[]>([])

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

        tempXData = distribute_values(0, 2000, 1024) // Generate frequency values

        for (let i = 0; i < tempXData.length; i++) {
            tempYData.push(get_random_float(-70, 0)) // Generate power values
        }

        setXData(tempXData);
        setYData(tempYData);
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
            </div>
        </ThemeProvider>
    )
}

export default App
