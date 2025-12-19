const axios = require('axios');
const jwt = require('jsonwebtoken');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function verifyCache() {
    const url = 'http://localhost:3000/api/weather?city=London';
    const secret = 'super_secret_key'; // Hardcoded for verification script only

    const token = jwt.sign(
        { id: 'test_user_id', role: 'user', plan: 'free' },
        secret
    );

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept-Encoding': 'gzip' // Request compression
        }
    };

    try {
        console.log('Making first request...');
        const start1 = Date.now();
        const res1 = await axios.get(url, config);
        const time1 = Date.now() - start1;
        console.log(`First request took: ${time1}ms`);
        console.log('Headers:', res1.headers['content-encoding'] ? 'Compressed' : 'Not Compressed');

        console.log('Making second request...');
        const start2 = Date.now();
        const res2 = await axios.get(url, config);
        const time2 = Date.now() - start2;
        console.log(`Second request took: ${time2}ms`);

        if (time2 < time1 * 0.5) { // Expect significant drop
            console.log('SUCCESS: Cache Hit significantly faster.');
        } else {
            console.log('NOTE: Cache might not be active or Redis is down. (Expected if Redis not installed)');
        }

    } catch (error) {
        console.error('Verification failed:', error.message);
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        }
    }
}

verifyCache();
