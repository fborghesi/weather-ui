import axios from 'axios';
import Weather from "../types/Weather";
import WeatherAPIError from './WeatherAPIError';

let _apiKey = null;
let _weatherBasePath = null;

const axiosInstance = axios.create({
    baseURL: 'https://api.weatherapi.com',
    timeout: 10 * 1000, 
    headers: {
      'Content-Type': 'application/json',
    },
});

const WeatherAPI = {
    setAPIKey: (apiKey: string) => {
        _apiKey = apiKey;
        _weatherBasePath = `/v1/current.json?key=${apiKey}&aqi=no&q=`;
    },

    getWeather: async (cityName: string): Promise<Weather> => {
        let weather: Weather = null;

        try {
            const url = _weatherBasePath + encodeURIComponent(cityName);
            const response = await axiosInstance.get(url);

            weather = response.data as Weather; 
            console.log(weather.current);
        }
        catch(error) {
            console.error(error);
            let httpCode = 0, apiCode = 0, msg = error.message;
            if (error.response) {
                httpCode = error.response.status;
                if (error.response.data && error.response.data.error) {
                    apiCode = error.response.data.error.code;
                    msg = error.response.data.error.message;
                }
            }
            throw new WeatherAPIError(msg, cityName, httpCode, apiCode);
        }
        
        return weather;
    },

    getWeatherMultiple: async(cityNames: string[]): Promise<Weather[]> => {
        const calls = Array<Promise<Weather>>();
        cityNames.forEach((cityName: string) => {
            const call = WeatherAPI.getWeather(cityName);
            calls.push(call);
        });

        return Promise.all(calls);
    },
};

export default WeatherAPI;