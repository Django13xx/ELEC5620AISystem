import React, { useEffect, useState } from 'react';

const PropertyCards = () => {
    const [properties, setProperties] = useState([]);
    const [selectedResidents, setSelectedResidents] = useState([]);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      // 从后端获取数据
      const fetchProperties = async () => {
        try {
          const userId = 2; // 假设使用的用户ID是1，可以根据实际情况动态设置
          const response = await fetch(`http://localhost:8080/api/property/getbyuserid?userId=${userId}`);
          if (response.ok) {
            const data = await response.json();
            setProperties(data.map(item => ({
  propertyId: item.property.propertyId,
  propertyNumber: item.property.propertyNumber,
  user: item.property.user,
  isLeased: item.isLeased
})));
          } else {
            console.error('Failed to fetch properties');
          }
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      };
  
      fetchProperties();
    }, []);
  
    const headerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    };
  
    const titleStyle = {
      fontSize: '24px',
      fontWeight: 'bold',
    };
  
    const subtitleStyle = {
      fontSize: '16px',
      color: '#555',
    };

    const handleViewResidents = async (propertyNumber) => {
      try {
        const userId = 2; // 假设使用的用户ID是1，可以根据实际情况动态设置
        const response = await fetch(`http://localhost:8080/api/user/children?userId=${userId}`);
        if (response.ok) {
          const children = await response.json();
          setSelectedResidents(children);
        } else {
          console.error('Failed to fetch residents');
          setSelectedResidents([]);
        }
      } catch (error) {
        console.error('Error fetching residents:', error);
        setSelectedResidents([]);
      }
      setShowModal(true);
    }
  
    const closeModal = () => {
      setShowModal(false);
      setSelectedResidents([]);
    };
  
    return (
      <>
        <div style={headerStyle}>
          <div>
            <h2 style={titleStyle}>List of Properties</h2>
            <p style={subtitleStyle}>{properties.length} properties found</p>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          justifyContent: 'center',
        }}>
          {properties.map((property) => (
            <div
              key={property.propertyId}
              className="property-card"
              style={{
                width: '220px',
                height: '220px',
                padding: '15px',
                backgroundColor: property.isLeased ? '#0000FF' : '#f0f0f0', // 按照 isLeased 设置背景色为蓝色
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <h3 style={{ marginBottom: '20px' }}>Room: {property.propertyNumber}</h3>
              <button onClick={() => handleViewResidents(property.propertyNumber)} style={{ marginTop: 'auto', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>View Residents</button>
            </div>
          ))}
        </div>
        {showModal && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff', padding: '20px', width: '400px', height: '500px', overflowY: 'auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}>
            <h2>Resident Information</h2>
            {selectedResidents.length > 0 ? (
              <ul>
                {selectedResidents.map((resident, index) => (
              <li key={`${resident.userId}-${index}`} style={{ marginBottom: '10px' }}>
                    <strong>Username:</strong> {resident?.username || 'N/A'} <br />
                    <strong>Email:</strong> {resident?.email || 'N/A'} <br />
                    <strong>Number:</strong> {resident?.number || 'N/A'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No residents available.</p>
            )}
            <button onClick={closeModal} style={{ marginTop: '20px', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Close</button>
          </div>
        )}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }} onClick={closeModal}></div>
        )}
      </>
    );
  };
  
  export default PropertyCards;