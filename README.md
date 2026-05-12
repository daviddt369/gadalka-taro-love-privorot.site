# София

Статический mobile-first лендинг для Софии. Сайт сделан как самостоятельный проект с мягкой тёплой подачей, отдельной 3D-галереей, видео, сертификатами и popup-блоком «Карта дня».

## Где менять контакты

- Телефон: заменить `SOFIA_PHONE` в [index.html](/mnt/e/codex/www/sofia/index.html)
- WhatsApp: заменить `SOFIA_WHATSAPP` в [index.html](/mnt/e/codex/www/sofia/index.html)
- Telegram: заменить `SOFIA_TELEGRAM` в [index.html](/mnt/e/codex/www/sofia/index.html)

## Где менять домен

- Текущий домен хранится в [domain.txt](/mnt/e/codex/www/sofia/domain.txt)
- SEO-поля `title`, `meta description`, `canonical`, `Open Graph url` заданы в [index.html](/mnt/e/codex/www/sofia/index.html)

## Куда класть фото

- Фотографии лежат в [media](/mnt/e/codex/www/sofia/media)
- Для замены фото в hero, галерее и блоках редактируйте пути в [index.html](/mnt/e/codex/www/sofia/index.html)

## Куда класть видео

- Видео находится в [media](/mnt/e/codex/www/sofia/media)
- Блок видео подключён в [index.html](/mnt/e/codex/www/sofia/index.html)

## Куда класть сертификаты

- Временные заглушки лежат в [assets/certificates](/mnt/e/codex/www/sofia/assets/certificates)
- Для замены положите реальные сертификаты в эту папку и обновите пути в [index.html](/mnt/e/codex/www/sofia/index.html)

## Где вставлять аналитику

- Плейсхолдер Яндекс.Метрики: низ [index.html](/mnt/e/codex/www/sofia/index.html)
- Плейсхолдер Google Analytics: низ [index.html](/mnt/e/codex/www/sofia/index.html)

## Какие файлы отвечают за стили и скрипты

- Разметка: [index.html](/mnt/e/codex/www/sofia/index.html)
- Стили: [styles.css](/mnt/e/codex/www/sofia/styles.css)
- Скрипты: [script.js](/mnt/e/codex/www/sofia/script.js)
- Иконка сайта: [favicon.svg](/mnt/e/codex/www/sofia/favicon.svg)

## Как устроена 3D-галерея

- Галерея находится в секции `.orbit-gallery` в [index.html](/mnt/e/codex/www/sofia/index.html)
- JS в [script.js](/mnt/e/codex/www/sofia/script.js) рассчитывает радиус и адаптивный размер карточек
- Анимация включается только в зоне видимости и выключается при `prefers-reduced-motion`

## Как устроен popup «Карта дня»

- Разметка модального окна находится в [index.html](/mnt/e/codex/www/sofia/index.html)
- Логика показа по таймеру или после прокрутки, закрытие и sessionStorage находятся в [script.js](/mnt/e/codex/www/sofia/script.js)
- Карты лежат в [assets/cards](/mnt/e/codex/www/sofia/assets/cards)

## Как локально открыть сайт

1. Откройте папку [sofia](/mnt/e/codex/www/sofia) через локальный сервер.
2. Пример команды из `E:\codex\www`:

```bash
cd /mnt/e/codex/www
python3 -m http.server 8080
```

3. После запуска откройте `http://localhost:8080/sofia/`
