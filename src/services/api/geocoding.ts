import {makeRequest} from "../makeRequest.ts";

export const getGeoData = async (
    q: string,
    limit: number,
    appid: string,
    signal?: AbortSignal
) => {
    return makeRequest('get', '/geo/1.0/direct', {q, limit, appid}, {signal});
};