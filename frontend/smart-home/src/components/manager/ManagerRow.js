import React, { useState, useEffect, useCallback } from 'react';
import ManagerRow from './ManagerRow';
import LogoutButton from '../public/LogoutButton'; // 导入 LogoutButton
import { getChildrenByUserId, getPropertiesByUserId } from '../services/homeownerService';
import { useSelector } from 'react-redux';

const ManagerTable = () => {
  const [managers, setManagers] = useState([]);
  
  // 从 Redux 中获取 userId
  const userId = useSelector((state) => state.user.user.userId);

  const fetchManagers = useCallback(async () => {
    try {
      // 获取子用户的 ID 列表
      const childrenResponse = await getChildrenByUserId(userId);
      const childrenIds = childrenResponse.data.map(child => child.userId);

      // 父用户的 ID 列表包含自身
      const allUserIds = [userId, ...childrenIds];

      // 获取所有用户的 Property
      const propertyPromises = allUserIds.map((id) => getPropertiesByUserId(id));
      const propertyResponses = await Promise.all(propertyPromises);

      // 合并所有 Property 的数据
      const allProperties = propertyResponses.flatMap((response) => response.data);

      setManagers(allProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchManagers();
    }
  }, [userId, fetchManagers]);

  return (
    <div className="max-w-6xl mx-auto p-5 font-sans">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-3xl font-bold">List of Properties Managed</h2>
          <p className="text-gray-500">{managers.length} properties found</p>
        </div>
        <LogoutButton /> {/* 使用 LogoutButton */}
      </div>

      <table className="w-full border-collapse shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left font-bold border-b">Property Number</th>
            <th className="p-3 text-left font-bold border-b">Username</th>
            <th className="p-3 text-left font-bold border-b">Email</th>
            <th className="p-3 text-left font-bold border-b">Phone Number</th>
            <th className="p-3 text-left font-bold border-b">Status</th>
            <th className="p-3 text-left font-bold border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <ManagerRow
              key={manager.property.propertyId}
              manager={manager}
              userId={userId}
              refreshManagers={fetchManagers} // 传递刷新函数
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerTable;
