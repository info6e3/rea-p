CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT not null UNIQUE,
	password TEXT not null,
	role TEXT not null,
    name TEXT,
	surname TEXT,
	description TEXT,
	registration_date TEXT,
	birth_date TEXT,
	active BOOLEAN NOT NULL
);

CREATE TABLE activation_links (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	link TEXT NOT NULL
);

CREATE TABLE tokens (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	refresh_token TEXT
);

CREATE TABLE booking (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	flat_id INTEGER NOT NULL,
	day_start DATE  NOT NULL,
	day_end   DATE  NOT NULL,
	accept integer
);

CREATE TABLE flats (
    id SERIAL PRIMARY KEY,
    title TEXT,
	type TEXT,
	address TEXT,
    price INTEGER,
    photos TEXT[],
	description TEXT,
	coordinates REAL[2],
	owner INTEGER,
	active BOOLEAN
);

CREATE OR REPLACE FUNCTION get_nearest_flats(point REAL[2], lim INTEGER) RETURNS TABLE (
    id INTEGER,
    title TEXT,
	type TEXT,
	address TEXT,
    price INTEGER,
    photos TEXT[],
	description TEXT,
	coordinates REAL[2],
	owner INTEGER,
	active BOOLEAN,
	distance double precision
)
AS $$
BEGIN
	RETURN query (SELECT *,
				  CASE
				  	WHEN sqrt(pow(abs(flats.coordinates[1] - point[1]), 2) + pow(abs(flats.coordinates[2] - point[2]), 2)) > 180 THEN 360 - sqrt(pow(abs(flats.coordinates[1] - point[1]), 2) + pow(abs(flats.coordinates[2] - point[2]), 2))
				  	ELSE sqrt(pow(abs(flats.coordinates[1] - point[1]), 2) + pow(abs(flats.coordinates[2] - point[2]), 2))
				  END
				  as distance
				  FROM flats
				  ORDER BY distance
				  LIMIT lim
				 );
END;
$$ LANGUAGE plpgsql;