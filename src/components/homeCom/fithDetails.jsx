import React from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { orange } from "./const/constDataAppleFruit";
import { IoIosArrowForward } from "react-icons/io";

export default function FithDetails() {
  return (
    <div className="md:px-[99px] px-3 my-16">
      <div className="bg-[#F5FBF5] p-4 rounded-xl  flex flex-col md:flex-row gap-4 justify-between">
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
                <div className=" flex flex-col gap-1">
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
        <div className="">
          <div className="">
            <p className="text-[#B6349A] text-base font-bold">
              Get 10% OFF On Your First Order
            </p>
            <h3 className="text-[#0D0C0D] text-xl md:text-3xl font-semibold">
              Order Now Your Grocery!
            </h3>
            <div className="flex items-center gap-6 my-5">
              <div className="">
                <h1 className="text-[#0D0C0D]  text-lg md:text-2xl font-semibold">
                  1k+{" "}
                  <span className="block text-[#0D0C0D] text-lg font-medium">
                    items
                  </span>
                </h1>
              </div>
              <div className="">
                <h1 className="text-[#0D0C0D]  text-lg md:text-2xl font-semibold">
                  20{" "}
                  <span className="block text-[#0D0C0D] text-lg font-medium">
                    minutes
                  </span>
                </h1>
              </div>
              <div className="">
                <h1 className="text-[#0D0C0D]  text-lg md:text-2xl font-semibold">
                  30%{" "}
                  <span
                    span
                    className="block text-[#0D0C0D] text-lg font-medium"
                  >
                    Up to Offers
                  </span>
                </h1>
              </div>
            </div>
            <button className="rounded-full bg-[#A02B84] text-white px-4 py-3 flex items-center gap-2">order now <IoIosArrowForward size={30} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
