import { BASE_URL } from '@env';

export const tryAuth = async (jwt) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt,
      },
    });

    const data = await response.json();

    if (data._id) {
      return data._id;
    }
  } catch (error) {
    console.error('Auth Error', error);
  }
};

export const handleLogin = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    return {...data, jwt: data.token};
  } catch (error) {
    console.error('Error logging in:', error);
    return {message: error}
  }
};

export const handleSignUp = async (username, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username,
          email,
          password,
      }),
    });

    const data = await response.json();

    return {...data, jwt: data.token};
  } catch (error) {
    console.error('Error signing in:', error);
    return {message: error}
  }
};

export const addReportAPI = async (jwt, report) => {
  try {
    const response = await fetch(`${BASE_URL}/api/reports/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt,
      },
      body: JSON.stringify({
          ...report
      }),
    });
    
    const data = await response.json();

    if (data._id) {
      console.log(data._id);
      return data._id;
    }
  } catch (error) {
    console.error('Error adding report:', error);
  }
};

export const getReportsAPI = async (jwt) => {
  try {
    const response = await fetch(`${BASE_URL}/api/reports/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt,
      },
    });

    const data = await response.json();

    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

export const updateReportAPI = async (jwt, report) => {
  try {
    const response = await fetch(`${BASE_URL}/api/reports/${report._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt,
      },
      body: JSON.stringify({
        ...report
    }),
    });

    const data = await response.json();

    if (data) {
      console.log('updated report data')
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};