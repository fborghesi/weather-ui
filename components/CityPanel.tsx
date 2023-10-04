import { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground, Text, ImageSourcePropType } from "react-native";
import * as Progress from 'react-native-progress';


const cityIdImgMap = {
    'default': require(`../assets/images/cities/earth.jpg`),
    'America/Argentina/Buenos_Aires': require(`../assets/images/cities/buenos_aires.jpg`),
    'Europe/London': require(`../assets/images/cities/london.jpg`),
    'Europe/Rome': require(`../assets/images/cities/rome.jpg`),
    'Australia/Sydney': require(`../assets/images/cities/sydney.jpg`),
}

interface CityPanelProps {
    cityName: string,
    cityId: string,
};

const CityPanel = (props: CityPanelProps) => {
    const [backgroundImg, setBackgroundImg] = useState<ImageSourcePropType|null>(null);
    
    useEffect(() => {
        let image = cityIdImgMap['default'];
        if (props.cityId && props.cityId in cityIdImgMap) {
            image = cityIdImgMap[props.cityId];
        }
        setBackgroundImg(image);
    }, []);
    
    if (backgroundImg === null) {
        return <Progress.Circle size={30} indeterminate={true} />
    }


    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImg} style={styles.cityBackgroundImg} imageStyle={{opacity: 0.9}}>
                <Text style={styles.cityNameText}>{props.cityName}</Text>
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