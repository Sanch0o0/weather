export class WeatherApi {
    constructor() {
        this.weatherData = null;
    }

    static async searhWeatherCity(city) {

        await WeatherApi.searchWeatherByCity(city);

        const allDays = this.getAllDays(this.weatherData)
        const weatherByDay = this.groupByDays(this.weatherData, allDays)

        return { allDays, weatherByDay }
    }

    static async searchWeatherByCity(city) {
        await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b622fa82fef15f1eeb49fcbcdc04de9a&units=metric`)
            .then(res => res.json())
            .then((data) => {
                this.weatherData = data.list;
            });
    }

    static getAllDays(weatherData) {
        let data = [];

        weatherData.forEach(element => {
            data[data.length] = new Date(element.dt_txt).getDate()
        });

        return [...(data = new Set(data))]
    }


    static groupByDays(weatherData, date) {
        let groupWeather = {};

        for (let i = 0; i < date.length; i++) {
            groupWeather[date[i]] = [];
            for (let n = 0; n < weatherData.length; n++) {
                if (new Date(weatherData[n].dt_txt).getDate() === date[i]) {
                    groupWeather[date[i]].push(weatherData[n]);
                }
            }
        }

        return groupWeather;
    }
}