# weather-ui
This is a React Native test project which displays weather information for a 
list of well-known cities.

## Usage
First, you'll need to clone this project in your system:

```bash
git clone https://github.com/fborghesi/weather-ui.git
```

Then you'll need to get an API key from the WeatherAPI service, since that's
where the weather data is being obtained from. To do so you'll need to point
your browser to the (WeatherAPI's website)[https://www.weatherapi.com/] and 
hit the sign up link. Once your account is created and valdidated, you'll get
an API Key you can use to identify your application.

Now all you need to do is copy the `dot.env.example` file in the root folder
in this project to `.env`, and update the api key you got in the previous
paragraph:

```properties
API_KEY=the new API Key here
```

Finally, you can start the project with:
```bash
npm start
```

That's it!



