import axios from 'axios';

const fetchConnectionDetails = async (referenceNumber) => {
  try {
    const response = await axios.get(`/connections/household/${referenceNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching connection details:', error);
    throw error;
  }
};

export default fetchConnectionDetails;
