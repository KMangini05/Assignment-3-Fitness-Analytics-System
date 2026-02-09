const path = require('path');
const fs = require('fs');
const { healthMetricsCounter } = require('../healthReader');

//Path to your real JSON file
const REAL_JSON_FILE = path.join(__dirname, '../data/health-metrics.json');

//Path to a missing file (error handling)
const MISSING_JSON_FILE = path.join(__dirname, 'data', 'missing-health.json');

describe('Health JSON Processing', () => {

    test('healthMetricsCounter returns correct number of entries for real file', async () => {
        //Call the function with the real JSON file
        const total = await healthMetricsCounter(REAL_JSON_FILE);

        expect(total).toBe(8);

        //Check the type of returned value
        expect(typeof total).toBe('number');
    });

    test('healthMetricsCounter returns null or throws error for missing file', async () => {
        //Test async function failure
        await expect(healthMetricsCounter(MISSING_JSON_FILE)).rejects.toMatch('Error');
    });
});
