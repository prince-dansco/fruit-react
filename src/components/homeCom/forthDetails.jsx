import React, { useState } from "react";
import { allOrange, forthArray } from "./const/constDataAppleFruit";
import { FaArrowRight } from "react-icons/fa";

export default function ForthDetails() {
  const [selectedIndex, setSelectedIndex] = useState();

  const handleGoalClick = (index) => {
    setSelectedIndex((prev) => {
      return prev === index ? -1 : index;
    });
  };
  return (
    <div className="bg-[#FAF8F9] p-0 md:p-9">
      <div className=" px-1 md:px-[115px]  rounded-md relative bg-white rounded-tr-3xl mx-7">
        <div className="">
          <h1 className="text-lg md:text-2xl font-semibold text-[#000000] mb-4">
            Trending Store Favorites
          </h1>
          <div className="flex flex-wrap gap-2 mb-6 max-w-[500px] w-full ">
            {forthArray.slice(0, 9).map((select, index) => (
              <button
                key={index}
                onClick={() => handleGoalClick(index)}
                className={`px-3 py-2 rounded-full text-sm font-medium flex items-center justify-center ${
                  selectedIndex === index
                    ? "bg-pink-50 border-2 border-pink-500"
                    : "bg-gray-100 border-2 border-transparent"
                }`}
              >
                {select}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-[#6C2358] absolute right-1 top-1 hidden md:block max-w-[260px] w-full max-h-[170px] h-full p-4 rounded-bl-[35px]  rounded-tr-3xl">
        {/* <div className="bg-[#6C2358] absolute right-1 top-1  max-w-[260px] w-full max-h-[170px] h-full p-4 rounded-none rounded-bl-2xl rounded-tr-lg"> */}
          <div className="flex flex-col  items-start gap-3">
            <p className="text-sm font-medium">Freshness Guarantee</p>
            <h3 className="text-2xl font-semibold text-[#FFFFFF]">
              Weekly sold 1k+
            </h3>
            <button className="rounded-full bg-white px-4 py-2 flex items-center gap-2">
              View More <FaArrowRight />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 ">
          {allOrange.map((item, id) => (
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
    </div>

    //     <div className="bg-gray-50 p-4 md:p-9">
    //       <div className="relative bg-white rounded-lg shadow-sm p-4 md:p-6">
    //         {/* Header and Banner */}
    //         <div className="flex justify-between">
    //           <div className="w-3/4">
    //             <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
    //               Trending Store Favorites
    //             </h1>

    //             {/* Category buttons */}
    //             <div className="flex flex-wrap gap-2 mb-6">
    //               {forthArray.slice(0, 10).map((select, index) => (
    //                 <button
    //                   key={index}
    //                   onClick={() => handleGoalClick(index)}
    //                   className={`px-3 py-1 rounded-full text-xs font-medium flex items-center justify-center ${
    //                     selectedIndex === index
    //                       ? "bg-pink-50 border-2 border-pink-500"
    //                       : "bg-gray-100 border-2 border-transparent"
    //                   }`}
    //                 >
    //                   {select}
    //                 </button>
    //               ))}
    //             </div>
    //           </div>

    //           {/* Weekly sold banner */}
    //           <div className="absolute right-0 top-0 bg-purple-800 text-white p-4 rounded-bl-lg rounded-tr-lg">
    //             <div className="flex flex-col items-start gap-2">
    //               <p className="text-xs font-medium">Freshness Guarantee</p>
    //               <h3 className="text-lg md:text-xl font-semibold">
    //                 Weekly sold 1k+
    //               </h3>
    //               <button className="rounded-full bg-white text-purple-800 px-3 py-1 flex items-center gap-1 text-xs">
    //                 View More <FaArrowRight className="text-xs" />
    //               </button>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Product Grid */}
    //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
    //           {allOrange.map((item, id) => (
    //             <div className="flex flex-col" key={id}>
    //               <div className="bg-pink-50 rounded-lg p-2">
    //                 <img
    //                   src={item.image}
    //                   alt="Orange"
    //                   className="w-full object-cover"
    //                 />
    //               </div>
    //               <div className="p-2">
    //                 <h5 className="font-medium text-sm text-gray-900 mt-2">
    //                   {item.description}
    //                 </h5>
    //                 <p className="text-sm font-medium text-gray-900">
    //                   {item.title}
    //                 </p>
    //                 <p className="font-semibold text-gray-900">
    //                   {item.price}
    //                   <span className="line-through text-gray-500 ml-4 text-sm">
    //                     {item.originalPrice}
    //                   </span>
    //                 </p>
    //                 <p className="text-sm">
    //                   <span className="text-pink-600 font-medium">
    //                     {item.duration}
    //                   </span>
    //                   <span className="text-gray-900 font-medium ml-4">
    //                     12 Left
    //                   </span>
    //                 </p>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
  );
}
