// App.js
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Home from './components/Home';
import WorkoutPage from './components/WorkoutPage';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/workout/:id"
                    element={<WorkoutPage />} />
            </Routes>
        </Router>
    );
}

export default App;