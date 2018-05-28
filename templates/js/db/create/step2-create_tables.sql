
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1841 (class 1247 OID 24293)
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE user_role AS ENUM (
    'admin',
    'viewer',
    'enumerator'
);
ALTER TYPE user_role OWNER TO postgres;

CREATE SEQUENCE users_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE users (
    gid integer DEFAULT nextval('users_gid_seq'::regclass) NOT NULL,
    username text NOT NULL,
    first_name text,
    middle_name text,
    last_name text,
    email text,
    phone text,
    gender text,
    role user_role,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE users OWNER TO postgres;
ALTER TABLE users_gid_seq OWNER TO postgres;
ALTER TABLE ONLY users ALTER COLUMN gid SET DEFAULT nextval('users_gid_seq'::regclass);
ALTER TABLE ONLY users ADD CONSTRAINT users_pkey PRIMARY KEY (gid);
ALTER TABLE ONLY users ADD CONSTRAINT users_username_key UNIQUE (username);


CREATE SEQUENCE sessions_gid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE sessions (
    gid integer NOT NULL,
    session_name text NOT NULL,
    country text,
    sample_count integer,
    perimeter real,
    session_date date,
    created_at timestamp with time zone
);

ALTER TABLE sessions OWNER TO postgres;
ALTER TABLE sessions_gid_seq OWNER TO postgres;
ALTER SEQUENCE sessions_gid_seq OWNED BY sessions.gid;
ALTER TABLE ONLY sessions ALTER COLUMN gid SET DEFAULT nextval('sessions_gid_seq'::regclass);
ALTER TABLE ONLY sessions ADD CONSTRAINT sessions_pkey PRIMARY KEY (gid);



