import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import './SecurityPage.css';

const data = [
  { name: "Safe", value: 50, color: "#00C49F" },
  { name: "Warning", value: 25, color: "#FFBB28" },
  { name: "Danger", value: 25, color: "#FF8042" }
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const BuildingStatusDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Building Status Dashboard</h1>
      <div className="pie-chart-container">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx={100}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <div className="status-label">Safe: 50%</div>
      </div>
      
      <div className="buildings">
        <div className="building" style={{ backgroundColor: "#00C49F" }}>
          <p>Building 1</p >
          <p>SAFE</p >
        </div>
        <div className="building" style={{ backgroundColor: "#FFBB28" }}>
          <p>Building 2</p >
          <p>Warning</p >
        </div>
        <div className="building" style={{ backgroundColor: "#00C49F" }}>
          <p>Building 3</p >
          <p>SAFE</p >
        </div>
        <div className="building" style={{ backgroundColor: "#FF8042" }}>
          <p>Building 4</p >
          <p>Danger</p >
        </div>
      </div>

      <div className="footer">
        <p>Security</p >
      </div>
    </div>
  );
};

const SecurityPage = () => {
  return (
    <div className="security-page">

      <div className="main-content">
        {/* <Sidebar /> */}
        <BuildingStatusDashboard />
      </div>
    </div>
  );
};

export default SecurityPage;