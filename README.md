# FCT APP
## 1. Introducción
Aplicación que sirve para poder llevar un control sobre las empresas que contratan a los alumnos en las prácticas (frontend hecho en ionic/react, backend hecho en spring boot y la base de datos MySQL y Firebase). Permite iniciar sesión con Google. Todos los profesores puede ver las empresas agregadas a la lista de empresas. Los acuerdos con las empresas serán por usuario (a no ser que el usuario sea admin). Las visitas serán también por usuario (a no ser que el usuario sea admin). Se puede agregar al perfil un vehículo y una matrícula en caso de que el profesor tenga. Se puede cerrar sesión para volver a iniciar sesión con google.
## 2. Especificación de requisitos
- **Inicio de sesión** (Autenticación con Google).

<img src="documents/images/inicioSesion.PNG" alt="Inicio de sesión" width="700" style="border: 1px solid black">

- **Listado de empresas** con filtro para poder buscar el nombre de la empresa que queramos encontrar.

<img src="documents/images/listadoEmpresas.PNG" alt="Listado de empresas" width="700" style="border: 1px solid black">

- **Añadido de empresas** (botón para añadir) con filtro para añadir automaticamente la empresa de internet sin tener que escribir los datos.

<img src="documents/images/a%C3%B1adidoEmpresas.PNG" alt="Añadido de empresas" width="700" style="border: 1px solid black">

- **Eliminación de empresas** (hay que deslizar la empresa hacia la izquierda).

<img src="documents/images/eliminacionEmpresasYA%C3%B1adidoAcuerdos.PNG" alt="Eliminación de empresas" width="700" style="border: 1px solid black">

- **Listado de acuerdos** (por usuario) con filtro para poder buscar el nombre de la empresa que queramos encontrar.

<img src="documents/images/listadoAcuerdos.PNG" alt="Listado de acuerdos" width="700" style="border: 1px solid black">

- **Añadido de acuerdos** (deslizar la empresa hacia la izquierda). Hay que añadir el alumno que vaya a ir a esa empresa, su fecha de inicio y de fin.

<img src="documents/images/eliminacionEmpresasYA%C3%B1adidoAcuerdos.PNG" alt="Añadido de acuerdos" width="700" style="border: 1px solid black">

- **Eliminación de acuerdos** (hay que deslizar el acuerdo hacia la izquierda).

<img src="documents/images/eliminacionAcuerdosYA%C3%B1adidoVisitas.PNG" alt="Eliminación de acuerdos" width="700" style="border: 1px solid black">

- **Listado de visitas** (por usuario) con filtro para poder buscar el nombre de la empresa que queramos encontrar. También se pueden mostrar por autorizadas o no autorizadas.

<img src="documents/images/listadoVisitas.PNG" alt="Listado de visitas" width="700" style="border: 1px solid black">

- **Añadido de visitas** (deslizar el acuerdo hacia la izquierda). Aquí añades cosas como el método de transporte, el tiempo que dura la visita, etc.

<img src="documents/images/eliminacionAcuerdosYA%C3%B1adidoVisitas.PNG" alt="Añadido de visitas" width="700" style="border: 1px solid black">

- **Eliminación de visitas** (hay que deslizar la visita hacia la izquierda).

<img src="documents/images/eliminacionVisitas.PNG" alt="Eliminación de visitas" width="700" style="border: 1px solid black">

- **Autorización de la visita** (solo un usuario administrador puede autorizar una visita).

- **Añadido de vehículo propio**. Hay que añadir el modelo del vehículo y su matrícula.

<img src="documents/images/a%C3%B1adidoVehiculo.PNG" alt="Añadido de vehículo propio" width="700" style="border: 1px solid black">

- **Cierre de sesión**.

<img src="documents/images/cerrarSesion.PNG" alt="Cierre de sesión" style="border: 1px solid black">

## 2.1 Futuras implementaciones
- Ver las empresas en google map (hay que deslizar la visita hacia la izquierda).
- Autenticación con Google en Spring Boot.
## 3. Diseño
### Diagrama de arquitectura

<img src="documents/images/Diagrama%20de%20arquitectura.png" alt="Diagrama de arquitectura" width="700" style="border: 1px solid black">

### Diagrama de clases

<img src="documents/images/Diagrama%20de%20clases.png" alt="Diagrama de casos de uso" width="700" style="border: 1px solid black">

### Diagrama entidad relación

<img src="documents/images/Diagrama%20entidad%20relacion.png" alt="Diagrama entidad relación" width="1000" style="border: 1px solid black">

### Diagrama de casos de uso

<img src="documents/images/Diagrama%20de%20casos%20de%20uso.png" alt="Diagrama de casos de uso" width="700" style="border: 1px solid black">

## 4. Puesta en producción o despliegue
- Tener instalado MySQL y crear una base de datos
- Tener instalado node.js
- Tener una base de datos creada en firebase y poner la configuración en un archivo .env.local
- Cambiar todos los datos necesarios en el fichero application.properties (dentro de resources)
- Instalar todas las dependencias necesarias (npm install react-scrpits)
- Iniciar el frontend con "npm start"
- Iniciar el backend con la extensión de spring de vscode (recomendado) o con "mvn compile" y "mvn spring-boot:run"