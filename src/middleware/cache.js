const client = require('../config/redis');

const cache = (duration) => {
    return async (req, res, next) => {
        // Unique key based on the request URL
        const key = `__express__${req.originalUrl || req.url}`;

        try {
            const cachedBody = await client.get(key);
            if (cachedBody) {
                return res.json(JSON.parse(cachedBody));
            } else {
                // Override res.json to store the response in Redis before sending
                const originalJson = res.json;
                res.json = (body) => {
                    // Restore original JSON method to avoid infinite loop if called again
                    res.json = originalJson;
                    client.set(key, JSON.stringify(body), {
                        EX: duration
                    });
                    return originalJson.call(res, body);
                };
                next();
            }
        } catch (err) {
            console.error('Redis cache error:', err);
            // Fallback to fetching data if Redis fails
            next();
        }
    };
};

module.exports = cache;
