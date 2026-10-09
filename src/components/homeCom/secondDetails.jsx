
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { mostsellArray, secondArray } from "./const/constDataAppleFruit";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function SecondDetails() {
  const [selectedIndex, setSelectedIndex] = useState(-1); 

  const handleGoalClick = (index) => {
    setSelectedIndex((prev) => {
      return prev === index ? -1 : index;
    });
  };

  return (
    <div className="md:px-[150px] px-2 my-7">
      <div className="flex justify-between">
        <h1 className="text-xl text-center md:text-start mb-2 md:mb-0  md:text-2xl font-semibold text-[#000000]">
          Trending Store Favorites
        </h1>
        <div className="hidden md:block">
        <button className=" px-3 py-2 my-2 rounded-full border border-[#B6349A] flex items-center gap-2 outline-0 outline-1 ">
          View All <FaArrowRight />
        </button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-1 max-w-[500px] w-full">
          {secondArray.map((select, index) => (
            <button
              key={index}
              onClick={() => handleGoalClick(index)}
              className={`bg-[#F8F8F8] px-[10px] py-2 my-1 rounded-3xl flex items-center font-medium gap-2 text-[#0D0C0D] text-xs ${
            //   className={`bg-[#F8F8F8] px-[9px] md:px-4 py-2 m-[4px] md:m-2 rounded-3xl flex items-center font-medium gap-1 text-[#0D0C0D] text-xs ${
                selectedIndex === index
                  ? "border-2 border-pink-500 bg-[#FEF5FD] rounded-full"
                  : "border-2 border-transparent"
              }`}
            >
              <span>{select}</span>
            </button>
          ))}
        </div>
        <div className="hidden md:block">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 p-1 rounded-full">
            <IoIosArrowBack size={30} />
          </div>
          <div className="bg-gray-100 p-1 rounded-full">
            <IoIosArrowForward size={30} />
          </div>
        </div>
        </div>
      </div>

      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 ">
        {mostsellArray.map((item, id) => (
          <div className="flex flex-col my-7 shadow-sm  p-2" key={id}>
            <div className="bg-[#FEF5FD] rounded-lg ">
              <img
                src={item.image}
                alt={item?.name}
                className="max-w-[300px] w-full h-full  object-cover p-3 "
              />
            </div>
            <div className="bg-white flex flex-col gap-1">
              <h5 className="font-medium  text-[#0D0C0D] my-2">
                {item.description}
              </h5>
              <p className="text-sm font-medium  text-[#000000]">
                {item.title}
              </p>
              <p className="font-semibold text-[#0D0C0D] ">
                {item.price}{" "}
                <span className="line-through text-[#00000099] font-medium   text-base ml-6">
                  {item.price}
                </span>
              </p>
              <p className="text-[#B6349A] text-sm font-medium">
                {item.duration}{" "}
                <span className="text-[#0D0C0D] font-medium text-sm ml-6">
                  {" "}
                  12 left
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
