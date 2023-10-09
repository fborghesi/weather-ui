import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { CheckBoxList, CheckBoxListItem } from './CheckBoxList';
import { CityService } from '../services/CityService';
import BaseDialog from './BaseDialog';

type CitySelectorDialogCloseHandler = (cityNames: string[]) => void;

interface CitySelectorDialogProperties {
    onClose:  CitySelectorDialogCloseHandler;
    cityNames?: string[],
};

const CitySelectorDialog = (props: CitySelectorDialogProperties) => {
    const [cityData, setCityData] = useState<CheckBoxListItem[]>([]);

    useEffect(() => {
        const allCities = CityService.getCities();
        const data = allCities.map(c => {
            return {...c, checked: props.cityNames && props.cityNames.includes(c.text)};
        });
        setCityData(data);
    }, [props.cityNames]);
    
    return (
        <BaseDialog title="City Selection">
            <CheckBoxList items={cityData}/>

            <View style={styles.buttonBar}>
                <Pressable onPress={() => props.onClose(cityData.filter(c => c.checked).map(c => c.text))} style={styles.okButton}>
                    <Text style={styles.buttonText}>Ok</Text>
                </Pressable>

                <Pressable onPress={() => props.onClose(undefined)} style={styles.cancelButton}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>

            </View>
        </BaseDialog>
    );

};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    background: {
        width: '100%',
        height: '100%',
    },
    buttonBar: {
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingTop: 60,
    },
    okButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#4caf50',
    },
    cancelButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#ef5350',
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default CitySelectorDialog;