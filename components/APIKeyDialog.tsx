import { useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable } from 'react-native';
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
                <Text style={styles.explainMsg}>The API Key provided was rejected by the server. You may provide a new API Key to fix the problem below:</Text>
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
});

export default APIKeyDialog;