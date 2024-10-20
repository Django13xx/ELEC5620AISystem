import React from 'react';
import StatusBadge from './StatusBadge';

const HomeownerRow = ({ homeowner }) => {
  const { name, address, email, phone, dateAdded, status } = homeowner;

  return (
    <tr>
      <td>{name}</td>
      <td>{address}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{dateAdded}</td>
      <td><StatusBadge status={status} /></td>
      <td><button className="action-btn">→</button></td>
    </tr>
  );
};

export default HomeownerRow;
