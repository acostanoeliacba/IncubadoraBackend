# IncubadoraBackend
Proyecto Xacademy 2025

## Instrucciones Creacion base de datos y back End en sus Entornos

***Para hacer  solicitudes a la api localmente una ves que carguen la base de datos mediante el codigo sql  ,recuerden crear el archivo .env en el proyecto y especificar el usuario contraseña y puerto de acceso a sus bases de datos mysql de esta forma( para especificar el puerto que usan si tienen varios bases de datos  en sus pc  esta en 3307  pueden cambiarlo a 3306):
  
```markdown
  DB_HOST=localhost
  DB_USER=
  DB_PASS=
  DB_NAME=NOC
  DB_PORT=3307

```
Para correr el proyecto desde consola:  npm run dev

Valores devueltos ejemplo( http://localhost:3000/user/findById/2 )

```markdown
{
  "nombre": "Lucas",
  "apellido": "Aristoteles",
  "fecha_nacimiento": "01/01/2000",
  "direccion":"villa maria 33",
  "telefono":"31155477",
  "email": "LucaAri@gmail.com",
  "password": "youtube24",
  "dni": 12345678,
  "especialidad":"",
  "tipo_usuario": "alumno"
}
```

Si es un docente deben incluir su especialidad:"Biologia" etc, y tipo_usuario :"docente" en el back esta contemplado que puede ser un campo vacio la especialidad por el alumno deben realizar validaciones para que los datos sean los esperados en el BackEnd.

##  Pueden revisar si se estan conectando a la base de datos  ingresando las siguientes rutas en el navegador: 

### Seccion Usuario

```Markdown 
| Método | Descripción                  | URL completa (HTTP)                          ejemplo              |
| ------ | ---------------------------- | ----------------------------------------------------------------- |
| POST   | Iniciar sesión               | `http://localhost:3000/user/login`                               |
| POST   | Crear un nuevo usuario       | `http://localhost:3000/user/create`                              |
| GET    | Obtener todos los usuarios   | `http://localhost:3000/user/find`                                |
| GET    | Obtener un usuario por ID    | `http://localhost:3000/user/findById/123` *( con ID 123)* |
| PUT    | Actualizar un usuario por ID | `http://localhost:3000/user/update/123` *( con ID 123)*   |
| DELETE | Eliminar un usuario por ID   | `http://localhost:3000/user/delete/123` *( con ID 123)*   |

```
### Seccion Inscripciones
```Markdown
| Método | Descripción                       | URL completa (HTTP)                                   |
| ------ | --------------------------------- | ----------------------------------------------------- |
| POST   | Crear una inscripción             | `http://localhost:3000/inscripciones`                 |
| GET    | Obtener todas las inscripciones   | `http://localhost:3000/inscripciones`                 |
| GET    | Obtener una inscripción por ID    | `http://localhost:3000/inscripciones/123` *(ejemplo)* |
| PUT    | Actualizar una inscripción por ID | `http://localhost:3000/inscripciones/123` *(ejemplo)* |
| DELETE | Eliminar una inscripción por ID   | `http://localhost:3000/inscripciones/123` *(ejemplo)* |

```
### Seccion Cursos
```Markdown
| Método | Descripción                | URL completa (HTTP)                            |
| ------ | -------------------------- | ---------------------------------------------- |
| GET    | Obtener todos los cursos   | `http://localhost:3000/cursos`                 |
| POST   | Crear un nuevo curso       | `http://localhost:3000/cursos`                 |
| PUT    | Actualizar un curso por ID | `http://localhost:3000/cursos/123` *(ejemplo)* |
| DELETE | Eliminar un curso por ID   | `http://localhost:3000/cursos/123` *(ejemplo)* |

```
### Seccion Empresas
```Markdown
| Método | Descripción                   | URL completa (HTTP)                                         |
| ------ | ----------------------------- | ----------------------------------------------------------- |
| GET    | Obtener todas las empresas    | `http://localhost:3000/empresas`                            |
| POST   | Crear una nueva empresa       | `http://localhost:3000/empresas`                            |
| PUT    | Actualizar una empresa por ID | `http://localhost:3000/empresas/123` *(con ID 123)* |
| DELETE | Eliminar una empresa por ID   | `http://localhost:3000/empresas/123` *(con ID 123)* |

```
### Seccion Publicaciones
```Markdown
| Método | Descripción                       | URL completa (HTTP)                                              |
| ------ | --------------------------------- | ---------------------------------------------------------------- |
| GET    | Obtener todas las publicaciones   | `http://localhost:3000/publicaciones`                            |
| POST   | Crear una nueva publicación       | `http://localhost:3000/publicaciones`                            |
| PUT    | Actualizar una publicación por ID | `http://localhost:3000/publicaciones/123` *( con ID 123)* |
| DELETE | Eliminar una publicación por ID   | `http://localhost:3000/publicaciones/123` *( con ID 123)* |

```



