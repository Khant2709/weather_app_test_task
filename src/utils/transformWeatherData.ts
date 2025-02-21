import {getDateAndTime} from "./getDateAndTime";

interface CityData {
    name: string;
    sunrise: number;
    sunset: number;
}

interface WeatherPoint {
    dt_txt: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    pop: number;
    wind: {
        deg: number;
        speed: number;
        gust: number;
    };
}

interface TransformedWeatherPoint {
    dt: string;
    time: string | undefined;
    date: string | undefined;
    temp: number;
    feelsLike: number;
    humidity: number;
    pop: number;
    windDeg: number;
    windSpeed: number;
    windGust: number;
}

interface WeatherData {
    cityName: string;
    sunrise: number;
    sunset: number;
    list: TransformedWeatherPoint[];
}

export const transformWeatherData = (cityData: CityData, list: WeatherPoint[]): WeatherData => {
    const transformList: TransformedWeatherPoint[] = list.map((point) => {
        const {time, date} = getDateAndTime(point.dt_txt);
        return {
            dt: point.dt_txt,
            time,
            date,
            temp: Math.round(point.main.temp),
            feelsLike: Math.round(point.main.feels_like),
            humidity: point.main.humidity,
            pop: point.pop * 100,
            windDeg: point.wind.deg,
            windSpeed: Math.round(point.wind.speed),
            windGust: Math.round(point.wind.gust),
        }
    });

    return {
        cityName: cityData.name,
        sunrise: cityData.sunrise,
        sunset: cityData.sunset,
        list: transformList,
    };
};