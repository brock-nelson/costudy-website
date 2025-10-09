"use client";

import { useState, useEffect } from "react";

export default function ROICalculator() {
  const [numInstructors, setNumInstructors] = useState(10);
  const [avgCourseSize, setAvgCourseSize] = useState(30);
  const [hoursPerCourse, setHoursPerCourse] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(75);

  const [results, setResults] = useState({
    timeSaved: 0,
    costSavings: 0,
    studentsImpacted: 0,
  });

  useEffect(() => {
    // Calculate time saved (50% reduction in team management time)
    const totalHoursSaved = numInstructors * hoursPerCourse * 0.5;

    // Calculate cost savings
    const totalCostSavings = totalHoursSaved * hourlyRate;

    // Calculate students impacted
    const totalStudents = numInstructors * avgCourseSize;

    setResults({
      timeSaved: Math.round(totalHoursSaved),
      costSavings: Math.round(totalCostSavings),
      studentsImpacted: totalStudents,
    });
  }, [numInstructors, avgCourseSize, hoursPerCourse, hourlyRate]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 text-[#374045]">ROI Calculator</h2>
        <p className="text-[#5E6E76]">
          Estimate the time and cost savings from using CoStudy at your institution
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label htmlFor="numInstructors" className="block text-sm font-medium text-[#374045] mb-2">
              Number of Instructors Using CoStudy
            </label>
            <input
              type="range"
              id="numInstructors"
              min="1"
              max="100"
              value={numInstructors}
              onChange={(e) => setNumInstructors(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              aria-label="Number of instructors"
            />
            <div className="text-right text-2xl font-bold text-green-600 mt-2">
              {numInstructors}
            </div>
          </div>

          <div>
            <label htmlFor="avgCourseSize" className="block text-sm font-medium text-[#374045] mb-2">
              Average Students per Course
            </label>
            <input
              type="range"
              id="avgCourseSize"
              min="10"
              max="200"
              step="5"
              value={avgCourseSize}
              onChange={(e) => setAvgCourseSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              aria-label="Average students per course"
            />
            <div className="text-right text-2xl font-bold text-green-600 mt-2">
              {avgCourseSize}
            </div>
          </div>

          <div>
            <label htmlFor="hoursPerCourse" className="block text-sm font-medium text-[#374045] mb-2">
              Hours Spent on Team Management (per semester)
            </label>
            <input
              type="range"
              id="hoursPerCourse"
              min="1"
              max="20"
              value={hoursPerCourse}
              onChange={(e) => setHoursPerCourse(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              aria-label="Hours spent on team management per semester"
            />
            <div className="text-right text-2xl font-bold text-green-600 mt-2">
              {hoursPerCourse} hrs
            </div>
          </div>

          <div>
            <label htmlFor="hourlyRate" className="block text-sm font-medium text-[#374045] mb-2">
              Average Faculty Hourly Rate ($)
            </label>
            <input
              type="range"
              id="hourlyRate"
              min="50"
              max="200"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              aria-label="Average faculty hourly rate"
            />
            <div className="text-right text-2xl font-bold text-green-600 mt-2">
              ${hourlyRate}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 space-y-6">
          <h3 className="text-xl font-bold text-[#374045] mb-4">Estimated Annual Impact</h3>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-[#5E6E76] mb-1">Time Saved</div>
            <div className="text-3xl font-bold text-green-600">
              {results.timeSaved.toLocaleString()} hrs
            </div>
            <div className="text-xs text-[#5E6E76] mt-1">
              Per semester across all faculty
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-[#5E6E76] mb-1">Cost Savings</div>
            <div className="text-3xl font-bold text-green-600">
              ${results.costSavings.toLocaleString()}
            </div>
            <div className="text-xs text-[#5E6E76] mt-1">
              Based on faculty time value
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-[#5E6E76] mb-1">Students Impacted</div>
            <div className="text-3xl font-bold text-green-600">
              {results.studentsImpacted.toLocaleString()}
            </div>
            <div className="text-xs text-[#5E6E76] mt-1">
              Receiving enhanced collaboration support
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <p className="text-sm text-[#5E6E76] text-center">
          <strong>Note:</strong> These estimates assume a 50% reduction in time spent on team management tasks
          such as team formation, charter creation, and feedback collection. Actual results may vary based on
          course structure and adoption level.
        </p>
      </div>
    </div>
  );
}
