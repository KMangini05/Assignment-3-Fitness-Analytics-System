//Load variables from .env file
require('dotenv').config();

//Import functiond from other scripts
const { processWorkoutFile } = require('./workoutReader');
const { runWorkoutProcessor, healthMetricsCounter } = require('./healthReader');

//ProcessFiles: read data and check goal
async function processFiles() {
    //Load user data/info
    const userName = process.env.USER_NAME || "User";
    const weeklyGoal = parseInt(process.env.WEEKLY_GOAL) || 0;

    console.log(`Process data for: ${userName}`);

    try {
        //Read workout data
        console.log("Reading workout data...");
        const workoutResult = await processWorkoutFile('./data/workouts.csv');

        if (!workoutResult) {
            console.log("No workout data found or file could not be read.");
            return;
        }

        console.log(`Total workouts: ${workoutResult.totalWorkouts}`);
        console.log(`Total minutes: ${workoutResult.totalMinutes}`);

        //Read health data
        console.log("Reading health data...");
        const totalHealthEntries = await healthMetricsCounter('./data/health-metrics.json');

        console.log(`Total health entries: ${totalHeathEntries}`);

        //Display summary
        console.log("\n=== SUMMARY ===");
        console.log(`Workouts found: ${workoutResult.totalWorkouts}`);
        console.log(`Total workout minutes: ${workoutResult,totalMinutes}`);
        console.log(`Health entries found: ${totalHealthEntries}`);
        console.log(`Weekly goal: ${weeklyGoal} minutes`);

         // --- Check weekly goal ---
        if (workoutResult.totalMinutes >= weeklyGoal) {
            console.log(`Congratulations ${userName}! You have exceeded your weekly goal!`);
        } else {
            console.log(`Keep going ${userName}! You are ${weeklyGoal - workoutResult.totalMinutes} minutes away from your goal.`);
        }

    } catch (error) {
        // Catch any unexpected errors
        console.error("An error occurred while processing files:", error.message);
    }
}

// Call the main function
processFiles();