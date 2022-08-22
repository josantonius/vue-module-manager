# Vue Module Manager

[![NPM version](https://img.shields.io/npm/v/vue-module-manager.svg)](https://www.npmjs.com/package/vue-module-manager)
[![License](https://img.shields.io/badge/License-MIT-9b59b6.svg)](LICENSE)

[English version](README.md)

Componente para manejo de módulos con Vue.js.

<p align="center">
  <a href="https://josantonius.github.io/vue-module-manager/" title="Vue Module Manager">
    <img src="docs/static/vue-module-manager.gif">
  </a>
</p>

---

- [Demo](#demo)
- [Inicio rápido](#inicio-rápido)
- [Ejemplos](#ejemplos)
- [Props](#props)
- [Eventos](#eventos)
- [Métodos](#métodos)
- [Tests](#tests)
- [Patrocinar](#patrocinar)
- [Licencia](#licencia)

---

## Demo

[GitHub](https://josantonius.github.io/vue-module-manager/)

[CodePen](https://codepen.io/Josantonius/pen/PQoxXd/)

## Inicio rápido

### NPM

Instalar el paquete:

    npm install vue-module-manager

Registrar el componente:

```js
import Vue from 'vue'
import VueModuleManager from 'VueModuleManager'

Vue.component('VueModuleManager', VueModuleManager)
```

Usar el componente:

```html
<vue-module-manager :items="[]"></vue-module-manager>
```

### CDN

Include styles:

```html
<link href="https://unpkg.com/vue-module-manager/dist/vue-module-manager.min.css">
```

Include scripts:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-module-manager/dist/vue-module-manager.min.js"></script>
```

Registrar el componente:

```js
Vue.component('VueModuleManager', VueModuleManager.VueModuleManager)
```

Usar el componente:

```html
<vue-module-manager :items="[]"></vue-module-manager>
```

## Ejemplos

Ejemplos de uso para este componente:

### - Usando [CDN](#cdn)

```html
<!DOCTYPE html>
<html>

  <head>
    <link href="https://unpkg.com/vue-module-manager/dist/vue-module-manager.min.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  </head>

  <body>

    <div id="app">
      <vue-module-manager :items="[]"></vue-module-manager>
    </div>
    
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-module-manager/dist/vue-module-manager.min.js"></script>

    <script>
      Vue.component('VueModuleManager', VueModuleManager.VueModuleManager)
      new Vue().$mount('#app')
    </script>

  </body>

</html>
```

### - Agregando [módulos](#items)

```html
<vue-module-manager
  :items="items"
></vue-module-manager>
```

```js
new Vue({
  el: '#app',
  components: { VueModuleManager },
  data () {
    return {
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
      ]
    }
  }
})
```

### - Estableciendo [traducciones](#translations) para los botones

```html
<vue-module-manager
  :items="items"
  :translations="translations"
></vue-module-manager>
```

```js
new Vue({
  el: '#app',
  components: { VueModuleManager },
  data () {
    return {
      items: [{}, {}, {}],
      translations: {
        active: 'activo',
        activate: 'activar',
        install: 'instalar',
        update: 'actualizar',
        uninstall: 'desinstalar'
      },
    }
  }
})
```

### - Escuchando [eventos](#eventos)

```html
<vue-module-manager
  :items="items"
  @on-change="onChange"
  @on-active="onActive"
  @on-inactive="onInactive"
  @on-update="onUpdate"
  @on-install="onInstall"
  @on-uninstall="onUninstall"
  @on-uninstalled="onUninstalled"
></vue-module-manager>
```

```js
new Vue({
  el: '#app',
  components: { VueModuleManager },
  data () {
    return {
      items: [
        {'state': 'active'},
        {'state': 'outdated'},
        {'state': 'inactive'}
      ]
    }
  },
  methods: {
    onChange: function onChange (index, vm) {
      console.info('@on-change: ' + index)
    },
    onActive: function onActive (index, vm) {
      console.info('@on-active: ' + index)
    },
    onInactive: function onInactive (index, vm) {
      console.info('@on-inactive: ' + index)
    },
    onUpdate: function onUpdate (index, vm) {
      console.info('@on-update: ' + index)
    },
    onInstall: function onInstall (index, vm) {
      console.info('@on-install: ' + index)
    },
    onUninstall: function onUninstall (index, vm) {
      console.info('@on-uninstall: ' + index)
    },
    onUninstalled: function onUninstalled (index, vm) {
      console.info('@on-uninstalled: ' + index)
    }
  }
})
```

### - Escuchando el evento [@on-install](#on-install) y [deteniendo el icono de carga](#changestate) después de 3 segundos

```html
<vue-module-manager
  :items="items"
  @on-install="onInstall"
></vue-module-manager>
```

```js
new Vue({
  el: '#app',
  components: { VueModuleManager },
  data () {
    return {
      items: [
        {'state': 'active'},
        {'state': 'outdated'},
        {'state': 'inactive'}
      ]
    }
  },
  methods: {
    onInstall: function onInstall (index, vm) {
      setTimeout(function () {
        vm.changeState(index)
      }, 3000)
    }
  }
})
```

### - Escuchando el evento [@on-uninstall](#on-uninstall) y [deteniendo el icono de carga](#changestate) después de 3 segundos

```html
<vue-module-manager
  :items="items"
  @on-uninstall="onUninstall"
></vue-module-manager>
```

```js
new Vue({
  el: '#app',
  components: { VueModuleManager },
  data () {
    return {
      items: [
        {'state': 'active'},
        {'state': 'outdated'},
        {'state': 'inactive'}
      ]
    }
  },
  methods: {
    onUninstall: function onUninstall (index, vm) {
      setTimeout(function () {
        vm.changeState(index)
      }, 3000)
    }
  }
})
```

### - Escuchando el evento [@on-update](#on-update), [deteniendo el icono de carga](#changestate) después de 3 segundos y actualizando la información del módulo

```html
<vue-module-manager
  :items="items"
  @on-update="onUpdate"
></vue-module-manager>
```

```js
new Vue({
  el: '#app',
  components: { VueModuleManager },
  data () {
    return {
      items: [
        {
          'name': 'Crash Bandicoot',
          'version': '8.1.1',
          'description': 'Crash Bandicoot is a franchise of platform video games.',
          'state': 'outdated',
          'url': 'https://github.com/Josantonius/vue-module-manager',
          'image': '/static/crash-bandicoot.jpg'
        }
      ]
    }
  },
  methods: {
    onUpdate: function onUpdate (index, vm) {
      let self = this
      console.info('@on-update: ' + index)
      setTimeout(function () {
        vm.changeState(index)
        self.items[index].version = '8.1.2'
        self.items[index].name = 'Crash Bandicoot III'
        self.items[index].description = 'Crash Bandicoot N. Sane Trilogy is a video game compilation.'
        self.items[index].image = 'static/crash-bandicoot-trilogy.jpg'
      }, this.delay)
    },
  }
})
```

## Props

### :items

Description: Array con módulos.

Type: `Array`

Required: `true`

Default: `null`

```html
<vue-module-manager :items="[]">
```

### :translations

Description: Traducciones para los estados de los botones.

Type: `Object`

Default: `null`

```html
<vue-module-manager :items="[]" :translations="{}">
```

## Eventos

Eventos disponibles en este componente:

### @on-change

Se lanza cada vez que cambia el estado del módulo.

```js
onChange: function onChange (index, vm) { }
```

| Atributo | Tipo | Descripción
| --- | --- | --- |
| index | `Number` | Índice del módulo.
| index | `Object` | Instancia del componente.

```html
<vue-module-manager :items="[]" @on-change="onChange">
```

### @on-active

Se lanza cada vez que el estado del módulo cambia de inactivo a activo.

```js
onActive: function onActive (index, vm) { }
```

| Atributo | Tipo | Descripción
| --- | --- | --- |
| index | `Number` | Índice del módulo.
| index | `Object` | Instancia del componente.

```html
<vue-module-manager :items="[]" @on-active="onActive">
```

### @on-inactive

Se lanza cada vez que el estado del módulo cambia de activo a inactivo.

```js
onInactive: function onInactive (index, vm) { }
```

| Atributo | Tipo | Descripción
| --- | --- | --- |
| index | `Number` | Índice del módulo.
| index | `Object` | Instancia del componente.

```html
<vue-module-manager :items="[]" @on-inactive="onInactive">
```

### @on-uninstalled

Se lanza cada vez que el estado del módulo cambia de desinstalar a desinstalado.

```js
onUninstalled: function onUninstalled (index, vm) { }
```

| Atributo | Tipo | Descripción
| --- | --- | --- |
| index | `Number` | Índice del módulo.
| index | `Object` | Instancia del componente.

```html
<vue-module-manager :items="[]" @on-uninstalled="onUninstalled">
```

### @on-install

Se lanza cada vez que el estado del módulo cambia de desinstalado a instalar.

```js
onInstall: function onInstall (index, vm) { }
```

| Atributo | Tipo | Descripción
| --- | --- | --- |
| index | `Number` | Índice del módulo.
| index | `Object` | Instancia del componente.

```html
<vue-module-manager :items="[]" @on-install="onInstall">
```

Este estado iniciará cargador de instalación que deberá ser detenido a través del método [changeState](#changestate):

```js
vm.changeState(index)
```

[Ver ejemplos.](#ejemplos)

### @on-uninstall

Se lanza cada vez que el estado del módulo cambia de instalado to desinstalar.

```js
onUninstall: function onUninstall (index, vm) { }
```

| Atributo | Tipo | Descripción
| --- | --- | --- |
| index | `Number` | Índice del módulo.
| index | `Object` | Instancia del componente.

```html
<vue-module-manager :items="[]" @on-uninstall="onUninstall">
```

Este estado iniciará cargador de desinstalación que deberá ser detenido a través del método [changeState](#changestate):

```js
vm.changeState(index)
```

[Ver ejemplos.](#ejemplos)

### @on-update

Se lanza cada vez que el estado del módulo cambia de desactualizado a actualizado.

```js
onUpdate: function onUpdate (index, vm) { }
```

| Atributo | Tipo | Descripción
| --- | --- | --- |
| index | `Number` | Índice del módulo.
| index | `Object` | Instancia del componente.

```html
<vue-module-manager :items="[]" @on-update="onUpdate">
```

Este estado iniciará un cargador de actualización que deberá ser detenido a través del método [changeState](#changestate):

```js
vm.changeState(index)
```

[Ver ejemplos.](#ejemplos)

## Métodos

Métodos disponibles en este componente:

### changeState

Cambiar al siguiente estado del módulo.

```js
vm.changeState(index)
```

| Atributo | Tipo | Descripción | Requerido
| --- | --- | --- | --- |
| index | `Number` | Índice del módulo. | `true`

## Tests

Clonar el repositorio:

    git clone https://github.com/Josantonius/vue-module-manager.git vue-module-manager

Ir al directorio:

    cd vue-module-manager

Instalar dependencias:

    npm install

Ejecutar [pruebas unitarias](test):

    npm run test

Ejecutar [ESLint](https://eslint.org/) para validar que el estilo de código es compatible con el [Standar JavaScript](https://standardjs.com/):

    npm run lint

Ejecutar [serve](docs) con recarga en caliente:

    npm run dev

Montar [distribución](dist) con minificación:

    npm run bundle

Montar [demo](docs) para producción con minificación:

    npm run build

Ejecutar todo lo anterior:

    npm run finish

## Patrocinar

Si este proyecto te ayuda a reducir el tiempo de desarrollo,
[puedes patrocinarme](https://github.com/josantonius/lang/es-ES/README.md#patrocinar)
para apoyar mi trabajo :blush:

## Licencia

Este repositorio tiene una licencia [MIT License](LICENSE).

Copyright © 2018-2022, [Josantonius](https://github.com/josantonius/lang/es-ES/README.md#contacto)
