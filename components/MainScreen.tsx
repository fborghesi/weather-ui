import { useEffect, useState, useRef } from 'react';
import * as Progress from 'react-native-progress';
import { StyleSheet, View, Dimensions, Text, Pressable } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Weather from '@/types/Weather';
import WeatherPanel from '../components/WeatherPanel';
import CityPanel from './CityPanel';
import WeatherAPI from '../services/WeatherAPI';
import Preferences from '../services/Preferences';
import { API_KEY } from "@env";
import CitySelectorDialog from './CitySelectorDialog';

const defaultCities = ['Buenos Aires'];
const preferences = new Preferences();

const MainScreen = () => {
    const weatherApi = new WeatherAPI(API_KEY);
    const [preferredCities, setPreferredCities] = useState<string[] | null>(null);
    const [entries, setEntries] = useState<Array<Weather>>(Array<Weather>());
    const [errorMessage, setErrorMessage] = useState<String|null>(null);
    const [citySelectorVisible, setCitySelectorVisible] = useState<boolean>(false);
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
        
        async function updatePreferredCities() {
            const cities = await preferences.getPreferredCities();
            if (cities.length) {
                updateWeather(cities);        
            }
            else {
                updateWeather([defaultCities]);
            }
        }
        
        updatePreferredCities();
        
    }, [preferredCities]);

    const addRemoveCitiesHandler = () => {
        setCitySelectorVisible(true);
    };

    const citySelectorCloseHandler = (cityNames: string[]) => {
        if (cityNames) {
            preferences.setPreferredCities(cityNames);
            setPreferredCities(cityNames);
        }

        setCitySelectorVisible(false);
    };
    
    if (errorMessage) {
        return <Text style={styles.errorMessage}>{errorMessage}</Text>
    }

    if (citySelectorVisible) {
        return <CitySelectorDialog onClose={citySelectorCloseHandler} cityNames={entries.map(c => c.location.name)}/>
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
            <Pressable onPress={addRemoveCitiesHandler} style={styles.button}>
                <Text style={styles.buttonText}>Add/Remove Cities</Text>
            </Pressable>
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#1976d2',
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default MainScreen;
