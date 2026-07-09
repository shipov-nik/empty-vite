# Empty Vite — Стартовый шаблон для React проектов

Готовый шаблон для быстрого старта новых проектов на React + TypeScript + Vite с архитектурой Feature-Sliced Design и предварительно настроенными инструментами разработки.

## Технологии

- **React 19** — библиотека для создания пользовательских интерфейсов
- **TypeScript** — типизированный JavaScript
- **Vite** — быстрый сборщик и dev-сервер
- **Oxc** — быстрая трансформация React через `@vitejs/plugin-react` (Rolldown/Vite 8)
- **Feature-Sliced Design** — архитектура по слоям и сегментам
- **ESLint** — линтер для JavaScript/TypeScript с правилами для React
- **Prettier** — форматировщик кода
- **Stylelint** — линтер для CSS/SCSS
- **SCSS** — препроцессор CSS
- **CSS Modules** — изолированные стили компонентов (`.module.scss`)

## Что включено

- Настроенный TypeScript с разделением конфигураций для приложения и Node.js
- Feature-Sliced Design: слои `app`, `pages`, `widgets`, `features`, `entities`, `shared`
- Path alias `@/` → `src/`
- ESLint с правилами для React, TypeScript, Prettier, FSD-архитектуры и сортировкой импортов по слоям
- Stylelint для проверки стилей
- Vite Plugin Checker для проверки типов и линтинга в реальном времени
- SCSS с переменными и normalize-стилями
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

## Структура проекта (FSD)

```
empty-vite/
├── src/
│   ├── app/                 # Инициализация приложения, провайдеры, глобальные стили
│   │   ├── App.tsx
│   │   ├── index.ts         # Public API слоя
│   │   └── styles/
│   │       ├── index.scss
│   │       ├── normalize.scss
│   │       └── variables.scss
│   ├── pages/               # Страницы — композиция виджетов и фич
│   │   └── home/
│   │       ├── ui/
│   │       │   ├── HomePage.tsx
│   │       │   ├── HomePage.module.scss
│   │       │   └── index.ts     # Public API сегмента ui
│   │       └── index.ts         # Public API слайса
│   ├── widgets/             # Самостоятельные блоки UI
│   ├── features/            # Пользовательские сценарии и действия
│   ├── entities/            # Бизнес-сущности
│   ├── shared/              # Переиспользуемый код: ui, lib, api, config
│   ├── main.tsx             # Точка входа
│   └── vite-env.d.ts
├── dist/                    # Собранный проект (генерируется автоматически)
├── eslint.config.js
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.node.json
```

### Слои FSD (снизу вверх)

| Слой | Назначение |
|------|------------|
| `shared` | UI-kit, утилиты, API-клиент, конфигурация |
| `entities` | Бизнес-сущности (User, Product и т.д.) |
| `features` | Действия пользователя (авторизация, добавление в корзину) |
| `widgets` | Композитные блоки страницы (хедер, сайдбар) |
| `pages` | Полноценные страницы |
| `app` | Роутинг, провайдеры, глобальные стили |

Слой может импортировать только из слоёв **ниже** себя. Например, `pages` может использовать `widgets`, `features`, `entities` и `shared`, но не наоборот.

### Public API

Каждый слайс и сегмент экспортирует наружу только через `index.ts`. Импорты из других слоёв — только через Public API слайса:

```ts
import { HomePage } from "@/pages/home";
import { App } from "@/app";
```

Реэкспорт внутри слайса — через Public API сегмента, а не напрямую в файлы:

```ts
// pages/home/index.ts
export { HomePage } from "./ui";

// pages/home/ui/index.ts
export { HomePage } from "./HomePage";
```

## Path aliases

Алиас `@/` указывает на `src/`:

```ts
import { App } from "@/app";
import { HomePage } from "@/pages/home";
```

Настроен в `vite.config.ts`, `tsconfig.app.json` и правилах сортировки импортов ESLint.

### Стили

- **Глобальные стили** — обычные `.scss` в `src/app/styles/` (normalize, CSS-переменные)
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

- Правила для React и React Hooks
- **FSD-архитектура** (`@feature-sliced/eslint-config`):
  - `boundaries/element-types` — запрет импортов «вверх» по слоям (pages → features → entities → shared)
  - `import/no-internal-modules` — импорт только через Public API слайсов и сегментов
- Сортировка импортов по FSD-слоям
- Интеграция с Prettier
- Проверка неиспользуемых переменных

### TypeScript

- Строгий режим включён
- Target ES2022, `verbatimModuleSyntax`
- Раздельные конфигурации для приложения и инструментов сборки

## Рекомендации

1. После копирования шаблона обновите название проекта в `package.json`
2. Настройте переменные в `src/app/styles/variables.scss` под ваш дизайн
3. Новые страницы добавляйте в `src/pages/`, фичи — в `src/features/`, сущности — в `src/entities/`
4. Переиспользуемые компоненты и утилиты — в `src/shared/`
5. Соблюдайте Public API: экспортируйте из сегмента только через `index.ts`
6. При необходимости настройте правила ESLint в `eslint.config.js`

## Лицензия

Этот шаблон предназначен для личного использования. Используйте его как основу для своих проектов.
