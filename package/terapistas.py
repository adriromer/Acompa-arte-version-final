#Adrian Romero - Efip 1 Marzo 2020

from flask_restful import Resource, Api, request
from package.modelo_db import conn
class Terapistas(Resource):
    """Apis del objeto Doctor/Terapista"""

    def get(self):
        """Obtiene una lista de todos los terapistas"""

        doctors = conn.execute("SELECT * FROM terapistas ORDER BY ter_cre_fecha DESC").fetchall()
        return doctors



    def post(self):
        """Agregar un nuevo Doctor"""

        doctorInput = request.get_json(force=True)
        ter_nombre=doctorInput['ter_nombre']
        ter_apellido = doctorInput['ter_apellido']
        ter_tel = doctorInput['ter_tel']
        ter_dir = doctorInput['ter_dir']
        doctorInput['ter_id']=conn.execute('''INSERT INTO terapistas(ter_nombre,ter_apellido,ter_tel,ter_dir)
            VALUES(?,?,?,?)''', (ter_nombre, ter_apellido,ter_tel,ter_dir)).lastrowid
        conn.commit()
        return doctorInput

class Terapista(Resource):
    """Incluye todas las apis que llevan la actividad de un solo terapista"""


    def get(self,id):
        """Obtiene los datos de un terapista por su ID"""

        doctor = conn.execute("SELECT * FROM terapistas WHERE ter_id=?",(id,)).fetchall()
        return doctor

    def delete(self, id):
        """Borra un terapista por ID"""

        conn.execute("DELETE FROM terapistas WHERE ter_id=?", (id,))
        conn.commit()
        return {'msg': 'sucessfully deleted'}

    def put(self,id):
        """Actualiza un terapista por su ID"""

        doctorInput = request.get_json(force=True)
        ter_nombre=doctorInput['ter_nombre']
        ter_apellido = doctorInput['ter_apellido']
        ter_tel = doctorInput['ter_tel']
        ter_dir = doctorInput['ter_dir']
        conn.execute(
            "UPDATE terapistas SET ter_nombre=?,ter_apellido=?,ter_tel=?,ter_dir=? WHERE ter_id=?",
            (ter_nombre, ter_apellido, ter_tel, ter_dir, id))
        conn.commit()
        return doctorInput