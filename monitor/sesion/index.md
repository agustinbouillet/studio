# Tiempo de sesión

El módulo de timeout se encarga de proveer seguridad en la pantalla de monitoreo. Sabiendo que ésta tiene como finalidad estar activa durante largos periodos de tiempo,  el módulo se activa luego de un período de tiempo de inactividad sobre la pantalla. 

La actividad está concebida como acciones directas del usuario en la pantalla, como por ejemplo: hacer clic sobre un objeto.

Configuración
Este módulo tiene tres opciones de configuración. Una es la activación del módulo y la otra es el tiempo de sesión.

En .env

```
# -----------------------------
# SESSION MONITOR
# -----------------------------
SESSION_MONITOR=True
SESSION_MONITOR_TIMEOUT=15
SESSION_STRICT_MODE=False
```


| Parámetro | Descripción |
|---|---|
| `SESSION_MONITOR` | Permite activar o desactivar el módulo session.js.<br /> - `True` _(default)_, Activo.<br /> - `False`, Inactivo.|
| `SESSION_MONITOR_TIMEOUT` | Especifica el tiempo en minutos que debe durar la sesión.<br />1=60” |
| `SESSION_STRICT_MODE` | Modalidad de uso del timeout.<br /> - `False` _(default)_. Timeout fijo, cada _n_ minutos aparecerá el diálogo pidiendo continuar o interrumpir sesión.<br /> - `True`. Habilita el modo de sesión expandible. |
