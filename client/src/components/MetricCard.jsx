import * as React from "react";
import UpIcon from "../assets/BNM_Metric_Up.svg";
import DownIcon from "../assets/BNM_Metric_Down.svg";

export default function MetricCard({ data = {} }) {
  const isPositiveWowChange =
    Math.sign(data["Week-Over-Week Change"].match(/-?\d+/g)[0]) === 1;

  return (
    <div className="card">
      <h3>{data["Metric Name"]}</h3>
      <div className="figures">
        {data["Metric Count"]} |
        <span
          className="percentile"
          style={{ color: !isPositiveWowChange && "red" }}
          id="overview-percentile"
        >
          {data["Percentile"].match(/(\d+)/)[0]}%
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 5,
            }}
          >
            {/* {isPositiveWowChange && <UpIcon />} */}
            <img
              src={isPositiveWowChange ? UpIcon : DownIcon}
              alt={"trendIcon"}
              style={{ width: "15px", height: "15px" }}
            />
            <div style={{ fontSize: "12px", color: "black" }}>pctl</div>
          </div>
        </span>
      </div>
      <p className="perf">
        Your performance from last week
        <span
          className="wow"
          style={{ color: !isPositiveWowChange && "red" }}
          id="overview-wow"
        >
          {(isPositiveWowChange ? "+" : "") +
            data["Week-Over-Week Change"].match(/-?\d+/g)[0] +
            "%"}
        </span>
      </p>
    </div>
  );
}
