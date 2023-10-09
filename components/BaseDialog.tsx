import { ReactNode } from "react";
import { StyleSheet, ImageBackground, View, Text} from 'react-native';


const GENERIC_CITY_BKG = require('../assets/images/generic-city.jpg');

interface BaseDialogProps {
    children: ReactNode;
    title: string;
};

const BaseDialog = (props: BaseDialogProps) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={GENERIC_CITY_BKG} imageStyle={{opacity: 0.3}} style={styles.background}>
                <Text style={styles.title}>{props.title}</Text>
                {props.children}
            </ImageBackground>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
		fontWeight: 'bold',
		fontSize: 18,
		color: 'black',	
    },
    background: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BaseDialog;