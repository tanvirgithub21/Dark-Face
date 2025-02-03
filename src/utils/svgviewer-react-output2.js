import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={300}
    height={200}
    viewBox="0 0 300 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <style>
      {
        '\n    @keyframes glowEyes {\n      0% { filter: drop-shadow(0 0 5px #0ff); }\n      50% { filter: drop-shadow(0 0 15px #0ff); }\n      100% { filter: drop-shadow(0 0 5px #0ff); }\n    }\n\n    @keyframes smileMove {\n      0% { d: path("M110 170 Q150 200, 190 170"); }\n      50% { d: path("M110 180 Q150 210, 190 180"); }\n      100% { d: path("M110 170 Q150 200, 190 170"); }\n    }\n\n    @keyframes typing {\n      0% { width: 0; }\n      100% { width: 300px; }\n    }\n\n    .eye {\n      fill: #0ff;\n      animation: glowEyes 1.5s infinite alternate;\n    }\n\n    .smile {\n      fill: none;\n      stroke: #0ff;\n      stroke-width: 4;\n      filter: drop-shadow(0 0 10px #0ff);\n      stroke-linecap: round;\n      stroke-linejoin: round;\n      animation: smileMove 2s infinite ease-in-out;\n    }\n\n    .typing-text {\n      font-family: \'Courier New\', monospace;\n      font-size: 50px;\n      font-weight: bold;\n      fill: #0ff;\n      white-space: nowrap;\n      overflow: hidden;\n      animation: typing 4s steps(16) 1s 1 normal both;\n      text-anchor: middle;\n      alignment-baseline: middle;\n    }\n  '
      }
    </style>
    <rect width="100%" height="100%" fill="none" />
    <text
      x="50%"
      y="50%"
      className="typing-text"
      textAnchor="middle"
      alignmentBaseline="middle"
    >
      {"Dark"}
    </text>
    <circle cx={240} cy={95} r={20} fill="none" stroke="#0ff" />
    <circle className="eye" cx={230} cy={90} r={4} />
    <circle className="eye" cx={250} cy={90} r={4} />
    <path className="smile" d="M230 60 Q235 65, 240 60" />
  </svg>
);
export default SVGComponent;
