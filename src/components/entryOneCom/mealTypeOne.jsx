
import React, { useState } from "react";
import { mealSelection } from "../../const/constDataHomeTwo";
import headerImg1 from "../../assets/image/home_one.png";
import headerImg2 from "../../assets/image/home_two.png";
import headerImg3 from "../../assets/image/home_three.png";
import headerImg4 from "../../assets/image/home_four.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import HorizontaLine from "../globalComp/horizontaLine";
import { useNavigate } from "react-router-dom";

export default function MealTypeOne() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const navigate = useNavigate();

  const handleMealClick = (mealName) => {
    setSelectedMeal(mealName);
  };

  const handleBackClick = () => {
    navigate("/");
  };
  const handleContinue = () => {
    navigate("/secondPage");
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

      <div className="mb-6">
        {" "}
        {/* Added margin-bottom */}
        <h1 className="font-bold text-xl text-start md:text-[32px] leading-[160%] text-[#0D0C0D] max-w-[584px] w-full">
          What kind of meals do you prefer?
        </h1>
      </div>

      <div className="flex md:flex-row flex-col justify-between gap-6 items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 justify-self-center ">
          {" "}
          {/* Added w-full */}
          {mealSelection.map((meal) => (
            <div
              key={meal.name}
              onClick={() => handleMealClick(meal.name)}
              className={`bg-[#F8F8F8] px-5 py-7 rounded-lg m-3 flex flex-col gap-4 hover:bg-[#FEF5FD] text-center cursor-pointer transition-colors duration-200 ${
                selectedMeal === meal.name
                  ? "border-2 border-pink-500 bg-[#FEF5FD]"
                  : ""
              }`}
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-auto object-cover max-w-[55px] mx-auto"
              />
              <p className="font-semibold text-base">{meal.name}</p>
            </div>
          ))}
        </div>

        {/* Image Gallery - Hidden on mobile */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 gap-2">
            {" "}
            {/* Simplified grid */}
            <img
              src={headerImg1}
              alt="header pic"
              className="w-full h-auto object-cover max-w-[195px]"
            />
            <img
              src={headerImg2}
              alt="header pic"
              className="w-full h-auto object-cover max-w-[195px]"
            />
            <img
              src={headerImg3}
              alt="header pic"
              className="w-full h-auto object-cover max-w-[195px]"
            />
            <img
              src={headerImg4}
              alt="header pic"
              className="w-full h-auto object-cover max-w-[195px]"
            />
          </div>
        </div>
      </div>

      <div className="md:mt-40 my-8">
        <button
          onClick={handleContinue}
          disabled={!selectedMeal}
          className={`rounded-full px-5 w-full md:w-40 justify-center font-semibold text-lg text-white py-4 flex gap-3 items-center transition-colors duration-200 ${
            selectedMeal
              ? "bg-[#B6349A] hover:bg-[#9E2D84]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
