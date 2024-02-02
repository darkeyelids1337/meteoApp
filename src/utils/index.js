export function capitalize(str){
    return str.charAt(0).toUpperCase() + str.substr(1);
}

const PRESSURE_UNITS = 0.750062

export function getPressureMm(hpa){
    return Math.round(hpa * PRESSURE_UNITS)
}

export const getTime = (seconds) => {
    return new Date(seconds * 1000).toLocaleTimeString('ru-RU', {timeZone: 'Atlantic/Reykjavik'})
}