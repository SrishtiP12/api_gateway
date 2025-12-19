const axios = require('axios')

const getWeatherData = async (city) => {
  // Default to Delhi if no city provided
  if (!city) {
    city = 'Delhi'
  }

  // 1. Geocoding
  const geoResponse = await axios.get(
    'https://geocoding-api.open-meteo.com/v1/search',
    {
      params: {
        name: city,
        count: 1,
        language: 'en',
        format: 'json'
      }
    }
  )

  if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
    throw new Error(`City '${city}' not found`)
  }

  const { latitude, longitude } = geoResponse.data.results[0]

  // 2. Weather Data
  const weatherResponse = await axios.get(
    'https://api.open-meteo.com/v1/forecast',
    {
      params: {
        latitude,
        longitude,
        hourly: 'temperature_2m'
      }
    }
  )

  return weatherResponse.data
}

const weatherHandler = async (req, res, next) => {
  try {
    const city = req.query.city
    const data = await getWeatherData(city)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getWeatherData,
  weatherHandler
}
