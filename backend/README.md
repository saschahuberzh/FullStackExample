# Express Backend

Dieses Backend basiert auf [Express](https://expressjs.com/) und bietet eine REST-API mit Swagger-Dokumentation.

## Starten

```sh
npm install
npm start
```

Das Backend läuft dann auf [http://localhost:3001](http://localhost:3001).

## API-Dokumentation

Swagger UI ist verfügbar unter:  
[http://localhost:3001/api-docs](http://localhost:3001/api-docs)

## Health-Check

Testen, ob der Service läuft:
```sh
curl http://localhost:3001/health
```

## Hinweise

- Endpunkte werden in `index.js` definiert.
- Für weitere Routen und Features einfach den Code