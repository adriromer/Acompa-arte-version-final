#Adrian Romero - Efip 1 Marzo 2020

from flask_restful import Resource, Api, request
from package.modelo_db import conn



class Turnos(Resource):
    """Apis de actividades de turnos"""

    def get(self):
        """trae todos los turnos en forma de Json"""

        appointment = conn.execute("SELECT p.*,d.*,a.* from turnos a LEFT JOIN pacientes p ON a.pac_id = p.pac_id LEFT JOIN terapistas d ON a.ter_id = d.ter_id ORDER BY turno_fecha DESC").fetchall()
        return appointment

    def post(self):
        """crea un turno asociando paciente y terapista con fecha de turno"""

        appointment = request.get_json(force=True)
        pac_id = appointment['pac_id']
        ter_id = appointment['ter_id']
        turno_fecha = appointment['turno_fecha']
        appointment['turno_id'] = conn.execute('''INSERT INTO turnos(pac_id,ter_id,turno_fecha)
            VALUES(?,?,?)''', (pac_id, ter_id,turno_fecha)).lastrowid
        conn.commit()
        return appointment



class Turno(Resource):
    """Api que contiene toda la actividad con un turno unico"""

    def get(self,id):
        """Obtiene un detalles de un turno por su ID"""

        appointment = conn.execute("SELECT * FROM turnos WHERE turno_id=?",(id,)).fetchall()
        return appointment


    def delete(self,id):
        """Borra turno por ID"""

        conn.execute("DELETE FROM turnos WHERE turno_id=?",(id,))
        conn.commit()
        return {'msg': 'sucessfully deleted'}

    def put(self,id):
        """Actualiza un turno por ID"""

        appointment = request.get_json(force=True)
        pac_id = appointment['pac_id']
        ter_id = appointment['ter_id']
        conn.execute("UPDATE turnos SET pac_id=?,ter_id=? WHERE turno_id=?",
                     (pac_id, ter_id, id))
        conn.commit()
        return appointment