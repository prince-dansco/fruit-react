import React, { useState } from "react";
import { orange, thirdArray } from "./const/constDataAppleFruit";

export default function ThirdDetails() {
  const [selectedIndex, setSelectedIndex] = useState();

  const handleGoalClick = (index) => {
    setSelectedIndex((prev) => {
      return prev === index ? -1 : index;
    });
  };
  return (
    <div className="md:px-[115px] px-2 bg-[#FCFCFC] py-5">
      <div className="flex justify-between gap-3">
        <div className="max-w-[700px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 ">
            {orange.map((item, id) => (
              <div className="flex flex-col my-7 shadow-sm  p-2" key={id}>
                <div className="bg-[#FFFFFF] rounded-lg ">
                  <img
                    src={item.image}
                    alt={item?.name}
                    className="max-w-[300px] w-full h-full  object-cover p-3 "
                  />
                </div>
                <div className="bg-[#FCFCFC] flex flex-col gap-1">
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
        <div className="hidden md:block">
          <p className="text-[#B6349A] text-base font-bold">
            Get 10% OFF On Your First Order
          </p>
          <h3 className="text-[#0D0C0D] text-3xl font-semibold">
            Order Now Your Grocery!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 my-2">
            {thirdArray.map((select, index) => (
              <button
                key={index}
                onClick={() => handleGoalClick(index)}
                className={`bg-gray-100 px-[8px] py-2 my-1 rounded-3xl flex items-center text-center font-medium gap-2 text-[#0D0C0D] text-xs ${
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
        </div>
      </div>
    </div>
  );
}
