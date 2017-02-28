/**
 * Created by Mihail on 2/28/2017.
 */
module.exports = {
  'Login page': function (client) {
    const loginPage = client.page.loginPage();

    loginPage.navigate()
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
      .click('@loginBtn');
    client.end();
  }
};