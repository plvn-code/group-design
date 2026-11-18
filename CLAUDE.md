# Group Design — сайт дизайн-студії Олени Якубець (клієнт)

Дизайн інтерʼєру та ремонт під ключ, Київ. Instagram @group_design_ (433 пости, ~4K), тел. 098 980 15 32 (+380989801532).
Бриф: у шапці Instagram немає посилання — сайт має показати готові обʼєкти, етапи й вартість в одному місці. Референс структури: bureaux.com.ua (hero на фото, послуги, проєкти, «чому ми», про студію, ціни, процес, заявка, FAQ). Стиль — як її рендери: теплий беж, мармур, дерево, LED-підсвітка.

**З користувачем говоримо російською.** Сайт — **українською** (одна мова).

Спочатку читай `docs/STATUS.md`.

GitHub: github.com/plvn-code/group-design (branch `main`) — після завершених задач commit + push. Vercel поки немає — спершу спитати користувача.

## Команди

```bash
npm run build && npm start            # production на :3021 (3020 aura)
npm run dev                           # dev на :3021
npm run lint && npx tsc --noEmit      # мають бути чистими
kill $(lsof -ti tcp:3021 -sTCP:LISTEN)
open -a "Google Chrome" http://localhost:3021
~/Desktop/nudes/research/.venv/bin/python -I scripts/build_media.py   # перезібрати public/img + src/lib/media.json
```

`node_modules` — **симлінк** на `~/Desktop/nudes/node_modules` (той самий package.json; на Mac мало місця).

## Стек

Next.js 15 App Router · React 19 · TS strict · plain CSS (`src/app/globals.css`, токени в `:root`) · next/font — шрифти як у ALUABRI: **Geologica** 200–500 (заголовки, великий текст; `em` = той самий шрифт бронзою, без курсиву) + **Manrope** (текст, меню, кнопки без капсу) + **JetBrains Mono** (дрібні підписи капсом). Без БД.

## Структура

```
src/app/               / · /projects (фільтр ?type=apartment|house|commercial, ?status=done) · /projects/[slug] (11) · /services · /about · /contacts
src/app/api/lead       заявка → Telegram-бот (env TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID); без env форма показує готовий текст + Viber/Direct/дзвінок
src/lib/projects.ts    11 проєктів (тексти з підписів її постів), CATEGORY/STATUS, compare (візуалізація vs реальне фото), pick(slug,i)
src/lib/content.ts     послуги, 6 етапів, цифри, «чому ми», FAQ
src/lib/media.json     генерується build_media.py — шляхи й розміри всіх фото
src/lib/site.ts        контакти, nav
src/components/        Header (прозорий над hero → кремовий), Footer, Effects ([data-reveal], .curtain, .words, [data-parallax], .fab),
                       HeroPanels (3 панелі, кадри змінюються по черзі), Compare (слайдер «проєкт = реальність»), Gallery (+лайтбокс),
                       ProjectsBrowser (фільтр), LeadForm, Sections (PageHero, ProjectCard, ProcessSteps, Faq, LeadSection, Words, Split)
scripts/               fetch_ig.py, fetch_hl.py (CDN-посилання Instagram протухають), build_media.py, sheet*.py (контактні аркуші)
originals/, research/  сирі фото з Instagram + ig_posts.json, ig_hl.json, captions.txt — у git не йдуть
```

## Правила

- Не вигадувати факти/ціни: джерело — `research/captions.txt`. Площа/локація проставлені лише там, де вона їх публікувала. Ціни на дизайн вона не публікує — у таблиці тільки одиниці («за м²»), без цифр.
- Фото: тільки її Instagram (рендери з каруселей + реальні фото з хайлайту «реалізовані»). Порядок фото проєкту = `PROJECTS` у build_media.py.
- `.curtain`: шторка — це `::after`-накладка; **не** ставити clip-path на `<img>` (Chrome тоді не запускає lazy-loading).
- Анімації помірні, все під `prefers-reduced-motion`.
- Playwright headless у фоновій вкладці не малює кадри: переходи «зависають», `click()` чекає stable вічно — клікати через `evaluate`, для статичних скриншотів `emulateMedia({reducedMotion:'reduce'})`.
