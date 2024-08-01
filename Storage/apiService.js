import { BASE_URL } from '../config';

export const tryAuth = async (jwt) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwt,
        },
      });

      const data = await response.json();

      if (data._id) {
        console.log(data._id);
        return data._id;
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
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
        const jwt = response.headers.get('Authorization');

        return {...data, jwt};
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
      console.log(data)
      const jwt = response.headers.get('Authorization');

      return {...data, jwt};
  } catch (error) {
      console.error('Error signing in:', error);
      return {message: error}
  }
};