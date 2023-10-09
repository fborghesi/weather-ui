import { StyleSheet, Text, View } from 'react-native';
import BaseDialog from './BaseDialog';

interface GernericFallbackDialog {
    message: string,
};

const GernericFallbackDialog = (props: GernericFallbackDialog) => {
    return (
        <BaseDialog title="An unexpected error was found">
            <Text style={styles.errorMessage}>{props.message}</Text>            
        </BaseDialog>
    );
};

const styles = StyleSheet.create({
    errorTitle: {
		fontWeight: 'bold',
		fontSize: 18,
		color: 'red',	
    },
	errorMessage: {
		fontStyle: 'italic',
		fontSize: 14,
		color: 'red',
    },
});

export default GernericFallbackDialog;