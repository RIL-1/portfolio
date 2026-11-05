# Portfolio - Richard Labité

Portfolio statique HTML/CSS/JavaScript, bilingue FR/EN.

## Structure

- `index.html` - structure et contenu
- `css/style.css` - design principal
- `css/animations.css` - animations et accessibilité reduced-motion
- `css/responsive.css` - tablette/mobile
- `js/translations.js` - contenus FR/EN
- `js/main.js` - navigation, animations, langue, accordéons
- `js/contact.js` - envoi Formspree
- `assets/images/` - photo, visuels et image Open Graph
- `Dockerfile` - image Nginx du site
- `docker-compose.yml` - lancement local du conteneur

## Test local

Ouvrir `index.html` directement ou lancer un petit serveur local :

```bash
python3 -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Docker

```bash
docker compose up --build -d
```

Le site est disponible sur `http://localhost:8086`.

```bash
docker compose logs -f
docker compose down
```
