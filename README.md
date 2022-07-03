# FlyMan - Servidor backend

FlyMan se trata de una solución para la empresa de car sharing MyKeego en su proceso de mantenimiento de los autos, donde se ofrecerá un webadmin para el administrador y jefe de los operarios que realizan las tareas a los vehículos de la empresa. Dicho administrador podrá asignar reservas de mantenimiento a cada uno de los operarios, para quienes además se desarrolló una aplicación móvil. En esta aplicación, los operarios podrán visualizar el total de servicios que deben realizar durante su jornada laboral, su órden y los detalles de cada uno, así como también
información de los vehículos. Además podrán abrir y cerrar los autos desde la misma app y generar reportes del servicio realizado informando posibles daños.

Este servidor se consume desde el proyecto: [FlyMan](https://github.com/FlyMan-ORT/flyMan_back.git)


## Prerequisitos
- [Git](https://git-scm.com/downloads)
- [Node.js y npm](https://nodejs.org/en/download/)


## Instalación paso a paso
1) Abrir una terminal y ejecutar el comando “git clone” para clonar el repositorio en el
entorno local: 
```git clone https://github.com/FlyMan-ORT/flyMan_back.git```
2) En la misma terminal, ingresar mediante el comando “cd” a la carpeta creada al clonar el repositorio. 
Ejemplo: ```cd C:\Users\desktop\flyMan_back```
3) En la misma terminal, ejecutar el comando “npm install” para instalar todas las
dependencias y paquetes necesarios para el correcto funcionamiento: 
```npm install```
4) Ingresar a la IDE de desarrollo, abrir el repositorio clonado previamente y en la
carpeta principal crear un archivo sin nombre con la extensión .env para poner ahí
dentro las variables de entorno necesarias. Solicitar dichas variables al equipo de
desarrollo ya que no pueden ser de dominio público.
.env example:
```MONGODB=```
```SECRET_KEY=```
5) Finalmente para ejecutar el software, abrir una terminal en la IDE de desarrollo e
ingresar el comando "npm run dev" para iniciar el servidor de manera local en modo desarrollo:
```npm run dev```


## Listados de endpoints

### Manejo de vehículos
| Method | Endpoint            | Authorization |             Body              | Params | Query |               Response                |
| :----: | ------------------- | :-----------: | :---------------------------: | :----: | :---: | :-----------------------------------: |
|  GET   | /cars               | Bearer [token]|              ❌               |   ❌    |   ❌   | `[car, ...]` |
|  POST  | /cars/open/:plate   | Bearer [token]|              ❌               |`car plate`|   ❌   | `[Boolean]`|
|  POST  | /cars/close/:plate  | Bearer [token]|              ❌               |`car plate`|   ❌   | `[Boolean]` |

### Manejo de reservas
```js
reservation: {
    _id: ObjectId,
    status: String,
    startTime: Date,
    endTime: date,
    startParkingName: String,
    billingStatus: String,
    fuelStart: Double,
    endFuel: Double,
    car: Car,
    user: User,
    createdAt: Date,
    bookingType: String
}
```
| Method | Endpoint          | Authorization  |    Body    |  Params   | Query |       Response      |
| :----: | ------------------| :------------: | :--------: | :-------: | :---: | :-----------------: |
|  GET   | /reservations     | Bearer [token] |     ❌     |     ❌   |  ❌   | `[reservation, ...]`|
|  GET   | /reservations/app | Bearer [token] |     ❌     |     ❌   |  ❌   |    `reservation`    |
|  POST  | /reservations     | Bearer [token] |```{plate, mail, day, time}```|   ❌   |  ❌   |   `{reservation id}`  |
| DELETE | /reservations/:id | Bearer [token] |     ❌     | `reservation id` |  ❌   |      `[Boolean]`    |


### Manejo de servicios
```js
service:{
    _id: ObjectId,
    plate: String,
    reservationId: ObjectId,
    userEmail: String,
    startDate: Date,
    cleanliness: Integer,
    damage: { isDamaged: Boolean, damageDescription: String },
    documents: Boolean,
    endDate: Date,
    fuel: { fuelLoad: Boolean, fuelPrice: Double },
    securityKit: Boolean,
    tasks: { cleanTask: Boolean, inflateTireTask: Boolean, lampFixTask: Boolean },
    tires: Boolean,
    carImage: String
}
```
| Method |                     Endpoint                      | Authorization  |   Body    |    Params     | Query |     Response      |
| :----: | ------------------------------------------------- | :------------: | :-------: | :-----------: | :---: | :---------------: |
|  GET   | /services                                         | Bearer [token] |    ❌    |       ❌       | `ended` | `[service, ...]` |
|  GET   | /services/plate/:plate/reservation/:reservationId | Bearer [token] |    ❌    | `car plate, reservation id` |   ❌   | `service` |
|  POST  | /services                                         | Bearer [token] |```{plate, reservationId, carImage}```|      ❌   |  ❌   |   `{service id}`  |
| PATCH  | /services/:id                                     | Bearer [token] |```{tasks: { cleanTask, inflateTireTask, lampFixTask }, damage: { isDamaged, damageDescription }, tires, securityKit, documents, cleanliness, fuel: { fuelLoad, fuelPrice }}```| `service id` |  ❌   |      `[Boolean]`    |


### Manejo de usuarios
```js
user: {
    _id: ObjectId,
    name: String,
    email: String,
    password: String,
    phone: String,
    pin: String,
    admin: Boolean,
    deletedAt: Date
}

```
| Method | Endpoint         | Authorization  |    Body    |  Params   | Query |       Response      |
| :----: | -----------------| :------------: | :--------: | :-------: | :---: | :-----------------: |
|  GET   | /users           | Bearer [token] |     ❌     |     ❌   |  ❌   | `[user, ...]`|
|  POST  | /users/login     |       ❌      | ```{email, password}```|   ❌   |  ❌   |   `{token}`  |
|  POST  | /users/web/login |       ❌      | ```{email, password}```|   ❌   |  ❌   |   `{token}`  |
|  POST  | /users/register  | Bearer [token] | ```{name, email, password, phone, pin, admin}```|   ❌   |  ❌   |   `{token}`  |
| PATCH  | /users/:id       | Bearer [token] |```{name, email, password, phone, pin, admin}```| `user id` |  ❌   |      `[Boolean]`    |
| DELETE | /users/:id       | Bearer [token] |     ❌     | `user id` |  ❌   |      `[Boolean]`    |
|  POST  | /users/pin      | Bearer [token] |```{pin}```|   ❌   |  ❌   |   `{pin}`  |



## Dependencias principales
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) para la creación de tokens de acceso.
- [react-moment](https://github.com/headzoo/react-moment#readme) para el manejo de fechas.
- [node.bcrypt.js](https://github.com/kelektiv/node.bcrypt.js#readme) para el hasheado de contraseñas.
- [node-mongodb-native](https://github.com/mongodb/node-mongodb-native#readme) para la conexión con la base de datos de Mongo.
- [js-bson](https://github.com/mongodb/js-bson#readme) para serealizar documentos JSON.
- [express](https://github.com/expressjs/express#readme) entorno de trabajo para estructurar la API.