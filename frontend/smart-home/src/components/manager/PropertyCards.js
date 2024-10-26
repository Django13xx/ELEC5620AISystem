import React, { useEffect, useState } from 'react';
// import '../../pages/manager/HomePage';


const PropertyCards = () => {
    const [properties, setProperties] = useState([]);
  
    useEffect(() => {
      // 从后端获取数据
      const fetchProperties = async () => {
        try {
          const userId = 1; // 假设使用的用户ID是1，可以根据实际情况动态设置
          const response = await fetch(`http://localhost:8080/api/property/getbyuserid?userId=${userId}`);
          if (response.ok) {
            const data = await response.json();
            setProperties(data);
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
                backgroundColor: '#f0f0f0',
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
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default PropertyCards;