import { Image } from "react-native";

interface City {
    id: string,
    text: string,
    background: Image,
};

const CITIES: City[] = [{
    id: 'Europe/Amsterdam',
    text: 'Amsterdam',
    background: require(`../assets/images/cities/amsterdam.jpg`),
}, {
    id: 'America/Argentina/Buenos_Aires',
    text: 'Buenos Aires',
    background: require(`../assets/images/cities/buenos_aires.jpg`),
}, {
    id: 'Europe/London',
    text: 'London',
    background: require(`../assets/images/cities/london.jpg`),
}, {
    id: 'Europe/Madrid',
    text: 'Madrid',
    background: require(`../assets/images/cities/madrid.jpg`),
}, {
    id: 'America/New_York',
    text: 'New York',
    background: require(`../assets/images/cities/newyork.jpg`),
}, {
    id: 'Europe/Rome',
    text: 'Rome',
    background: require(`../assets/images/cities/rome.jpg`),
}, {
    id: 'Europe/Paris',
    text: 'Paris',
    background: require(`../assets/images/cities/paris.jpg`),
}, {
    id: 'Australia/Sydney',
    text: 'Sydney',
    background: require(`../assets/images/cities/sydney.jpg`),
}, {
    id: 'Asia/Tokyo',
    text: 'Tokyo',
    background: require(`../assets/images/cities/tokyo.jpg`),
}];



const CityService = {
    getCities(): City[] {
        return CITIES;
    },

    getCityByName(name: string): City {
        const found = CITIES.filter(c => c.text === name);
        return found ? found[0] : null;
    },

    getCityById(id: string): City {
        const found = CITIES.filter(c => c.id === id);
        return found ? found[0] : null;
    },
};

export { CityService, City };

