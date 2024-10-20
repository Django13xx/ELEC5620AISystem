import React from 'react';
import './UserList.css';

const UserList = () => {
  const users = [
    { name: 'Brooklyn Simmons', specialty: 'Dermatologists', address: '309/10 Galloway St', email: 'brooklyns@mail.com', phone: '(603) 555-0123', dateAdded: '21/12/2022', timeAdded: '10:40 PM', status: 'Active' },
    { name: 'Kristin Watson', specialty: 'Infectious disease', address: '309/10 Galloway St', email: 'kristinw@mail.com', phone: '(219) 555-0114', dateAdded: '22/12/2022', timeAdded: '05:20 PM', status: 'No Active' },
    // ... other users
  ];

  return (
    <div className="user-list">
      <h2>List of Homeowners</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date Added</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.dateAdded} {user.timeAdded}</td>
              <td className={user.status === 'Active' ? 'status-active' : 'status-inactive'}>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
