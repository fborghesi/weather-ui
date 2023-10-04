import axios from 'axios';
import Weather from "../types/Weather";

const axiosInstance = axios.create({
    baseURL: 'https://api.weatherapi.com',
    timeout: 10 * 1000, 
    headers: {
      'Content-Type': 'application/json',
    },
});

class WeatherAPI {
    private apiKey: string;
    private weatherBasePath: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.weatherBasePath = `/v1/current.json?key=${apiKey}&aqi=no&q=`;
    }

    async getWeather(cityName: string): Promise<Weather> {
        let weather: Weather = null;

        try {
            const url = this.weatherBasePath + encodeURIComponent(cityName);
            const response = await axiosInstance.get(url);
            if (response.status >= 400) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            weather = response.data as Weather; 
            console.log(weather.current);
        }
        catch(error) {
            console.error(error);
            throw new Error(`Could not fetch Weather data for "${cityName}", message was ${error.message}`);
        }
        
        return weather;
    }

    async getWeatherMultiple(cityNames: string[]): Promise<Weather[]> {
        const calls = Array<Promise<Weather>>();
        cityNames.forEach((cityName: string) => {
            const call = this.getWeather(cityName);
            calls.push(call);
        });

        return Promise.all(calls);
    }
};

export default WeatherAPI;