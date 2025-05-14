// ./components/WorkoutPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../index.css'; // Assuming global styles

function WorkoutPage() {
  const { id } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [selectedWorkouts, setSelectedWorkouts] = useState({});

  useEffect(() => {
    if (!id) {
      console.error('Invalid workout plan ID:', id);
      return;
    }

    axios.get('http://localhost:5000/api/workout-plans')
      .then(response => {
        const plan = response.data.find(plan => String(plan.id) === String(id));
        if (plan) {
          setWorkoutPlan(plan);

          const initialSelected = {};
          plan.workouts?.forEach(workout => {
            if (workout?.name) {
              initialSelected[workout.name] = false;
            }
          });
          setSelectedWorkouts(initialSelected);
        } else {
          console.error('Workout plan not found:', id);
        }
      })
      .catch(error => {
        console.error('Error fetching workout plans:', error);
      });
  }, [id]);

  const handleCheckboxChange = (workoutName) => {
    setSelectedWorkouts(prev => ({
      ...prev,
      [workoutName]: !prev[workoutName]
    }));
  };

  if (!workoutPlan) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="workout-plan-container">
      <div className="workout-plan-content">
        <h1 className="title">{workoutPlan.name}</h1>
        <img
          src={workoutPlan.imageUrl}
          alt={workoutPlan.name || "Workout"}
          className="workout-image"
        />
        <p className="description">{workoutPlan.description}</p>

        <div className="workout-list">
          {workoutPlan.workouts?.map((workout, index) => {
            const workoutName = workout?.name || `workout-${index}`;
            const isChecked = Boolean(selectedWorkouts[workoutName]);

            return (
              <div
                key={workoutName}
                className={`workout-item ${isChecked ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  id={workoutName}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(workoutName)}
                />
                <label htmlFor={workoutName}>{workout?.name || 'Unnamed Workout'}</label>
              </div>
            );
          })}
        </div>

        {Object.keys(selectedWorkouts).length > 0 &&
          Object.values(selectedWorkouts).every(val => val) && (
            <div className="workout-completed">Workout Completed!</div>
          )}
      </div>
    </div>
  );
}

export default WorkoutPage;
