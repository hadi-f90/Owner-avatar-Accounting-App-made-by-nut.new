const API_BASE_URL = 'http://localhost:5000/api';

export const fetchAccounts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts`);
    if (!response.ok) {
      throw new Error('Failed to fetch accounts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export const fetchAccountById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch account');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching account ${id}:`, error);
    throw error;
  }
};
