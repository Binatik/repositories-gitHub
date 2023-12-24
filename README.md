# API GitHub - список репозиториев

---
<img width="1162" alt="image" src="https://github.com/Binatik/images/assets/47430210/8690cd3b-e466-4237-a5ca-47876575553e">

## Проверить

Проверить последнюю версию web приложения можно [здесь](https://binatik.github.io/repositories-gitHub/).

## Сборка
Веб упаковка была выполнена при помощи `webpack` используя настройку из `webpack.config`

## Разработчикам

Для запуска у вас должен быть установлен [Node.js](http://nodejs.org)

Для установки пакетов используется [npm](https://www.npmjs.com)

```bash
npm install -g npm
```

```bash
$ git clone repository # Клонирование репозитория
$ npm i # Установка зависимостей
$ npm run # Запуск в mode режиме
```

```js
//scripts в package.json
"dev": "npx webpack serve --mode development",
"build": "webpack --mode production",
```

Запуск в режиме `dev` использует мод development и исполняется на локальном сервере.
```js
  devServer: {
    port: 3000,
    ...
  },
```
Cтилизация происходит используя `sass` или `scss`
```js
// по примеру
import '../styles/style.scss'
...
```
Для компиляции функций в более старые версии из менее ранних мы используем `@babel/preset-env` и `babel-loader`
```js
use: {
    loader: "babel-loader",
    options: {
    presets: ["@babel/preset-env"],
  },
},
```

## О программе
Это простая программа при помощи которой можно получать репозитории других ребят используя только поиск на сайте. 

### Возможности
-   Искать первые 5 репозиториев
-   Добавлять репозиторий на сайт
-   Удалять репозиторий
-   Просматривать имя репозитория, его владельца и звезды.

### Оптимизации
В качестве оптимизации был использован подход с дебаунс для экономии ресурсов.

``Поддержка Ege последних версий``
