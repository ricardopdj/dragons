const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;

const Auth = {
  isAuthenticated: false,
  authenticate(data) {
    if (data.username === username && data.password === password) {
      this.isAuthenticated = true;
    } 
  },
  signout(cb) {
    this.isAuthenticated = false;
  }
};

export default Auth