import React, { useState } from 'react';

const AddButton = ({ addHomeowner }) => {
  const [showModal, setShowModal] = useState(false);

  // 初始表单数据状态
  const initialFormData = {
    name: '',
    address: '',
    email: '',
    phone: '',
    dateAdded: '',
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

  // 添加重置表单的函数
  const handleReset = () => {
    setFormData(initialFormData);
  };

  // 模态框样式
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明背景
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '4px',
    width: '800px', // 增加宽度
    maxWidth: '90%',
    boxSizing: 'border-box',
    position: 'relative',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '0',
    cursor: 'pointer',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    margin: '10px 0 5px',
    fontSize: '16px',
  };

  const inputStyle = {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const selectStyle = {
    ...inputStyle,
  };

  const formButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  };

  const formButtonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  };

  const saveButtonStyle = {
    ...formButtonStyle,
    backgroundColor: '#2196F3',
    color: '#fff',
  };

  const cancelButtonStyle = {
    ...formButtonStyle,
    backgroundColor: '#f44336',
    color: '#fff',
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
    // 调用父组件的 addHomeowner 函数，添加新房主
    addHomeowner(formData);
    // 重置表单数据
    setFormData(initialFormData);
    // 关闭模态框
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
        + Add new homeowner
      </button>

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <button style={closeButtonStyle} onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Add New Homeowner</h2>
            <form style={formStyle} onSubmit={handleSubmit}>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                name="name"
                style={inputStyle}
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label style={labelStyle}>Address</label>
              <input
                type="text"
                name="address"
                style={inputStyle}
                value={formData.address}
                onChange={handleChange}
                required
              />

              <label style={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                style={inputStyle}
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                style={inputStyle}
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <label style={labelStyle}>Date Added</label>
              <input
                type="datetime-local"
                name="dateAdded"
                style={inputStyle}
                value={formData.dateAdded}
                onChange={handleChange}
                required
                lang="en" // 设置语言为英文
              />

              <label style={labelStyle}>Status</label>
              <select
                name="status"
                style={selectStyle}
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="No Active">No Active</option>
              </select>

              <div style={formButtonContainerStyle}>
                <button
                  type="button"
                  style={cancelButtonStyle}
                  onClick={handleReset}
                >
                  Cancel
                </button>
                <button type="submit" style={saveButtonStyle}>
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
