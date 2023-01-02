import { weatherIcon } from "../../data/weather-icon.js";
import { getDate, getAvarageTemp } from "./commonHelper.js";

export class DayWeatherBoxHelper {
    createPlaceHolder() {
        return this.createElement({
            tag: 'div',
            attributes: [{ prop: 'id', value: 'e' }],
            classList: ['place-holder'],
            textContent: 'Введите город'
        });
    }

    createSpanItem(id, textContent, classList) {
        return this.createElement({
            tag: 'span',
            attributes: [{ prop: 'id', value: 'e' + id }],
            classList: classList || ['min-max_temp'],
            textContent,
        });
    }

    createDayWeather(i, day, data, classList) {
        return this.createElement({
            tag: 'div',
            classList: classList || ['day-weather-data'],
            attributes: [{ prop: 'id', value: 'e' + day[i] }],
            textContent: getAvarageTemp(day, 'average') + ' °C',
        })
    }


    createWeatherImg(text, data, id) {
        return this.createElement({
            tag: 'img',
            classList: ['weather-img'],
            attributes: [{ prop: 'src', value: data }, { prop: 'id', value: 'e' + id }],
            textContent: text,
        })
    }

    createDayButton(i, day, handlers, children) {
        return this.createElement({
            tag: 'button',
            classList: (i === 0) ? ['day-button', 'currentButton'] : ['day-button'],
            attributes: [{ prop: 'id', value: 'e' + day }],
            // textContent: 'Dec, ' + day,
            handlers,
            children,
            childrenAction: 'append',
        })
    }

    createHistoryItem(id, textContent, handlers) {
        return this.createElement({
            tag: 'div',
            attributes: [{ prop: 'id', value: id }],
            classList: ['history-item'],
            textContent,
            handlers,
        });
    }

    createDeleteButton(id, handlers) {
        return this.createElement({
            tag: 'div',
            attributes: [{ prop: 'id', value: id }],
            classList: ['history-delete'],

            handlers,
        });
    }

    createImgItem(img, id) {
        return this.createElement({
            tag: 'img',
            attributes: [{ prop: 'src', value: `${img}` }, { prop: 'id', value: 'e' + id }],
            classList: ['min-max_temp'],
        });
    }

    createCurrentDate(i, day, data) {
        return this.createElement({
            tag: 'div',
            classList: ['day-current-data'],
            attributes: [{ prop: 'id', value: 'e' + day[i] }],
            attributes: '',
            textContent: `${getDate(data,'month')} ${getDate(data,'date')} ,
                        ${new Date().getHours()}:
                        ${(new Date().getMinutes()<10)? '0'+new Date().getMinutes():new Date().getMinutes()}`,
        })
    }

    createWeatherIcon(img, id) {
        return this.createElement({
            tag: 'img',
            attributes: [{ prop: 'src', value: `${img}` }, { prop: 'id', value: 'e' + id }],
            classList: ['main-weather-img'],
            children: ''
        });
    }

    createCommonBox(id, day, element) {
        const pressure = this.createElement({
            tag: 'span',
            attributes: [{ prop: 'id', value: 'e' + day }],
            classList: ['description-params'],
            textContent: 'Pressure: ' + element.main.pressure,
        });

        const himidity = this.createElement({
            tag: 'span',
            attributes: [{ prop: 'id', value: 'e' + day }],
            classList: ['description-params'],
            textContent: 'Himidity: ' + element.main.humidity + ' %',
        });

        const visibility = this.createElement({
            tag: 'span',
            attributes: [{ prop: 'id', value: 'e' + day }],
            classList: ['description-params'],
            textContent: 'Visibility: ' + element.visibility + ' km',
        });

        const speed = this.createElement({
            tag: 'span',
            attributes: [{ prop: 'id', value: 'e' + day }],
            classList: ['description-params'],
            textContent: 'Speed: ' + element.wind.speed + ' m/s',
        });

        return this.createElement({
            tag: 'div',
            classList: ['common-box'],
            attributes: [{ prop: 'id', value: 'e' + day }],
            children: [pressure, himidity, visibility, speed],
            childrenAction: 'append',
        });
    }

    createLeftDescContainer(index, id, element) {
        const dayItem = this.createElement({
            tag: 'span',
            attributes: [{ prop: 'id', value: 'e' + id }],
            classList: ['description-params'],
            textContent: `${getDate(element, 'day')}, ${getDate(element, 'month')} ${getDate(element,'date')}`,
        });

        const minMaxTemp = this.createElement({
            tag: 'span',
            attributes: [{ prop: 'id', value: 'e' + id }],
            classList: ['description-params-temp'],
            textContent: ` ${getAvarageTemp(id,'min')} / ${getAvarageTemp(id,'max')} °C`,
        });

        const description = this.createElement({
            tag: 'span',
            attributes: [{ prop: 'id', value: 'e' + id }],
            classList: ['description-params-desc'],
            textContent: `${element.weather[0].description}`,
        });

        return this.createElement({
            tag: 'div',
            classList: ['left-description_container'],
            attributes: [{ prop: 'id', value: 'e' + id }],
            children: [dayItem, minMaxTemp, description],
            childrenAction: 'append',
        });
    }

    createWeatherList(i, day, children, element) {
        return this.createElement({
            tag: 'div',
            classList: (i === 0) ? [`day-weather`, `${element.weather[0].main}`, 'display'] : ['day-weather', `${element.weather[0].main}`],
            attributes: [{ prop: 'id', value: 'e' + day }],
            children,
            childrenAction: 'append',
        });
    }

    createListItem(i, day, children, classList) {
        return this.createElement({
            tag: 'div',
            classList: classList || (i === 0) ? [`day-weather`, 'display'] : ['day-weather'],
            attributes: [{ prop: 'id', value: 'e' + day }],
            children,
            childrenAction: 'append',
        });
    }

    createForecastListItem(i, day, children) {
        return this.createElement({
            tag: 'div',
            classList: (i === 0) ? ['daily-forecast'] : ['daily-forecast', 'hidden'],
            attributes: [{ prop: 'id', value: 'e' + day }],
            children,
            childrenAction: 'append',
        });
    }

    createForecastElement(index, day, element) {
        const descriptionElem = this.createElement({
            tag: 'span',
            attributes: [{ prop: 'id', value: 'e' + day }],
            classList: ['forecast-temp'],
            textContent: element.weather[0].description,
        });

        const minTemp = this.createElement({
            tag: 'span',
            attributes: [{ prop: 'id', value: 'e' + day }],
            classList: ['forecast-desc'],
            textContent: Math.round(element.main.temp_min) + ' °C',
        });

        const weatherImg = this.createElement({
            tag: 'img',
            classList: ['weather-img'],
            attributes: [{ prop: 'src', value: weatherIcon[`${element.weather[0].description}`] }, { prop: 'id', value: 'e' + day }],
            textContent: '',
        });

        const dayHours = this.createElement({
            tag: 'span',
            attributes: [{ prop: 'id', value: 'e' + day }],
            classList: ['forecast-hours'],
            textContent: getDate(element, 'hours') + ':00',
        });

        return this.createElement({
            tag: 'div',
            classList: ['daily-forecast-element'],
            attributes: [{ prop: 'id', value: 'e' + day }],
            children: [descriptionElem, minTemp, weatherImg, dayHours],
            childrenAction: 'append',
        });
    }


    createElement({
        tag,
        classList,
        attributes,
        textContent,
        handlers,
        children,
        childrenAction,
    }) {
        const element = document.createElement(tag);

        if (classList.length) {
            element.classList.add(...classList);
        }

        if (attributes.length) {
            attributes.forEach(({ prop, value }) => {
                element.setAttribute(prop, value);
            });
        }

        if (textContent) {
            element.textContent = textContent;
        }

        if (handlers) {
            handlers.forEach(({ event, handler }) => {
                element.addEventListener(event, handler);
            });
        }

        if (children) {
            element[childrenAction](...children);
        }

        return element;
    }
}