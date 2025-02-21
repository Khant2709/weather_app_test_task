import React, {useCallback, useEffect, useMemo, useState} from "react";

import WeatherChart from "./WeatherChart/WeatherChart";

import PreloaderComponent from "../../components/ui/PreloaderComponent/PreloaderComponent.tsx";
import ErrorComponent from "../../components/ui/ErrorComponent/ErrorComponent.tsx";
import HeaderChartComponent from "../../components/ui/HeaderChartComponent/HeaderChartComponent.tsx";
import SunComponent from "../../components/ui/sunComponent/sunComponent.tsx";
import TimeRange from "../../components/ui/TimeRange/TimeRange.tsx";

import {getWeather} from "../../services/weatherService.ts";

import {getDataChart} from "../../utils/getDataChart.ts";

import {CATEGORY_CHART} from "../../config/envData.ts";

interface ListItem {
    dt: string;
    date: string | undefined;
    time: string | undefined;
    temp: number;
    feelsLike: number;
    humidity: number;
    pop: number;
    windDeg: number;
    windSpeed: number;
}

interface TransformedWeatherData {
    cityName: string;
    sunrise: number;
    sunset: number;
    list: ListItem[];
}

const WrapperWeatherComponent: React.FC = () => {
    const [cityName, setCityName] = useState<string>('');
    const [data, setData] = useState<TransformedWeatherData | null>(null);
    const [categoryChart, setCategoryChart] = useState<CATEGORY_CHART>(CATEGORY_CHART.TEMP);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [timeInterval, setTimeInterval] = useState<3 | 6 | 12 | 24>(3);

    useEffect(() => {
        if (!cityName) {
            setData(null);
            setError(null);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        setError(null);
        setLoading(true);

        const timeout = setTimeout(() => {
            getWeather(cityName, controller.signal)
                .then((response) => {
                    if (response) {
                        setData(response);
                    } else {
                        setData(null);
                        setError("Произошла ошибка при получении данных.");
                    }
                })
                .catch((error) => {
                    setData(null);
                    setError(error.message || "Ошибка при загрузке данных.");
                })
                .finally(() => setLoading(false));
        }, 1000);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [cityName]);

    const handleChangeCategory = useCallback((category: CATEGORY_CHART): void => {
        if (category !== categoryChart) {
            setCategoryChart(category);
        }
    }, [categoryChart]);

    const handleChangeInterval = useCallback((interval: 3 | 6 | 12 | 24): void => {
        if (interval !== timeInterval) {
            setTimeInterval(interval);
        }
    }, [timeInterval]);

    const dataChart = useMemo(() => getDataChart(categoryChart), [categoryChart]);

    const filteredData = useMemo(() => {
        const step = Math.floor(timeInterval / 3);
        return data?.list ? data.list.filter((_, i) => (i % step) === 0) : [];
    }, [data, timeInterval]);

    return (
        <section className={`w-full mx-auto px-4 flex flex-col gap-8 
                            md:px-16 md:px-8`}
        >
            <input className={`w-full mx-auto bg-[#6167A166] p-4 text-base rounded-lg
                               md:w-xl md:text-xl`}
                   placeholder={'Введите город'}
                   value={cityName}
                   onChange={(e) => setCityName(e.target.value)}
            />
            {loading && <PreloaderComponent/>}
            {error && <ErrorComponent error={error}/>}

            {data && <>
                <HeaderChartComponent key="header"
                                      cityName={cityName}
                                      categoryChart={categoryChart}
                                      handleChangeCategory={handleChangeCategory}
                />
                {dataChart &&
                <WeatherChart key="chart" data={filteredData} dataChart={dataChart}/>}
                <TimeRange key="timeRange" timeInterval={timeInterval} handleChangeInterval={handleChangeInterval}/>
                <SunComponent key="sunTime" sunrise={data.sunrise} sunset={data.sunset}/>
            </>}
        </section>
    );
};

export default WrapperWeatherComponent;
