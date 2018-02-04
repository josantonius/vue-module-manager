'use strict'

import Vue from 'vue/dist/vue.js'
import VueModuleManager from '@/components/VueModuleManager'

describe('VueModuleManager.vue', () => {
  describe(':props', () => {
    describe(':items', () => {
      it('should support an empty array', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: []
            }
          }
        }).$mount()

        const component = vm.$children[0]
        expect(component.modules).toEqual([])
      })
      it('should fill in the fields that are not included in each notification by default fields', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{}, {}, {}, {}, {}, {}]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.modules.length).toEqual(6)
        expect(component.modules[0].name).toEqual('')
        expect(component.modules[1].version).toEqual(null)
        expect(component.modules[2].description).toEqual('')
        expect(component.modules[3].state).toEqual('uninstalled')
        expect(component.modules[4].image).toEqual('')
        expect(component.modules[5].url).toEqual('')
      })
      it('should create default fields for the notification if an empty object is sent', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{}]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.modules.length).toEqual(1)
        expect(component.modules[0].name).toEqual('')
        expect(component.modules[0].version).toEqual(null)
        expect(component.modules[0].description).toEqual('')
        expect(component.modules[0].state).toEqual('uninstalled')
        expect(component.modules[0].image).toEqual('')
        expect(component.modules[0].url).toEqual('')
      })
      it('should prioritize custom parameters over default parameters', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [
                {
                  'name': 'Vue',
                  'version': '1.1.2',
                  'description': 'A Vue component.',
                  'state': 'active',
                  'image': '/static/vue.jpg',
                  'url': 'https://github.com/Josantonius/vue-module-manager'
                }
              ]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.modules.length).toEqual(1)
        expect(component.modules[0].name).toEqual('Vue')
        expect(component.modules[0].version).toEqual('1.1.2')
        expect(component.modules[0].description).toEqual('A Vue component.')
        expect(component.modules[0].state).toEqual('active')
        expect(component.modules[0].image).toEqual('/static/vue.jpg')
        expect(component.modules[0].url).toEqual('https://github.com/Josantonius/vue-module-manager')
      })
    })
    describe(':translations', () => {
      it('should be set to null by default', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: []
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.translations).toEqual(null)
      })
      it('should must generate default translations in the ":states" property if they are not specified', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: []
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.states.active).toEqual('active')
        expect(component.states.inactive).toEqual('activate')
        expect(component.states.outdated).toEqual('update')
        expect(component.states.uninstalled).toEqual('install')
        expect(component.states.uninstall).toEqual('uninstall')
      })
      it('should prioritize custom translations over default translations', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items"
              :translations="translations">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [],
              translations: {
                active: 'activo',
                activate: 'activar',
                install: 'instalar',
                update: 'actualizar',
                uninstall: 'desinstalar'
              }
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.states.active).toEqual('activo')
        expect(component.states.inactive).toEqual('activar')
        expect(component.states.outdated).toEqual('actualizar')
        expect(component.states.uninstalled).toEqual('instalar')
        expect(component.states.uninstall).toEqual('desinstalar')
      })
    })
  })
  describe('#methods', () => {
    describe('#getParam()', () => {
      it('should return the custom parameter if it exists', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ name: 'Vue' }]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.getParam(component.modules[0], 'name')).toEqual('Vue')
      })
      it('should return the default parameter if there are no custom settings', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{}]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.getParam(component.modules[0], 'name')).toEqual('')
      })
    })
    describe('#getTranslation()', () => {
      it('should return the translation if it exists', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items"
              :translations="translations">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{}],
              translations: {
                active: 'activo'
              }
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.getTranslation('active')).toEqual('activo')
      })
      it('should return the default value if it does not exist', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{}]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.getTranslation('active')).toEqual('active')
      })
    })
    describe('#getButtonText()', () => {
      describe('#left-button', () => {
        it('should return an empty string if it is being updated, installed or uninstalled and the state for anyone else', () => {
          const vm = new Vue({
            template: `
              <div><vue-module-manager
                :items="items">
              </vue-module-manager></div>
            `,
            components: { VueModuleManager },
            data () {
              return {
                items: [
                  { state: 'update' },
                  { state: 'install' },
                  { state: 'uninstall' },
                  { state: 'active' },
                  { state: 'inactive' },
                  { state: 'outdated' },
                  { state: 'uninstalled' }
                ]
              }
            }
          }).$mount()

          const component = vm.$children[0]

          expect(component.getButtonText('left', 'update', 0)).toEqual('')
          expect(component.getButtonText('left', 'install', 1)).toEqual('')
          expect(component.getButtonText('left', 'uninstall', 2)).toEqual('')
          expect(component.getButtonText('left', 'active', 3)).toEqual('active')
          expect(component.getButtonText('left', 'inactive', 4)).toEqual('inactive')
          expect(component.getButtonText('left', 'outdated', 5)).toEqual('outdated')
          expect(component.getButtonText('left', 'uninstalled', 6)).toEqual('uninstalled')
        })
      })
      describe('#right-button', () => {
        it('should return an empty string if it is being uninstalled and the button state when is inactive', () => {
          const vm = new Vue({
            template: `
              <div><vue-module-manager
                :items="items">
              </vue-module-manager></div>
            `,
            components: { VueModuleManager },
            data () {
              return {
                items: [
                  { state: 'uninstall' },
                  { state: 'uninstalled' },
                  { state: 'inactive' }
                ]
              }
            }
          }).$mount()

          const component = vm.$children[0]

          expect(component.getButtonText('right', 'uninstall', 0)).toEqual('')
          expect(component.getButtonText('right', 'uninstalled', 1)).toEqual('')
          expect(component.getButtonText('right', 'uninstall', 2)).toEqual('uninstall')
        })
      })
    })
    describe('#changeState()', () => {
      it('should change the state of the module to the next predefinded state', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{}]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        component.modules[0].state = 'uninstalled'
        component.changeState(0)
        expect(component.modules[0].state).toEqual('install')
        component.changeState(0)
        expect(component.modules[0].state).toEqual('inactive')
        component.changeState(0)
        expect(component.modules[0].state).toEqual('active')

        component.modules[0].state = 'outdated'
        component.changeState(0)
        expect(component.modules[0].state).toEqual('update')
        component.changeState(0)
        expect(component.modules[0].state).toEqual('active')

        component.modules[0].state = 'installed'
        component.changeState(0)
        expect(component.modules[0].state).toEqual('uninstall')
        component.changeState(0)
        expect(component.modules[0].state).toEqual('uninstalled')
      })
    })
    describe('#uninstall()', () => {
      it('should change the status to uninstall', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'inactive' }]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.modules[0].state).toEqual('inactive')
        component.uninstall(0)
        expect(component.modules[0].state).toEqual('uninstall')
      })
    })
    describe('#isInstall()', () => {
      it('should return true if the current status of the module is "install" or false if it is not', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'install' }]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.isInstall(0)).toEqual(true)
        component.modules[0].state = 'active'
        expect(component.isInstall(0)).toEqual(false)
      })
    })
    describe('#isUninstall()', () => {
      it('should return true if the current status of the module is "uninstall" or false if it is not', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'uninstall' }]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.isUninstall(0)).toEqual(true)
        component.modules[0].state = 'active'
        expect(component.isUninstall(0)).toEqual(false)
      })
    })
    describe('#isInactive()', () => {
      it('should return true if the current status of the module is "inactive" or false if it is not', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'inactive' }]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.isInactive(0)).toEqual(true)
        component.modules[0].state = 'active'
        expect(component.isInactive(0)).toEqual(false)
      })
    })
    describe('#isOutdated()', () => {
      it('should return true if the current status of the module is "outdated" or false if it is not', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'outdated' }]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.isOutdated(0)).toEqual(true)
        component.modules[0].state = 'active'
        expect(component.isOutdated(0)).toEqual(false)
      })
    })
    describe('#isUpdate()', () => {
      it('should return true if the current status of the module is "update" or false if it is not', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'update' }]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.isUpdate(0)).toEqual(true)
        component.modules[0].state = 'active'
        expect(component.isUpdate(0)).toEqual(false)
      })
    })
    describe('#isUninstalled()', () => {
      it('should return true if the current status of the module is "uninstalled" or false if it is not', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'uninstalled' }]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        expect(component.isUninstalled(0)).toEqual(true)
        component.modules[0].state = 'active'
        expect(component.isUninstalled(0)).toEqual(false)
      })
    })
  })
  describe('@events', () => {
    describe('@onChange', () => {
      it('should be output each time a module status is changed and send the index and component instance as parameter', () => {
        let isChange = null
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items"
              @onChange="onChange">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{}]
            }
          },
          methods: {
            onChange: function onChange (index, vm) {
              isChange = Number.isInteger(index) && vm.constructor.name === 'VueComponent'
            }
          }
        }).$mount()

        const component = vm.$children[0]

        vm.$data.items = []
        component.changeState(0)
        expect(isChange).toEqual(true)
      })
    })
    describe('@onActive', () => {
      it('should emited when change state and the new is "active"', () => {
        let isActive = null
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items"
              @onActive="onActive">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'inactive' }]
            }
          },
          methods: {
            onActive: function onActive (index, vm) {
              isActive = Number.isInteger(index) && vm.constructor.name === 'VueComponent'
            }
          }
        }).$mount()

        const component = vm.$children[0]

        component.changeState(0)
        expect(isActive).toEqual(true)
      })
    })
    describe('@onInactive', () => {
      it('should emited when change state and the new is "inactive"', () => {
        let isInactive = null
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items"
              @onInactive="onInactive">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'active' }]
            }
          },
          methods: {
            onInactive: function onInactive (index, vm) {
              isInactive = Number.isInteger(index) && vm.constructor.name === 'VueComponent'
            }
          }
        }).$mount()

        const component = vm.$children[0]

        component.changeState(0)
        expect(isInactive).toEqual(true)
      })
    })
    describe('@onUpdate', () => {
      it('should emited when change state and the new is "update"', () => {
        let isUpdate = null
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items"
              @onUpdate="onUpdate">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'outdated' }]
            }
          },
          methods: {
            onUpdate: function onUpdate (index, vm) {
              isUpdate = Number.isInteger(index) && vm.constructor.name === 'VueComponent'
            }
          }
        }).$mount()

        const component = vm.$children[0]

        component.changeState(0)
        expect(isUpdate).toEqual(true)
      })
    })
    describe('@onInstall', () => {
      it('should emited when change state and the new is "install"', () => {
        let isInstall = null
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items"
              @onInstall="onInstall">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'uninstalled' }]
            }
          },
          methods: {
            onInstall: function onInstall (index, vm) {
              isInstall = Number.isInteger(index) && vm.constructor.name === 'VueComponent'
            }
          }
        }).$mount()

        const component = vm.$children[0]

        component.changeState(0)
        expect(isInstall).toEqual(true)
      })
    })
    describe('@onUninstall', () => {
      it('should emited when change state and the new is "install"', () => {
        let isUninstall = null
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items"
              @onUninstall="onUninstall">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'installed' }]
            }
          },
          methods: {
            onUninstall: function onUninstall (index, vm) {
              isUninstall = Number.isInteger(index) && vm.constructor.name === 'VueComponent'
            }
          }
        }).$mount()

        const component = vm.$children[0]

        component.changeState(0)
        expect(isUninstall).toEqual(true)
      })
    })
    describe('@onUninstalled', () => {
      it('should emited when change state and the new is "install"', () => {
        let isUninstalled = null
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items"
              @onUninstalled="onUninstalled">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'uninstall' }]
            }
          },
          methods: {
            onUninstalled: function onUninstalled (index, vm) {
              isUninstalled = Number.isInteger(index) && vm.constructor.name === 'VueComponent'
            }
          }
        }).$mount()

        const component = vm.$children[0]

        component.changeState(0)
        expect(isUninstalled).toEqual(true)
      })
    })
  })
  describe('~watch', () => {
    describe('~items', () => {
      it('should update the modules whenever there are changes in the parent items', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [{ state: 'uninstall' }]
            }
          }
        }).$mount()

        const component = vm.$children[0]

        vm.$data.items[0].state = 'active'
        expect(component.modules[0].state).toEqual('active')
      })
    })
    describe('~translations', () => {
      it('should update the states whenever there are changes in the parent translations', () => {
        const vm = new Vue({
          template: `
            <div><vue-module-manager
              :items="items"
              :translations="translations">
            </vue-module-manager></div>
          `,
          components: { VueModuleManager },
          data () {
            return {
              items: [],
              translations: {}
            }
          }
        }).$mount()

        const component = vm.$children[0]

        vm.$data.translations = {}
        expect(component.states.active).toEqual('active')
      })
    })
  })
})
