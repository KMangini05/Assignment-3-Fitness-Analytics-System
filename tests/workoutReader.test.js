// Test your workoutReader.js module here
const path = require('path');
const fs = require('fs');
const { processWorkoutFile, readWorkoutData } = require('../workoutReader');

//Path to your actual CSV file
const REAL_CSV_FILE = path.join(__dirname, '../data/workouts.csv');

//Path to a missing file (error handling)
const MISSING_CSV_FILE = path.join(__dirname, 'data', 'missing-workouts.csv');

describe('Workout CSV Processing', () => {

    test('readWorkoutData returns array of workout rows', async () => {
        const data = await readWorkoutData(REAL_CSV_FILE);

        expect(Array.isArray(data)).toBe(true);

        expect(data).toHaveLength(10);

        //Checks that each row has expected properties
        expect(data[0]).toHaveProperty('date');
        expect(data[0]).toHaveProperty('exercise');
        expect(data[0]).toHaveProperty('duration');
        expect(data[0]).toHaveProperty('calories');
    });

    test('processWorkoutFile calculates totals correctly', async () => {
        const result = await processWorkoutFile(REAL_CSV_FILE);

        //Ensure result is not null
        expect(result).not.toBeNull();
        expect(result.totalWorkouts).toBe(10);
        expect(result.totalMinutes).toBe(330);
    });

    test('processWorkoutFile returns null for missing file', async () => {
        const result = await processWorkoutFile(MISSING_CSV_FILE);

        //Returns null because file does not exist
        expect(result).toBeNull();
    });
});
