import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary';
import MainScreen from './components/MainScreen';
import Preferences from './services/Preferences';

import WeatherAPI from './services/WeatherAPI';
import GernericFallbackDialog from './components/GernericFallbackDialog';

import { API_KEY } from "@env";


const initWeatherAPI = async () => {
    let apiKey;
    if (API_KEY) {
        apiKey = API_KEY;
        Preferences.setWeatherAPIKey(apiKey);
    }
    else {
        apiKey = Preferences.getWeatherAPIKey();
    }
    WeatherAPI.setAPIKey(apiKey);
};

initWeatherAPI();

export default function App() {

    const _renderError = ({ error, resetErrorBoundary }) => {
        return (
            <GernericFallbackDialog message={error.message} />
        );
    };
 
	return (
		<View style={styles.container}>
			<ErrorBoundary 
				onError={(error) => console.log('Error captured by ErrorBoundary', error)}
				fallbackRender={_renderError}>

				<MainScreen />
				<StatusBar style="auto" />
			</ErrorBoundary>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	errorMessage: {
		fontWeight: 'bold',
		fontSize: 14,
		color: 'red',
	},
});
