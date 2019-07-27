const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;

const Auth = {
  isAuthenticated: false,
  authenticate(data) {
    if (data.username === username && data.password === password) {
      this.isAuthenticated = true;
    } else {
      throw new Error('Incorret username or password');
    } 
  },
  signout(cb) {
    this.isAuthenticated = false;
  }
};

export default Auth