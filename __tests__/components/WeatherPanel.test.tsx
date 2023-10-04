import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
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
        const tempLabel = await waitFor(() => screen.queryByTestId('temp-label'));
        expect(tempLabel?.props.children).toEqual('99 ° C');

        const feelsLikeLabel = await waitFor(() => screen.queryByTestId('feels-like-label'));
        expect(feelsLikeLabel?.props.children).toEqual('99 ° C');

        const cloudCoverageLabel = await waitFor(() => screen.queryByTestId('cloud-coverage-label'));
        expect(cloudCoverageLabel?.props.children).toEqual('99 %');

        const humidityLabel = await waitFor(() => screen.queryByTestId('humidity-label'));
        expect(humidityLabel?.props.children).toEqual('99 %');

        const windDirectionLabel = await waitFor(() => screen.queryByTestId('wind-direction-label'));
        expect(windDirectionLabel?.props.children).toEqual('XX');

        const windSpeedLabel = await waitFor(() => screen.queryByTestId('wind-speed-label'));
        expect(windSpeedLabel?.props.children).toEqual('99 km/h');
    });

    it("renders correctly on imperial system", async () => {
        render(<WeatherPanel weather={WEATHER} imperial={true}/>);

        const tempLabel = await waitFor(() => screen.queryByTestId('temp-label'));
        expect(tempLabel?.props.children).toEqual('99 ° F');

        const feelsLikeLabel = await waitFor(() => screen.queryByTestId('feels-like-label'));
        expect(feelsLikeLabel?.props.children).toEqual('99 ° F');

        const cloudCoverageLabel = await waitFor(() => screen.queryByTestId('cloud-coverage-label'));
        expect(cloudCoverageLabel?.props.children).toEqual('99 %');

        const humidityLabel = await waitFor(() => screen.queryByTestId('humidity-label'));
        expect(humidityLabel?.props.children).toEqual('99 %');

        const windDirectionLabel = await waitFor(() => screen.queryByTestId('wind-direction-label'));
        expect(windDirectionLabel?.props.children).toEqual('XX');

        const windSpeedLabel = await waitFor(() => screen.queryByTestId('wind-speed-label'));
        expect(windSpeedLabel?.props.children).toEqual('99 m/h');
    });

    it("renders correctly when no data available", async () => {
        render(<WeatherPanel weather={undefined} imperial={false} />);

        const tempLabel = await waitFor(() => screen.queryByTestId('temp_label'));
        expect(tempLabel).toBeNull();

        const feelsLikeLabel = await waitFor(() => screen.queryByTestId('feels_like_label'));
        expect(feelsLikeLabel).toBeNull();

        const cloudCoverageLabel = await waitFor(() => screen.queryByTestId('cloud_coverage_label'));
        expect(cloudCoverageLabel).toBeNull();

        const humidityLabel = await waitFor(() => screen.queryByTestId('humidity_label'));
        expect(humidityLabel).toBeNull();

        const windDirectionLabel = await waitFor(() => screen.queryByTestId('wind_direction_label'));
        expect(windDirectionLabel).toBeNull();

        const windSpeedLabel = await waitFor(() => screen.queryByTestId('wind_speed_label'));
        expect(windSpeedLabel).toBeNull();
    });


});