
DROP DATABASE IF EXISTS newDB;
CREATE DATABASE newDB;

\c newdb


CREATE TYPE role AS ENUM ('patissier', 'client');
CREATE TYPE payment AS ENUM ('cash', 'card');
CREATE TYPE status AS ENUM ('attente', 'refuser', 'accepte', 'payer','payement_refuse');


CREATE TABLE IF NOT EXISTS "User"(
id SERIAL PRIMARY KEY,
mail TEXT,
password TEXT,
role_c role
)
;

CREATE TABLE IF NOT EXISTS "Commandes"(
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES "User" (id),
firstname TEXT,
lastname TEXT,
payment payment,
total_price MONEY,
state status,
shipping_time TEXT
)
;

CREATE TABLE IF NOT EXISTS "Allergenes"(
id SERIAL PRIMARY KEY,
name VARCHAR(50)
)
;


