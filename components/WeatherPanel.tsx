import * as Progress from 'react-native-progress';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, ImageSourcePropType } from 'react-native';
import Weather from '../types/Weather';

interface WeatherPanelProps {
    weather: Weather,
    imperial?: boolean,    
};

const weatherCodeImgMap = {
    '1000': require(`../assets/images/weather/sunny-background.jpg`),
    '1003': require(`../assets/images/weather/partly-cloudy-background.jpg`),
    '1009': require(`../assets/images/weather/night-background.jpg`),
    '1030': require(`../assets/images/weather/mist-background.jpg`),
};

class LabelText {
    temp: string;
    feelsLike: string;
    cloudCoverage: string;
    humidity: string;
    windSpeed: string;
    windDir: string;

    constructor(temp: string = '', feelsLike: string = '', 
    cloudCoverage: string = '', humidity: string = '', windSpeed: string = '',
    windDir: string = '') {
        this.temp = temp;
        this.feelsLike = feelsLike; 
        this.cloudCoverage = cloudCoverage;
        this.humidity  = humidity; 
        this.windSpeed = windSpeed; 
        this.windDir = windDir;
    }
}

const WeatherPanel = (props: WeatherPanelProps) => {
    const [labelText, setLabelText] = useState<LabelText>(new LabelText());
    const [backgroundImg, setBackgroundImg] = useState<ImageSourcePropType|null>(null);

    useEffect(() => {
        if (props.weather) {
            const image = weatherCodeImgMap['' + props.weather.current.condition.code];
            setBackgroundImg(image);
        }
    }, []);

    useEffect(() => {
        let labelText;

        if (props.weather) {
            const temp = `${props.imperial ? props.weather.current.temp_f : props.weather.current.temp_c} ° ${props.imperial ? 'F' : 'C'}`;
            const feelsLike = `${props.imperial ? props.weather.current.feelslike_f: props.weather.current.feelslike_c} ° ${props.imperial ? 'F' : 'C'}`;
            const cloudCoverage = `${props.weather.current.cloud} %`;
            const humidity = `${props.weather.current.humidity} %`;
            const windSpeed = `${props.imperial ? props.weather.current.wind_mph: props.weather.current.wind_kph} ${props.imperial ? 'm' : 'km'}/h`;
            const windDir = `${props.weather.current.wind_dir}`;
            
            labelText = new LabelText(temp, feelsLike, cloudCoverage, 
                humidity, windSpeed, windDir);
        }
        else {
            labelText = new LabelText();
        }

        setLabelText(labelText);
    }, [props.weather]);
    
    if (backgroundImg === null) {
        return <Progress.Circle size={30} indeterminate={true} />
    }

    return (
        <ImageBackground source={backgroundImg} style={styles.backgroundImg} imageStyle={{opacity: 0.5}}>
            <View style={styles.container} testID="weather-container-view">
                <View>
                    <View style={styles.containerRow}>
                        <Text style={styles.label}>Current Temperature: </Text>
                        <Text style={styles.data} testID="temp-label">{labelText.temp}</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.label}>Feels Like: </Text>
                        <Text style={styles.data} testID="feels-like-label">{labelText.feelsLike}</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.label}>Cloud Coverage: </Text>
                        <Text style={styles.data} testID='cloud-coverage-label'>{labelText.cloudCoverage}</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.label}>Humidity: </Text>
                        <Text style={styles.data} testID='humidity-label'>{labelText.humidity}</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.label}>Wind direction: </Text>
                        <Text style={styles.data} testID='wind-direction-label'>{labelText.windDir}</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.label}>Wind speed: </Text>
                        <Text style={styles.data} testID='wind-speed-label'>{labelText.windSpeed}</Text>
                    </View>

                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    containerRow: {
        width: '100%',
        flexDirection: 'row',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    data: {
        fontStyle: 'italic',
        fontSize: 16,
    },
    backgroundImg: {
        flex: 1,
        width: '100%',
    },
});


export default WeatherPanel;