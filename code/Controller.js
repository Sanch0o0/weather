export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('search', this.searchWeather.bind(this));
        view.on('show', this.showWeather.bind(this));
        view.on('scroll', this.scrollWidth.bind(this));
        view.on('click-scroll', this.clickToScrollForecast.bind(this));
        view.on('on-focus', this.focusInput.bind(this));
        view.on('delete', this.deleteSearchHistoryItem.bind(this));
    }

    init() {
        if (this.model.weatherData !== null) {
            this.model.firstDate = true;

            const { allDays, weatherByDay } = JSON.parse(localStorage.data);

            if (localStorage.getItem('searchHistory')) {
                const searchHistory = JSON.parse(localStorage.searchHistory)
                searchHistory.forEach(element => {
                    this.view.addToSearchList([true, element])
                });
            }

            this.model.showAllElements();
            this.view.renderDayWeather(allDays, weatherByDay);
        } else {
            this.view.bodyHolder();
        }
    }

    async searchWeather(city) {
        this.model.firstDate = true;
        await this.model.search(city);

        const { allDays, weatherByDay } = JSON.parse(localStorage.data);

        this.view.renderDayWeather(allDays, weatherByDay);
        this.model.show('e' + allDays[0]);

        let cityData = this.model.addToSearchHistory(city);
        this.view.addToSearchList(cityData);
    }

    showWeather(id) {
        this.model.show(id);
    }

    scrollWidth(data) {
        this.model.scrollWidthBehavior(data);
    }

    clickToScrollForecast(currentButton) {
        this.model.clickToScroll(currentButton);
    }

    focusInput(onFocus) {
        this.model.showSearchHistory(onFocus);
    }

    deleteSearchHistoryItem(element) {
        this.model.deleteHistoryItem(element);
    }
}