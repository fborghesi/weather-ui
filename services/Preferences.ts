import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PREFERRED_CITIES_KEY = 'PREFERRED_CITIES';
const WEATHER_API_KEY = 'WEATHER_API_KEY';

const Preferences = {

     getPreferredCities: async (): Promise<string[]> => {
        const value = await AsyncStorage.getItem(PREFERRED_CITIES_KEY);
        if (!value) {
            return [];
        }

        return JSON.parse(value) as string[];
    },

    setPreferredCities: async (cityNames: string[]) => {
        AsyncStorage.setItem(PREFERRED_CITIES_KEY, JSON.stringify(cityNames));
    },

    getWeatherAPIKey: async (): Promise<string> => {
        const value = await AsyncStorage.getItem(WEATHER_API_KEY);
        return value ? value : null;
    },

    setWeatherAPIKey: async (newKey: string) => {
        AsyncStorage.setItem(WEATHER_API_KEY, newKey);
    },

};

export default Preferences;

