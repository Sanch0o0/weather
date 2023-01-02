import { EventEmitter } from "./helpers/EventEmitter.js";
import { weatherIcon } from "../data/weather-icon.js";
import { getAvarageTemp } from "./helpers/commonHelper.js";

export class View extends EventEmitter {
    constructor(dayWeatherBilder) {
        super();

        this.dayWeatherBilder = dayWeatherBilder;
        this.city = localStorage.getItem('city') || null;
        this.focus = false;

        this.form = document.querySelector('.form');
        this.formInput = document.getElementById('search-input');
        this.searchHistoryContainer = document.querySelector('.search-history');
        this.weatherDayBox = document.querySelector('.weather-day-box');
        this.buttonDay = document.querySelector('.button-box');
        this.dailyForecastBox = document.querySelector('.daily-forecast-box');
        this.scrollButton = document.querySelectorAll('.scrollButton');
        this.addCityButton = document.querySelector('.add-city-button');

        this.formInput.addEventListener('focus', this.focusInput.bind(this))
        this.formInput.addEventListener('blur', this.focusInput.bind(this))
        this.form.addEventListener('submit', this.searchWeatherByCity.bind(this));
        this.dailyForecastBox.addEventListener('scroll', this.scrollDailyWeatherBox.bind(this));
        this.addCityButton.addEventListener('click', this.clickAddCityBut.bind(this))

        this.selectHistoryElem = this.selectHistoryElem.bind(this);
    }

    searchWeatherByCity(event) {
        event.preventDefault();

        this.city = this.formInput.value;
        this.formInput.value = '';
        this.formInput.blur();
        localStorage.city = this.city;

        if (this.city.trim() === '') {
            return;
        }

        this.emit('search', this.city);
    }

    bodyHolder() {
        const placeHolderElem = this.dayWeatherBilder.createPlaceHolder();
        document.querySelector('body').append(placeHolderElem);
    }

    renderDayWeather(day, data) {
        let dayWeatherBox = null;
        let button = null;
        let dailyForecast = null;
        let dailyForecastItem = null;

        this.weatherDayBox.replaceChildren();
        this.buttonDay.replaceChildren();
        this.dailyForecastBox.replaceChildren();

        for (let i = 0; i < day.length; i++) {
            dailyForecast = this.dayWeatherBilder.createForecastListItem(i, day[i]);
            data[day[i]].forEach(element => {
                dailyForecastItem = this.dayWeatherBilder.createForecastElement(i, day, element);

                dailyForecast.append(dailyForecastItem)
            });
            dayWeatherBox = this.createWeatherBox(i, day[i], data[day[i]][0]);
            button = this.createButton(i, day[i], data[day[i]][0]);
            this.weatherDayBox.append(dayWeatherBox);
            this.buttonDay.append(button);
            this.dailyForecastBox.append(dailyForecast);
        }
    }

    createWeatherBox(index, day, element) {
        const dtTxt = this.dayWeatherBilder.createCurrentDate(index, day, element);
        const cityItem = this.dayWeatherBilder.createSpanItem(day, this.city, ['cityName']);
        const avarageTemp = this.dayWeatherBilder.createDayWeather(index, day, element, ['avarage-temp']);
        const commonDescription = this.dayWeatherBilder.createSpanItem(day, `Feels like ${getAvarageTemp(day,'averageFeels')} °C. ${element.weather[0].main}`, ['common-desc']);
        const weatherIconItem = this.dayWeatherBilder.createWeatherIcon((weatherIcon[`${element.weather[0].description}`]), day)
        const commonBox = this.dayWeatherBilder.createCommonBox(index, day, element);

        return this.dayWeatherBilder.createWeatherList(index, day, [dtTxt, cityItem, weatherIconItem, avarageTemp, commonDescription, commonBox], element);
    }

    createButton(index, day, element) {
        const weatherImg = this.dayWeatherBilder.createWeatherImg('hello', weatherIcon[`${element.weather[0].description}`], day);
        const leftDescriptionContainer = this.dayWeatherBilder.createLeftDescContainer(index, day, element);

        return this.dayWeatherBilder.createDayButton(index, day, [{ event: 'click', handler: this.showDayWeather.bind(this) }], [weatherImg, leftDescriptionContainer]);
    }

    showDayWeather(event) {
        const id = event.target.getAttribute('id');

        this.emit('show', id);
    }

    scrollDailyWeatherBox() {
        let boxWidth = this.dailyForecastBox.offsetWidth;
        let scrollPosition = this.dailyForecastBox.scrollLeft;
        let scrollWidth = this.dailyForecastBox.scrollWidth;

        this.emit('scroll', [boxWidth, scrollWidth, scrollPosition]);
    }

    focusInput() {
        if (!this.focus) {
            this.emit('on-focus', true);
            this.focus = true;
        } else {
            this.emit('on-focus', false);
            this.focus = false;
        }
    }

    addToSearchList([add, cityName]) {
        if (add) {
            const id = Math.random().toFixed(3) * 1000;
            const newHistoryItem = this.dayWeatherBilder.createHistoryItem(id, cityName, [{ event: 'click', handler: this.selectHistoryElem }]);
            const deleteHistoryItem = this.dayWeatherBilder.createDeleteButton(id, [{ event: 'click', handler: this.deleteHistoryElem.bind(this) }])
            newHistoryItem.append(deleteHistoryItem)
            this.searchHistoryContainer.append(newHistoryItem);
        }
    }

    selectHistoryElem(event) {
        this.formInput.value = event.target.textContent;
    }

    deleteHistoryElem(event) {
        event.stopImmediatePropagation();

        this.emit('delete', event.target.parentNode)
    }

    clickAddCityBut() {
        this.formInput.focus()
    }
}