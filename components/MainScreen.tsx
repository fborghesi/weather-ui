import { useEffect, useState, useRef } from 'react';
import * as Progress from 'react-native-progress';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Weather from '../types/Weather';
import WeatherPanel from '../components/WeatherPanel';
import CityPanel from './CityPanel';
import WeatherAPI from '../services/WeatherAPI';
import { API_KEY } from "@env";

const defaultCities = ['Sydney', 'Rome', 'London', 'Buenos Aires'];

const MainScreen = () => {
    const weatherApi = new WeatherAPI(API_KEY);
    const [entries, setEntries] = useState<Array<Weather>>(Array<Weather>());
    const [errorMessage, setErrorMessage] = useState<String|null>(null);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    useEffect(() => {
        async function updateWeather(cities) {
            setErrorMessage(null);
            try {
                const entries = await weatherApi.getWeatherMultiple(cities);
                setEntries(entries);    
            }
            catch(error) {
                setErrorMessage(`Failed to load wather data: ${error.message}`);
            }
        };
        
        updateWeather(defaultCities);
    }, []);
    
    if (errorMessage) {
        return <Text style={styles.errorMessage}>{errorMessage}</Text>
    }

    if (entries.length === 0) {
        return <Progress.Circle size={30} indeterminate={true} />
    }

    const _renderItem = (item: { item: Weather; index: number }) => {
        const weather = item.item;
        return (
            <View style={styles.slide}>
                <CityPanel 
                    cityName={weather ? weather.location.name : ""}
                    cityId={weather ? weather.location.tz_id : ""}
                />
                <WeatherPanel weather={weather} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Carousel
                sliderHeight={height}
                sliderWidth={width}
                data={entries}
                renderItem={_renderItem}                
                itemWidth={350}
                vertical={false}
                onSnapToItem={(index) => console.log('current index:', index)}  
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',

    },
    carousel: {
        backgroundColor: '#ffffff',
    },
    slide: {
        width: '100%',
        height: '90%',
        marginTop: 30,
        borderRadius: 18,
        justifyContent: "space-around",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#ffffff",

    },
    errorMessage: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'red',
    },
});

export default MainScreen;
