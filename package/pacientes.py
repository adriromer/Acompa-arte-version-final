#Adrian Romero - Efip 1 Marzo 2020


from flask_restful import Resource, Api, request
from package.modelo_db import conn




class Pacientes(Resource):

    """ Clase que contiene de los pacientes """

    def get(self):
        """Api que obtiene todos los pacientes de la base"""

        patients = conn.execute("SELECT * FROM pacientes  ORDER BY pac_crea_fecha DESC").fetchall()
        return patients



    def post(self):
        """Api para agregar un paciente a la base"""

        patientInput = request.get_json(force=True)
        pac_nombre=patientInput['pac_nombre']
        pac_apellido = patientInput['pac_apellido']
        pac_dni = patientInput['pac_dni']
        pac_tel = patientInput['pac_tel']
        pac_dir = patientInput['pac_dir']
        patientInput['pac_id']=conn.execute('''INSERT INTO pacientes(pac_nombre,pac_apellido,pac_dni,pac_tel,pac_dir)
            VALUES(?,?,?,?,?)''', (pac_nombre, pac_apellido, pac_dni, pac_tel, pac_dir)).lastrowid
        conn.commit()
        return patientInput

class Paciente(Resource):
    """Contiene todas las apis que ejecutan actividades con un solo paciente"""

    def get(self,id):
        """api que obtiene todos los detalles de un paciente por ID"""

        patient = conn.execute("SELECT * FROM pacientes WHERE pac_id=?", (id,)).fetchall()
        return patient

    def delete(self,id):
        """Api que borra un paciente por su ID"""

        conn.execute("DELETE FROM pacientes WHERE pac_id=?", (id,))
        conn.commit()
        return {'msg': 'sucessfully deleted'}

    def put(self,id):
        """Api que actualiza un paciente por su id"""

        patientInput = request.get_json(force=True)
        pac_nombre = patientInput['pac_nombre']
        pac_apellido = patientInput['pac_apellido']
        pac_dni = patientInput['pac_dni']
        pac_tel = patientInput['pac_tel']
        pac_dir = patientInput['pac_dir']
        conn.execute(
            "UPDATE pacientes SET pac_nombre=?,pac_apellido=?,pac_dni=?,pac_tel=?,pac_dir=? WHERE pac_id=?",
            (pac_nombre, pac_apellido, pac_dni,pac_tel,pac_dir,id))
        conn.commit()
        return patientInput