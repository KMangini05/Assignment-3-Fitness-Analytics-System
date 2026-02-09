//Import Node.js file
const fs = require ("fs");

//Function to read JSON file and return promise
function healthMetricsCounter(filePath) {
    return new Promise((resolve, reject) => {
                //Reads file asynchronously; "utf8" insure file is read as text
                fs.readFile(filePath, "utf8", (err, data) => {
                    
                    //What will return if there are errors reading text
                    if (err) {
                        reject("Error: File is missing or cannot be read.");
                        return;
                    }

                    try {
                        //Will convert JSON to JavaScript
                        const parsedData = JSON.parse(data);

                        const totalEntries = parsedData.metrics.length;
                        //Returns result
                        resolve(totalEntries);

                    } catch (error) {
                        //Runs if the JSON.parse fails
                        reject("Error: Invalid JSON format.")
                    }

        });
    });
}

// Async function (like runTimer)
//Waits for healthMetricCounter to finish
async function runHealthReader() {
    console.log("Reading health data...");

    try {
        const total = await healthMetricsCounter("./data/health-metrics.json");
        console.log(`Total health entries: ${total}`);
    } catch (error) {
        //If promise rejects, this will run
        console.error(error);
    }

    console.log("Finished processing health data!");
}

//Exports function
module.exports = { healthMetricsCounter };