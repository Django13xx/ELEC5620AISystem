// HomeownerRow Component
import React, { useState } from 'react';

import { addHomeOwner } from '../services/homeownerService';

const HomeownerRow = ({ homeowner, onEdit }) => {
  const { propertyNumber, username, email, number } = homeowner;

  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    number: '',
  });

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      const response = await addHomeOwner(homeowner.userId, homeowner.propertyId, {
        number: formData.number,
        email: formData.email,
        username: formData.username,
      });
      console.log('Edit response:', response);
      onEdit({ ...homeowner, ...formData });
      setShowEditModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error editing homeowner:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <tr className="border-b border-gray-300">
        <td className="p-3 align-middle text-sm text-gray-800">{propertyNumber}</td>
        <td className="p-3 align-middle text-sm text-gray-800">{username}</td>
        <td className="p-3 align-middle text-sm text-gray-800">{email}</td>
        <td className="p-3 align-middle text-sm text-gray-800">{number}</td>

        <td className="p-3 align-middle text-sm text-gray-800">
          <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2" onClick={handleEditClick}>Edit Homeowner</button>
          
        </td>
      </tr>

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Homeowner</h3>
            <label className="block mb-2">
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <label className="block mb-4">
              number:
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </label>
            <div className="flex justify-end">
              <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded mr-2">Save</button>
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeownerRow;
