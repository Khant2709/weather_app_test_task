import {makeRequest} from "../makeRequest.ts";

export const getWeatherInCity = async (
    lat: number,
    lon: number,
    appid: string,
    signal?: AbortSignal
) => {
    return makeRequest('get', '/data/2.5/forecast', { lat, lon, appid, units: 'metric' }, { signal });
};