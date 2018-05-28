
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

INSERT INTO users (gid, username, first_name, middle_name, last_name, email, role, password, phone, gender, created_at, updated_at) VALUES (1, 'admin', 'Admin', '', 'Admin', 'ctedtechnical@gmail.com', 'admin', '$2a$10$yrJyoLcnagL.8d6nFjW3CO0UE5b0ZUgRL0WWBs9U0Ufxe1noZT62y', '934206367', 'F', '2018-05-15 20:30:59.694+04', '2018-05-15 20:30:59.694+04');
INSERT INTO users (gid, username, first_name, middle_name, last_name, email, role, password, phone, gender, created_at, updated_at) VALUES (2, 'afshan', 'Afshan', '', 'Aman', 'afshan.aman@gmail.com', 'viewer', '$2a$10$yrJyoLcnagL.8d6nFjW3CO0UE5b0ZUgRL0WWBs9U0Ufxe1noZT62y', '934206367', 'F', '2018-05-15 20:30:59.694+04', '2018-05-15 20:30:59.694+04');





SELECT pg_catalog.setval('users_gid_seq', 10, true);






SELECT pg_catalog.setval('sessions_gid_seq', 200, true);