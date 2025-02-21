import React, {useMemo} from 'react';
import {LineChart, XAxis, ResponsiveContainer, Brush} from "recharts";

import {
    customLine,
    customTooltip,
    customYAxis
} from '../../../components/ui/customRechartsComponents/customRechartsComponents.tsx'

import {getDateAndTime} from '../../../utils/getDateAndTime.ts'

import {CATEGORY_CHART} from '../../../config/envData.ts'

interface DataItem {
    dt: string;
    date: string | undefined;
    time: string | undefined;
    temp?: number;
    feelsLike?: number;
    humidity?: number;
    windSpeed?: number;
    windGust?: number;
    windDeg?: number;
}

interface XAxisTickProps {
    x: number;
    y: number;
    payload: {
        value: string;
    };
}

interface YAxisData {
    dataKey: string;
    labelValue: string;
    isInvariable: boolean;
    minResize: number;
    maxResize: number;
}

interface LineData {
    dataKey: string;
    hasLabel: boolean;
    lineColor: string;
    labelColor?: string | null;
    labelSize?: number | null;
    description: string;
}

interface DataChart {
    yaxisData: YAxisData;
    lineData: LineData[];
    category: CATEGORY_CHART;
}

interface WeatherChartProps {
    data: DataItem[];
    dataChart: DataChart;
}


const WeatherChart: React.FC<WeatherChartProps> = ({data, dataChart}) => {
    const {yaxisData, lineData, category} = dataChart;

    const width = useMemo(() => typeof window !== 'undefined' && window.innerWidth, []);
    const heightResponsiveContainer = (!width || width >= 480) ? 600 : 400;

    return (
        <>
            <DescriptionComponent lineData={lineData}/>
            <ResponsiveContainer width={'100%'} height={heightResponsiveContainer}>
                <LineChart data={data}>
                    <XAxis dataKey="dt" height={100}
                           tick={({x, y, payload}: XAxisTickProps) => {
                               const currentData = data.find((item) => item.dt === payload.value);
                               if (!currentData) return <></>;
                               const {time, date} = getDateAndTime(currentData.dt);
                               return (
                                   <g transform={`translate(${x},${y})`}>
                                       <text x={0} y={0} dy={16} textAnchor="middle" fill="#ffffff" fontSize={16}>
                                           {time}
                                       </text>
                                       <text x={0} y={0} dy={40} textAnchor="middle" fill="#FFFFFFBF" fontSize={14}>
                                           {date}
                                       </text>
                                   </g>
                               );
                           }}
                    />
                    {customYAxis({
                        dataKey: yaxisData.dataKey,
                        labelValue: yaxisData.labelValue,
                        isInvariable: yaxisData.isInvariable,
                        minResize: yaxisData.minResize,
                        maxResize: yaxisData.maxResize
                    })}

                    {customTooltip({categoryChart: category})}

                    {lineData.map((line, i) => {
                        return customLine({
                            dataKey: line.dataKey,
                            hasLabel: line.hasLabel,
                            lineColor: line.lineColor,
                            labelColor: line?.labelColor,
                            labelSize: line?.labelSize,
                            key: i
                        })
                    })}
                    <Brush dataKey={'time'} height={30} startIndex={0} endIndex={4} stroke={"rgba(97,103,161,0.4)"}
                           fill={'transparent'}/>
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default WeatherChart;

interface DescriptionComponentProps {
    lineData: LineData[];
}

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({lineData}) => (
    <div className={'w-full flex flex-col items-end gap-2'}>
        {lineData.map((line, i) => {
            return <div key={`line_${i}`} className={'flex items-center gap-4'}>
                <p>{line.description}</p>
                <div className={'w-[2rem] h-[2px]'} style={{backgroundColor: line.lineColor}}/>
            </div>
        })}
    </div>
)