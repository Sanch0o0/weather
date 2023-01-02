const monthObj = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
}

const weekDayObj = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
}


export const getDate = (date, operation) => {
    const currentDate = new Date(date.dt_txt);
    switch (operation) {
        case 'month':
            return monthObj[currentDate.getMonth()];
        case 'day':
            return weekDayObj[currentDate.getDay()];
        case 'date':
            return currentDate.getDate();
        case 'hours':
            return currentDate.getHours();
        case 'minutes':
            return currentDate.getMinutes();
        default:
            return;
    }
}

export const getAvarageTemp = (day, operation) => {
    const { allDays, weatherByDay } = JSON.parse(localStorage.data);
    let resultTemp;
    switch (operation) {
        case 'min':
            {
                for (let i = 0; i < weatherByDay[day].length; i++) {
                    let currentTemp = weatherByDay[day][i].main.temp_min;

                    if (i === 0) resultTemp = weatherByDay[day][i].main.temp_min;

                    if (currentTemp < resultTemp) {
                        resultTemp = currentTemp;
                    }
                }
                return Math.round(resultTemp)
            }
        case 'max':
            {
                for (let i = 0; i < weatherByDay[day].length; i++) {
                    let currentTemp = weatherByDay[day][i].main.temp_min;

                    if (i === 0) resultTemp = weatherByDay[day][i].main.temp_min;

                    if (currentTemp > resultTemp) {
                        resultTemp = currentTemp;
                    }
                }
                return Math.round(resultTemp)
            }
        case 'average':
            {
                let sumIndex = 0;
                let sumTemp = weatherByDay[day].reduce((acc, elem, index) => {
                    sumIndex++;
                    return acc + elem.main.temp;
                }, 0)
                return Math.round(sumTemp / sumIndex);
            }
        case 'averageFeels':
            {
                let sumIndex = 0;
                let sumTemp = weatherByDay[day].reduce((acc, elem, index) => {
                    sumIndex++;
                    return acc + elem.main.feels_like;
                }, 0)
                return Math.round(sumTemp / sumIndex);
            }
    }
}