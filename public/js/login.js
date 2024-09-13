const loginForm = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#').value.trim();
    const password = document.querySelector('#').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
  
  const signupForm = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#user_name').value.trim();
    const email = document.querySelector('#').value.trim();
    const password = document.querySelector('#').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
  
  document
    .querySelector('.')
    .addEventListener('submit', loginForm);
  
  document
    .querySelector('.')
    .addEventListener('submit', signupForm);
  