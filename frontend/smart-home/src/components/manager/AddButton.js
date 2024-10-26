import React, { useState } from 'react';

const AddButton = ({ addHomeowner }) => {
  const [showModal, setShowModal] = useState(false);

  // 初始表单数据状态
  const initialFormData = {
    username: '',
    email: '',
    room: '',
    number: '',
    status: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  // 按钮样式保持不变
  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const hoverStyle = {
    backgroundColor: '#45a049',
  };

  const handleMouseEnter = (e) => {
    Object.assign(e.target.style, hoverStyle);
  };

  const handleMouseLeave = (e) => {
    Object.assign(e.target.style, { backgroundColor: '#4CAF50' });
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  // 修改 handleCloseModal 函数，关闭模态框并重置表单
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialFormData);
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 2; // Replace this with the actual userId that you need to pass
    const formDataWithStatus = {
      username: formData.username,
      email: formData.email,
      room: formData.room,
      number: formData.number,
      status: formData.status === "Active" ? 1 : 0, // Convert status
    };
  
    try {
      const response = await fetch(`http://localhost:8080/api/users/addresident?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithStatus),
      });
      if (!response.ok) {
        throw new Error('Failed to add homeowner');
      }
      // addHomeowner(formDataWithStatus);
      // setFormData(initialFormData);
      // setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <button
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleButtonClick}
      >
        + Add New Resident
      </button>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '4px', width: '800px', maxWidth: '90%', boxSizing: 'border-box', position: 'relative' }}>
            <button style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#f44336', color: '#fff', border: 'none', padding: '0', cursor: 'pointer', borderRadius: '50%', width: '30px', height: '30px', fontSize: '20px', lineHeight: '30px', textAlign: 'center' }} onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Add New Resident</h2>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
              <label style={{ margin: '10px 0 5px', fontSize: '16px' }}>Name</label>
              <input type="text" name="username" style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} value={formData.username} onChange={handleChange} required />

              <label style={{ margin: '10px 0 5px', fontSize: '16px' }}>Room</label>
              <input type="text" name="room" style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} value={formData.room} onChange={handleChange} required />

              <label style={{ margin: '10px 0 5px', fontSize: '16px' }}>Email</label>
              <input type="email" name="email" style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} value={formData.email} onChange={handleChange} required />

              <label style={{ margin: '10px 0 5px', fontSize: '16px' }}>Phone Number</label>
              <input type="tel" name="number" style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} value={formData.number} onChange={handleChange} required />

              <label style={{ margin: '10px 0 5px', fontSize: '16px' }}>Status</label>
              <select name="status" style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} value={formData.status} onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="No Active">No Active</option>
              </select>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" style={{ padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px', backgroundColor: '#f44336', color: '#fff' }} onClick={handleReset}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px', backgroundColor: '#2196F3', color: '#fff' }}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddButton;
