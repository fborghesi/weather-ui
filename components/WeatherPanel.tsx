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
};


const WeatherPanel = (props: WeatherPanelProps) => {
    const temp = props.imperial ? props.weather.current.temp_f: props.weather.current.temp_c;
    const feelsLike = props.imperial ? props.weather.current.feelslike_f: props.weather.current.feelslike_c;
    const windSpeed = props.imperial ? props.weather.current.wind_mph: props.weather.current.wind_kph;
    const conditionCode = props.weather.current.condition.code;
    const [backgroundImg, setBackgroundImg] = useState<ImageSourcePropType|null>(null);

    useEffect(() => {
        const image = weatherCodeImgMap['' + conditionCode];
        setBackgroundImg(image);
    }, []);

    if (backgroundImg === null) {
        return <Progress.Circle size={30} indeterminate={true} />
    }

    return (
        <ImageBackground source={backgroundImg} style={styles.backgroundImg} imageStyle={{opacity: 0.5}}>
            <View style={styles.container}>
                <View>
                    <View style={styles.containerRow}>
                        <Text style={styles.label}>Current Temperature:</Text>
                        <Text style={styles.data} testID="temp_label"> {temp} &deg; {props.imperial ? 'F' : 'C'}</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.label}>Feels Like:</Text>
                        <Text style={styles.data} testID="feels_like_label"> {feelsLike} &deg; {props.imperial ? 'F' : 'C'}</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.label}>Cloud Coverage:</Text>
                        <Text style={styles.data} testID='cloud_coverage_label'> {props.weather.current.cloud} %</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.label}>Humidity:</Text>
                        <Text style={styles.data} testID='humidity_label'> {props.weather.current.humidity} %</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.label}>Wind direction:</Text>
                        <Text style={styles.data} testID='wind_direction_label'> {props.weather.current.wind_dir}</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.label}>Wind speed:</Text>
                        <Text style={styles.data} testID='wind_speed_label'> {windSpeed} {props.imperial ? "m":"km"}/h</Text>
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