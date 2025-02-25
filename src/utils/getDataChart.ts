import {CATEGORY_CHART} from "../config/envData";

interface YAxisData {
    dataKey: string;
    labelValue: string;
    isInvariable: boolean;
    minResize: number;
    maxResize: number;
}

interface LineData {
    dataKey: string;
    description: string;
    hasLabel: boolean;
    lineColor: string;
    labelColor: string | null;
    labelSize: number | null;
}

interface DataChart {
    category: CATEGORY_CHART;
    yaxisData: YAxisData;
    lineData: LineData[];
}

const createYAxis = (
    dataKey: string,
    labelValue: string,
    isInvariable: boolean,
    minResize: number,
    maxResize: number
): YAxisData => {
    return {dataKey, labelValue, isInvariable, minResize, maxResize};
};

const createLine = (
    dataKey: string,
    description: string,
    hasLabel: boolean,
    lineColor: string,
    labelColor: string | null = null,
    labelSize: number | null = null
): LineData => {
    return {dataKey, description, hasLabel, lineColor, labelColor, labelSize};
};

export const getDataChart = (categoryChart: CATEGORY_CHART): DataChart | undefined => {
    switch (categoryChart) {
        case CATEGORY_CHART.TEMP:
            return {
                category: CATEGORY_CHART.TEMP,
                yaxisData: createYAxis('temp', '°C', false, 10, 10),
                lineData: [
                    createLine('temp', 'Температура', true, '#3029FFFF', 'rgba(255, 255, 255)', 20),
                    createLine('feelsLike', 'Ощущается', true, '#FF9924FF', 'rgba(255, 255, 255)', 20),
                ]
            }
        case CATEGORY_CHART.WIND:
            return {
                category: CATEGORY_CHART.WIND,
                yaxisData: createYAxis('windSpeed', 'м/сек', false, 1, 10),
                lineData: [
                    createLine('windSpeed', 'Скорость', true, '#3029FFFF', 'rgba(255, 255, 255)', 20),
                    createLine('windGust', 'Порыв', true, '#FF9924FF', 'rgba(255, 255, 255)', 20),
                ]
            }
        case CATEGORY_CHART.RAINFALL:
            return {
                category: CATEGORY_CHART.RAINFALL,
                yaxisData: createYAxis('pop', 'Вероятность осадков', true, 0, 100),
                lineData: [
                    createLine('pop', 'Вероятность осадков', false, '#3029FFFF'),
                ]
            }
        default:
            return undefined;
    }
}