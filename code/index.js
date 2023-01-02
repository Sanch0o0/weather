import { Model } from "./Model.js";
import { View } from "./View.js";
import { Controller } from "./Controller.js";
import { DayWeatherBoxHelper } from "./helpers/dayWeatherBoxHelper.js";

const runApp = () => {
    let weatherData = null;
    (localStorage.getItem('data')) ? weatherData = JSON.parse(localStorage.data): weatherData = null;
    const model = new Model(weatherData);
    const view = new View(new DayWeatherBoxHelper());
    const controller = new Controller(model, view);
    controller.init();
};

runApp();