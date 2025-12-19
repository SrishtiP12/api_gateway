const { getWeatherData } = require('./weather.service')

module.exports = async (req, res, next) => {
    try {
        const city = req.query.city
        const weatherData = await getWeatherData(city)

        // Find the index for the current time
        const now = new Date()
        const currentHourISO = now.toISOString().slice(0, 13) + ':00'

        // The API returns times in ISO format. We find the closest hour.
        // If exact match not found, we take the one closest to now.
        let index = weatherData.hourly.time.findIndex(t => t.startsWith(currentHourISO))

        // Fallback to index 0 if not found (e.g. timezone issues)
        if (index === -1) index = 0

        const currentTemp = weatherData.hourly.temperature_2m[index]

        let advice = ''
        if (currentTemp < 5) {
            advice = 'Freezing! Wear thermal layers, a heavy coat, gloves, and a hat.'
        } else if (currentTemp < 15) {
            advice = 'Cold. Wear a warm jacket or coat.'
        } else if (currentTemp < 24) {
            advice = 'Mild. A light sweater or cardigan should be fine.'
        } else {
            advice = 'Warm. T-shirt and shorts weather!'
        }

        res.json({
            service: 'Clothing Advisory',
            city: city || 'Delhi',
            current_temperature: currentTemp,
            advice
        })
    } catch (error) {
        next(error)
    }
}
