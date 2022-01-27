# Redes sociales

El módulo de redes sociales permite al usuario enviar información relevante al público general sobre el estado de uno de los componentes evaluados y monitoreados por el sistema SITRA.

La idea de este módulo a futuro es que se incorporen otras redes sociales y que luego el usuario pueda seleccionar cual de ellas recibirá el post.


## Configuración

La configuración se realiza por medio del archivo .env, donde se deberá agregar los datos de autorización generados por el servicio para desarrolladores de cada una de las redes. 

En .env

```bash
# -----------------------------
# SOCIAL NETWORKS
# -----------------------------
TWITTER_API_KEY = "h9KGSDFEYHUy…"
TWITTER_API_SECRET_KEY = "eiFmc9KzIa…"
TWITTER_ACCESS_TOKEN = "104952832-zFsD37ZwP…"
TWITTER_ACCESS_TOKEN_SECRET = "DSLFk3Sug…"
```

