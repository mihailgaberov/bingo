/**
 * Created by Mihail on 2/28/2017.
 */
module.exports = {
  'Login form': function (client) {
    const loginForm = client.page.loginForm();

    loginForm.navigate()
      .assert.title('Welcome to Bingo Bigul')
      .assert.visible('@logo')
      .assert.visible('@title')
      .assert.visible('@emailInput')
      .assert.visible('@passwordInput')
      .assert.visible('@loginBtn')
      .assert.visible('@signInLink')
      .assert.visible('@githubLogo')
      .assert.visible('@linkedInLogo')
      .assert.visible('@twitterLogo')
      .assert.visible('@facebookLogo')
      .setValue('@emailInput', 'mihail.gaberov@gmail.com')
      .setValue('@passwordInput', 'asd')
      .click('@loginBtn')
      .waitForElementVisible('@logoutBtn', 500)
      .click('@logoutBtn');
  },

  'Register form': function (client) {
    const regForm = client.page.regForm();

    regForm.navigate()
      .click('@signInLink')
      .assert.visible('@logo')
      .assert.visible('@title')
      .assert.visible('@registerName')
      .assert.visible('@registerEmail')
      .assert.visible('@registerPassword')
      .assert.visible('@registerBtn')
      .assert.visible('@githubLogo')
      .assert.visible('@linkedInLogo')
      .assert.visible('@twitterLogo')
      .assert.visible('@facebookLogo')
      .setValue('@registerName', 'Johny Bi')
      .setValue('@registerEmail', 'johny@bi.com')
      .setValue('@registerPassword', 'asd')
      .click('@registerBtn')
      .waitForElementVisible('@logoutBtn', 500)
      .click('@logoutBtn')
      .assert.visible('@logo');
    client.end();
  }
};