$(document).ready(function() {
  const backendUrl = 'https://7255-2405-201-39-a003-d925-2ddf-743b-c198.ngrok.io';

  // Check login status on load
  axios.get(`${backendUrl}/api/user`, { withCredentials: true })
    .then(response => showProfile(response.data))
    .catch(() => showLoginForm());

  // Show login form
  function showLoginForm() {
    $('#login-form').removeClass('hidden');
    $('#register-form, #reset-form, #profile').addClass('hidden');
  }

  // Show register form
  function showRegisterForm() {
    $('#register-form').removeClass('hidden');
    $('#login-form, #reset-form, #profile').addClass('hidden');
  }

  // Show reset form
  function showResetForm() {
    $('#reset-form').removeClass('hidden');
    $('#login-form, #register-form, #profile').addClass('hidden');
  }

  // Show profile
  function showProfile(user) {
    $('#profile').removeClass('hidden');
    $('#login-form, #register-form, #reset-form').addClass('hidden');
    $('#welcome-message').text(`Welcome, ${user.email}! You are logged in successfully.`);
  }

  // Handle form navigation
  $('#show-register').click(showRegisterForm);
  $('#forgot-password').click(showResetForm);

  // Handle registration
  $('#register-form').submit(function(event) {
    event.preventDefault();
    const email = $('#reg-email').val();
    const password = $('#reg-password').val();
    axios.post(`${backendUrl}/api/register`, { email, password }, { withCredentials: true })
      .then(() => alert('Registration successful! Please check your email to verify.'))
      .catch(error => alert(`Registration failed: ${error.response?.data?.error || 'Unknown error'}`));
  });

  // Handle login
  $('#login-form').submit(function(event) {
    event.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    axios.post(`${backendUrl}/api/login`, { email, password }, { withCredentials: true })
      .then(response => showProfile(response.data))
      .catch(error => alert(`Login failed: ${error.response?.data?.message || 'Invalid credentials'}`));
  });

  // Handle password reset
  $('#reset-form').submit(function(event) {
    event.preventDefault();
    const email = $('#reset-email').val();
    axios.post(`${backendUrl}/api/reset-password`, { email }, { withCredentials: true })
      .then(() => alert('Password reset link sent to your email'))
      .catch(error => alert(`Reset failed: ${error.response?.data?.error || 'Email not found'}`));
  });

  // Handle logout
  $('#logout').click(function() {
    axios.post(`${backendUrl}/api/logout`, {}, { withCredentials: true })
      .then(() => showLoginForm())
      .catch(() => alert('Logout failed'));
  });
});
