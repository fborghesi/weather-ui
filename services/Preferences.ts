import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFERRED_CITIES_KEY = 'PREFERRED_CITIES';

class Preferences {
    constructor() {
    }

    async getPreferredCities(): Promise<string[]> {
        const value = await AsyncStorage.getItem(PREFERRED_CITIES_KEY);
        if (!value) {
            return [];
        }

        return JSON.parse(value) as string[];
    }

    async setPreferredCities(cityNames: string[]) {
        AsyncStorage.setItem(PREFERRED_CITIES_KEY, JSON.stringify(cityNames));
    }

};

export default Preferences;

