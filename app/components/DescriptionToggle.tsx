"use client";
import React, { useState } from "react";

const ExperienceDescription = ({ description }: any) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div onClick={toggleDescription}>
      {showDescription ? (
        <p className="mt-2">{description}</p>
      ) : (
        <button
          style={{ marginTop: "8%" }}
          className={`bg-teal-500 dark:bg-teal-800 text-neutral-900 dark:text-neutral-100 font-semibold p-3 rounded focus:outline-none focus:bg-teal-500 focus:text-white w-full`}
        >
          Click to view description
        </button>
      )}
    </div>
  );
};

export default ExperienceDescription;
