/**
 * Created by Mihail on 9/17/2016.
 */
var loginForm = document.querySelector('#loginForm');
var registerForm = document.querySelector('#registerForm');
var signInLink = document.querySelector('.sign-in-link a');
var isOnLoginPage = false;

signInLink.addEventListener('click', () => {
	if (!isOnLoginPage) {
		registerForm.style.display = 'none';
		loginForm.style.display = 'block';
		signInLink.innerText = 'Don\'t have an account? Register here!';
		isOnLoginPage = true;
	} else {
		registerForm.style.display = 'block';
		loginForm.style.display = 'none';
		signInLink.innerText = 'Already have an account? Sign in here!';
		isOnLoginPage = false;
	}
});
