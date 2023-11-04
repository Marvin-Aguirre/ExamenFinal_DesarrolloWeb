# Configuración de Variables de Entorno

Este proyecto utiliza variables de entorno para gestionar la configuración de la base de datos y otros parámetros sensibles. 

## Archivo .env

```env
# Configuración de la Base de Datos
DB_SERVER=localhost
DB_USER=sa
DB_PASSWORD=1234
DB_DATABASE=Producto
DB_OPTIONS={"trustServerCertificate": true}
