## Servidor REST Express.

Servidor express. Está desplegado en Heroku (https://stormy-beach-21493.herokuapp.com/). Sale Cannot GET / pero eso está bien ya que es una aplicación solo de backend por tanto las peticiones se hacen desde el postman. La documentación está en (https://documenter.getpostman.com/view/1578048/S17nVB71). Hay entorno de desarrollo y produccción con sus variables de configuración independientes. Esas variables se configuran con Heroku set haciendo así que no sean visibles en el código.

### Uso de la aplicación en local

Para probar el código en local:

1. Clonar el repositorio

2.  ```npm install```

3. Levantar la aplicación
+ ```node server/server```
+ ```nodemon server/server```
+ ```npm start```
