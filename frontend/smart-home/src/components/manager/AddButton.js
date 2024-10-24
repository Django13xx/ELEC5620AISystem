import React, { useState } from 'react';

const AddButton = ({ addHomeowner }) => {
  const [showModal, setShowModal] = useState(false);

  // 初始表单数据状态
  const initialFormData = {
    name: '',
    room: '',
    email: '',
    phone: '',
    date: '',
    status: '',
    rentPaid: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 调用父组件的 addHomeowner 函数，添加新住户
    addHomeowner(formData);
    setFormData(initialFormData);
    setShowModal(false);
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
              <input type="text" name="name" style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} value={formData.name} onChange={handleChange} required />

              <label style={{ margin: '10px 0 5px', fontSize: '16px' }}>Room</label>
              <input type="text" name="room" style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} value={formData.room} onChange={handleChange} required />

              <label style={{ margin: '10px 0 5px', fontSize: '16px' }}>Email</label>
              <input type="email" name="email" style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} value={formData.email} onChange={handleChange} required />

              <label style={{ margin: '10px 0 5px', fontSize: '16px' }}>Phone Number</label>
              <input type="tel" name="phone" style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} value={formData.phone} onChange={handleChange} required />

              <label style={{ margin: '10px 0 5px', fontSize: '16px' }}>Date</label>
              <input type="datetime-local" name="date" style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} value={formData.date} onChange={handleChange} required lang="en" />

              <label style={{ margin: '10px 0 5px', fontSize: '16px' }}>Status</label>
              <select name="status" style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} value={formData.status} onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="No Active">No Active</option>
              </select>

              <label style={{ margin: '10px 0 5px', fontSize: '16px' }}>Rent Paid</label>
              <select name="rentPaid" style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} value={formData.rentPaid} onChange={handleChange} required>
                <option value="">Select Rent Paid</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
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
