import { useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable} from 'react-native';
import * as Linking from 'expo-linking';
import BaseDialog from './BaseDialog';

const GENERIC_CITY_BKG = require('../assets/images/generic-city.jpg');

type NewKeyProvidedHandler = (newKey: string) => void;

interface APIKeyDialogProps {
    apiKey: string,
    onNewKeyProvided: NewKeyProvidedHandler,
};

const APIKeyDialog = (props: APIKeyDialogProps) => {
    const [newKey, setNewKey] = useState<string>(props.apiKey);

    const newKeyChangeHandler = (text: string) => {
        setNewKey(text);
    };

    return (
        <BaseDialog title="Invalid API Key">
                <Text style={styles.explainMsg}>The API Key provided was rejected by the server.</Text>
                <Text>Please provide a valid API key to fix this problem, if you don't have it you'll want to visit WeatherAPI.com to get one:</Text>
                
                <Pressable onPress={() => Linking.openURL('https://api.weatherapi.com')} style={styles.linkButton}>
                    <Text style={styles.linkText}>Visit WeatherAPI.com</Text>
                </Pressable>

                <TextInput
                    style={styles.input}
                    value={newKey}
                    onChangeText={newKeyChangeHandler}
                    placeholder="Enter the API key here"
                />
            
                <Pressable onPress={() => props.onNewKeyProvided(newKey)} style={styles.button}>
                    <Text style={styles.buttonText}>Set Key</Text>
                </Pressable>
        </BaseDialog>
    );
};

const styles = StyleSheet.create({
	explainMsg: {
		fontStyle: 'italic',
    },
    input: {
        height: 40,
        width: '100%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
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
    linkButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'transparent',
        borderColor: '#1976d2',
        borderWidth: 2,
    },
    linkText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#1976d2',
    },

});

export default APIKeyDialog;