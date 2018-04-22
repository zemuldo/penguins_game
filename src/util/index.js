export const randomNo = (min, max)=> {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}