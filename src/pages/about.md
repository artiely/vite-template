---
title: About
---
# Vuepress-plugin-valine

<div class="container gird gird-clos-3 ">
  <div class="col-span-2">123</div>
  <div class="col-span-1">456</div>
</div>


::: tip
非常棒
:::

```html {1,3,6-7, 9-10,13}
<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav class="text-xl mt-6">
    <router-link class="icon-btn mx-2" to="/" :title="t('button.home')">
      <carbon-campsite />
    </router-link>

    <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales">
      <carbon-language />
    </a>

    <router-link class="icon-btn mx-2" to="/about" :title="t('button.about')">
      <carbon-dicom-overlay />
    </router-link>

    <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank" title="GitHub">
      <carbon-logo-github />
    </a>
  </nav>
</template>
```


> Support popluar comment plugins in Vuepress, such as Valine.

## Features

- Support Valine
- Dynamic Import
- Response router change and refresh automatic
- User can use passage's `$frontmatter`

## Usage

### Install

With `npm`:

```bash
npm install --save vuepress-plugin-valine
```

With `yarn`:

```bash
yarn add vuepress-plugin-valine -D
```

With `cnpm`:

```bash
cnpm i --save vuepress-plugin-valine
```

### Use

The `options` is exactly the same as `Valine` configuration.

``` js {2-4}
module.exports = {
  plugins: [
    [
      'vuepress-plugin-valine',
      {
        appId: 'Your own appId',
        appKey: 'Your own appKey'
      }
    ]
  ]
}
```



## demo

<Demo src="../components/Footer.vue" ></Demo>
<Demo src="../components/Debug.vue" ></Demo>


[https://artiely.gitee.io](https://artiely.gitee.io)


## 可以再markdown中注入组件
<Footer />
