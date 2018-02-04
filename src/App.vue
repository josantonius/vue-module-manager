<script>
/**
 * Component for module management with Vue.js.
 *
 * @author    Josantonius <hello@josantonius.com>
 * @copyright 2018 (c) Josantonius - Vue Module Manager
 * @license   https://opensource.org/licenses/MIT - The MIT License (MIT)
 * @link      https://github.com/josantonius/vue-module-manager
 * @since     1.0.0
 */

import VueModuleManager from './components/VueModuleManager'

export default {

  name: 'App',
  components:
  {
    VueModuleManager
  },
  data () {
    return {
      items: [
        {
          'name': 'Minecraft',
          'version': '1.12.2',
          'description': 'Minecraft is a game about placing blocks and adventures.',
          'state': 'active',
          'url': 'https://github.com/Josantonius/vue-module-manager',
          'image': '/static/minecraft.jpg'
        },
        {
          'name': 'Crash Bandicoot',
          'version': '8.1.1',
          'description': 'Crash Bandicoot is a franchise of platform video games.',
          'state': 'outdated',
          'url': 'https://github.com/Josantonius/vue-module-manager',
          'image': '/static/crash-bandicoot.jpg'
        },
        {
          'name': 'Super Mario Bros',
          'version': '3.8.4',
          'description': 'Super Mario Bros is a video game developed by Nintendo.',
          'state': 'inactive',
          'url': 'https://github.com/Josantonius/vue-module-manager',
          'image': '/static/super-mario-bros.jpg'
        }
      ],
      translations: {
        active: 'active',
        activate: 'activate',
        install: 'install',
        update: 'update',
        uninstall: 'uninstall'
      },
      delay: 3000
    }
  },
  methods: {
    onChange: function onChange (index, vm) {
      console.info('@onChange: ' + index)
    },
    onActive: function onActive (index, vm) {
      console.info('@onActive: ' + index)
    },
    onInactive: function onInactive (index, vm) {
      console.info('@onInactive: ' + index)
    },
    onUpdate: function onUpdate (index, vm) {
      let self = this
      console.info('@onUpdate: ' + index)
      setTimeout(function () {
        vm.changeState(index)
        self.items[index].version = '8.1.2'
        self.items[index].name = 'Crash Bandicoot III'
        self.items[index].description = 'Crash Bandicoot N. Sane Trilogy is a video game compilation.'
        self.items[index].image = 'static/crash-bandicoot-trilogy.jpg'
      }, this.delay)
    },
    onInstall: function onInstall (index, vm) {
      console.info('@onInstall: ' + index)
      setTimeout(function () {
        vm.changeState(index)
      }, this.delay)
    },
    onUninstall: function onUninstall (index, vm) {
      console.info('@onUninstall: ' + index)
      setTimeout(function () {
        vm.changeState(index)
      }, this.delay)
    },
    onUninstalled: function onUninstalled (index, vm) {
      console.info('@onUninstalled: ' + index)
    }
  }
}
</script>

<template>
  <div id="app">
    <vue-module-manager
      :items="items"
      :translations="translations"
      @onChange="onChange"
      @onActive="onActive"
      @onInactive="onInactive"
      @onUpdate="onUpdate"
      @onInstall="onInstall"
      @onUninstall="onUninstall"
      @onUninstalled="onUninstalled"
    ></vue-module-manager>
  </div>
</template>
