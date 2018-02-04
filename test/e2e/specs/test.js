// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .assert.elementPresent('#vue-module-manager')
      .assert.elementCount('.vmm-module', 3)
      .assert.elementPresent('#vmm-module-1')
      .assert.elementPresent('#vmm-module-2')
      .assert.elementPresent('#vmm-module-3')
      .assert.containsText('#vmm-module-1 > div.vmm-content > h2', 'Minecraft')
      .assert.containsText('#vmm-module-1 > div.vmm-content > div.vmm-description', 'Minecraft is a game about placing blocks and adventures.')
      .assert.attributeContains('#vmm-module-1 > div.vmm-title', 'style', 'background: url("static/minecraft.jpg") center center / cover;')
      .assert.containsText('#vmm-module-2 > div.vmm-content > h2', 'Crash Bandicoot')
      .assert.containsText('#vmm-module-2 > div.vmm-content > div.vmm-description', 'Crash Bandicoot is a franchise of platform video games.')
      .assert.attributeContains('#vmm-module-2 > div.vmm-title', 'style', 'background: url("static/crash-bandicoot.jpg") center center / cover;')
      .assert.containsText('#vmm-module-3 > div.vmm-content > h2', 'Super Mario Bros')
      .assert.containsText('#vmm-module-3 > div.vmm-content > div.vmm-description', 'Super Mario Bros is a video game developed by Nintendo.')
      .assert.attributeContains('#vmm-module-3 > div.vmm-title', 'style', 'background: url("static/super-mario-bros.jpg") center center / cover;')
      .click('#vmm-module-1 > div.vmm-content > div.vmm-list-item > div > div > button.vmm-btn.vmm-btn-left.vmm-btn-active')
      .pause(1000)
      .assert.containsText('#vmm-module-1 > div.vmm-content > div.vmm-list-item > div > div > button.vmm-btn.vmm-btn-left.vmm-btn-inactive', 'ACTIVATE')
      .assert.containsText('#vmm-module-1 > div.vmm-content > div.vmm-list-item > div > div > button.vmm-btn.vmm-btn--uninstall > span.vmm-text-btn', 'UNINSTALL')
      .click('#vmm-module-2 > div.vmm-content > div.vmm-list-item > div > div > button.vmm-btn.vmm-btn-left.vmm-btn-outdated')
      .pause(5000)
      .assert.containsText('#vmm-module-2 > div.vmm-content > div.vmm-list-item > div > div > button.vmm-btn.vmm-btn-left.vmm-btn-active', 'ACTIVE')
      .assert.containsText('#vmm-module-2 > div.vmm-content > h2', 'Crash Bandicoot III')
      .assert.containsText('#vmm-module-2 > div.vmm-content > div.vmm-description', 'Crash Bandicoot N. Sane Trilogy is a video game compilation.')
      .assert.attributeContains('#vmm-module-2 > div.vmm-title', 'style', 'background: url("static/crash-bandicoot-trilogy.jpg") center center / cover;')
      .click('#vmm-module-3 > div.vmm-content > div.vmm-list-item > div > div > button.vmm-btn.vmm-btn--uninstall > span.vmm-text-btn')
      .pause(5000)
      .assert.containsText('#vmm-module-3 > div.vmm-content > div.vmm-list-item > div > div > button.vmm-btn.vmm-btn-left.vmm-btn-uninstalled', 'INSTALL')
      .click('#vmm-module-3 > div.vmm-content > div.vmm-list-item > div > div > button.vmm-btn.vmm-btn-left.vmm-btn-uninstalled')
      .pause(5000)
      .assert.containsText('#vmm-module-3 > div.vmm-content > div.vmm-list-item > div > div > button.vmm-btn.vmm-btn-left.vmm-btn-inactive', 'ACTIVATE')
      .end()
  }
}
