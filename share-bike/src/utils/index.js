import * as fetch from 'axios'

export function formatDate(unix) {
    function fixedZore(num) {
        return num >= 10 ? ('' + num) : ('0' + num)
    }

    let date = new Date(unix)

    let year = date.getFullYear()
    let month = fixedZore(date.getMonth() + 1)
    let day = fixedZore(date.getDate())
    let hours = fixedZore(date.getHours())
    let minutes = fixedZore(date.getMinutes())
    let seconds = fixedZore(date.getSeconds())

    let timeStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return timeStr
}

const xhr = fetch.create({
    baseURL: '',
    timeout: 15000
})

export const fgh = {
    get(url, data, config) {
        return new Promise((resolve, reject) => {
            xhr.get(url, {params: data}, config).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}