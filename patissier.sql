
DROP DATABASE IF EXISTS patisseriedb;
CREATE DATABASE patisseriedb;

\c patisseriedb


CREATE TYPE title AS ENUM ('patissier', 'customer');
CREATE TYPE payment AS ENUM ('cash', 'card');
CREATE TYPE status AS ENUM ('unconfirmed', 'refused', 'accepted', 'paid','unpaid', 'delivered', 'cancelled');


CREATE TABLE IF NOT EXISTS "User"(
id SERIAL PRIMARY KEY,
mail TEXT,
password TEXT,
user_title title
);

CREATE TABLE IF NOT EXISTS "Patisserie"(
id SERIAL PRIMARY KEY,
name TEXT,
description TEXT,
allergenes_id JSONB,
price MONEY,
sharings INTEGER,
image_path TEXT
);

CREATE TABLE IF NOT EXISTS "Allergens"(
id SERIAL PRIMARY KEY,
name TEXT
);

CREATE TABLE IF NOT EXISTS "Cart"(
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES "User"(id),
patisserie_id JSONB,
total_price MONEY,
finished BOOLEAN
);

CREATE TABLE IF NOT EXISTS "Orders"(
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES "User"(id),
cart_id INTEGER REFERENCES "Cart"(id),
firstname TEXT,
lastname TEXT,
payment payment,
total_price MONEY,
state status,
shipping_time TEXT
);



