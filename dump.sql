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
    category_id bigint NOT NULL
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
-- Data for Name: account_firma; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.account_firma (id, name) FROM stdin;
\.


--
-- Data for Name: account_user; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.account_user (id, password, last_login, is_superuser, first_name, last_name, is_staff, is_active, date_joined, email, is_moderator, image, is_firma) FROM stdin;
2	pbkdf2_sha256$260000$b5ISRaf2WdFMM5I8XEyhBd$rQwz2Y88+IGBaLKgMlh3ti0VhPSATDEzgSHhZ2ETsbE=	\N	f	James	Bond	f	t	2021-11-11 21:32:12.033207+00	007@jb.uk	f	account/user/PQMZ44CIVVBQVG5P563GVRDZXA.jpg	f
4	pbkdf2_sha256$260000$ERgk0p7TW46BajyxOmMmte$NwMhrYdwQixee/tHD7leYj/Q0PWmhsNurRlGYKR5bAo=	2021-11-27 17:09:09.8733+00	f	lk	lk	f	t	2021-11-24 18:40:58.555504+00	lk@lk.lk	f	default.jpg	f
3	pbkdf2_sha256$260000$joQggq7q4Ff3JegWuz6SqJ$sSVe0yEzqjqlQyjKcg/lZNERBM28Z8EUx9oRclEOJ8k=	2021-11-28 20:19:44.340739+00	t			t	t	2021-11-12 22:52:29.65778+00	lukasz.konieczny.lk@gmail.com	f	account/user/default.jpg	f
5	pbkdf2_sha256$260000$8zmJ09mHfy7q5tdf3m16e0$xeJkd4U+M/03bY40THE/hbDPXa2DA2f0KqCUH8rVi1Y=	2021-12-01 21:13:31.601952+00	f	Krzyś	Nowak	f	t	2021-12-01 21:13:15.04033+00	kn@wp.pl	f	account/user/ICMJESYOIJASRBNGH4G3CJEVVY.jpg	f
1	pbkdf2_sha256$260000$tMhhrG1iwoJOzrY9HSuNQl$/1u5hiQ0HEl3fulOYERtxwVGisR7N+rDits/qX32upM=	2022-01-06 12:13:10.486922+00	f	Jacek	Placek	f	t	2021-11-11 20:03:43.702237+00	jd@jd.jd	f	account/user/4NISA7QXOJGBNIS3AR5JMOIUUE.jpg	f
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

COPY public.announcement_announcement (id, title, description, slug, date, user_id, category_id) FROM stdin;
72	tarst	wfpt	tarst-likn	2021-11-23 00:00:00+00	3	4
78	lk ogłoszenie	ine.,hmart	lk-ogoszenie-1fa4	2021-11-24 00:00:00+00	4	4
79	lk ogłoszenie	ine.,hmart	lk-ogoszenie-s9rl	2021-11-24 00:00:00+00	4	4
69	Lokal weselny	Piękne miejsce.	lokal-weselny	2021-11-23 00:00:00+00	3	4
70	Lokal weselny	Piękne miejsce.	rtrast	2021-11-23 00:00:00+00	1	4
71	tarst	wfpt	tarst	2021-11-23 00:00:00+00	3	4
73	try again	wfpt	tarst-jt15	2021-11-27 00:00:00+00	1	1
76	lk ogłoszenie 5	pionek	lk-ogoszenie-or1r	2021-11-27 00:00:00+00	4	1
77	lk ogłoszenie3	bbbbbtft	lk-ogoszenie-fdmc	2021-11-27 22:41:17.896007+00	4	4
81	sala weselna	na wielu gości	sala-weselna	2021-11-28 20:21:18.64759+00	1	4
82	party time	bla bla lba	party-time	2021-11-28 20:39:35.949751+00	1	4
83	biba	miejsce na imprezy firmowe	biba	2021-11-29 19:40:09.569654+00	1	4
84	Paparazzi	fotograf okolicznościowy	paparazzi	2021-11-29 19:41:19.917593+00	1	3
85	Jadło i napitki	żarcie jakie lubisz	jado-i-napitki	2021-11-29 19:42:17.757434+00	1	2
74	test	test dłuuuuuuuuuuuugi text żeby sprawdzić zawijanie	test	2021-11-23 00:00:00+00	1	4
87	test podglądu zdjęć	zobaczymy ile zdjęć się finalnie doda...	test-podgladu-zdjec	2021-12-07 19:11:30.474107+00	1	3
106	testowe 5	xcdxcvd	tratwfpwf	2022-01-01 20:58:00.734657+00	1	5
97	Main image TEST	dużo zmian	main-image-test-wgn8	2022-01-02 12:14:20.447453+00	1	4
88	Nowe: test ze zdjęciami	bla bla bla bla bla lba... coś nowego	nowe-test-ze-zdjeciami	2021-12-11 19:40:38.737222+00	1	2
91	main selector try	ntiarntxc	main-selector-try	2021-12-12 19:18:38.309997+00	1	4
92	Main try again	nihd.x,co	main-try-again	2021-12-12 19:19:48.744429+00	1	4
95	Main image TEST	,hmdwyuf	main-image-test-edg4	2021-12-12 19:41:18.98317+00	1	4
86	Bitka, wypitka i inne atrakcje	picie i rozrywka	bitka-i-wypitka	2021-12-07 21:38:12.426258+00	1	4
99	TEST main image	hmdwfwy;	test-main-image-wify	2021-12-12 20:25:57.820628+00	1	4
100	NOWY test z mainem	hmowfp,h	nowy-test-z-mainem	2022-01-02 14:04:49.228146+00	1	4
101	Try again	niofw,h	try-again	2021-12-12 20:37:20.784793+00	1	4
98	TEST main image	hmdwfwy;	test-main-image	2021-12-12 20:38:09.789551+00	1	4
90	NOWE	Ogłoszenie	nowe	2022-01-03 18:02:12.667613+00	1	4
105	ratarstars	zmiana opisu	ratarstars-wp8t	2021-12-27 21:06:41.37366+00	1	5
103	Dodawanie	czy nadal działa??	dodawanie	2021-12-29 21:11:35.077505+00	1	1
102	Test z wyświetlaniem main image	zmiany	test-z-wyswietlaniem-main-image	2022-01-06 12:55:52.824232+00	1	1
104	ratarstars	tratdxzcd	ratarstars	2021-12-15 18:04:00.326374+00	1	5
\.


--
-- Data for Name: announcement_announcement_event_type; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.announcement_announcement_event_type (id, announcement_id, eventtype_id) FROM stdin;
35	70	1
36	70	2
37	73	1
39	76	3
40	77	2
41	81	1
42	81	2
1	84	2
2	85	3
3	84	3
4	83	1
5	83	2
7	85	2
43	86	3
44	88	1
45	88	3
46	100	2
47	101	3
48	98	2
49	97	2
50	102	2
51	103	1
52	106	1
53	105	3
54	90	2
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
1	1	1
2	3	2
3	2	4
\.


--
-- Data for Name: announcement_image; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.announcement_image (id, image, announcement_id, event_type_id, is_main) FROM stdin;
58	announcement/image/2SGO4YKNDJHB3JW6GCPKDGOQXM.JPG	69	\N	f
59	announcement/image/FWZALSSOZRATXEXNPUNNLU5OQY.JPG	69	\N	f
60	announcement/image/DCJGDS6NK5BIVGKUYD4KWTGYO4.JPG	69	\N	f
61	announcement/image/G4D2I5ELXBHIXJ6X34K52INIKU.JPG	69	\N	f
62	announcement/image/MBDH64EKPZGULO735P2J4FEG2E.JPG	71	\N	f
63	announcement/image/TGJ3ZIGFNFFGVPIWML3VH6DHU4.JPG	72	\N	f
67	announcement/image/XGJPH37V4FA5DHAYQF544IMJ2M.JPG	76	\N	f
68	announcement/image/GQQ2S3MXLRCQTD5ZONZNHQEFQM.JPG	77	\N	f
69	announcement/image/S2CSGDEEWJGRZGKLYQPNQAP75U.JPG	78	\N	f
70	announcement/image/QZ3R2SBCJVBIHPM5BRIAZPVVYA.JPG	79	\N	f
72	announcement/image/RTQ6RZXIIZCITCQTJ5UFLHTMPY.JPG	82	\N	f
73	announcement/image/77AAPNB4KBD3VEQCJSXVAC3CZM.JPG	82	\N	f
74	announcement/image/QH7XUSIRLNEDRPPA6ZS62YPQKY.JPG	83	\N	f
75	announcement/image/Q5Q7FRO73JFEHCI6Y7V5SIQBOE.JPG	83	\N	f
76	announcement/image/AUFJJOAM2NAHTP6T3AU4C22MTM.JPG	83	\N	f
77	announcement/image/ZQXBJT3UD5CHRMAZ5O6IF7RF5E.JPG	83	\N	f
78	announcement/image/HCAE6B5QUJGC3KRNYRPZOFPXSY.JPG	84	\N	f
79	announcement/image/CPJ23D7UINAW7AA34EXNTEI3BE.JPG	84	\N	f
80	announcement/image/TGCMJQFFK5GVXNT4MXZBFT4GWY.JPG	84	\N	f
81	announcement/image/N6AUUIJSYRFUFGEDODEAEW4QTY.JPG	85	\N	f
82	announcement/image/5Y73NRB7VNFGPHZV44WE64LKJY.JPG	85	\N	f
83	announcement/image/GPETVLSMDRDRDCJ4B3IJXA2X44.JPG	86	\N	f
84	announcement/image/Y2VOYFM5R5DQ7HJ7VYISKRFWQA.JPG	86	\N	f
85	announcement/image/SZNLDGZKQZBF5HRADYEKRIV6F4.JPG	87	\N	f
87	announcement/image/N62LH4LYYFBXHPZ3FLI4J67BFE.JPG	88	\N	f
92	announcement/image/J4SET36B25GVJA3F7P2YIPDJ4M.JPG	88	\N	f
93	announcement/image/WYVY5VDIKJH7FAQSYHLKGVS37Y.JPG	88	\N	f
94	announcement/image/VOEY5DHJCZCZ7FFECWKFLNQM6A.JPG	88	\N	f
95	announcement/image/6QA7OAMABNDH3P2UZ5M7SVEJCY.JPG	91	\N	f
96	announcement/image/LIVRZE6RNVGYJDCTSJYSAMOQCE.JPG	91	\N	f
97	announcement/image/ITWD3SM2PJARNFEMMQYSNVOPLI.JPG	92	\N	f
98	announcement/image/ACRGTZ4PTFGBNC3YHHXKTTOVAU.JPG	92	\N	f
99	0	95	\N	f
103	announcement/image/KBXCJ73VT5DVPEV7ML7ISXQI5Y.JPG	99	\N	f
104	announcement/image/QHUVWGMHAZGGXBCFREF6NRIY7U.JPG	99	\N	f
105	announcement/image/FM4ICIZAXND4BBPS7STAX52M2U.JPG	99	\N	f
109	announcement/image/XS7UBH6XZZBR5GJ23VQ52DESFQ.JPG	101	\N	t
111	announcement/image/AQWXDRNC4FEV3G5GJNTLRGDA2I.JPG	101	\N	f
138	announcement/image/LJ2AX52Q4RFOVD7HFUYTE7RMYU.JPG	104	\N	f
139	announcement/image/Y2V3OWH7MRFMTN5MEF5QILBJMY.JPG	104	\N	t
156	announcement/image/NYSJRSY2MJBLJKHNMZEE3F43I4.jpg	106	\N	f
149	announcement/image/NGZZ7YVVRRD3RFPH2Z3TSMYDFA.JPG	106	\N	f
136	announcement/image/SWFRO6ONVFBXVEDRLUGUUTBPTU.JPG	103	\N	f
135	announcement/image/XLITJDF7L5ENXEHTURMNVVIRYE.JPG	103	\N	f
134	announcement/image/CPK45VHX25H3HKKYFL57O6C3XE.JPG	103	\N	f
137	announcement/image/GBGQRM352BEIVMYDF5XGTOBIVY.JPG	103	\N	f
125	announcement/image/BQYUGQUKLRFERGMJPQSUZ3WD6U.JPG	102	\N	f
153	announcement/image/MTDU3AMLIZGZVK3IWKCNGICYMQ.JPG	103	\N	t
129	announcement/image/NWF6LIG6PJGYHBDNVUBM2OMD5Y.JPG	102	\N	f
123	announcement/image/ZBZ2CN6NRZC63CS4J2CWZQXMQE.JPG	102	\N	f
131	announcement/image/4CTSMCVJSRBSHO3XQ5AK7MKTTI.JPG	102	\N	f
106	announcement/image/CNCORHGGTBBVRAMRUMNT3XUOEM.JPG	100	\N	f
91	announcement/image/NBVAMXSB7JAM5IKINF2WLQKJJU.jpg	90	\N	f
155	announcement/image/5S2SEOHXFVDONAGV4EQ3YJO4XY.JPG	97	\N	f
142	announcement/image/GDS4CZ66DJDKVO7UCTDWQTQXJI.JPG	106	\N	f
157	announcement/image/H3THUKYHG5HO5D5INJMZGSU22A.JPG	106	\N	t
152	announcement/image/UCSTSFHWZVDD3NVQKKEEOFEREM.JPG	106	\N	f
158	announcement/image/5C2JI4LSHBDXDBV7EOOGHAP4FM.JPG	106	\N	f
159	announcement/image/PHWCAWP5OJDAJCYYTHYN7EC3GI.jpg	97	\N	f
160	announcement/image/7APBWEOHP5GCHCFPBLLLHJHXUM.jpg	97	\N	f
161	announcement/image/WV3JJA5AZFCVXBGAN5TXL4FCIA.jpg	97	\N	t
162	announcement/image/DEKS4JTZSNDOJNIRIJWAMESTSY.jpg	100	\N	f
163	announcement/image/EQDSUW7GUVAI5DIWHVKKL7KJYE.jpg	100	\N	f
164	announcement/image/XJ7TOJFBMBH75EMSBEXOFZC6XQ.jpg	100	\N	t
165	announcement/image/XTEJRMORBBFJBA3JPXILLBS3EM.jpg	90	\N	t
166	announcement/image/OVKPSIRCFNFVHMDQ3T5IT3VZNI.jpg	102	\N	f
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
29	Can add category	8	add_category
30	Can change category	8	change_category
31	Can delete category	8	delete_category
32	Can view category	8	view_category
33	Can add announcement	9	add_announcement
34	Can change announcement	9	change_announcement
35	Can delete announcement	9	delete_announcement
36	Can view announcement	9	view_announcement
37	Can add firma	10	add_firma
38	Can change firma	10	change_firma
39	Can delete firma	10	delete_firma
40	Can view firma	10	view_firma
41	Can add image	11	add_image
42	Can change image	11	change_image
43	Can delete image	11	delete_image
44	Can view image	11	view_image
45	Can add announcement image	11	add_announcementimage
46	Can change announcement image	11	change_announcementimage
47	Can delete announcement image	11	delete_announcementimage
48	Can view announcement image	11	view_announcementimage
49	Can add event type	12	add_eventtype
50	Can change event type	12	change_eventtype
51	Can delete event type	12	delete_eventtype
52	Can view event type	12	view_eventtype
53	Can add newsletter	13	add_newsletter
54	Can change newsletter	13	change_newsletter
55	Can delete newsletter	13	delete_newsletter
56	Can view newsletter	13	view_newsletter
57	Can add service category	8	add_servicecategory
58	Can change service category	8	change_servicecategory
59	Can delete service category	8	delete_servicecategory
60	Can view service category	8	view_servicecategory
61	Can add testowa	14	add_testowa
62	Can change testowa	14	change_testowa
63	Can delete testowa	14	delete_testowa
64	Can view testowa	14	view_testowa
65	Can add nowa	15	add_nowa
66	Can change nowa	15	change_nowa
67	Can delete nowa	15	delete_nowa
68	Can view nowa	15	view_nowa
69	Can add new	16	add_new
70	Can change new	16	change_new
71	Can delete new	16	delete_new
72	Can view new	16	view_new
73	Can add form model	17	add_formmodel
74	Can change form model	17	change_formmodel
75	Can delete form model	17	delete_formmodel
76	Can view form model	17	view_formmodel
77	Can add movie	18	add_movie
78	Can change movie	18	change_movie
79	Can delete movie	18	delete_movie
80	Can view movie	18	view_movie
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
9	announcement	announcement
10	account	firma
12	announcement	eventtype
13	announcement	newsletter
11	announcement	image
8	announcement	servicecategory
14	party_wizard	testowa
15	party_wizard	nowa
16	party_wizard	new
17	party_wizard	formmodel
18	announcement	movie
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2021-11-11 17:50:24.317273+00
2	contenttypes	0002_remove_content_type_name	2021-11-11 17:50:24.346999+00
3	auth	0001_initial	2021-11-11 17:50:24.453344+00
4	auth	0002_alter_permission_name_max_length	2021-11-11 17:50:24.473135+00
5	auth	0003_alter_user_email_max_length	2021-11-11 17:50:24.489766+00
6	auth	0004_alter_user_username_opts	2021-11-11 17:50:24.501227+00
7	auth	0005_alter_user_last_login_null	2021-11-11 17:50:24.513812+00
8	auth	0006_require_contenttypes_0002	2021-11-11 17:50:24.522045+00
9	auth	0007_alter_validators_add_error_messages	2021-11-11 17:50:24.541557+00
10	auth	0008_alter_user_username_max_length	2021-11-11 17:50:24.552989+00
11	auth	0009_alter_user_last_name_max_length	2021-11-11 17:50:24.565279+00
12	auth	0010_alter_group_name_max_length	2021-11-11 17:50:24.57786+00
13	auth	0011_update_proxy_permissions	2021-11-11 17:50:24.597531+00
14	auth	0012_alter_user_first_name_max_length	2021-11-11 17:50:24.611628+00
15	account	0001_initial	2021-11-11 17:50:24.709896+00
16	account	0002_auto_20211111_1432	2021-11-11 17:50:24.768482+00
17	admin	0001_initial	2021-11-11 17:50:24.822352+00
18	admin	0002_logentry_remove_auto_add	2021-11-11 17:50:24.850965+00
19	admin	0003_logentry_add_action_flag_choices	2021-11-11 17:50:24.873976+00
20	sessions	0001_initial	2021-11-11 17:50:24.912345+00
21	announcement	0001_initial	2021-11-11 18:43:33.165135+00
22	account	0003_alter_user_image	2021-11-12 17:44:34.343607+00
23	account	0004_auto_20211112_2050	2021-11-15 06:40:55.007444+00
24	account	0005_alter_user_image	2021-11-15 06:40:55.02678+00
25	announcement	0002_alter_announcement_image	2021-11-15 06:40:55.043605+00
26	announcement	0003_alter_announcement_image	2021-11-15 06:40:55.062499+00
27	announcement	0004_alter_announcement_image	2021-11-15 06:40:55.079493+00
28	announcement	0005_auto_20211115_0911	2021-11-15 08:16:35.641681+00
29	announcement	0006_announcement_type	2021-11-15 08:50:41.12091+00
30	announcement	0007_rename_image_announcementimage	2021-11-15 09:02:27.619872+00
31	announcement	0008_alter_category_name	2021-11-15 11:34:49.292162+00
32	announcement	0009_alter_category_name	2021-11-15 13:07:13.394497+00
33	announcement	0010_alter_category_name	2021-11-15 13:21:49.716895+00
34	announcement	0011_auto_20211115_2118	2021-11-15 20:18:56.637177+00
35	announcement	0012_auto_20211115_2135	2021-11-15 20:35:33.095039+00
36	announcement	0013_alter_announcement_images	2021-11-15 20:44:55.633766+00
37	announcement	0014_auto_20211116_0831	2021-11-16 07:31:41.581891+00
38	announcement	0015_alter_newsletter_email	2021-11-16 09:14:25.835456+00
39	announcement	0016_auto_20211116_2205	2021-11-16 21:05:49.489167+00
40	announcement	0017_auto_20211118_1900	2021-11-18 21:23:08.447327+00
41	announcement	0018_rename_announcementimage_image	2021-11-18 21:23:08.481645+00
42	announcement	0019_auto_20211118_1928	2021-11-18 21:23:08.522913+00
43	announcement	0020_rename_imagee_eventtype_photo	2021-11-18 21:23:08.562018+00
44	announcement	0021_rename_category_servicecategory	2021-11-18 21:23:08.616523+00
45	account	0006_alter_user_image	2021-11-21 13:09:11.131707+00
46	account	0007_alter_user_image	2021-11-21 13:09:37.31013+00
47	announcement	0022_auto_20211122_2019	2021-11-22 19:21:59.659165+00
48	announcement	0023_alter_image_event_type	2021-11-22 19:21:59.689634+00
49	announcement	0024_alter_announcement_slug	2021-11-23 18:33:24.456716+00
53	announcement	0025_alter_announcement_slug	2021-11-25 18:07:11.872376+00
55	party_wizard	0002_delete_nowa	2021-11-25 20:09:55.760884+00
56	announcement	0026_alter_announcement_options	2021-11-27 18:38:47.414263+00
57	announcement	0027_alter_announcement_date	2021-11-27 22:40:39.564417+00
58	announcement	0028_image_is_main	2021-12-05 11:34:23.153449+00
59	party_wizard	0001_initial	2021-12-08 21:00:03.326844+00
60	party_wizard	0002_rename_test_formmodel_form_party	2021-12-08 21:00:03.335458+00
61	party_wizard	0003_auto_20211127_1830	2021-12-08 21:00:03.3701+00
62	announcement	0029_alter_image_image	2021-12-08 21:00:22.769747+00
63	announcement	0030_alter_image_is_main	2021-12-30 18:52:44.098622+00
64	party_wizard	0004_auto_20211228_1925	2021-12-30 18:52:44.180131+00
65	party_wizard	0005_formmodel_form_party	2021-12-30 18:52:44.199553+00
66	party_wizard	0006_alter_formmodel_form_party	2021-12-30 18:52:44.216446+00
67	announcement	0031_auto_20220102_1455	2022-01-02 13:56:10.042335+00
68	announcement	0032_movie_movie	2022-01-03 18:00:30.589756+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: lko
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
4dz42w7pgi9p9zk1rmt2lbnjow9kqczf	.eJxVjDsOwjAQBe_iGll21l9Kes5g7fqDA8iW4qRC3B0ipYD2zcx7sYDbWsM28hLmxM5MstPvRhgfue0g3bHdOo-9rctMfFf4QQe_9pSfl8P9O6g46rdWEI2gKDHZSEIXFARgJvIuR-FJFWc1gC4lKwJlVdHaa-nJTAhgjWPvD-nWN3Y:1mssLn:coDtrgoGN0Oay_JHhHKk-9BBKiiiYUNagk9v2PU0VJo	2021-12-16 20:06:39.790232+00
vpct0gq1ringvbxatl8v45o1r2gn6lu5	.eJxVjDsOwjAQBe_iGll21l9Kes5g7fqDA8iW4qRC3B0ipYD2zcx7sYDbWsM28hLmxM5MstPvRhgfue0g3bHdOo-9rctMfFf4QQe_9pSfl8P9O6g46rdWEI2gKDHZSEIXFARgJvIuR-FJFWc1gC4lKwJlVdHaa-nJTAhgjWPvD-nWN3Y:1mzOwS:OgiAA5_xhS3vtanI7DhcpcoZMC6T5ZJ93c4CQ87Sf44	2022-01-03 20:07:28.68617+00
i92x69hozf498ndvydvplul8wd83khre	.eJxVjDsOwjAQBe_iGll21l9Kes5g7fqDA8iW4qRC3B0ipYD2zcx7sYDbWsM28hLmxM5MstPvRhgfue0g3bHdOo-9rctMfFf4QQe_9pSfl8P9O6g46rdWEI2gKDHZSEIXFARgJvIuR-FJFWc1gC4lKwJlVdHaa-nJTAhgjWPvD-nWN3Y:1n32Ey:8dxw__NRqpkrhfijZW8JNVwjp2NzMo1Dnb7NG2I7DjI	2022-01-13 20:41:36.493465+00
wi617au4m147skaf1xuhn2y0vph1e8bj	.eJxVjDsOwjAQBe_iGll21l9Kes5g7fqDA8iW4qRC3B0ipYD2zcx7sYDbWsM28hLmxM5MstPvRhgfue0g3bHdOo-9rctMfFf4QQe_9pSfl8P9O6g46rdWEI2gKDHZSEIXFARgJvIuR-FJFWc1gC4lKwJlVdHaa-nJTAhgjWPvD-nWN3Y:1n5Rdm:0CsYlteXTe7aAT-eqQLffo-C-hM2hFYUCbFvPkW-MCM	2022-01-20 12:13:10.493676+00
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

SELECT pg_catalog.setval('public.announcement_announcement_event_type_id_seq', 54, true);


--
-- Name: announcement_announcement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.announcement_announcement_id_seq', 106, true);


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

SELECT pg_catalog.setval('public.announcement_image_id_seq', 166, true);


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

SELECT pg_catalog.setval('public.auth_permission_id_seq', 80, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 5, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 18, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 68, true);


--
-- Name: party_wizard_formmodel_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.party_wizard_formmodel_categories_id_seq', 1, false);


--
-- Name: party_wizard_formmodel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lko
--

SELECT pg_catalog.setval('public.party_wizard_formmodel_id_seq', 1, false);


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
-- PostgreSQL database dump complete
--

