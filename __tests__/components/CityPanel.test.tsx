import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import CityPanel from "@/components/CityPanel";


describe("Weather Panel testing", () => {
    
    it("renders correctly", async () => {
        render(<CityPanel cityName="Test City" cityId="the-test-city"/>)
        
        const cityNameLabel = await waitFor(() => screen.queryByTestId("city-name-label"));
        expect(cityNameLabel.props.children).toEqual("Test City");
    });
});