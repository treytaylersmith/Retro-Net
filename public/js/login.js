const loginForm = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
 
    if (email && password) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  const signupForm = async (event) => {
    event.preventDefault();
  
    const user_name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (user_name && email && password) {
      const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify({ user_name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up');
      }
    }
  };
  document
  .querySelector('.login-form')
  .addEventListener('submit', loginForm);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupForm);
  