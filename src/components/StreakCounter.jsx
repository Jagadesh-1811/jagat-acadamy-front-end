import React, { useState, useEffect } from 'react';
import { FaFire } from 'react-icons/fa'; // Flame icon for streak

const StreakCounter = ({
  iconColor = 'orange-500',
  iconSize = '1.5em',
  textColor = 'gray-800',
  textSize = 'text-lg',
  className = '',
}) => {
  const [streak, setStreak] = useState(0);
  const [lastVisitDate, setLastVisitDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day UTC

    const storedStreak = localStorage.getItem('streakCount');
    const storedLastVisit = localStorage.getItem('lastVisitDate');

    let currentStreak = parseInt(storedStreak) || 0;
    let lastVisit = storedLastVisit ? new Date(storedLastVisit) : null;

    if (lastVisit) {
      lastVisit.setHours(0, 0, 0, 0); // Normalize to start of day UTC
      const diffTime = Math.abs(today.getTime() - lastVisit.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        // Visited today already, no change to streak
      } else if (diffDays === 1) {
        // Visited on consecutive day
        currentStreak += 1;
      } else {
        // Missed a day, reset streak
        currentStreak = 1;
      }
    } else {
      // First visit, start streak
      currentStreak = 1;
    }

    setStreak(currentStreak);
    setLastVisitDate(today.toISOString()); // Store as ISO string for consistency

    localStorage.setItem('streakCount', currentStreak.toString());
    localStorage.setItem('lastVisitDate', today.toISOString());
  }, []); // Run only once on component mount

  return (
    <div
      className={`flex items-center space-x-2 p-2 rounded-md bg-gray-100 ${className}`}
      title={
        streak > 0
          ? `You have a ${streak}-day streak!`
          : 'Start your daily streak!'
      }
    >
      <FaFire className={`text-${iconColor}`} style={{ fontSize: iconSize }} />
      <span className={`font-semibold text-${textColor} ${textSize}`}>
        {streak}
      </span>
    </div>
  );
};

export default StreakCounter;
