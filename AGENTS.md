# Инструкции для AI-агентов

Проект использует **Feature-Sliced Design (FSD)**. Архитектура, слои, сегменты, Public API и правила размещения кода — по skill [feature-sliced-design](https://www.skills.sh/feature-sliced/skills/feature-sliced-design). Не дублируй FSD-правила здесь и не расходись с skill.

Ниже — только соглашения **этого** проекта.

## Стек и границы

- Код приложения — в `src/` (кроме конфигов в корне). Папки `src/components/` нет.
- Алиас: `@/` → `src/`.
- Импорты из других слайсов — только через Public API (`index.ts`), с алиасом `@/`.
- ESLint (`@feature-sliced/eslint-config`) проверяет направление импортов между слоями.

## Именование

| Элемент | Конвенция | Пример |
|---------|-----------|--------|
| Папка слайса | `kebab-case` | `add-to-cart`, `user-profile` |
| React-компонент | `PascalCase` | `AddToCartButton`, `UserCard` |
| Хуки | `camelCase` с `use` | `useAddToCart`, `useUserData` |
| Утилиты | `camelCase` | `formatPrice`, `parseDate` |
| SCSS-модуль | Рядом с компонентом | `HomePage.module.scss` |

Имя компонента совпадает с именем файла: `HomePage.tsx` → `export function HomePage`.

## Стили

- **Глобальные стили** — `src/app/styles/` (reset, CSS-переменные).
- **Стили компонентов** — CSS Modules: `*.module.scss` рядом с компонентом.
- **Корневой элемент** — класс `.root`.
- **Остальные классы** — по роли: `.title`, `.content`, `.button`.

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

Не используй глобальные классы для стилей компонентов. Не используй CSS-in-JS — в проекте SCSS Modules.

## Импорты

Порядок (ESLint `import/order`):

1. `react`
2. Внешние пакеты
3. FSD-слои снизу вверх: `@/shared` → `@/entities` → `@/features` → `@/widgets` → `@/pages` → `@/app`
4. Относительные импорты (`./`, `../`)
5. Стили (`.scss`, `.module.scss`)

Между группами — пустая строка.

## React и TypeScript

- Только функциональные компоненты.
- Именованный экспорт (`export function`), не `export default`.
- Строгий TypeScript: не используй `any` без веской причины.
- `useCallback` / `useMemo` — только при реальной необходимости.
- Не добавляй комментарии к очевидному коду.
- В Public API экспортируй явно — без `export *`.

## Чего не делать

- Не добавляй тесты, документацию и зависимости, если пользователь явно не просил.
- Не меняй конфигурацию ESLint / Vite / TypeScript без запроса.
- Не дублируй README или эту инструкцию в других файлах.

## Проверка после изменений

```bash
npm run typecheck
npm run lint
npm run lint:style
```

Исправь все ошибки перед завершением задачи.
