--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.2
-- Dumped by pg_dump version 9.5.2

-- Started on 2016-05-01 23:07:09 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE strat;
--
-- TOC entry 2192 (class 1262 OID 16394)
-- Name: strat; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE strat WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


\connect strat

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 2193 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 1 (class 3079 OID 12395)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2194 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_with_oids = false;

--
-- TOC entry 182 (class 1259 OID 16739)
-- Name: army; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE army (
    army_uuid uuid NOT NULL,
    size integer DEFAULT 1,
    position_x integer DEFAULT 1 NOT NULL,
    position_y integer DEFAULT 1 NOT NULL,
    player_uuid uuid
);


--
-- TOC entry 183 (class 1259 OID 16753)
-- Name: army_movements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE army_movements (
    army_uuid uuid NOT NULL,
    new_position_x integer NOT NULL,
    new_position_y integer NOT NULL,
    sequence_id integer DEFAULT 0
);


--
-- TOC entry 185 (class 1259 OID 16773)
-- Name: game; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE game (
    game_uuid uuid NOT NULL,
    name character varying(45) NOT NULL,
    map_uuid uuid NOT NULL
);


--
-- TOC entry 181 (class 1259 OID 16728)
-- Name: player; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE player (
    player_uuid uuid NOT NULL,
    user_name character varying(45) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(225) DEFAULT NULL::character varying
);


--
-- TOC entry 186 (class 1259 OID 16786)
-- Name: players_of_game; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE players_of_game (
    game_uuid uuid NOT NULL,
    player_uuid uuid NOT NULL,
    player_alias character varying(45) DEFAULT NULL::character varying
);


--
-- TOC entry 184 (class 1259 OID 16763)
-- Name: strat_map; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE strat_map (
    map_uuid uuid NOT NULL,
    name character varying(45) NOT NULL,
    size_x integer NOT NULL,
    size_y integer NOT NULL,
    altitude_json json NOT NULL
);


--
-- TOC entry 2183 (class 0 OID 16739)
-- Dependencies: 182
-- Data for Name: army; Type: TABLE DATA; Schema: public; Owner: -
--

COPY army (army_uuid, size, position_x, position_y, player_uuid) FROM stdin;
\.


--
-- TOC entry 2184 (class 0 OID 16753)
-- Dependencies: 183
-- Data for Name: army_movements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY army_movements (army_uuid, new_position_x, new_position_y, sequence_id) FROM stdin;
\.


--
-- TOC entry 2186 (class 0 OID 16773)
-- Dependencies: 185
-- Data for Name: game; Type: TABLE DATA; Schema: public; Owner: -
--

COPY game (game_uuid, name, map_uuid) FROM stdin;
\.


--
-- TOC entry 2182 (class 0 OID 16728)
-- Dependencies: 181
-- Data for Name: player; Type: TABLE DATA; Schema: public; Owner: -
--

COPY player (player_uuid, user_name, password, email) FROM stdin;
\.


--
-- TOC entry 2187 (class 0 OID 16786)
-- Dependencies: 186
-- Data for Name: players_of_game; Type: TABLE DATA; Schema: public; Owner: -
--

COPY players_of_game (game_uuid, player_uuid, player_alias) FROM stdin;
\.


--
-- TOC entry 2185 (class 0 OID 16763)
-- Dependencies: 184
-- Data for Name: strat_map; Type: TABLE DATA; Schema: public; Owner: -
--

COPY strat_map (map_uuid, name, size_x, size_y, altitude_json) FROM stdin;
\.


--
-- TOC entry 2050 (class 2606 OID 16746)
-- Name: army_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY army
    ADD CONSTRAINT army_pkey PRIMARY KEY (army_uuid);


--
-- TOC entry 2058 (class 2606 OID 16779)
-- Name: game_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY game
    ADD CONSTRAINT game_name_key UNIQUE (name);


--
-- TOC entry 2060 (class 2606 OID 16777)
-- Name: game_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY game
    ADD CONSTRAINT game_pkey PRIMARY KEY (game_uuid);


--
-- TOC entry 2046 (class 2606 OID 16736)
-- Name: player_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY player
    ADD CONSTRAINT player_pkey PRIMARY KEY (player_uuid);


--
-- TOC entry 2048 (class 2606 OID 16738)
-- Name: player_user_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY player
    ADD CONSTRAINT player_user_name_key UNIQUE (user_name);


--
-- TOC entry 2053 (class 2606 OID 16772)
-- Name: strat_map_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY strat_map
    ADD CONSTRAINT strat_map_name_key UNIQUE (name);


--
-- TOC entry 2055 (class 2606 OID 16770)
-- Name: strat_map_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY strat_map
    ADD CONSTRAINT strat_map_pkey PRIMARY KEY (map_uuid);


--
-- TOC entry 2051 (class 1259 OID 16752)
-- Name: army_player_uuid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX army_player_uuid_idx ON army USING btree (player_uuid);


--
-- TOC entry 2056 (class 1259 OID 16785)
-- Name: fk_armymovements_1_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fk_armymovements_1_idx ON game USING btree (map_uuid);


--
-- TOC entry 2061 (class 1259 OID 16800)
-- Name: fk_playersofgame_1_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fk_playersofgame_1_idx ON players_of_game USING btree (game_uuid);


--
-- TOC entry 2062 (class 1259 OID 16801)
-- Name: fk_playersofgame_2_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fk_playersofgame_2_idx ON players_of_game USING btree (player_uuid);


--
-- TOC entry 2063 (class 2606 OID 16747)
-- Name: fk_army_1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY army
    ADD CONSTRAINT fk_army_1 FOREIGN KEY (player_uuid) REFERENCES player(player_uuid);


--
-- TOC entry 2064 (class 2606 OID 16757)
-- Name: fk_armymovements_1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY army_movements
    ADD CONSTRAINT fk_armymovements_1 FOREIGN KEY (army_uuid) REFERENCES army(army_uuid);


--
-- TOC entry 2065 (class 2606 OID 16780)
-- Name: fk_game_1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY game
    ADD CONSTRAINT fk_game_1 FOREIGN KEY (map_uuid) REFERENCES strat_map(map_uuid);


--
-- TOC entry 2066 (class 2606 OID 16790)
-- Name: fk_playersofgame_1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY players_of_game
    ADD CONSTRAINT fk_playersofgame_1 FOREIGN KEY (game_uuid) REFERENCES game(game_uuid);


--
-- TOC entry 2067 (class 2606 OID 16795)
-- Name: fk_playersofgame_2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY players_of_game
    ADD CONSTRAINT fk_playersofgame_2 FOREIGN KEY (player_uuid) REFERENCES player(player_uuid);


-- Completed on 2016-05-01 23:07:09 CEST

--
-- PostgreSQL database dump complete
--

