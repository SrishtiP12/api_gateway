module.exports = {
  go: {
    totalCredits: 100,
    apiCost: {
      clothing: 5,
      activity: 5,
      weather: 1
    },
    rateLimit: 2 // Reduced for testing
  },

  medium: {
    totalCredits: 500,
    apiCost: {
      clothing: 3,
      activity: 3,
      weather: 1
    },
    // rateLimit: 30
    rateLimit: 3
  },

  premium: {
    totalCredits: 2000,
    apiCost: {
      clothing: 1,
      activity: 1,
      weather: 0 // Free weather for premium? Or 1. Let's keep 1 for consistency with prev state.
    },
    rateLimit: 4 // Reduced for testing
  }
}
