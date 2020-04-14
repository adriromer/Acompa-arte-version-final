#Adrian Romero - Efip 1 Marzo 2020

import sqlite3
import mysql.connector
import json

with open('config.json') as data_file:
    config = json.load(data_file)


conn = sqlite3.connect(config['database'], check_same_thread=False, timeout=10)
print("debug para confirmar la conexion - info DB ", config)
conn.execute('pragma foreign_keys=ON')



def dict_factory(cursor, row):
    """Funcion para formatear el Json cuando saco datos de la base"""

    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
        print("print de las queries a la base convertidas en Json\n", d)
    return d


conn.row_factory = dict_factory

conn.execute('''CREATE TABLE if not exists pacientes 
(pac_id INTEGER PRIMARY KEY AUTOINCREMENT,
pac_nombre TEXT NOT NULL,
pac_apellido TEXT NOT NULL,
pac_dni TEXT NOT NULL,
pac_tel TEXT NOT NULL,
pac_crea_fecha DATE DEFAULT (datetime('now','localtime')),
pac_dir TEXT NOT NULL);''')

conn.execute('''CREATE TABLE if not exists terapistas
(ter_id INTEGER PRIMARY KEY AUTOINCREMENT,
ter_nombre TEXT NOT NULL,
ter_apellido TEXT NOT NULL,
ter_tel TEXT NOT NULL,
ter_cre_fecha DATE DEFAULT (datetime('now','localtime')),
ter_dir TEXT NOT NULL);''')


conn.execute('''CREATE TABLE if not exists turnos
(turno_id INTEGER PRIMARY KEY AUTOINCREMENT,
pac_id INTEGER NOT NULL,
ter_id INTEGER NOT NULL,
turno_fecha DATE NOT NULL,
FOREIGN KEY(pac_id) REFERENCES pacientes(pac_id),
FOREIGN KEY(ter_id) REFERENCES terapistas(ter_id));''')