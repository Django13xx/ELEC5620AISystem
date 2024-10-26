import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const addHomeowner = (userId, propertyNumber, user) => {
  return axios.post(`${BASE_URL}/users/addhomeowner`, null, {
    params: {
      userId,
      propertyNumber,
    },
    data: user,
  });
};

export const getPropertiesByUserId = (userId) => {
  return axios.get(`${BASE_URL}/property/getbyuserid`, {
    params: {
      userId,
    },
  });
};

export const getChildrenByUserId = (userId) => {
  return axios.get(`${BASE_URL}/users/children`, {
    params: {
      userId,
    },
  });
};

export const addHomeOwner = async (userId, propertyId, user) => {
  user.status = 1; 
  try {
    const response = await axios.post(`${BASE_URL}/users/addhomeowner`, user, {
      params: { userId, propertyId },
      paramsSerializer: (params) => {
        return new URLSearchParams(params).toString();
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error adding homeowner:', error);
    throw error;
  }
};
