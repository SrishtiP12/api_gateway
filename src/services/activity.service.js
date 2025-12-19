const { getWeatherData } = require('./weather.service')

module.exports = async (req, res, next) => {
    try {
        const city = req.query.city
        const weatherData = await getWeatherData(city)

        // Find the index for the current time
        const now = new Date()
        const currentHourISO = now.toISOString().slice(0, 13) + ':00'
        let index = weatherData.hourly.time.findIndex(t => t.startsWith(currentHourISO))
        if (index === -1) index = 0

        const currentTemp = weatherData.hourly.temperature_2m[index]

        let advice = ''
        if (currentTemp < 5) {
            advice = 'Too cold for most outdoor activities. Maybe visit a museum or cafe?'
        } else if (currentTemp > 35) {
            advice = 'Examples of heat exhaustion are common. Stay hydrated and avoid strenuous outdoor exercise.'
        } else if (currentTemp >= 15 && currentTemp <= 25) {
            advice = 'Perfect weather for a run, hike, or picnic!'
        } else {
            advice = 'Good for a brisk walk, but bring layers if you plan to stay out long.'
        }

        res.json({
            service: 'Activity Planner',
            city: city || 'Delhi',
            current_temperature: currentTemp,
            advice
        })
    } catch (error) {
        next(error)
    }
}
