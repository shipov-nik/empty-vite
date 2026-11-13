# Empty Vite — Стартовый шаблон для React проектов

Готовый шаблон для быстрого старта новых проектов на React + TypeScript + Vite с минимальной структурой и предварительно настроенными инструментами разработки.

## Технологии

- **React 19** — библиотека для создания пользовательских интерфейсов
- **TypeScript** — типизированный JavaScript
- **Vite** — быстрый сборщик и dev-сервер
- **Oxc** — быстрая трансформация React через `@vitejs/plugin-react` (Rolldown/Vite 8)
- **ESLint** — линтер для JavaScript/TypeScript с правилами для React
- **Prettier** — форматировщик кода
- **Stylelint** — линтер для CSS/SCSS
- **SCSS** — препроцессор CSS
- **CSS Modules** — изолированные стили компонентов (`.module.scss`)

## Что включено

- Настроенный TypeScript с разделением конфигураций для приложения и Node.js
- Минимальная структура: `app` для сборки приложения и глобальных стилей, `pages` для страниц
- Path alias `@/` → `src/`
- ESLint с правилами для React, TypeScript и сортировкой импортов
- Prettier для отдельной проверки и форматирования кода
- Stylelint для проверки стилей
- Vite Plugin Checker для проверки типов и линтинга в реальном времени
- SCSS со сбросом браузерных стилей
- CSS Modules (`.module.scss`) для стилей компонентов
- Полный набор npm-скриптов для разработки, сборки и проверки кода

## Использование

### Быстрое создание проекта с помощью degit

Рекомендуемый способ — использовать утилиту [degit](https://www.npmjs.com/package/degit) для клонирования шаблона без истории git:

```bash
# Если шаблон в GitHub репозитории
npx degit username/empty-vite my-new-project
cd my-new-project
npm install

# Если используете локальный шаблон
npx degit ./path/to/empty-vite my-new-project
cd my-new-project
npm install
```

После этого обновите название проекта в `package.json`.

### Копирование шаблона вручную

1. Скопируйте всю папку проекта в новое место
2. Переименуйте папку проекта
3. Откройте `package.json` и измените поле `name` на название вашего проекта
4. Установите зависимости:

   ```bash
   npm install
   ```

### Запуск проекта

```bash
# Запуск dev-сервера (откроется на http://localhost:5173)
npm run dev

# Сборка для production
npm run build

# Предпросмотр production сборки
npm run preview

# Проверка типов
npm run typecheck

# Проверка кода линтером
npm run lint

# Автоисправление ESLint
npm run lint:fix

# Проверка стилей
npm run lint:style

# Автоисправление Stylelint
npm run lint:style:fix

# Форматирование кода
npm run format

# Проверка форматирования без изменений
npm run format:check
```

## Структура проекта

```
empty-vite/
├── src/
│   ├── app/                 # Сборка приложения и глобальные стили
│   │   ├── App.tsx
│   │   ├── index.ts         # Экспорт App
│   │   └── styles/
│   │       ├── index.scss
│   │       └── reset.scss
│   ├── pages/               # Страницы приложения
│   │   └── home/
│   │       ├── HomePage.tsx
│   │       ├── HomePage.module.scss
│   │       └── index.ts     # Экспорт HomePage
│   └── main.tsx             # Точка входа
├── dist/                    # Собранный проект (генерируется автоматически)
├── eslint.config.js
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.node.json
```

## Path aliases

Алиас `@/` указывает на `src/`:

```ts
import { App } from "@/app";
import { HomePage } from "@/pages/home";
```

Настроен в `vite.config.ts`, `tsconfig.app.json` и правилах сортировки импортов ESLint.

### Стили

- **Глобальные стили** — обычные `.scss` в `src/app/styles/` (сброс браузерных стилей, CSS-переменные)
- **Стили компонентов** — CSS Modules: файлы `*.module.scss` рядом с компонентом
- **Именование классов** — короткие имена внутри модуля (`.root`, `.title`); изоляция обеспечивается CSS Modules

```scss
// HomePage.module.scss
.root {
  min-height: 100vh;
}

.title {
  margin: 0;
}
```

```tsx
import styles from "./HomePage.module.scss";

export function HomePage() {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>App</h1>
    </div>
  );
}
```

Корневой элемент компонента обычно именуют `.root`. Остальные классы — по роли элемента (`.title`, `.content`, `.button`).

## Настройки

### Vite

- Dev-сервер автоматически открывается в браузере на порту `5173`
- Включена проверка TypeScript, ESLint и Stylelint в реальном времени

### ESLint

- Правила для TypeScript и React Hooks
- Сортировка импортов: React, внешние пакеты, внутренние модули через `@/`, относительные импорты, стили
- Правила, конфликтующие с Prettier, отключены; форматирование проверяется через `npm run format:check`
- Раздельные глобальные переменные для браузерного кода и конфигураций Node.js
- Проверка неиспользуемых переменных

### TypeScript

- Строгий режим включён
- Target ES2022, `verbatimModuleSyntax`
- Раздельные конфигурации для приложения и инструментов сборки
- Типы Vite и SCSS Modules подключены через `types: ["vite/client"]`
- Кэш проверки типов хранится в `node_modules/.tmp/`

## Рекомендации

1. После копирования шаблона обновите название проекта в `package.json`
2. Глобальные стили настраивайте в `src/app/styles/`
3. Новые страницы добавляйте в `src/pages/`, стили компонентов размещайте рядом с ними
4. При необходимости настройте правила ESLint в `eslint.config.js`

## Лицензия

Этот шаблон предназначен для личного использования. Используйте его как основу для своих проектов.
