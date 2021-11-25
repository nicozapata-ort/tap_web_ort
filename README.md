#Landing web para TAP

Antes de ejecutar este proyecto es necesario:

Tener el proyecto https://github.com/nicozapata-ort/tap_web_ort_strapi.git ejecutando en algún servidor, con los siguiente requisitos minimos:

1) Un usuario registrado en la colección Users(O Usuarios según el idioma del navegador) y que dicho usuario este autorizado para hacer todas las funciones en las colecciones Participants, Coupons y Promotions.

2) Tener al menos un registro en la colección Promotions con todos sus campos.

3) Tener cupones asociados a la promoción anterior que tenga el atributo "used" como "false"

Haber configurado las variables de entorno para que cumplan los siguientes requisitos, bien sea en el .env o por otro metodo:

REACT_APP_AUTHORIZATION_STRAPI: JWT de un usuario registrado en el backend mencionado anteriormente, debe cumplir este formato, en este ejemplo se usa 123 como JWT: Bearer 123
REACT_APP_URL_STRAPI: IP con puerto, o URL de donde este ejecutado el servidor mencionado anteriormente.
REACT_APP_PROMOTION_ID: ID de la promoción a la cual va a estar asociada la LANDING, el ID debe ser el que este en el backend mencionado anteriormente.

#Manuales:

En la carpeta principal se encuentran tanto el Manual de Usuario como el Manual del Programador con todas las especificaciones del sistema.
