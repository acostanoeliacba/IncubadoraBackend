# IncubadoraBackend
Proyecto Xacademy 2025

Para hacer  solicitudes a la api localmente una ves que carguen la base de datos mediante el codigo sql  ,recuerden crear el archivo .env en el proyecto y especificar el usuario contraseña y puerto de esta forma:
  
  DB_HOST=localhost
  DB_USER=
  DB_PASS=
  DB_NAME=NOC
  DB_PORT=3307

 para especificar el puerto que usan si tienen varios bases en sus pc  esta en 3307  pueden cambiarlo a 3306

### rutas:  http://localhost:3000/user/users  que deberia devolver usuarios cargados en sus bases respectivas
 He cambiado la estructura de la base de datos y cambiado el nombre de los campos  ahora ,solo existe la tabla usuarios esta tabla  almacena los datos de los usuarios de la plataforma, recuerden al momento de cargar datos que estos deben tener definida el tipo de usuario entre: *alumno* o *docente* solo esos valores
 el codigo   sql ya tiene incluida la estructura nueva de la tabla que pueden usar para cargar datos desde el formulario de registro o para el login siguiendo estos valores de ejemplo:


```markdown
{
  "nombre": "Lucas",
  "apellido": "Aristoteles",
  "fecha_nacimiento": "01/01/2000",
  "dni": 13456002,
  "direccion":"villa maria 33",
  "telefono":"31155477",
  "email": "LucaAri@gmail.com",
  "password": "youtube24",
  "dni": 12345678,
  "especialidad":"",
  "tipo_usuario": "alumno"
}
```

si es un docente deben incluir su especialidad:"Biologia" etc, y tipo_usuario :"docente" en el back esta contemplado que puede ser un campo vacio deben relizar validaciones para que los datos sean los esperados en el back
