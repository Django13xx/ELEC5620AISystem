// import React, { useEffect, useState } from 'react';

// const PropertyCards = () => {
//     const [properties, setProperties] = useState([]);
//     const [selectedResidents, setSelectedResidents] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [newResident, setNewResident] = useState({ username: '', email: '', number: '' });
//     const [currentPropertyNumber, setCurrentPropertyNumber] = useState(null);
//     const [selectedResidentToDelete, setSelectedResidentToDelete] = useState(null);
  
//     useEffect(() => {
//       // 从后端获取数据
//       const fetchProperties = async () => {
//         try {
//           const userId = 2; // 假设使用的用户ID是1，可以根据实际情况动态设置
//           const response = await fetch(`http://localhost:8080/api/property/getbyuserid?userId=${userId}`);
//           if (response.ok) {
//             const data = await response.json();
//             setProperties(data.map(item => ({
//               propertyId: item.property.propertyId,
//               propertyNumber: item.property.propertyNumber,
//               user: item.property.user,
//               isLeased: item.isLeased
//             })));
//           } else {
//             console.error('Failed to fetch properties');
//           }
//         } catch (error) {
//           console.error('Error fetching properties:', error);
//         }
//       };
  
//       fetchProperties();
//     }, []);
  
//     const headerStyle = {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px',
//     };
  
//     const titleStyle = {
//       fontSize: '24px',
//       fontWeight: 'bold',
//     };
  
//     const subtitleStyle = {
//       fontSize: '16px',
//       color: '#555',
//     };

//     const handleViewResidents = async (propertyNumber) => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/property/getbypropertynumber?propertyNumber=${propertyNumber}`);
//         if (response.ok) {
//           const data = await response.json();
//           setSelectedResidents(data.map(resident => ({
//             userId: resident.userId,
//             username: resident.username,
//             email: resident.email,
//             number: resident.number,
//           })));
//         } else {
//           console.error('Failed to fetch residents');
//           setSelectedResidents([]);
//         }
//       } catch (error) {
//         console.error('Error fetching residents:', error);
//         setSelectedResidents([]);
//       }
//       setShowModal(true);
//     }
  
//     const handleAddResident = (propertyNumber) => {
//       setCurrentPropertyNumber(propertyNumber);
//       setShowAddModal(true);
//     };

//     const handleDeleteResident = async (propertyNumber) => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/property/getbypropertynumber?propertyNumber=${propertyNumber}`);
//         if (response.ok) {
//           const data = await response.json();
//           setSelectedResidents(data.map(resident => ({
//             userId: resident.userId,
//             username: resident.username,
//           })));
//         } else {
//           console.error('Failed to fetch residents');
//           setSelectedResidents([]);
//         }
//       } catch (error) {
//         console.error('Error fetching residents:', error);
//         setSelectedResidents([]);
//       }
//       setShowDeleteModal(true);
//     };

//     const closeModal = () => {
//       setShowModal(false);
//     };

//     const closeAddModal = () => {
//       setShowAddModal(false);
//       setNewResident({ username: '', email: '', number: '' });
//     };

//     const closeDeleteModal = () => {
//       setShowDeleteModal(false);
//       setSelectedResidentToDelete(null);
//     };

//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setNewResident({ ...newResident, [name]: value });
//     };

//     const handleSubmitAddResident = async () => {
//       try {
//         const userId = 2; // 假设使用的用户ID是1，可以根据实际情况动态设置
//         console.log('Submitting resident with userId:', userId, 'propertyNumber:', currentPropertyNumber, 'newResident:', newResident);
//         const response = await fetch(`http://localhost:8080/api/users/addresident?userId=${userId}&propertyNumber=${currentPropertyNumber}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ username: newResident.username, email: newResident.email, number: newResident.number, status: 1 }),
//         });
//         if (response.ok) {
//           console.log('Resident added successfully');
//           closeAddModal();
//         } else {
//           console.error('Failed to add resident');
//         }
//       } catch (error) {
//         console.error('Error adding resident:', error);
//       }
//     };

//     const handleSubmitDeleteResident = async () => {
//       if (selectedResidentToDelete) {
//         try {
//           console.log('User ID to delete:', selectedResidentToDelete);
//           const response = await fetch(`http://localhost:8080/api/users/deleteresident?userId=${selectedResidentToDelete}`, {
//             method: 'DELETE',
//           });
//           if (response.ok) {
//             console.log('Resident deleted successfully');
//             closeDeleteModal();
//           } else {
//             console.error('Failed to delete resident');
//           }
//         } catch (error) {
//           console.error('Error deleting resident:', error);
//         }
//       }
//     };
  
//     return (
//       <>
//         <div style={headerStyle}>
//           <div>
//             <h2 style={titleStyle}>List of Properties</h2>
//             <p style={subtitleStyle}>{properties.length} properties found</p>
//           </div>
//         </div>
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
//           gap: '24px',
//           justifyContent: 'center',
//         }}>
//           {properties.map((property) => (
//             <div
//               key={property.propertyId}
//               className="property-card"
//               style={{
//                 width: '240px',
//                 height: '300px',
//                 padding: '15px',
//                 backgroundColor: property.isLeased ? '#0000FF' : '#f0f0f0', // 按照 isLeased 设置背景色为蓝色
//                 borderRadius: '12px',
//                 boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
//                 textAlign: 'center',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//               }}
//             >
//               <h3 style={{ marginBottom: '15px', fontSize: '20px' }}>Room: {property.propertyNumber}</h3>
//               <button onClick={() => handleViewResidents(property.propertyNumber)} style={{
//                 marginTop: 'auto',
//                 padding: '6px',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//                 backgroundColor: '#007bff',
//                 color: '#fff',
//                 border: 'none',
//                 fontWeight: 'bold',
//                 transition: 'background-color 0.3s ease',
//                 width: '85%',
//                 fontSize: '14px',
//               }}>View Residents</button>
//               <button onClick={() => handleAddResident(property.propertyNumber)} style={{
//                 marginTop: '6px',
//                 padding: '6px',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//                 backgroundColor: '#28a745',
//                 color: '#fff',
//                 border: 'none',
//                 fontWeight: 'bold',
//                 transition: 'background-color 0.3s ease',
//                 width: '85%',
//                 fontSize: '14px',
//               }}>Add Resident</button>
//               <button onClick={() => handleDeleteResident(property.propertyNumber)} style={{
//                 marginTop: '6px',
//                 padding: '6px',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//                 backgroundColor: '#dc3545',
//                 color: '#fff',
//                 border: 'none',
//                 fontWeight: 'bold',
//                 transition: 'background-color 0.3s ease',
//                 width: '85%',
//                 fontSize: '14px',
//               }}>Delete Resident</button>
//             </div>
//           ))}
//         </div>
//         {showModal && !showDeleteModal && (
//           <div style={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             backgroundColor: '#fff', padding: '20px', width: '400px', height: '500px', overflowY: 'auto',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//             zIndex: 1000,
//           }}>
//             <h2>Resident Information</h2>
//             {selectedResidents.length > 0 ? (
//               <ul>
//                 {selectedResidents.map((resident, index) => (
//                   <li key={`${resident.username}-${index}`} style={{ marginBottom: '10px' }}>
//                     <strong>Username:</strong> {resident?.username || 'N/A'} <br />
//                     <strong>Email:</strong> {resident?.email || 'N/A'} <br />
//                     <strong>Number:</strong> {resident?.number || 'N/A'}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No residents available.</p>
//             )}
//             <button onClick={closeModal} style={{ marginTop: '20px', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Close</button>
//           </div>
//         )}
//         {showModal && !showDeleteModal && (
//           <div style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 999,
//           }} onClick={closeModal}></div>
//         )}
//         {showAddModal && (
//           <div style={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             backgroundColor: '#fff', padding: '20px', width: '400px', height: '400px',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//             zIndex: 1000,
//           }}>
//             <h2>Add Resident</h2>
//             <form>
//               <div style={{ marginBottom: '15px' }}>
//                 <label>Username:</label>
//                 <input type="text" name="username" value={newResident.username} onChange={handleInputChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label>Email:</label>
//                 <input type="email" name="email" value={newResident.email} onChange={handleInputChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//               </div>
//               <div style={{ marginBottom: '15px' }}>
//                 <label>Number:</label>
//                 <input type="text" name="number" value={newResident.number} onChange={handleInputChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
//               </div>
//               <button type="button" onClick={handleSubmitAddResident} style={{ padding: '10px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#28a745', color: '#fff', border: 'none', fontWeight: 'bold', transition: 'background-color 0.3s ease' }}>Add Resident</button>
//             </form>
//             <button onClick={closeAddModal} style={{ marginTop: '20px', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Close</button>
//           </div>
//         )}
//         {showAddModal && (
//           <div style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 999,
//           }} onClick={closeAddModal}></div>
//         )}
//         {showDeleteModal && (
//           <div style={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             backgroundColor: '#fff', padding: '20px', width: '400px', height: '400px', overflowY: 'auto',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//             zIndex: 1000,
//           }}>
//             <h2>Delete Resident</h2>
//             {selectedResidents.length > 0 ? (
//               <ul>
//                 {selectedResidents.map((resident, index) => (
//                   <li key={`${resident.username}-${index}`} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
//                     <input
//                       type="radio"
//                       name="residentToDelete"
//                       value={resident.userId}
//                       onChange={() => setSelectedResidentToDelete(resident.userId)}
//                       style={{ marginRight: '10px' }}
//                     />
//                     <span>{resident.username}</span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No residents available.</p>
//             )}
//             <button onClick={handleSubmitDeleteResident} style={{ marginTop: '20px', padding: '10px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff', border: 'none', fontWeight: 'bold' }}>Delete</button>
//             <button onClick={closeDeleteModal} style={{ marginTop: '10px', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Close</button>
//           </div>
//         )}
//         {showDeleteModal && (
//           <div style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 999,
//           }} onClick={closeDeleteModal}></div>
//         )}
//       </>
//     );
//   };
  
//   export default PropertyCards;


































import React, { useEffect, useState } from 'react';
import LogoutButton from '../public/LogoutButton';
const PropertyCards = () => {
    const [properties, setProperties] = useState([]);
    const [selectedResidents, setSelectedResidents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newResident, setNewResident] = useState({ username: '', email: '', number: '' });
    const [currentPropertyNumber, setCurrentPropertyNumber] = useState(null);
    const [selectedResidentToDelete, setSelectedResidentToDelete] = useState(null);
  
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
      justifyContent: 'center', // 使内容居中
      alignItems: 'center',
      marginBottom: '20px',
      width: '1350px', // 使其与卡片宽度一致
      backgroundColor: '#e0eaff', // 浅蓝色背景
      padding: '15px',
      borderRadius: '12px', // 与卡片一致的圆角
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    };
    
  
    const titleStyle = {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#007bff', // 调整文字颜色使其在浅蓝色背景上更加突出
      margin: '0', // 去掉上下边距，确保居中对齐
      textAlign: 'left', // 左对齐
      width: '1300px', // 占满整个容器宽度
    };
    
  
    const subtitleStyle = {
      fontSize: '16px',
      color: '#555',
    };

    const handleViewResidents = async (propertyNumber) => {
      try {
        const response = await fetch(`http://localhost:8080/api/property/getbypropertynumber?propertyNumber=${propertyNumber}`);
        if (response.ok) {
          const data = await response.json();
          setSelectedResidents(data.map(resident => ({
            userId: resident.userId,
            username: resident.username,
            email: resident.email,
            number: resident.number,
          })));
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
  
    const handleAddResident = (propertyNumber) => {
      setCurrentPropertyNumber(propertyNumber);
      setShowAddModal(true);
    };

    const handleDeleteResident = async (propertyNumber) => {
      try {
        const response = await fetch(`http://localhost:8080/api/property/getbypropertynumber?propertyNumber=${propertyNumber}`);
        if (response.ok) {
          const data = await response.json();
          setSelectedResidents(data.map(resident => ({
            userId: resident.userId,
            username: resident.username,
          })));
        } else {
          console.error('Failed to fetch residents');
          setSelectedResidents([]);
        }
      } catch (error) {
        console.error('Error fetching residents:', error);
        setSelectedResidents([]);
      }
      setShowDeleteModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
    };

    const closeAddModal = () => {
      setShowAddModal(false);
      setNewResident({ username: '', email: '', number: '' });
    };

    const closeDeleteModal = () => {
      setShowDeleteModal(false);
      setSelectedResidentToDelete(null);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewResident({ ...newResident, [name]: value });
    };

    const handleSubmitAddResident = async () => {
      try {
        const userId = 2; // 假设使用的用户ID是1，可以根据实际情况动态设置
        console.log('Submitting resident with userId:', userId, 'propertyNumber:', currentPropertyNumber, 'newResident:', newResident);
        const response = await fetch(`http://localhost:8080/api/users/addresident?userId=${userId}&propertyNumber=${currentPropertyNumber}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: newResident.username, email: newResident.email, number: newResident.number, status: 1 }),
        });
        if (response.ok) {
          console.log('Resident added successfully');
          closeAddModal();
        } else {
          console.error('Failed to add resident');
        }
      } catch (error) {
        console.error('Error adding resident:', error);
      }
    };

    const handleSubmitDeleteResident = async () => {
      if (selectedResidentToDelete) {
        try {
          console.log('User ID to delete:', selectedResidentToDelete);
          const response = await fetch(`http://localhost:8080/api/users/deleteresident?userId=${selectedResidentToDelete}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            console.log('Resident deleted successfully');
            closeDeleteModal();
          } else {
            console.error('Failed to delete resident');
          }
        } catch (error) {
          console.error('Error deleting resident:', error);
        }
      }
    };
  
    return (
      <>
        <div style={headerStyle}>
          <div>
            <h2 style={titleStyle}>List of Properties</h2>
            <p style={subtitleStyle}>{properties.length} properties found</p>
          </div>
          <LogoutButton />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          justifyContent: 'center',
        }}>
          {properties.map((property) => (
            <div
              key={property.propertyId}
              className="property-card"
              style={{
                width: '240px',
                height: '300px',
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
              <h3 style={{ marginBottom: '15px', fontSize: '20px' }}>Room: {property.propertyNumber}</h3>
              <button onClick={() => handleViewResidents(property.propertyNumber)} style={{
                marginTop: 'auto',
                padding: '6px',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
                width: '85%',
                fontSize: '14px',
              }}>View Residents</button>
              <button onClick={() => handleAddResident(property.propertyNumber)} style={{
                marginTop: '6px',
                padding: '6px',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
                width: '85%',
                fontSize: '14px',
              }}>Add Resident</button>
              <button onClick={() => handleDeleteResident(property.propertyNumber)} style={{
                marginTop: '6px',
                padding: '6px',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
                width: '85%',
                fontSize: '14px',
              }}>Delete Resident</button>
            </div>
          ))}
        </div>
        {/* {showModal && !showDeleteModal && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff', padding: '20px', width: '400px', height: '500px', overflowY: 'auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}>
            <h2 style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>Resident Information</h2>
            {selectedResidents.length > 0 ? (
              <ul>
                {selectedResidents.map((resident, index) => (
                  <li key={`${resident.username}-${index}`} style={{
                    marginBottom: '20px',
                    padding: '15px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff'
                  }}>
                    <strong>Username:</strong> {resident?.username || 'N/A'} <br />
                    <strong>Email:</strong> {resident?.email || 'N/A'} <br />
                    <strong>Number:</strong> {resident?.number || 'N/A'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No residents available.</p>
            )}
            <button onClick={closeModal} style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '10px',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease'
            }}>Close</button>
          </div>
        )} */}
        {showModal && !showDeleteModal && (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff', padding: '20px', width: '400px', height: '500px', overflowY: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  }}>
    <h2 style={{
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px',
      borderRadius: '8px',
      textAlign: 'center'
    }}>Resident Information</h2>
    <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
      {selectedResidents.length > 0 ? (
        <ul>
          {selectedResidents.map((resident, index) => (
            <li key={`${resident.username}-${index}`} style={{
              marginBottom: '20px',
              padding: '15px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff'
            }}>
              <strong>Username:</strong> {resident?.username || 'N/A'} <br />
              <strong>Email:</strong> {resident?.email || 'N/A'} <br />
              <strong>Number:</strong> {resident?.number || 'N/A'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No residents available.</p>
      )}
    </div>
          <button onClick={closeModal} style={{
            padding: '10px',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            display: 'block',
            margin: '0 auto'
          }}>Close</button>
        </div>
      )}
        {showModal && !showDeleteModal && (
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
        {showAddModal && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            width: '500px', // 增加宽度
            height: '430px', // 增加高度
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}>
            <h2>Add Resident</h2>
            <form>
              <div style={{ marginBottom: '15px' }}>
                <label>Username:</label>
                <input type="text" name="username" value={newResident.username} onChange={handleInputChange} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '2px solid #007bff' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Email:</label>
                <input type="email" name="email" value={newResident.email} onChange={handleInputChange} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '2px solid #007bff' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Number:</label>
                <input type="text" name="number" value={newResident.number} onChange={handleInputChange} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '2px solid #007bff' }} />
              </div>
              {/* <button type="button" onClick={handleSubmitAddResident} style={{ padding: '10px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#28a745', color: '#fff', border: 'none', fontWeight: 'bold', transition: 'background-color 0.3s ease' }}>Add Resident</button> */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '1px' }}>
                  <button type="button" onClick={handleSubmitAddResident} style={{ padding: '10px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#28a745', color: '#fff', border: 'none', fontWeight: 'bold', transition: 'background-color 0.3s ease' }}>Add Resident</button>
                  <button onClick={closeAddModal} style={{ padding: '10px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', fontWeight: 'bold', transition: 'background-color 0.3s ease' }}>Close</button>
              </div>
            </form>
            {/* <button onClick={closeAddModal} style={{ marginTop: '20px', padding: '10px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', fontWeight: 'bold', transition: 'background-color 0.3s ease' }}>Close</button> */}
          </div>
        )}
        {showAddModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }} onClick={closeAddModal}></div>
        )}
        {showDeleteModal && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff', padding: '20px', width: '400px', height: '400px', overflowY: 'auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}>
            <h2>Delete Resident</h2>
            {selectedResidents.length > 0 ? (
              <ul>
                {selectedResidents.map((resident, index) => (
                  <li key={`${resident.username}-${index}`} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <input
                      type="radio"
                      name="residentToDelete"
                      value={resident.userId}
                      onChange={() => setSelectedResidentToDelete(resident.userId)}
                      style={{ marginRight: '10px' }}
                    />
                    <span>{resident.username}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No residents available.</p>
            )}
            {/* <button onClick={handleSubmitDeleteResident} style={{ marginTop: '20px', padding: '10px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff', border: 'none', fontWeight: 'bold' }}>Delete</button>
            <button onClick={closeDeleteModal} style={{ marginTop: '10px', padding: '10px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', fontWeight: 'bold', transition: 'background-color 0.3s ease' }}>Close</button> */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
              <button onClick={handleSubmitDeleteResident} style={{ padding: '10px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff', border: 'none', fontWeight: 'bold', transition: 'background-color 0.3s ease' }}>Delete</button>
              <button onClick={closeDeleteModal} style={{ padding: '10px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', fontWeight: 'bold', transition: 'background-color 0.3s ease' }}>Close</button>
            </div>
          </div>
        )}
        {showDeleteModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }} onClick={closeDeleteModal}></div>
        )}
      </>
    );
  };
  
  export default PropertyCards;

