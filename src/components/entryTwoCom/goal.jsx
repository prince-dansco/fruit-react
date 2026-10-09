import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheck,FaArrowRight } from "react-icons/fa";
import HorizontaLine from "../globalComp/horizontaLine";
import { selectGoal } from "../../const/constDataGoalSelection";
import goalImage from "../../assets/image/goal.png";
import { Link } from "react-router-dom";

export default function GoalSelection() {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState([]);

  const handleBackClick = () => {
    navigate("/firstPage");
  };

  const handleGoalClick = (goal) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goal)) {
        return prev.filter((item) => item !== goal);
      } else {
        return [...prev, goal];
      }
    });
  };

  const handleContinue = () => {
    // Handle the continue action with selectedGoals
    console.log("Selected goals:", selectedGoals);
    // navigate("/next-page");
  };

  return (
    <div className="md:px-[115px] px-5">
      <div
        className="flex justify-center items-center px-3 py-4 rounded-full outline outline-1 w-8 h-8 my-3 cursor-pointer hover:bg-gray-100"
        onClick={handleBackClick}
      >
        <FaArrowLeft size={20} className="text-center" />
      </div>

      <HorizontaLine />

      <div className="">
        <h1 className="font-bold text-xl text-start md:text-[32px] leading-[160%] text-[#0D0C0D] max-w-[584px] w-full">
          What are your goals with EasyMart?
        </h1>
        <div className="flex items-start justify-between gap-2">
          <div className="my-4 flex flex-wrap">
            {selectGoal.map((goal, index) => (
              <button
                key={index}
                onClick={() => handleGoalClick(goal)}
                className={`bg-[#F8F8F8] px-[11px] md:px-4 py-3 m-[5px] md:m-2 rounded-3xl flex items-center font-semibold  gap-3 text-[#0D0C0D] text-base  ${
                  selectedGoals.includes(goal)
                    ? "border-2 border-pink-500 bg-[#FEF5FD] rounded-full "
                    : "border-2 border-transparent"
                }`}
              >
                <span>{goal}</span>
                {selectedGoals.includes(goal) && (
                  <FaCheck size={10} className="text-pink-500" />
                )}
              </button>
            ))}
          </div>
          <div className="hidden md:block">
            <img
              src={goalImage}
              alt="for goal pic"
              className="object-cover w-full h-full max-w-[510px] max-h-[510px]"
            />
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={selectedGoals.length === 0}
          className={`w-full md:w-auto px-8 py-4 justify-center rounded-full mb-4 text-white font-bold mt-4 flex items-center gap-3 ${
            selectedGoals.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
         <Link to='/login' className="flex items-center gap-3">Continue <FaArrowRight/></Link> 
        </button>
      </div>
    </div>
  );
}


