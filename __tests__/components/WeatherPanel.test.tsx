import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Weather from 'types/Weather';
import WeatherPanel from "@/components/WeatherPanel";

const WEATHER: Weather = {
    location: {},
    current: {
        temp_c: 99,
        temp_f: 99,
        condition: {
            code: 99,
        },
        cloud: 99,
        wind_mph: 99,
        wind_kph: 99,
        wind_dir: 'XX', 
        humidity: 99,
        feelslike_c: 99,
        feelslike_f: 99,
    },
} as Weather;

describe("Weather Panel testing", () => {
    
    it("renders correctly on metric", async () => {
        render(<WeatherPanel weather={WEATHER} imperial={false} />);

        const tempLabel = screen.getByTestId('temp_label').props.children.join('');
        expect(tempLabel).toEqual(' 99 ° C');

        const feelsLikeLabel = screen.getByTestId('feels_like_label').props.children.join('');
        expect(feelsLikeLabel).toEqual(' 99 ° C');

        const cloudCoverageLabel = screen.getByTestId('cloud_coverage_label').props.children.join('');
        expect(cloudCoverageLabel).toEqual(' 99 %');

        const humidityLabel = screen.getByTestId('humidity_label').props.children.join('');
        expect(humidityLabel).toEqual(' 99 %');

        const windDirectionLabel = screen.getByTestId('wind_direction_label').props.children.join('');
        expect(windDirectionLabel).toEqual(' XX');

        const windSpeedLabel = screen.getByTestId('wind_speed_label').props.children.join('');
        expect(windSpeedLabel).toEqual(' 99 km/h');
    });

    it("renders correctly on imperial system", async () => {
        render(<WeatherPanel weather={WEATHER} imperial={true}/>);

        const tempLabel = screen.getByTestId('temp_label').props.children.join('');
        expect(tempLabel).toEqual(' 99 ° F');

        const feelsLikeLabel = screen.getByTestId('feels_like_label').props.children.join('');
        expect(feelsLikeLabel).toEqual(' 99 ° F');

        const cloudCoverageLabel = screen.getByTestId('cloud_coverage_label').props.children.join('');
        expect(cloudCoverageLabel).toEqual(' 99 %');

        const humidityLabel = screen.getByTestId('humidity_label').props.children.join('');
        expect(humidityLabel).toEqual(' 99 %');

        const windDirectionLabel = screen.getByTestId('wind_direction_label').props.children.join('');
        expect(windDirectionLabel).toEqual(' XX');

        const windSpeedLabel = screen.getByTestId('wind_speed_label').props.children.join('');
        expect(windSpeedLabel).toEqual(' 99 m/h');
    });


});