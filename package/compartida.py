#Adrian Romero - Efip 1 Marzo 2020

from flask_restful import Resource, Api, request
from package.modelo_db import conn


class Compartida(Resource):
    """Api comun para resolver datos"""

    def get(self):
        """Obtiene numero de pacientes activos, numero de terapistas y turnos del mes para el dashboard principal """

        getPatientCount=conn.execute("SELECT COUNT(*) AS patient FROM pacientes").fetchone()
        getDoctorCount = conn.execute("SELECT COUNT(*) AS doctor FROM terapistas").fetchone()
        getAppointmentCount = conn.execute("SELECT COUNT(*) AS appointment FROM turnos").fetchone()
        getPatientCount.update(getDoctorCount)
        getPatientCount.update(getAppointmentCount)
        return getPatientCount