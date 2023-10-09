import WeatherAPI from "./WeatherAPI";

class WeatherAPIError extends Error {
    public cityName: string;
    public httpCode: number;
    public msg: string;
    public apiCode: number;


    constructor(msg: string, cityName: string, httpCode: number, apiCode: number) {
        super(`Could not fetch Weather data for "${cityName}", message was ${msg}`);
        this.cityName = cityName;
        this.httpCode = httpCode;
        this.apiCode = apiCode;
        Object.setPrototypeOf(this, WeatherAPIError.prototype);
    }
   
}

export default WeatherAPIError;