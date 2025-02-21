import {geo, weather} from "./api.ts";
import {API_KEY} from "../config/envData.ts";
import {transformWeatherData} from "../utils/transformWeatherData.ts";

interface CityData {
    name: string;
    lat: number;
    lon: number;
}

interface WeatherData {
    city?: {
        sunrise: number;
        sunset: number;
    };
    list?: Array<{
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
    }>;
}

export const getWeather = async (cityName: string, signal?: AbortSignal): Promise<ReturnType<typeof transformWeatherData> | null> => {
    try {
        const cityData = await geo.getGeoData(cityName, 5, API_KEY, signal);

        if (!cityData?.data?.length) throw new Error("Город не найден.");


        const currentCity: CityData | undefined = cityData.data.find(
            (city: CityData) => city.name.toLowerCase() === cityName.toLowerCase()
        );

        if (!currentCity) throw new Error("Город не найден.");

        const {name, lat, lon} = currentCity;
        const {data: weatherData}: { data: WeatherData } = await weather.getWeatherInCity(lat, lon, API_KEY, signal);

        if (!weatherData?.city || !weatherData.list) throw new Error("Данные о погоде не найдены.");


        return transformWeatherData(
            {name, sunrise: weatherData.city.sunrise, sunset: weatherData.city.sunset},
            weatherData.list
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name !== "AbortError" && error.name !== "CanceledError") {
                console.debug("Ошибка при получении данных о погоде:", error.message);
                throw error;
            }
        } else {
            console.debug("Неизвестная ошибка:", error);
        }
        return null;
    }
};