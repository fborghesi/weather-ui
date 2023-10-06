import { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground, Text, ImageSourcePropType } from "react-native";
import * as Progress from 'react-native-progress';
import { CityService } from "../services/CityService";

const DEFAULT_CITY_IMG = require(`../assets/images/cities/earth.jpg`);

interface CityPanelProps {
    cityName: string,
    cityId: string,
};

const CityPanel = (props: CityPanelProps) => {
    const [backgroundImg, setBackground] = useState<ImageSourcePropType|null>(null);
    
    useEffect(() => {
        const city = CityService.getCityById(props.cityId);
        setBackground(city ? city.background : DEFAULT_CITY_IMG);
    }, [props.cityId]);
    
    if (backgroundImg === null) {
        return <Progress.Circle size={30} indeterminate={true} />
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImg} style={styles.cityBackgroundImg} imageStyle={{opacity: 0.9}}>
                <Text style={styles.cityNameText} testID="city-name-label">{props.cityName}</Text>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '50%',
        width: '100%',
    },
    cityNameText: {
        fontWeight: 'bold',
        fontSize: 36,
    },
    cityBackgroundImg: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
});


export default CityPanel;