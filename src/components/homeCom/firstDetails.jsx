import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { appleArray } from "./const/constDataAppleFruit";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function FirstDetails() {
  return (
    <div className="md:px-[115px] px-3">
      <div className="flex justify-between">
        <h4>Best Seller</h4>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-full border border-pink-600 flex items-center gap-2">
            view all[+40] <FaArrowRight />
          </button>
          <div className="bg-gray-200 p-1 rounded-full hidden md:block">
          <IoIosArrowBack size={30}/>

          </div>
          <div className="bg-gray-200 p-1 rounded-full  hidden md:block">

          <IoIosArrowForward size={30} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 ">
        {appleArray.map((item, id) => (
          <div className="flex flex-col my-7 shadow-sm  p-2" key={id}>
            <div className="bg-[#FEF5FD] rounded-lg ">
              <img
                src={item.image}
                alt={item?.name}
                className="max-w-[300px] w-full h-full  object-cover p-3 "
              />
            </div>
            <div className="bg-white flex flex-col gap-1">
              <h5 className="font-medium  text-[#0D0C0D] my-2">{item.description}</h5>
              <p className="text-sm font-medium  text-[#000000]">{item.title}</p>
              <p className="font-semibold text-[#0D0C0D] ">
                {item.price}{" "}
                <span className="line-through text-[#00000099] font-medium   text-base ml-6">{item.price}</span>
              </p>
              <p className="text-[#B6349A] text-sm font-medium">
                {item.duration} <span className="text-[#0D0C0D] font-medium text-sm ml-6"> 12 left</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
