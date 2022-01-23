--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0 (Debian 14.0-1.pgdg110+1)
-- Dumped by pg_dump version 14.0 (Debian 14.0-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pg_cron; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA public;


--
-- Name: EXTENSION pg_cron; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_cron IS 'Job scheduler for PostgreSQL';


--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA topology;


ALTER SCHEMA topology OWNER TO postgres;

--
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: pgrouting; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgrouting WITH SCHEMA public;


--
-- Name: EXTENSION pgrouting; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgrouting IS 'pgRouting Extension';


--
-- Name: postgis_raster; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_raster WITH SCHEMA public;


--
-- Name: EXTENSION postgis_raster; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_raster IS 'PostGIS raster types and functions';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


--
-- Name: asbinary(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.asbinary(public.geometry) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_asBinary';


ALTER FUNCTION public.asbinary(public.geometry) OWNER TO postgres;

--
-- Name: asbinary(public.geometry, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.asbinary(public.geometry, text) RETURNS bytea
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_asBinary';


ALTER FUNCTION public.asbinary(public.geometry, text) OWNER TO postgres;

--
-- Name: astext(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.astext(public.geometry) RETURNS text
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_asText';


ALTER FUNCTION public.astext(public.geometry) OWNER TO postgres;

--
-- Name: estimated_extent(text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.estimated_extent(text, text) RETURNS public.box2d
    LANGUAGE c IMMUTABLE STRICT SECURITY DEFINER
    AS '$libdir/postgis-3', 'geometry_estimated_extent';


ALTER FUNCTION public.estimated_extent(text, text) OWNER TO postgres;

--
-- Name: estimated_extent(text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.estimated_extent(text, text, text) RETURNS public.box2d
    LANGUAGE c IMMUTABLE STRICT SECURITY DEFINER
    AS '$libdir/postgis-3', 'geometry_estimated_extent';


ALTER FUNCTION public.estimated_extent(text, text, text) OWNER TO postgres;

--
-- Name: geomfromtext(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geomfromtext(text) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_GeomFromText($1)$_$;


ALTER FUNCTION public.geomfromtext(text) OWNER TO postgres;

--
-- Name: geomfromtext(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.geomfromtext(text, integer) RETURNS public.geometry
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$SELECT ST_GeomFromText($1, $2)$_$;


ALTER FUNCTION public.geomfromtext(text, integer) OWNER TO postgres;

--
-- Name: ndims(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.ndims(public.geometry) RETURNS smallint
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_ndims';


ALTER FUNCTION public.ndims(public.geometry) OWNER TO postgres;

--
-- Name: setsrid(public.geometry, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.setsrid(public.geometry, integer) RETURNS public.geometry
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_set_srid';


ALTER FUNCTION public.setsrid(public.geometry, integer) OWNER TO postgres;

--
-- Name: srid(public.geometry); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.srid(public.geometry) RETURNS integer
    LANGUAGE c IMMUTABLE STRICT
    AS '$libdir/postgis-3', 'LWGEOM_get_srid';


ALTER FUNCTION public.srid(public.geometry) OWNER TO postgres;

--
-- Name: st_asbinary(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_asbinary(text) RETURNS bytea
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$ SELECT ST_AsBinary($1::geometry);$_$;


ALTER FUNCTION public.st_asbinary(text) OWNER TO postgres;

--
-- Name: st_astext(bytea); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.st_astext(bytea) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$ SELECT ST_AsText($1::geometry);$_$;


ALTER FUNCTION public.st_astext(bytea) OWNER TO postgres;

--
-- Name: gist_geometry_ops; Type: OPERATOR FAMILY; Schema: public; Owner: postgres
--

CREATE OPERATOR FAMILY public.gist_geometry_ops USING gist;
ALTER OPERATOR FAMILY public.gist_geometry_ops USING gist ADD
    OPERATOR 1 public.<<(public.geometry,public.geometry) ,
    OPERATOR 2 public.&<(public.geometry,public.geometry) ,
    OPERATOR 3 public.&&(public.geometry,public.geometry) ,
    OPERATOR 4 public.&>(public.geometry,public.geometry) ,
    OPERATOR 5 public.>>(public.geometry,public.geometry) ,
    OPERATOR 6 public.~=(public.geometry,public.geometry) ,
    OPERATOR 7 public.~(public.geometry,public.geometry) ,
    OPERATOR 8 public.@(public.geometry,public.geometry) ,
    OPERATOR 9 public.&<|(public.geometry,public.geometry) ,
    OPERATOR 10 public.<<|(public.geometry,public.geometry) ,
    OPERATOR 11 public.|>>(public.geometry,public.geometry) ,
    OPERATOR 12 public.|&>(public.geometry,public.geometry) ,
    OPERATOR 13 public.<->(public.geometry,public.geometry) FOR ORDER BY pg_catalog.float_ops ,
    OPERATOR 14 public.<#>(public.geometry,public.geometry) FOR ORDER BY pg_catalog.float_ops ,
    FUNCTION 3 (public.geometry, public.geometry) public.geometry_gist_compress_2d(internal) ,
    FUNCTION 4 (public.geometry, public.geometry) public.geometry_gist_decompress_2d(internal) ,
    FUNCTION 8 (public.geometry, public.geometry) public.geometry_gist_distance_2d(internal,public.geometry,integer);


ALTER OPERATOR FAMILY public.gist_geometry_ops USING gist OWNER TO postgres;

--
-- Name: gist_geometry_ops; Type: OPERATOR CLASS; Schema: public; Owner: postgres
--

CREATE OPERATOR CLASS public.gist_geometry_ops
    FOR TYPE public.geometry USING gist FAMILY public.gist_geometry_ops AS
    STORAGE public.box2df ,
    FUNCTION 1 (public.geometry, public.geometry) public.geometry_gist_consistent_2d(internal,public.geometry,integer) ,
    FUNCTION 2 (public.geometry, public.geometry) public.geometry_gist_union_2d(bytea,internal) ,
    FUNCTION 5 (public.geometry, public.geometry) public.geometry_gist_penalty_2d(internal,internal,internal) ,
    FUNCTION 6 (public.geometry, public.geometry) public.geometry_gist_picksplit_2d(internal,internal) ,
    FUNCTION 7 (public.geometry, public.geometry) public.geometry_gist_same_2d(public.geometry,public.geometry,internal);


ALTER OPERATOR CLASS public.gist_geometry_ops USING gist OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account_firma; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.account_firma (
    id bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.account_firma OWNER TO lko;

--
-- Name: account_firma_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.account_firma_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_firma_id_seq OWNER TO lko;

--
-- Name: account_firma_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.account_firma_id_seq OWNED BY public.account_firma.id;


--
-- Name: account_user; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.account_user (
    id bigint NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    email character varying(254) NOT NULL,
    is_moderator boolean NOT NULL,
    image character varying(100),
    is_firma boolean NOT NULL
);


ALTER TABLE public.account_user OWNER TO lko;

--
-- Name: account_user_groups; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.account_user_groups (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.account_user_groups OWNER TO lko;

--
-- Name: account_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.account_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_user_groups_id_seq OWNER TO lko;

--
-- Name: account_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.account_user_groups_id_seq OWNED BY public.account_user_groups.id;


--
-- Name: account_user_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.account_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_user_id_seq OWNER TO lko;

--
-- Name: account_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.account_user_id_seq OWNED BY public.account_user.id;


--
-- Name: account_user_user_permissions; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.account_user_user_permissions (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.account_user_user_permissions OWNER TO lko;

--
-- Name: account_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.account_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_user_user_permissions_id_seq OWNER TO lko;

--
-- Name: account_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.account_user_user_permissions_id_seq OWNED BY public.account_user_user_permissions.id;


--
-- Name: account_useradmin; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.account_useradmin (
    user_ptr_id bigint NOT NULL
);


ALTER TABLE public.account_useradmin OWNER TO lko;

--
-- Name: announcement_announcement; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.announcement_announcement (
    id bigint NOT NULL,
    title character varying(200) NOT NULL,
    description text NOT NULL,
    slug character varying(50) NOT NULL,
    date timestamp with time zone NOT NULL,
    user_id bigint NOT NULL,
    category_id bigint NOT NULL,
    city public.geometry(Point,4326) NOT NULL
);


ALTER TABLE public.announcement_announcement OWNER TO lko;

--
-- Name: announcement_announcement_event_type; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.announcement_announcement_event_type (
    id bigint NOT NULL,
    announcement_id bigint NOT NULL,
    eventtype_id bigint NOT NULL
);


ALTER TABLE public.announcement_announcement_event_type OWNER TO lko;

--
-- Name: announcement_announcement_event_type_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.announcement_announcement_event_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.announcement_announcement_event_type_id_seq OWNER TO lko;

--
-- Name: announcement_announcement_event_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.announcement_announcement_event_type_id_seq OWNED BY public.announcement_announcement_event_type.id;


--
-- Name: announcement_announcement_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.announcement_announcement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.announcement_announcement_id_seq OWNER TO lko;

--
-- Name: announcement_announcement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.announcement_announcement_id_seq OWNED BY public.announcement_announcement.id;


--
-- Name: announcement_servicecategory; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.announcement_servicecategory (
    id bigint NOT NULL,
    name character varying(250) NOT NULL
);


ALTER TABLE public.announcement_servicecategory OWNER TO lko;

--
-- Name: announcement_category_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.announcement_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.announcement_category_id_seq OWNER TO lko;

--
-- Name: announcement_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.announcement_category_id_seq OWNED BY public.announcement_servicecategory.id;


--
-- Name: announcement_eventtype; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.announcement_eventtype (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    photo_id bigint
);


ALTER TABLE public.announcement_eventtype OWNER TO lko;

--
-- Name: announcement_eventtype_category; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.announcement_eventtype_category (
    id bigint NOT NULL,
    eventtype_id bigint NOT NULL,
    servicecategory_id bigint NOT NULL
);


ALTER TABLE public.announcement_eventtype_category OWNER TO lko;

--
-- Name: announcement_eventtype_category_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.announcement_eventtype_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.announcement_eventtype_category_id_seq OWNER TO lko;

--
-- Name: announcement_eventtype_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.announcement_eventtype_category_id_seq OWNED BY public.announcement_eventtype_category.id;


--
-- Name: announcement_eventtype_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.announcement_eventtype_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.announcement_eventtype_id_seq OWNER TO lko;

--
-- Name: announcement_eventtype_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.announcement_eventtype_id_seq OWNED BY public.announcement_eventtype.id;


--
-- Name: announcement_image; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.announcement_image (
    id bigint NOT NULL,
    image character varying(100),
    announcement_id bigint,
    event_type_id bigint,
    is_main boolean
);


ALTER TABLE public.announcement_image OWNER TO lko;

--
-- Name: announcement_image_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.announcement_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.announcement_image_id_seq OWNER TO lko;

--
-- Name: announcement_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.announcement_image_id_seq OWNED BY public.announcement_image.id;


--
-- Name: announcement_movie; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.announcement_movie (
    id bigint NOT NULL,
    announcement_id bigint,
    event_type_id bigint,
    movie character varying(100)
);


ALTER TABLE public.announcement_movie OWNER TO lko;

--
-- Name: announcement_movie_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.announcement_movie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.announcement_movie_id_seq OWNER TO lko;

--
-- Name: announcement_movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.announcement_movie_id_seq OWNED BY public.announcement_movie.id;


--
-- Name: announcement_newsletter; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.announcement_newsletter (
    id bigint NOT NULL,
    email character varying(250) NOT NULL
);


ALTER TABLE public.announcement_newsletter OWNER TO lko;

--
-- Name: announcement_newsletter_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.announcement_newsletter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.announcement_newsletter_id_seq OWNER TO lko;

--
-- Name: announcement_newsletter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.announcement_newsletter_id_seq OWNED BY public.announcement_newsletter.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO lko;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO lko;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO lko;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO lko;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO lko;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO lko;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO lko;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO lko;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO lko;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO lko;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO lko;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO lko;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO lko;

--
-- Name: party_wizard_formmodel; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.party_wizard_formmodel (
    id bigint NOT NULL,
    is_open boolean NOT NULL,
    user_id bigint NOT NULL,
    name character varying(250) NOT NULL,
    form_party jsonb
);


ALTER TABLE public.party_wizard_formmodel OWNER TO lko;

--
-- Name: party_wizard_formmodel_categories; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.party_wizard_formmodel_categories (
    id bigint NOT NULL,
    formmodel_id bigint NOT NULL,
    servicecategory_id bigint NOT NULL
);


ALTER TABLE public.party_wizard_formmodel_categories OWNER TO lko;

--
-- Name: party_wizard_formmodel_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.party_wizard_formmodel_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.party_wizard_formmodel_categories_id_seq OWNER TO lko;

--
-- Name: party_wizard_formmodel_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.party_wizard_formmodel_categories_id_seq OWNED BY public.party_wizard_formmodel_categories.id;


--
-- Name: party_wizard_formmodel_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.party_wizard_formmodel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.party_wizard_formmodel_id_seq OWNER TO lko;

--
-- Name: party_wizard_formmodel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.party_wizard_formmodel_id_seq OWNED BY public.party_wizard_formmodel.id;


--
-- Name: party_wizard_shop; Type: TABLE; Schema: public; Owner: lko
--

CREATE TABLE public.party_wizard_shop (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    location public.geometry(Point,4326) NOT NULL,
    address character varying(100) NOT NULL,
    city character varying(50) NOT NULL
);


ALTER TABLE public.party_wizard_shop OWNER TO lko;

--
-- Name: party_wizard_shop_id_seq; Type: SEQUENCE; Schema: public; Owner: lko
--

CREATE SEQUENCE public.party_wizard_shop_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.party_wizard_shop_id_seq OWNER TO lko;

--
-- Name: party_wizard_shop_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lko
--

ALTER SEQUENCE public.party_wizard_shop_id_seq OWNED BY public.party_wizard_shop.id;


--
-- Name: account_firma id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_firma ALTER COLUMN id SET DEFAULT nextval('public.account_firma_id_seq'::regclass);


--
-- Name: account_user id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_user ALTER COLUMN id SET DEFAULT nextval('public.account_user_id_seq'::regclass);


--
-- Name: account_user_groups id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_user_groups ALTER COLUMN id SET DEFAULT nextval('public.account_user_groups_id_seq'::regclass);


--
-- Name: account_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.account_user_user_permissions_id_seq'::regclass);


--
-- Name: announcement_announcement id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_announcement ALTER COLUMN id SET DEFAULT nextval('public.announcement_announcement_id_seq'::regclass);


--
-- Name: announcement_announcement_event_type id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_announcement_event_type ALTER COLUMN id SET DEFAULT nextval('public.announcement_announcement_event_type_id_seq'::regclass);


--
-- Name: announcement_eventtype id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_eventtype ALTER COLUMN id SET DEFAULT nextval('public.announcement_eventtype_id_seq'::regclass);


--
-- Name: announcement_eventtype_category id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_eventtype_category ALTER COLUMN id SET DEFAULT nextval('public.announcement_eventtype_category_id_seq'::regclass);


--
-- Name: announcement_image id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_image ALTER COLUMN id SET DEFAULT nextval('public.announcement_image_id_seq'::regclass);


--
-- Name: announcement_movie id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_movie ALTER COLUMN id SET DEFAULT nextval('public.announcement_movie_id_seq'::regclass);


--
-- Name: announcement_newsletter id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_newsletter ALTER COLUMN id SET DEFAULT nextval('public.announcement_newsletter_id_seq'::regclass);


--
-- Name: announcement_servicecategory id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_servicecategory ALTER COLUMN id SET DEFAULT nextval('public.announcement_category_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: party_wizard_formmodel id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.party_wizard_formmodel ALTER COLUMN id SET DEFAULT nextval('public.party_wizard_formmodel_id_seq'::regclass);


--
-- Name: party_wizard_formmodel_categories id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.party_wizard_formmodel_categories ALTER COLUMN id SET DEFAULT nextval('public.party_wizard_formmodel_categories_id_seq'::regclass);


--
-- Name: party_wizard_shop id; Type: DEFAULT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.party_wizard_shop ALTER COLUMN id SET DEFAULT nextval('public.party_wizard_shop_id_seq'::regclass);


--
-- Data for Name: job; Type: TABLE DATA; Schema: cron; Owner: postgres
--

COPY cron.job (jobid, schedule, command, nodename, nodeport, database, username, active, jobname) FROM stdin;
\.


--
-- Data for Name: job_run_details; Type: TABLE DATA; Schema: cron; Owner: postgres
--

COPY cron.job_run_details (jobid, runid, job_pid, database, username, command, status, return_message, start_time, end_time) FROM stdin;
\.


--
-- Data for Name: account_firma; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.account_firma (id, name) FROM stdin;
\.


--
-- Data for Name: account_user; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.account_user (id, password, last_login, is_superuser, first_name, last_name, is_staff, is_active, date_joined, email, is_moderator, image, is_firma) FROM stdin;
4	pbkdf2_sha256$260000$ERgk0p7TW46BajyxOmMmte$NwMhrYdwQixee/tHD7leYj/Q0PWmhsNurRlGYKR5bAo=	2021-11-27 17:09:09.8733+00	f	lk	lk	f	t	2021-11-24 18:40:58.555504+00	lk@lk.lk	f	default.jpg	f
5	pbkdf2_sha256$260000$8zmJ09mHfy7q5tdf3m16e0$xeJkd4U+M/03bY40THE/hbDPXa2DA2f0KqCUH8rVi1Y=	2021-12-01 21:13:31.601952+00	f	Krzyś	Nowak	f	t	2021-12-01 21:13:15.04033+00	kn@wp.pl	f	account/user/ICMJESYOIJASRBNGH4G3CJEVVY.jpg	f
1	pbkdf2_sha256$260000$tMhhrG1iwoJOzrY9HSuNQl$/1u5hiQ0HEl3fulOYERtxwVGisR7N+rDits/qX32upM=	2022-01-17 16:25:10.066701+00	f	Jacek	Placek	f	t	2021-11-11 20:03:43.702237+00	jd@jd.jd	f	account/user/4NISA7QXOJGBNIS3AR5JMOIUUE.jpg	f
3	pbkdf2_sha256$260000$joQggq7q4Ff3JegWuz6SqJ$sSVe0yEzqjqlQyjKcg/lZNERBM28Z8EUx9oRclEOJ8k=	2022-01-20 20:52:56.133499+00	t			t	t	2021-11-12 22:52:29.65778+00	lukasz.konieczny.lk@gmail.com	f	account/user/default.jpg	f
\.


--
-- Data for Name: account_user_groups; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.account_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: account_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.account_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: account_useradmin; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.account_useradmin (user_ptr_id) FROM stdin;
\.


--
-- Data for Name: announcement_announcement; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.announcement_announcement (id, title, description, slug, date, user_id, category_id, city) FROM stdin;
112	Party hole	nice for integration	party-hole	2022-01-20 20:53:49.236883+00	1	4	0101000020E6100000FDFFFFFFFF499FBF077609FBFF47923F
\.


--
-- Data for Name: announcement_announcement_event_type; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.announcement_announcement_event_type (id, announcement_id, eventtype_id) FROM stdin;
56	112	3
\.


--
-- Data for Name: announcement_eventtype; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.announcement_eventtype (id, name, photo_id) FROM stdin;
2	party	\N
3	integracja	\N
1	wesele	\N
\.


--
-- Data for Name: announcement_eventtype_category; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.announcement_eventtype_category (id, eventtype_id, servicecategory_id) FROM stdin;
\.


--
-- Data for Name: announcement_image; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.announcement_image (id, image, announcement_id, event_type_id, is_main) FROM stdin;
\.


--
-- Data for Name: announcement_movie; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.announcement_movie (id, announcement_id, event_type_id, movie) FROM stdin;
\.


--
-- Data for Name: announcement_newsletter; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.announcement_newsletter (id, email) FROM stdin;
1	lk@lk.lk
4	kl@kl.kl
\.


--
-- Data for Name: announcement_servicecategory; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.announcement_servicecategory (id, name) FROM stdin;
4	local
1	music
2	cattering
3	photograph
5	wodzirej
6	animator
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add user	6	add_user
22	Can change user	6	change_user
23	Can delete user	6	delete_user
24	Can view user	6	view_user
25	Can add user	7	add_useradmin
26	Can change user	7	change_useradmin
27	Can delete user	7	delete_useradmin
28	Can view user	7	view_useradmin
29	Can add firma	8	add_firma
30	Can change firma	8	change_firma
31	Can delete firma	8	delete_firma
32	Can view firma	8	view_firma
33	Can add announcement	9	add_announcement
34	Can change announcement	9	change_announcement
35	Can delete announcement	9	delete_announcement
36	Can view announcement	9	view_announcement
37	Can add event type	10	add_eventtype
38	Can change event type	10	change_eventtype
39	Can delete event type	10	delete_eventtype
40	Can view event type	10	view_eventtype
41	Can add newsletter	11	add_newsletter
42	Can change newsletter	11	change_newsletter
43	Can delete newsletter	11	delete_newsletter
44	Can view newsletter	11	view_newsletter
45	Can add image	12	add_image
46	Can change image	12	change_image
47	Can delete image	12	delete_image
48	Can view image	12	view_image
49	Can add service category	13	add_servicecategory
50	Can change service category	13	change_servicecategory
51	Can delete service category	13	delete_servicecategory
52	Can view service category	13	view_servicecategory
53	Can add movie	14	add_movie
54	Can change movie	14	change_movie
55	Can delete movie	14	delete_movie
56	Can view movie	14	view_movie
57	Can add form model	15	add_formmodel
58	Can change form model	15	change_formmodel
59	Can delete form model	15	delete_formmodel
60	Can view form model	15	view_formmodel
61	Can add shop	16	add_shop
62	Can change shop	16	change_shop
63	Can delete shop	16	delete_shop
64	Can view shop	16	view_shop
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2021-11-21 21:12:58.047449+00	48	48	2	[{"changed": {"fields": ["Event_type_image"]}}]	11	3
2	2021-11-21 21:14:33.443714+00	1	imprezy rodzinne	2	[{"changed": {"fields": ["Name"]}}]	8	3
3	2021-11-21 21:14:46.582264+00	2	spotkania biznesowe	2	[{"changed": {"fields": ["Name"]}}]	8	3
4	2021-11-23 20:06:12.798421+00	70	Lokal weselny	1	[{"added": {}}]	9	3
5	2021-11-28 20:20:42.216659+00	81	sala weselna	1	[{"added": {}}]	9	3
6	2022-01-19 17:10:42.900835+00	95	Main image TEST	3		9	3
7	2022-01-19 17:10:42.906471+00	91	main selector try	3		9	3
8	2022-01-19 17:10:42.911406+00	77	lk ogłoszenie3	3		9	3
9	2022-01-19 17:10:42.915897+00	76	lk ogłoszenie 5	3		9	3
10	2022-01-19 17:10:42.921228+00	73	try again	3		9	3
11	2022-01-19 17:10:42.926033+00	79	lk ogłoszenie	3		9	3
12	2022-01-19 17:10:42.93115+00	72	tarst	3		9	3
13	2022-01-20 20:53:49.250043+00	112	Party hole	1	[{"added": {}}]	9	3
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	account	user
7	account	useradmin
8	account	firma
9	announcement	announcement
10	announcement	eventtype
11	announcement	newsletter
12	announcement	image
13	announcement	servicecategory
14	announcement	movie
15	party_wizard	formmodel
16	party_wizard	shop
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2022-01-20 12:04:43.147089+00
2	contenttypes	0002_remove_content_type_name	2022-01-20 12:04:43.178808+00
3	auth	0001_initial	2022-01-20 12:04:43.273326+00
4	auth	0002_alter_permission_name_max_length	2022-01-20 12:04:43.294626+00
5	auth	0003_alter_user_email_max_length	2022-01-20 12:04:43.317565+00
6	auth	0004_alter_user_username_opts	2022-01-20 12:04:43.333589+00
7	auth	0005_alter_user_last_login_null	2022-01-20 12:04:43.34564+00
8	auth	0006_require_contenttypes_0002	2022-01-20 12:04:43.353987+00
9	auth	0007_alter_validators_add_error_messages	2022-01-20 12:04:43.377953+00
10	auth	0008_alter_user_username_max_length	2022-01-20 12:04:43.392546+00
11	auth	0009_alter_user_last_name_max_length	2022-01-20 12:04:43.415402+00
12	auth	0010_alter_group_name_max_length	2022-01-20 12:04:43.429478+00
13	auth	0011_update_proxy_permissions	2022-01-20 12:04:43.442057+00
14	auth	0012_alter_user_first_name_max_length	2022-01-20 12:04:43.45258+00
15	account	0001_initial	2022-01-20 12:04:43.569743+00
16	account	0002_auto_20211111_1432	2022-01-20 12:04:43.616732+00
17	account	0003_alter_user_image	2022-01-20 12:04:43.628716+00
18	account	0004_auto_20211112_2050	2022-01-20 12:04:43.650442+00
19	account	0005_alter_user_image	2022-01-20 12:04:43.662889+00
20	account	0006_alter_user_image	2022-01-20 12:04:43.675395+00
21	account	0007_alter_user_image	2022-01-20 12:04:43.687589+00
22	admin	0001_initial	2022-01-20 12:04:43.729193+00
23	admin	0002_logentry_remove_auto_add	2022-01-20 12:04:43.74248+00
24	admin	0003_logentry_add_action_flag_choices	2022-01-20 12:04:43.755367+00
25	announcement	0001_initial	2022-01-20 12:04:43.83353+00
26	announcement	0002_alter_announcement_image	2022-01-20 12:04:43.849551+00
27	announcement	0003_alter_announcement_image	2022-01-20 12:04:43.864404+00
28	announcement	0004_alter_announcement_image	2022-01-20 12:04:43.882152+00
29	announcement	0005_auto_20211115_0911	2022-01-20 12:04:43.925444+00
30	announcement	0006_announcement_type	2022-01-20 12:04:43.940944+00
31	announcement	0007_rename_image_announcementimage	2022-01-20 12:04:43.996642+00
32	announcement	0008_alter_category_name	2022-01-20 12:04:44.028769+00
33	announcement	0009_alter_category_name	2022-01-20 12:04:44.05439+00
34	announcement	0010_alter_category_name	2022-01-20 12:04:44.071815+00
35	announcement	0011_auto_20211115_2118	2022-01-20 12:04:44.264061+00
36	announcement	0012_auto_20211115_2135	2022-01-20 12:04:44.369083+00
37	announcement	0013_alter_announcement_images	2022-01-20 12:04:44.407416+00
38	announcement	0014_auto_20211116_0831	2022-01-20 12:04:44.451807+00
39	announcement	0015_alter_newsletter_email	2022-01-20 12:04:44.470094+00
40	announcement	0016_auto_20211116_2205	2022-01-20 12:04:44.532682+00
41	announcement	0017_auto_20211118_1900	2022-01-20 12:04:44.589443+00
42	announcement	0018_rename_announcementimage_image	2022-01-20 12:04:44.617975+00
43	announcement	0019_auto_20211118_1928	2022-01-20 12:04:44.658078+00
44	announcement	0020_rename_imagee_eventtype_photo	2022-01-20 12:04:44.691044+00
45	announcement	0021_rename_category_servicecategory	2022-01-20 12:04:44.743047+00
46	announcement	0022_auto_20211122_2019	2022-01-20 12:04:44.810379+00
47	announcement	0023_alter_image_event_type	2022-01-20 12:04:44.839473+00
48	announcement	0024_alter_announcement_slug	2022-01-20 12:04:44.872593+00
49	announcement	0025_alter_announcement_slug	2022-01-20 12:04:44.94278+00
50	announcement	0026_alter_announcement_options	2022-01-20 12:04:44.96131+00
51	announcement	0027_alter_announcement_date	2022-01-20 12:04:45.01464+00
52	announcement	0028_image_is_main	2022-01-20 12:04:45.029506+00
53	announcement	0029_alter_image_image	2022-01-20 12:04:45.043709+00
54	announcement	0030_alter_image_is_main	2022-01-20 12:04:45.058071+00
55	announcement	0031_auto_20220102_1455	2022-01-20 12:04:45.12033+00
56	announcement	0032_movie_movie	2022-01-20 12:04:45.135635+00
57	announcement	0033_alter_movie_movie	2022-01-20 12:04:45.151495+00
58	announcement	0031_announcement_city	2022-01-20 12:04:45.185807+00
59	announcement	0034_merge_0031_announcement_city_0033_alter_movie_movie	2022-01-20 12:04:45.192558+00
60	announcement	0035_alter_announcement_category	2022-01-20 12:04:45.211705+00
61	party_wizard	0001_initial	2022-01-20 12:04:45.230548+00
62	party_wizard	0002_rename_test_formmodel_form_party	2022-01-20 12:04:45.246925+00
63	party_wizard	0003_auto_20211127_1830	2022-01-20 12:04:45.294854+00
64	party_wizard	0004_auto_20211228_1925	2022-01-20 12:04:45.375984+00
65	party_wizard	0005_formmodel_form_party	2022-01-20 12:04:45.413867+00
66	party_wizard	0006_alter_formmodel_form_party	2022-01-20 12:04:45.432888+00
67	party_wizard	0007_alter_formmodel_form_party	2022-01-20 12:04:45.490988+00
68	party_wizard	0008_alter_formmodel_form_party	2022-01-20 12:04:45.517737+00
69	party_wizard	0009_shop	2022-01-20 12:04:45.575119+00
70	sessions	0001_initial	2022-01-20 12:04:45.680502+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
4dz42w7pgi9p9zk1rmt2lbnjow9kqczf	.eJxVjDsOwjAQBe_iGll21l9Kes5g7fqDA8iW4qRC3B0ipYD2zcx7sYDbWsM28hLmxM5MstPvRhgfue0g3bHdOo-9rctMfFf4QQe_9pSfl8P9O6g46rdWEI2gKDHZSEIXFARgJvIuR-FJFWc1gC4lKwJlVdHaa-nJTAhgjWPvD-nWN3Y:1mssLn:coDtrgoGN0Oay_JHhHKk-9BBKiiiYUNagk9v2PU0VJo	2021-12-16 20:06:39.790232+00
vpct0gq1ringvbxatl8v45o1r2gn6lu5	.eJxVjDsOwjAQBe_iGll21l9Kes5g7fqDA8iW4qRC3B0ipYD2zcx7sYDbWsM28hLmxM5MstPvRhgfue0g3bHdOo-9rctMfFf4QQe_9pSfl8P9O6g46rdWEI2gKDHZSEIXFARgJvIuR-FJFWc1gC4lKwJlVdHaa-nJTAhgjWPvD-nWN3Y:1mzOwS:OgiAA5_xhS3vtanI7DhcpcoZMC6T5ZJ93c4CQ87Sf44	2022-01-03 20:07:28.68617+00
i92x69hozf498ndvydvplul8wd83khre	.eJxVjDsOwjAQBe_iGll21l9Kes5g7fqDA8iW4qRC3B0ipYD2zcx7sYDbWsM28hLmxM5MstPvRhgfue0g3bHdOo-9rctMfFf4QQe_9pSfl8P9O6g46rdWEI2gKDHZSEIXFARgJvIuR-FJFWc1gC4lKwJlVdHaa-nJTAhgjWPvD-nWN3Y:1n32Ey:8dxw__NRqpkrhfijZW8JNVwjp2NzMo1Dnb7NG2I7DjI	2022-01-13 20:41:36.493465+00
wi617au4m147skaf1xuhn2y0vph1e8bj	.eJxVjDsOwjAQBe_iGll21l9Kes5g7fqDA8iW4qRC3B0ipYD2zcx7sYDbWsM28hLmxM5MstPvRhgfue0g3bHdOo-9rctMfFf4QQe_9pSfl8P9O6g46rdWEI2gKDHZSEIXFARgJvIuR-FJFWc1gC4lKwJlVdHaa-nJTAhgjWPvD-nWN3Y:1n5Rdm:0CsYlteXTe7aAT-eqQLffo-C-hM2hFYUCbFvPkW-MCM	2022-01-20 12:13:10.493676+00
4h9p6vvb04l5fdo2kflotta8n1u6c4qh	.eJxVjLEOwjAMRP8lM4pCa6cKIzvfENmOQwoolZp2Qvw7rdQBttO9d_c2kdalxLXpHMdkLqY3p9-OSZ5ad5AeVO-Tlaku88h2V-xBm71NSV_Xw_07KNTKtiYlHBBBzpo5swtZErDzwpzQedgCdEG6ngVFnCIAeNKBQ_LigzefLxfvOO0:1nAeQS:whFEVHHN72OB7aXL9FdhDaKnIqNw07d9ActYyfASM6o	2022-02-03 20:52:56.139171+00
\.


--
-- Data for Name: party_wizard_formmodel; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.party_wizard_formmodel (id, is_open, user_id, name, form_party) FROM stdin;
\.


--
-- Data for Name: party_wizard_formmodel_categories; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.party_wizard_formmodel_categories (id, formmodel_id, servicecategory_id) FROM stdin;
\.


--
-- Data for Name: party_wizard_shop; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.party_wizard_shop (id, name, location, address, city) FROM stdin;
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: topology; Type: TABLE DATA; Schema: topology; Owner: postgres
--

COPY topology.topology (id, name, srid, "precision", hasz) FROM stdin;
\.


--
-- Data for Name: layer; Type: TABLE DATA; Schema: topology; Owner: postgres
--

COPY topology.layer (topology_id, layer_id, schema_name, table_name, feature_column, feature_type, level, child_id) FROM stdin;
\.


--
-- Name: jobid_seq; Type: SEQUENCE SET; Schema: cron; Owner: postgres
--

SELECT pg_catalog.setval('cron.jobid_seq', 1, false);


--
-- Name: runid_seq; Type: SEQUENCE SET; Schema: cron; Owner: postgres
--

SELECT pg_catalog.setval('cron.runid_seq', 1, false);


--
-- Name: account_firma_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.account_firma_id_seq', 1, false);


--
-- Name: account_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.account_user_groups_id_seq', 1, false);


--
-- Name: account_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.account_user_id_seq', 5, true);


--
-- Name: account_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.account_user_user_permissions_id_seq', 1, false);


--
-- Name: announcement_announcement_event_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.announcement_announcement_event_type_id_seq', 56, true);


--
-- Name: announcement_announcement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.announcement_announcement_id_seq', 112, true);


--
-- Name: announcement_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.announcement_category_id_seq', 1, false);


--
-- Name: announcement_eventtype_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.announcement_eventtype_category_id_seq', 1, false);


--
-- Name: announcement_eventtype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.announcement_eventtype_id_seq', 1, false);


--
-- Name: announcement_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.announcement_image_id_seq', 169, true);


--
-- Name: announcement_movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.announcement_movie_id_seq', 1, false);


--
-- Name: announcement_newsletter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.announcement_newsletter_id_seq', 4, true);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 84, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 13, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 19, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 75, true);


--
-- Name: party_wizard_formmodel_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.party_wizard_formmodel_categories_id_seq', 1, false);


--
-- Name: party_wizard_formmodel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.party_wizard_formmodel_id_seq', 1, false);


--
-- Name: party_wizard_shop_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.party_wizard_shop_id_seq', 1, false);


--
-- Name: account_firma account_firma_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_firma
    ADD CONSTRAINT account_firma_pkey PRIMARY KEY (id);


--
-- Name: account_user account_user_email_key; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_user
    ADD CONSTRAINT account_user_email_key UNIQUE (email);


--
-- Name: account_user_groups account_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_user_groups
    ADD CONSTRAINT account_user_groups_pkey PRIMARY KEY (id);


--
-- Name: account_user_groups account_user_groups_user_id_group_id_4d09af3e_uniq; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_user_groups
    ADD CONSTRAINT account_user_groups_user_id_group_id_4d09af3e_uniq UNIQUE (user_id, group_id);


--
-- Name: account_user account_user_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_user
    ADD CONSTRAINT account_user_pkey PRIMARY KEY (id);


--
-- Name: account_user_user_permissions account_user_user_permis_user_id_permission_id_48bdd28b_uniq; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_user_user_permissions
    ADD CONSTRAINT account_user_user_permis_user_id_permission_id_48bdd28b_uniq UNIQUE (user_id, permission_id);


--
-- Name: account_user_user_permissions account_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_user_user_permissions
    ADD CONSTRAINT account_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: account_useradmin account_useradmin_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_useradmin
    ADD CONSTRAINT account_useradmin_pkey PRIMARY KEY (user_ptr_id);


--
-- Name: announcement_announcement_event_type announcement_announcemen_announcement_id_eventtyp_6197a87f_uniq; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_announcement_event_type
    ADD CONSTRAINT announcement_announcemen_announcement_id_eventtyp_6197a87f_uniq UNIQUE (announcement_id, eventtype_id);


--
-- Name: announcement_announcement_event_type announcement_announcement_event_type_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_announcement_event_type
    ADD CONSTRAINT announcement_announcement_event_type_pkey PRIMARY KEY (id);


--
-- Name: announcement_announcement announcement_announcement_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_announcement
    ADD CONSTRAINT announcement_announcement_pkey PRIMARY KEY (id);


--
-- Name: announcement_announcement announcement_announcement_slug_695d7dff_uniq; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_announcement
    ADD CONSTRAINT announcement_announcement_slug_695d7dff_uniq UNIQUE (slug);


--
-- Name: announcement_servicecategory announcement_category_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_servicecategory
    ADD CONSTRAINT announcement_category_pkey PRIMARY KEY (id);


--
-- Name: announcement_eventtype_category announcement_eventtype_c_eventtype_id_category_id_2d6aa130_uniq; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_eventtype_category
    ADD CONSTRAINT announcement_eventtype_c_eventtype_id_category_id_2d6aa130_uniq UNIQUE (eventtype_id, servicecategory_id);


--
-- Name: announcement_eventtype_category announcement_eventtype_category_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_eventtype_category
    ADD CONSTRAINT announcement_eventtype_category_pkey PRIMARY KEY (id);


--
-- Name: announcement_eventtype announcement_eventtype_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_eventtype
    ADD CONSTRAINT announcement_eventtype_pkey PRIMARY KEY (id);


--
-- Name: announcement_image announcement_image_event_type_id_71f34c0d_uniq; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_image
    ADD CONSTRAINT announcement_image_event_type_id_71f34c0d_uniq UNIQUE (event_type_id);


--
-- Name: announcement_image announcement_image_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_image
    ADD CONSTRAINT announcement_image_pkey PRIMARY KEY (id);


--
-- Name: announcement_movie announcement_movie_event_type_id_key; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_movie
    ADD CONSTRAINT announcement_movie_event_type_id_key UNIQUE (event_type_id);


--
-- Name: announcement_movie announcement_movie_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_movie
    ADD CONSTRAINT announcement_movie_pkey PRIMARY KEY (id);


--
-- Name: announcement_newsletter announcement_newsletter_email_f2d7544e_uniq; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_newsletter
    ADD CONSTRAINT announcement_newsletter_email_f2d7544e_uniq UNIQUE (email);


--
-- Name: announcement_newsletter announcement_newsletter_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_newsletter
    ADD CONSTRAINT announcement_newsletter_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: party_wizard_formmodel_categories party_wizard_formmodel_c_formmodel_id_servicecate_7878ebf8_uniq; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.party_wizard_formmodel_categories
    ADD CONSTRAINT party_wizard_formmodel_c_formmodel_id_servicecate_7878ebf8_uniq UNIQUE (formmodel_id, servicecategory_id);


--
-- Name: party_wizard_formmodel_categories party_wizard_formmodel_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.party_wizard_formmodel_categories
    ADD CONSTRAINT party_wizard_formmodel_categories_pkey PRIMARY KEY (id);


--
-- Name: party_wizard_formmodel party_wizard_formmodel_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.party_wizard_formmodel
    ADD CONSTRAINT party_wizard_formmodel_pkey PRIMARY KEY (id);


--
-- Name: party_wizard_shop party_wizard_shop_pkey; Type: CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.party_wizard_shop
    ADD CONSTRAINT party_wizard_shop_pkey PRIMARY KEY (id);


--
-- Name: account_user_email_0bd7c421_like; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX account_user_email_0bd7c421_like ON public.account_user USING btree (email varchar_pattern_ops);


--
-- Name: account_user_groups_group_id_6c71f749; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX account_user_groups_group_id_6c71f749 ON public.account_user_groups USING btree (group_id);


--
-- Name: account_user_groups_user_id_14345e7b; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX account_user_groups_user_id_14345e7b ON public.account_user_groups USING btree (user_id);


--
-- Name: account_user_user_permissions_permission_id_66c44191; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX account_user_user_permissions_permission_id_66c44191 ON public.account_user_user_permissions USING btree (permission_id);


--
-- Name: account_user_user_permissions_user_id_cc42d270; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX account_user_user_permissions_user_id_cc42d270 ON public.account_user_user_permissions USING btree (user_id);


--
-- Name: announcement_announcement_category_id_3fd7aaf1; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX announcement_announcement_category_id_3fd7aaf1 ON public.announcement_announcement USING btree (category_id);


--
-- Name: announcement_announcement_city_id; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX announcement_announcement_city_id ON public.announcement_announcement USING gist (city);


--
-- Name: announcement_announcement_event_type_announcement_id_078f3616; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX announcement_announcement_event_type_announcement_id_078f3616 ON public.announcement_announcement_event_type USING btree (announcement_id);


--
-- Name: announcement_announcement_event_type_eventtype_id_1c77aad1; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX announcement_announcement_event_type_eventtype_id_1c77aad1 ON public.announcement_announcement_event_type USING btree (eventtype_id);


--
-- Name: announcement_announcement_id_slug_69acf1b4_idx; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX announcement_announcement_id_slug_69acf1b4_idx ON public.announcement_announcement USING btree (id, slug);


--
-- Name: announcement_announcement_slug_695d7dff_like; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX announcement_announcement_slug_695d7dff_like ON public.announcement_announcement USING btree (slug varchar_pattern_ops);


--
-- Name: announcement_announcement_user_id_ab5d0e36; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX announcement_announcement_user_id_ab5d0e36 ON public.announcement_announcement USING btree (user_id);


--
-- Name: announcement_announcementimage_announcement_id_c155105f; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX announcement_announcementimage_announcement_id_c155105f ON public.announcement_image USING btree (announcement_id);


--
-- Name: announcement_eventtype_category_category_id_7617a34d; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX announcement_eventtype_category_category_id_7617a34d ON public.announcement_eventtype_category USING btree (servicecategory_id);


--
-- Name: announcement_eventtype_category_eventtype_id_b5b0cdd9; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX announcement_eventtype_category_eventtype_id_b5b0cdd9 ON public.announcement_eventtype_category USING btree (eventtype_id);


--
-- Name: announcement_eventtype_imagee_id_57d1789d; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX announcement_eventtype_imagee_id_57d1789d ON public.announcement_eventtype USING btree (photo_id);


--
-- Name: announcement_movie_announcement_id_bd348a43; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX announcement_movie_announcement_id_bd348a43 ON public.announcement_movie USING btree (announcement_id);


--
-- Name: announcement_newsletter_email_f2d7544e_like; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX announcement_newsletter_email_f2d7544e_like ON public.announcement_newsletter USING btree (email varchar_pattern_ops);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: party_wizard_formmodel_categories_formmodel_id_776aeebb; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX party_wizard_formmodel_categories_formmodel_id_776aeebb ON public.party_wizard_formmodel_categories USING btree (formmodel_id);


--
-- Name: party_wizard_formmodel_categories_servicecategory_id_49a0a9e5; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX party_wizard_formmodel_categories_servicecategory_id_49a0a9e5 ON public.party_wizard_formmodel_categories USING btree (servicecategory_id);


--
-- Name: party_wizard_formmodel_user_id_f465f11a; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX party_wizard_formmodel_user_id_f465f11a ON public.party_wizard_formmodel USING btree (user_id);


--
-- Name: party_wizard_shop_location_id; Type: INDEX; Schema: public; Owner: lko
--

CREATE INDEX party_wizard_shop_location_id ON public.party_wizard_shop USING gist (location);


--
-- Name: account_user_groups account_user_groups_group_id_6c71f749_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_user_groups
    ADD CONSTRAINT account_user_groups_group_id_6c71f749_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_user_groups account_user_groups_user_id_14345e7b_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_user_groups
    ADD CONSTRAINT account_user_groups_user_id_14345e7b_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_user_user_permissions account_user_user_pe_permission_id_66c44191_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_user_user_permissions
    ADD CONSTRAINT account_user_user_pe_permission_id_66c44191_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_user_user_permissions account_user_user_pe_user_id_cc42d270_fk_account_u; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_user_user_permissions
    ADD CONSTRAINT account_user_user_pe_user_id_cc42d270_fk_account_u FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_useradmin account_useradmin_user_ptr_id_c8d5f552_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.account_useradmin
    ADD CONSTRAINT account_useradmin_user_ptr_id_c8d5f552_fk_account_user_id FOREIGN KEY (user_ptr_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: announcement_announcement_event_type announcement_announc_announcement_id_078f3616_fk_announcem; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_announcement_event_type
    ADD CONSTRAINT announcement_announc_announcement_id_078f3616_fk_announcem FOREIGN KEY (announcement_id) REFERENCES public.announcement_announcement(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: announcement_image announcement_announc_announcement_id_c155105f_fk_announcem; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_image
    ADD CONSTRAINT announcement_announc_announcement_id_c155105f_fk_announcem FOREIGN KEY (announcement_id) REFERENCES public.announcement_announcement(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: announcement_announcement announcement_announc_category_id_3fd7aaf1_fk_announcem; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_announcement
    ADD CONSTRAINT announcement_announc_category_id_3fd7aaf1_fk_announcem FOREIGN KEY (category_id) REFERENCES public.announcement_servicecategory(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: announcement_announcement_event_type announcement_announc_eventtype_id_1c77aad1_fk_announcem; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_announcement_event_type
    ADD CONSTRAINT announcement_announc_eventtype_id_1c77aad1_fk_announcem FOREIGN KEY (eventtype_id) REFERENCES public.announcement_eventtype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: announcement_announcement announcement_announcement_user_id_ab5d0e36_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_announcement
    ADD CONSTRAINT announcement_announcement_user_id_ab5d0e36_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: announcement_eventtype_category announcement_eventty_eventtype_id_b5b0cdd9_fk_announcem; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_eventtype_category
    ADD CONSTRAINT announcement_eventty_eventtype_id_b5b0cdd9_fk_announcem FOREIGN KEY (eventtype_id) REFERENCES public.announcement_eventtype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: announcement_eventtype announcement_eventty_photo_id_82da919b_fk_announcem; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_eventtype
    ADD CONSTRAINT announcement_eventty_photo_id_82da919b_fk_announcem FOREIGN KEY (photo_id) REFERENCES public.announcement_image(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: announcement_eventtype_category announcement_eventty_servicecategory_id_71b41b91_fk_announcem; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_eventtype_category
    ADD CONSTRAINT announcement_eventty_servicecategory_id_71b41b91_fk_announcem FOREIGN KEY (servicecategory_id) REFERENCES public.announcement_servicecategory(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: announcement_image announcement_image_event_type_id_71f34c0d_fk_announcem; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_image
    ADD CONSTRAINT announcement_image_event_type_id_71f34c0d_fk_announcem FOREIGN KEY (event_type_id) REFERENCES public.announcement_eventtype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: announcement_movie announcement_movie_announcement_id_bd348a43_fk_announcem; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_movie
    ADD CONSTRAINT announcement_movie_announcement_id_bd348a43_fk_announcem FOREIGN KEY (announcement_id) REFERENCES public.announcement_announcement(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: announcement_movie announcement_movie_event_type_id_3899a109_fk_announcem; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.announcement_movie
    ADD CONSTRAINT announcement_movie_event_type_id_3899a109_fk_announcem FOREIGN KEY (event_type_id) REFERENCES public.announcement_eventtype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: party_wizard_formmodel_categories party_wizard_formmod_formmodel_id_776aeebb_fk_party_wiz; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.party_wizard_formmodel_categories
    ADD CONSTRAINT party_wizard_formmod_formmodel_id_776aeebb_fk_party_wiz FOREIGN KEY (formmodel_id) REFERENCES public.party_wizard_formmodel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: party_wizard_formmodel_categories party_wizard_formmod_servicecategory_id_49a0a9e5_fk_announcem; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.party_wizard_formmodel_categories
    ADD CONSTRAINT party_wizard_formmod_servicecategory_id_49a0a9e5_fk_announcem FOREIGN KEY (servicecategory_id) REFERENCES public.announcement_servicecategory(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: party_wizard_formmodel party_wizard_formmodel_user_id_f465f11a_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: lko
--

ALTER TABLE ONLY public.party_wizard_formmodel
    ADD CONSTRAINT party_wizard_formmodel_user_id_f465f11a_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: job cron_job_policy; Type: POLICY; Schema: cron; Owner: postgres
--

CREATE POLICY cron_job_policy ON cron.job USING ((username = CURRENT_USER));


--
-- Name: job_run_details cron_job_run_details_policy; Type: POLICY; Schema: cron; Owner: postgres
--

CREATE POLICY cron_job_run_details_policy ON cron.job_run_details USING ((username = CURRENT_USER));


--
-- Name: job; Type: ROW SECURITY; Schema: cron; Owner: postgres
--

ALTER TABLE cron.job ENABLE ROW LEVEL SECURITY;

--
-- Name: job_run_details; Type: ROW SECURITY; Schema: cron; Owner: postgres
--

ALTER TABLE cron.job_run_details ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--

