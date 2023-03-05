//functions
DROP FUNCTION get_nearest_flats(real[], integer)

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

SELECT * FROM get_nearest_flats('{5, 5}', 2)

//db
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
)


SELECT * FROM flats

  cdVALUES ('Университет',
		4282,
		'{https://avatars.mds.yandex.net/get-altay/903198/2a0000016147284f8402b1d58b5cb7f857d5/XXL,https://naukograd-dubna.ru/files/image/34/87/88/lg!itp.jpg}',
	   'Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.',
		'{56.74005, 37.22491}',
		1,
		TRUE
	   )

INSERT INTO users (username, password)
VALUES ()

DROP table users

SELECT * FROM users

UPDATE users SET roles = '{USER, ADMIN}'
WHERE id = 2

SELECT id FROM users WHERE username = user

INSERT INTO users (username, password)
   VALUES ('user', 'password')

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
)
DROP TABLE tokens
SELECT * FROM tokens

CREATE TABLE tokens (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	refresh_token TEXT
)
DROP table activationLinks
SELECT * FROM activationLinks
CREATE TABLE activationLinks (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	link TEXT NOT NULL
)

CREATE TABLE booking (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	flat_id INTEGER NOT NULL,
	day_start DATE  NOT NULL,
	day_end   DATE  NOT NULL,
	accept integer
)

SELECT * FROM booking
drop table booking

INSERT INTO booking (user_id, flat_id, day_start, day_end)
VALUES()

select * from users

select * from activationlinks

delete from users where id = 9

UPDATE users SET active = FALSE WHERE id = 7

//
CREATE TABLE booking (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	flat_id INTEGER NOT NULL,
	day_start DATE  NOT NULL,
	day_end   DATE  NOT NULL,
	accept BOOLEAN
)

SELECT * FROM booking
drop table booking

INSERT INTO booking (user_id, flat_id, day_start, day_end)
VALUES()

select * from users

select * from activation_links
drop table activation_links

CREATE TABLE activation_links (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	link TEXT NOT NULL
)

delete from users where id = 18

UPDATE users SET active = FALSE WHERE id = 7

//
CREATE TABLE booking (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	flat_id INTEGER NOT NULL,
	day_start DATE  NOT NULL,
	day_end   DATE  NOT NULL,
	accept integer
)

 ALTER TABLE booking ALTER COLUMN accept TYPE integer

SELECT * FROM booking
drop table booking

INSERT INTO booking (user_id, flat_id, day_start, day_end)
VALUES()

update booking set accept = 2

select * from users


UPDATE users set roles = '{OWNER, ADMIN}' where id=19

select * from activation_links
drop table activation_links

CREATE TABLE tokens (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	refresh_token TEXT
)
select * from tokens
drop table tokens

CREATE TABLE activation_links (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	link TEXT NOT NULL
)

delete from users where id = 18

UPDATE users SET active = FALSE WHERE id = 7

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
)

select * from flats

drop table users