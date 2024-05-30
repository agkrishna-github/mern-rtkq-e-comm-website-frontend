import React from "react";

const FeaturesComp = ({ allFeatures, setFeature }) => {
  console.log(allFeatures);
  return (
    <>
      {allFeatures.map((feature, i) => (
        <div
          className="mt-3"
          onClick={() => setFeature(feature)}
          style={{ cursor: "pointer" }}
          key={i}
        >
          {feature}
        </div>
      ))}
    </>
  );
};

export default FeaturesComp;
