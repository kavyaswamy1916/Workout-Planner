// server.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(express.json());
app.use(cors()); // Use the cors middleware

// Define Mongoose schemas (same as before)
const workoutSchema = new mongoose.Schema({
    name: String,
    description: String,
    duration: Number, // Duration in minutes
});

const workoutPlanSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    workouts: [workoutSchema], // Array of workouts
});

// Define mock data
const workoutPlans = [
    {
        id: 1,
        name: 'Cardio Workout',
        description: 'A high-intensity cardio workout',
        imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306123410/6.jpg',
        workouts: [
            {
                name: 'Jumping Jacks',
                description: 'Start with 3 sets of 20 reps',
                duration: 5
            },
            {
                name: 'Running',
                description: 'Run for 30 minutes at a moderate pace',
                duration: 30
            },
            {
                name: 'Cycling',
                description: 'Cycle for 45 minutes at a steady pace',
                duration: 45
            },
            {
                name: 'Jump Rope',
                description: 'Jump rope for 15 minutes with intervals',
                duration: 15
            },
            {
                name: 'Swimming',
                description: 'Swim for 1 hour focusing on different strokes',
                duration: 60
            },
            {
                name: 'HIIT',
                description: 'High-Intensity Interval Training for 20 minutes',
                duration: 20
            },
        ]
    },
    {
        id: 2,
        name: 'Strength Training',
        description: 'Build muscle and strength with this workout',
        imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306123403/5.jpg',
        workouts: [
            {
                name: 'Squats',
                description: 'Start with 3 sets of 10 reps',
                duration: 15
            },
            {
                name: 'Push-ups',
                description: 'Start with 3 sets of 15 reps',
                duration: 10
            },
            {
                name: 'Pull-ups',
                description: 'Do 3 sets of 8 pull-ups',
                duration: 20
            },
            {
                name: 'Deadlifts',
                description: 'Start with 3 sets of 5 reps',
                duration: 25
            },
            {
                name: 'Bench Press',
                description: 'Do 3 sets of 12 reps',
                duration: 20
            },
            {
                name: 'Dumbbell Rows',
                description: 'Do 3 sets of 10 reps on each arm',
                duration: 15
            },
        ]
    },
    {
        id: 3,
        name: 'Yoga Routine',
        description: 'Yoga poses to improve flexibility',
        imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306123356/4.jpg',
        workouts: [
            {
                name: 'Sun Salutation',
                description: 'Perform 5 rounds of Sun Salutation',
                duration: 15
            },
            {
                name: 'Warrior Pose',
                description: 'Hold Warrior Pose for 1 minute on each side',
                duration: 10
            },
            {
                name: 'Downward-Facing Dog',
                description: 'Hold Downward-Facing Dog for 1 minute',
                duration: 5
            },
            {
                name: 'Tree Pose',
                description: 'Hold Tree Pose for 30 seconds on each side',
                duration: 10
            },
            {
                name: 'Child\'s Pose',
                description: 'Relax in Child\'s Pose for 3 minutes',
                duration: 20
            },
        ]
    },
    {
        id: 4,
        name: 'Core Strengthening',
        description: 'Focus on strengthening the core muscles',
        imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306122911/3.jpg',
        workouts: [
            {
                name: 'Plank',
                description: 'Hold plank position for 1 minute',
                duration: 10
            },
            {
                name: 'Russian Twists',
                description: 'Perform 3 sets of 20 reps',
                duration: 10
            },
            {
                name: 'Leg Raises',
                description: 'Perform 3 sets of 15 reps',
                duration: 15
            },
            {
                name: 'Crunches',
                description: 'Perform 3 sets of 20 reps',
                duration: 10
            },
            {
                name: 'Bicycle Crunches',
                description: 'Perform 3 sets of 20 reps',
                duration: 15
            },
        ]
    },
    {
        id: 5,
        name: 'Pilates Routine',
        description: 'Pilates exercises for strength and flexibility',
        imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306122854/1.jpg',
        workouts: [
            {
                name: 'Hundred',
                description: 'Perform 100 pumps of the arms while holding a V-sit',
                duration: 10
            },
            {
                name: 'Roll-Up',
                description: 'Perform 3 sets of 10 reps',
                duration: 15
            },
            {
                name: 'Single Leg Stretch',
                description: 'Perform 3 sets of 10 reps on each leg',
                duration: 15
            },
            {
                name: 'Swimming',
                description: 'Perform 3 sets of 20 reps',
                duration: 15
            },
            {
                name: 'Leg Pull Front',
                description: 'Perform 3 sets of 10 reps',
                duration: 15
            },
        ]
    },
    {
        id: 6,
        name: 'Full Body Circuit',
        description: 'Workout targeting all major muscle groups',
        imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306123640/2.jpg',
        workouts: [
            {
                name: 'Burpees',
                description: 'Perform 3 sets of 10 reps',
                duration: 15
            },
            {
                name: 'Mountain Climbers',
                description: 'Perform 3 sets of 20 reps',
                duration: 10
            },
            {
                name: 'Dumbbell Lunges',
                description: 'Perform 3 sets of 10 reps on each leg',
                duration: 15
            },
            {
                name: 'Push Press',
                description: 'Perform 3 sets of 10 reps',
                duration: 15
            },
            {
                name: 'Plank with Shoulder Taps',
                description: 'Hold plank position and tap shoulders for 1 minute',
                duration: 20
            },
        ]
    },

];

app.get('/api/workout-plans', (req, res) => {
    // Return mock data
    res.json(workoutPlans);
});

// Define route to handle root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Social Fitness App!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});