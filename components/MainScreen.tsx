import { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import { StyleSheet, View, Dimensions, Text, Pressable } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Weather from '@/types/Weather';
import WeatherPanel from '../components/WeatherPanel';
import CityPanel from './CityPanel';
import WeatherAPI from '../services/WeatherAPI';
import Preferences from '../services/Preferences';
import CitySelectorDialog from './CitySelectorDialog';
import WeatherAPIError from '../services/WeatherAPIError';
import APIKeyDialog from './APIKeyDialog';

const defaultCities = ['Buenos Aires'];

const MainScreen = () => {
    const [apiKey, setAPIKey] = useState<string | null>(null);
    const [preferredCities, setPreferredCities] = useState<string[] | null>(null);
    const [entries, setEntries] = useState<Array<Weather>>(Array<Weather>());
    const [citySelectorVisible, setCitySelectorVisible] = useState<boolean>(false);
    const [apiKeyFailed, setAPIKeyFailed] = useState<boolean>(false);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    useEffect(() => {
        const loadPreferredCities = async ()  => {
            setAPIKey(await Preferences.getWeatherAPIKey());
            
            const cities = await Preferences.getPreferredCities();
            setPreferredCities(cities ? cities : defaultCities);
        }       
        
        loadPreferredCities();
    }, []);

    
    const _newKeyProvidedHandler = (newKey: string) => {
        Preferences.setWeatherAPIKey(newKey);
        WeatherAPI.setAPIKey(newKey);
        setAPIKeyFailed(false);
    };


    // get weather from API when preferred cities change
    useEffect(() => {
        async function updateWeather(cities) {
            try {
                const entries = await WeatherAPI.getWeatherMultiple(cities);
                setEntries(entries);
            }
            catch(error) {
                if (error instanceof WeatherAPIError) {
                    const weatherAPIError = error as WeatherAPIError;
                    if (weatherAPIError.apiCode === 2008) {
                        setAPIKeyFailed(true);
                    }
                    return;
                }

                throw error;
            }
        };
        
        if (preferredCities) {
            updateWeather(preferredCities);
        }
        
    }, [apiKeyFailed, preferredCities]);

    
    const addRemoveCitiesHandler = () => {
        setCitySelectorVisible(true);
    };

    const citySelectorCloseHandler = (cityNames: string[]) => {
        if (cityNames) {
            Preferences.setPreferredCities(cityNames);
            setPreferredCities(cityNames);
        }

        setCitySelectorVisible(false);
    };

    if (apiKeyFailed) {
        return <APIKeyDialog apiKey={ apiKey } onNewKeyProvided={_newKeyProvidedHandler} />
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
