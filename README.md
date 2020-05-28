# Sistema de Turnos para Centro de terapias Acompa-Arte

Systema desarrollado en Python:
 - FrameWork Flask
 - DB SQLite
 - librerias de sqlalchemy para mappeo de objetos relacionales
 - Front End con HTTML/CSS, JS, Angle - Bootstrap Admin App + jQuery

## Ejecucion

Intruciones

```sh
python app.py
```

## Configuracion

json para conectar la DB (puede usarse la local dentro con el dump del proyecto o conectar una base externa)

```
{
  "database": "database.db",
  "port": 5000,
  "host": "127.0.0.1"
}
```
## documentation

Apis pueden ser accedidas desde Postman importando el archivo Acompa-arte.postman_collections.json o desde linea de comando con los siguientes curls:

GET Obtener pacientes
curl --location --request GET 'http://127.0.0.1:5000/paciente'

POST agregarPacientes
curl --location --request POST 'http://127.0.0.1:5000/paciente' \
--header 'Content-Type: application/json' \
--data-raw '{
  "pac_nombre": "Pepe",
  "pac_apellido": "Argento",
  "pac_dni": "29285935",
  "pac_tel": "2178013290",
  "pac_dir": "las flores 123"
}'

PUT ActualizarPacientes
curl --location --request PUT 'http://127.0.0.1:5000/paciente/2' \
--header 'Content-Type: application/json' \
--data-raw '{
  "pac_nombre": "Pepe",
  "pac_apellido": "Argento",
  "pac_dni": "11111111111",
  "pac_tel": "11111111",
  "pac_dir": "Nueva Direccion"
}'

DEL BorrarPaciente
curl --location --request DELETE 'http://127.0.0.1:5000/patient/1'

GET ObtenerTerapista
curl --location --request GET 'http://127.0.0.1:5000/terapista'


POST addDoctor
curl --location --request POST 'http://127.0.0.1:5000/terapista' \
--header 'Content-Type: application/json' \
--data-raw '{
  "ter_nombre": "Gabriel",
  "ter_apellido": "Rolon",
  "ter_tel": "9967544572",
  "ter_dir": "Calle 42 2929"
}'

PUT ActualizarTerapista
curl --location --request PUT 'http://127.0.0.1:5000/terapista/1' \
--header 'Content-Type: application/json' \
--data-raw '{
  "ter_nombre": "Gabriel",
  "ter_apellido": "Rolon",
  "ter_tel": "111111",
  "ter_dir": "nueva direccion"
}'


DEL BorrarTerapista
curl --location --request DELETE 'http://127.0.0.1:5000/terapista/1'

GET ObtenerPacientePorID
curl --location --request GET 'http://127.0.0.1:5000/paciente/2'

GET ObtenerTerapistaPorID
curl --location --request GET 'http://127.0.0.1:5000/terapista/2'

POST agregarTurno
curl --location --request POST 'http://127.0.0.1:5000/turno' \
--header 'Content-Type: application/json' \
--data-raw '{
  "ter_id": 1,
  "pac_id": 1,
  "turno_fecha":"2007-01-01 10:00:00"
}'

GET ObtenerTurno
curl --location --request GET 'http://127.0.0.1:5000/turno'

PUT updateAppoinetment
curl --location --request PUT 'http://127.0.0.1:5000/turno/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "ter_id":1,
    "pac_id": 2
    
}'

GET ObtenerTurnoPorID
curl --location --request GET 'http://127.0.0.1:5000/turno/1'


DEL BorrarTurno
curl --location --request DELETE 'http://127.0.0.1:5000/turno/1'




## Contribuciones

Quien quiera contribuir envie un pull request, gracias! ;)

