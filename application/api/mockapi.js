import * as React from 'react';

var users = new Object();

const mockSuccess = (value) => {
  return new Promise((resolve) => {
      setTimeout(() => resolve(value), 300);
  });
};

const mockFailure = (value) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => reject(value), 300)
  });
}

export const login = (email, password) => {
  if (!(email in users)) {
    return mockFailure({ error: 500, message: 'Username is not registered.' });
  } else if (!loginValid(email, password)) {
    return mockFailure({ error: 500, message: 'Invalid username/password combination.' });
  }
  return mockSuccess({token: 'dummy_token'});
};


export const register = (firstName, lastName, email, password) => {
  console.log(firstName, lastName, email, password);

  if (email in users) {
    return mockFailure({ error: 500, 
      message: 'Registration failed. User already exists.' });
  }
  users[email] = {'first': firstName, 'last': lastName, 'password': password};
  console.log('Registering user: ', users[email])
  return mockSuccess({ token: 'dummy_token'});
}

const loginValid = (email, password) => {
  console.log('checking if login is valid');
  console.log(`users["${email}"] in system: `, users[email]);
  if (email in users) {
    console.log('password in system: ', users[email]['password']);
    if (users[email]['password'] === password) {
      return true;
    }
  }
  return false;
}