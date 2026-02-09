//Import the required modules
const fs = require('fs');
const csv = require('csv-parser');

//Creating workoutCalculation to read CSV file asynchronously
 async function readWorkoutData(filePath) {
    return new Promise((resolve, reject) => {
         if (!fs.existsSync(filePath)) {
            reject(new Error("CSV file not found"));
            return;
        }
        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error)
            })
    })
 }

//Processing workout data
async function processWorkoutFile(filepath) {
    try {
        //Await results of reading CSV file
        const data = await readWorkoutData(filepath);
        let totalWorkouts = data.length;
        let totalMinutes = 0;
        //Loops through rows
        for (let i = 0; i < data.length; i++) {
            totalMinutes += parseInt(data[i].duration);
        }
        return { totalWorkouts, totalMinutes };
    } catch (error) {
        //Handles errors
        console.log(error);
        return null;
    }
}

module.exports = { processWorkoutFile, readWorkoutData };