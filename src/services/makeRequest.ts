import {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import {axiosJson} from "./axiosService.ts";

type HttpMethod = 'get';

export const makeRequest = async (
    method: HttpMethod,
    url: string,
    params: Record<string, any> | null = null,
    options: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
    try {
        if (method.toLowerCase() !== 'get') {
            throw new SyntaxError('Ошибка! Доступен только GET запрос.');
        }

        const config: AxiosRequestConfig = {
            method,
            url,
            params,
            ...options,
        };

        return await axiosJson(config);
    } catch (error) {
        const axiosError = error as AxiosError;

        switch (axiosError.name) {
            case "SyntaxError":
                console.debug(axiosError.message);
                break;
            case "CanceledError":
            case "AbortError":
                console.debug('Выполнен обрыв запроса');
                break;
            default:
                console.debug(`Ошибка при выполнении запроса ${method} ${url}:`, axiosError);
                throw new Error('Произошла ошибка при выполнении запроса.');
        }
        return {} as AxiosResponse;
    }
};