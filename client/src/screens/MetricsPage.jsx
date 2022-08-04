import React from "react";
import MetricCard from "../components/MetricCard";

export default function MetricCards({ data = [] }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {data.map((item, index) => {
        return <MetricCard key={index} data={item} />;
      })}
    </div>
  );
}
