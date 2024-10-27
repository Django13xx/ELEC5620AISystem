import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManagerTable.css';

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Property List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Property Number</th>
                        <th>Owner Username</th>
                        <th>Owner Email</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map(property => (
                        <tr key={property.propertyId}>
                            <td>{property.propertyNumber}</td>
                            <td>{property.user.username}</td>
                            <td>{property.user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PropertyList;
