CREATE DATABASE io;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS residents (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  phone VARCHAR,
  apartment VARCHAR NOT NULL,
  building VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS types (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  description VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS vehicles (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  plate VARCHAR NOT NULL,
  type_id UUID,
  resident_id UUID,
  FOREIGN KEY(resident_id) REFERENCES residents(id),
  FOREIGN KEY(type_id) REFERENCES types(id)
);
