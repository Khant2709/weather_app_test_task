import React from "react";
import {Line, YAxis, Tooltip, Label} from "recharts";

import {getDateAndTime} from "../../../utils/getDateAndTime";

import {CATEGORY_CHART} from "../../../config/envData";

import iconArrow from '../../../assets/icon.png';

interface CustomLineProps {
    dataKey: string;
    hasLabel: boolean;
    lineColor: string;
    labelColor?: string | null;
    labelSize?: number | null;
    key: number | string;
}

interface Data {
    dt: number;
    temp?: number;
    feelsLike?: number;
    humidity?: number;
    windSpeed?: number;
    windGust?: number;
    windDeg?: number;
}

interface CustomTooltipProps {
    categoryChart: CATEGORY_CHART;
    payload?: { payload: Data }[];
}

interface ContentProps {
    data: Data;
}

export const customLine: React.FC<CustomLineProps> = ({
                                                          dataKey,
                                                          hasLabel,
                                                          lineColor,
                                                          labelColor,
                                                          labelSize,
                                                          key
                                                      }) => {
    return (
        <Line type="monotone"
              key={key}
              dataKey={dataKey}
              stroke={lineColor}
              label={hasLabel ? {stroke: labelColor ?? undefined, fontSize: labelSize ?? undefined} : {}}
        />
    )
};

interface CustomYAxisProps {
    dataKey: string;
    labelValue: string;
    isInvariable: boolean;
    minResize: number;
    maxResize: number;
}

export const customYAxis: React.FC<CustomYAxisProps> = ({
                                                            dataKey,
                                                            labelValue,
                                                            isInvariable,
                                                            minResize,
                                                            maxResize
                                                        }) => {
    return (
        <YAxis dataKey={dataKey} domain={([min, max]) => {
            if (isInvariable) {
                return [minResize, maxResize]
            } else {
                return [min - (minResize || 0), max + (maxResize || 0)]
            }
        }}>
            <Label value={labelValue} position="right"/>
        </YAxis>
    )
};


export const customTooltip: React.FC<CustomTooltipProps> = ({categoryChart}) => {
    return (
        <Tooltip content={({payload}) => {
            if (payload && payload.length > 0) {
                const data = payload[0].payload;
                const {time} = getDateAndTime(data.dt);
                return (
                    <div className={'p-4 text-white bg-primary_20'}>
                        <p>{time}</p>
                        {data && renderContentTooltip({categoryChart, data})}
                    </div>
                );
            }
            return null;
        }}
        />
    )
};


const renderContentTooltip: React.FC<{ categoryChart: CATEGORY_CHART, data: Data }> = ({categoryChart, data}) => {
    switch (categoryChart) {
        case CATEGORY_CHART.WIND :
            return <ContentWind data={data}/>
        case CATEGORY_CHART.RAINFALL:
            return <ContentRainfall data={data}/>
        default:
            return <ContentTemp data={data}/>
    }

};

const ContentTemp: React.FC<ContentProps> = ({data}) => (
    <>
        <p>Температура: {data.temp}</p>
        <p>Ощущается: {data.feelsLike}</p>
        <p>Влажность: {data.humidity}%</p>
    </>
);

const ContentWind: React.FC<ContentProps> = ({data}) => (
    <>
        <p>Скорость: {data.windSpeed} м/сек.</p>
        <p>Порыв: {data.windGust} м/сек.</p>
        <p>Направление:
            <img alt={'arrow'} src={iconArrow} className={'w-[2rem] h-auto'}
                 style={{transform: `rotate(${data.windDeg}deg)`}}
            />
        </p>

    </>
);

const ContentRainfall: React.FC<ContentProps> = ({data}) => (
    <p>Влажность: {data.humidity}%</p>
);