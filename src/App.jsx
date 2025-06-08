import React, { useState, useEffect } from 'react';
import { STUDENTS } from './config';

function App() {
  const [searchText, setSearchText] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(STUDENTS);
  const [filteredCity, setFilteredCity] = useState("");
  const [filteredPercentage, setFilteredPercentage] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const uniqueCities = [...new Set(STUDENTS.map(student => student.city))];
  const uniquePercentages = [...new Set(STUDENTS.map(student => student.percentage))];

  useEffect(() => {
    if (!searchText) {
      setFilteredStudents(STUDENTS);
      return;
    }

    const tempFiltered = STUDENTS.filter((student) => {
      if (student.name.toLowerCase().includes(searchText)) {
        return true;
      } else if (student.city.toLowerCase().includes(searchText)) {
        return true;
      } else if (student.percentage.toString().includes(searchText)) {
        return true;
      } else {
        return false;
      }
    });

    setFilteredStudents(tempFiltered);
  }, [searchText]);


  useEffect(() => {
    if (!filteredCity && !filteredPercentage) {
      setFilteredStudents(STUDENTS);
      return;
    }

    const tempFiltered = STUDENTS.filter((student) => {
      if (
        filteredCity &&
        student.city === filteredCity &&
        filteredPercentage &&
        student.percentage === parseFloat(filteredPercentage)
      ) {
        return true;
      }

      if (filteredPercentage && !filteredCity && student.percentage === parseFloat(filteredPercentage)) {
        return true;
      }

      if (filteredCity && !filteredPercentage && student.city === filteredCity) {
        return true;
      }

      return false;
    });

    setFilteredStudents(tempFiltered);
  }, [filteredCity, filteredPercentage]);


  useEffect(() => {
    const tempSorted = [...filteredStudents].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredStudents(tempSorted);
  }, [sortOrder]);

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <h2 className="text-4xl font-semibold text-center my-4">Student List</h2>

      <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Search by name or city"
          className="px-3 py-2 rounded border"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="px-3 py-2 rounded border"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </select>

        <select
          className="px-3 py-2 rounded border"
          value={filteredCity}
          onChange={(e) => setFilteredCity(e.target.value)}
        >
          <option value="">Filter by City</option>
          {uniqueCities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>

        <select
          className="px-3 py-2 rounded border"
          value={filteredPercentage}
          onChange={(e) => setFilteredPercentage(e.target.value)}
        >
          <option value="">Filter by Percentage</option>
          {uniquePercentages.map((percent, index) => (
            <option key={index} value={percent}>{percent}%</option>
          ))}
        </select>

      </div>

      <div className="flex flex-wrap justify-around">
        {filteredStudents.map((student, index) => (
          <div
            key={index}
            className="bg-white shadow-lg mb-5 mx-6 px-5 py-3 rounded-lg w-[350px]"
          >
            <h3 className="border-b-2 border-gray-300 font-bold text-lg text-gray-800 mb-2">{student.name}</h3>
            <p><span className="font-semibold">City:</span> {student.city}</p>
            <p><span className="font-semibold">Marks:</span> {student.marks}</p>
            <p><span className="font-semibold">Percentage:</span> {student.percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
