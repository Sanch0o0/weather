import { EventEmitter } from "./helpers/EventEmitter.js";
import { WeatherApi } from "./services/weather-api.js";

export class Model extends EventEmitter {
    constructor(weatherData) {
        super()

        this.weatherData = weatherData;
        this.searchHistoryList = [];
        this.firstDate;

        this.weatherBox = document.querySelector('.weather-box');
        this.dayBox = document.querySelector('.weather-day-box');
        this.buttonBox = document.querySelector('.button-box');
        this.forecastBox = document.querySelector('.forecast-box');
        this.dailyForecastBox = document.querySelector('.daily-forecast-box');

    }

    async search(city) {
        let data = await WeatherApi.searhWeatherCity(city);

        localStorage.data = JSON.stringify(data);

        this.showAllElements();
    }

    showAllElements() {
        if (document.querySelector('.place-holder')) document.querySelector('.place-holder').classList.add('hidden');

        this.weatherBox.classList.remove('hidden');
        this.forecastBox.classList.remove('hidden');
    }


    show(id) {
        if (this.firstDate) {
            this.firstDate = false;

            [...this.dayBox.children][0].classList.remove('display');
            this.currentDayBox = this.dayBox.querySelector(`#${id}`);
            this.currentDayBox.classList.add('display');

            [...this.buttonBox.children][0].classList.remove('currentButton');
            this.currentButtonBox = this.buttonBox.querySelector(`#${id}`);
            this.currentButtonBox.classList.add('currentButton');

            [...this.dailyForecastBox.children][0].classList.add('hidden');
            this.currentForecastBox = this.dailyForecastBox.querySelector(`#${id}`);
            this.currentForecastBox.classList.remove('hidden');

            this.scrollWidthShow(this.currentForecastBox.offsetWidth, this.currentForecastBox.scrollWidth);

        } else {
            this.currentDayBox.classList.remove('display');
            this.currentDayBox = document.querySelector(`#${id}`);
            this.currentDayBox.classList.add('display');

            this.currentButtonBox.classList.remove('currentButton');
            this.currentButtonBox = this.buttonBox.querySelector(`#${id}`);
            this.currentButtonBox.classList.add('currentButton');

            this.currentForecastBox.classList.add('hidden');
            this.currentForecastBox = this.dailyForecastBox.querySelector(`#${id}`);
            this.currentForecastBox.classList.remove('hidden');

            this.scrollWidthShow(this.currentForecastBox.offsetWidth, this.currentForecastBox.scrollWidth);
        }
    }

    scrollWidthShow(boxWidth, scrollWidth) {
        let rightScrollButt = document.querySelector('.rightScrollButt');

        if (boxWidth < scrollWidth) {
            rightScrollButt.classList.add('hideScrollButton');
        } else rightScrollButt.classList.remove('hideScrollButton');

    }

    scrollWidthBehavior([boxWidth, scrollWidth, scrollPosition]) {
        let leftScrollButt = document.querySelector('.leftScrollButt');
        let rightScrollButt = document.querySelector('.rightScrollButt');

        if (scrollPosition < 50) {
            leftScrollButt.classList.remove('hideScrollButton');
        } else leftScrollButt.classList.add('hideScrollButton');

        if (scrollPosition + boxWidth + 50 >= scrollWidth) {
            rightScrollButt.classList.remove('hideScrollButton');
        } else rightScrollButt.classList.add('hideScrollButton');
    }

    showSearchHistory(onFocus) {
        let searchHistoryBox = document.querySelector('.search-history');

        if (onFocus) {
            searchHistoryBox.classList.add('display-search-history');
            return;
        } else setTimeout(() => searchHistoryBox.classList.remove('display-search-history'), 250);
    }

    addToSearchHistory(city) {
        if (localStorage.getItem('searchHistory')) {
            this.searchHistoryList = JSON.parse(localStorage.searchHistory)
        } else {
            this.searchHistoryList.push(city);
            localStorage.searchHistory = JSON.stringify(this.searchHistoryList);
            return [true, city];
        }

        if (!this.searchHistoryList.includes(city)) {
            this.searchHistoryList.push(city);
            localStorage.searchHistory = JSON.stringify(this.searchHistoryList);
            return [true, city];
        } else return [false];
    }

    deleteHistoryItem(elem) {
        const textElem = elem.textContent;
        JSON.parse(localStorage.searchHistory).map((elem, i, arr) => {
            if (textElem === elem) {
                arr.splice(i, 1);
                localStorage.searchHistory = JSON.stringify(arr);
            }
        })

        elem.remove()
    }

}