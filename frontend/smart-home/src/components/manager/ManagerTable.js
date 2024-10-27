import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManagerTable.css';
import HomeownerRow from './HomeownerRow';
import LogoutButton from '../public/LogoutButton';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/property/getallproperty');
                setProperties(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleEditHomeowner = (homeowner) => {
        // 在这里处理编辑 homeowner 的逻辑，例如打开编辑弹窗
        console.log('Edit homeowner:', homeowner);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Property List</h2>
            <LogoutButton></LogoutButton>
            <table>
            <thead>
              <tr>
                <th>Property Number</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
  {properties.map(property => (
    <HomeownerRow 
      key={property.propertyId} 
      homeowner={{ ...property.user, propertyId: property.propertyId, propertyNumber: property.propertyNumber, phone: property.user.number }} 
      onEdit={handleEditHomeowner} 
    />
  ))}
</tbody>


            </table>
        </div>
    );
};

export default PropertyList;
