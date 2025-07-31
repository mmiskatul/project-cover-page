import React from 'react'
import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigate = useNavigate(); // Initialize navigate
  return (
      <div className='mb-8 items-start'>
        <button
          onClick={() => navigate(-1)} // ✅ Go back to previous route
          className='bg-indigo-600 text-xl font-bold text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 active:scale-95'
        >
          Back
        </button>
      </div>
    
  )
}

export default BackButton
