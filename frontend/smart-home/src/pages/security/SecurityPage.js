import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import './SecurityPage.css';
import './EmergencyAlert.css'; // 新增导入弹窗的样式文件

const data = [
  { name: "Safe", value: 50, color: "#00C49F" },
  { name: "Warning", value: 25, color: "#FFBB28" },
  { name: "Danger", value: 25, color: "#FF8042" }
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

// 紧急警报弹窗组件
const EmergencyAlertPopup = ({ buildingName, onClose }) => {
  return (
    <div className="overlay">
      <div className="popup">
        <h2>Emergency Alert</h2>
        <p>{buildingName} - Danger</p>
        <p>Detected at: {new Date().toLocaleTimeString()}</p>
        <div className="popup-buttons">
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

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
          <p>Building 1</p>
          <p>SAFE</p>
        </div>
        <div className="building" style={{ backgroundColor: "#FFBB28" }}>
          <p>Building 2</p>
          <p>Warning</p>
        </div>
        <div className="building" style={{ backgroundColor: "#00C49F" }}>
          <p>Building 3</p>
          <p>SAFE</p>
        </div>
        <div className="building" style={{ backgroundColor: "#FF8042" }}>
          <p>Building 4</p>
          <p>Danger</p>
        </div>
      </div>

      <div className="footer">
        <p>Security</p>
      </div>
    </div>
  );
};

const SecurityPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // 检查是否存在“危险”状态的建筑
    const dangerBuilding = data.find(building => building.name === "Danger" && building.value > 0);
    if (dangerBuilding) {
      setShowPopup(true);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="security-page">

      <div className="main-content">
        {/* <Sidebar /> */}
        <BuildingStatusDashboard />
      </div>

      {/* 显示紧急警报弹窗 */}
      {showPopup && <EmergencyAlertPopup buildingName="Building 4" onClose={closePopup} />}
    </div>
  );
};

export default SecurityPage;

