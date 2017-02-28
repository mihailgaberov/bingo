/**
 * Created by Mihail on 2/28/2017.
 */
module.exports = {
  'Login page' : function (browser) {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 1000)
      .assert.title('Welcome to Bingo Bigul')
      .assert.elementPresent('.brand-img')
      .end();
  }
};