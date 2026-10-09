import React from "react";
import AllArrayDisplay from "../../components/homeCom/testArray";
import FirstDetails from "../../components/homeCom/firstDetails";
import SecondDetails from "../../components/homeCom/secondDetails";
import ThirdDetails from "../../components/homeCom/thirdDetails";
import ForthDetails from "../../components/homeCom/forthDetails";
import FithDetails from "../../components/homeCom/fithDetails";

export default function DashBoard() {
  return (
    <div>
      <AllArrayDisplay />
      <FirstDetails />
      <SecondDetails />
      <ThirdDetails />
      <ForthDetails />
      <FithDetails />
      
    </div>
  );
}
