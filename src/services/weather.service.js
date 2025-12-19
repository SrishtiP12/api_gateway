const axios = require('axios')

module.exports = async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://api.open-meteo.com/v1/forecast',
      {
        params: {
          latitude: 28.61,
          longitude: 77.20,
          hourly: 'temperature_2m'
        }
      }
    )

    res.json(response.data)
  } catch (error) {
    next(error)
  }
}
