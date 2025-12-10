--
-- PostgreSQL database dump
--

\restrict 4IEk6xkyKxqfMngXt5cRuqqP1o7b5AkkuVdPLZkHueFTecvx5pkJYquOPil0aua

-- Dumped from database version 17.6 (Ubuntu 17.6-2.pgdg24.04+1)
-- Dumped by pg_dump version 17.6 (Ubuntu 17.6-2.pgdg24.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: sales_salestatus_enum; Type: TYPE; Schema: public; Owner: kalil
--

CREATE TYPE public.sales_salestatus_enum AS ENUM (
    'PENDING',
    'COMPLETED',
    'CANCELED'
);


ALTER TYPE public.sales_salestatus_enum OWNER TO kalil;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories_backup; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.categories_backup (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.categories_backup OWNER TO kalil;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO kalil;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories_backup.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.categories (
    id integer DEFAULT nextval('public.categories_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.categories OWNER TO kalil;

--
-- Name: categories_id_seq1; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.categories_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq1 OWNER TO kalil;

--
-- Name: categories_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.categories_id_seq1 OWNED BY public.categories.id;


--
-- Name: payment_method; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.payment_method (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.payment_method OWNER TO kalil;

--
-- Name: payment_method_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.payment_method_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_method_id_seq OWNER TO kalil;

--
-- Name: payment_method_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.payment_method_id_seq OWNED BY public.payment_method.id;


--
-- Name: presentation_backup; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.presentation_backup (
    id integer NOT NULL,
    name character varying NOT NULL,
    price numeric(10,2) NOT NULL,
    description character varying NOT NULL,
    display boolean NOT NULL,
    image character varying,
    stock numeric NOT NULL,
    informacion_nutricional character varying NOT NULL,
    product integer,
    flavour character varying
);


ALTER TABLE public.presentation_backup OWNER TO kalil;

--
-- Name: presentation_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.presentation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.presentation_id_seq OWNER TO kalil;

--
-- Name: presentation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.presentation_id_seq OWNED BY public.presentation_backup.id;


--
-- Name: presentation; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.presentation (
    id integer DEFAULT nextval('public.presentation_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    price numeric(10,2) NOT NULL,
    flavour character varying NOT NULL,
    description character varying NOT NULL,
    display boolean NOT NULL,
    image character varying,
    stock numeric NOT NULL,
    informacion_nutricional character varying NOT NULL,
    product integer
);


ALTER TABLE public.presentation OWNER TO kalil;

--
-- Name: presentation_id_seq1; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.presentation_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.presentation_id_seq1 OWNER TO kalil;

--
-- Name: presentation_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.presentation_id_seq1 OWNED BY public.presentation.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying NOT NULL,
    price numeric(10,2) NOT NULL,
    description character varying NOT NULL,
    image character varying,
    unidad character varying NOT NULL,
    stock numeric NOT NULL,
    unidad_venta numeric NOT NULL,
    purchase_price numeric,
    category_id integer,
    informacion_nutricional character varying,
    display_order numeric
);


ALTER TABLE public.product OWNER TO kalil;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_id_seq OWNER TO kalil;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: product_images_backup; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.product_images_backup (
    id integer NOT NULL,
    product_id integer NOT NULL,
    image_url character varying NOT NULL,
    alt_text character varying,
    display_order integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now(),
    presentation_id integer
);


ALTER TABLE public.product_images_backup OWNER TO kalil;

--
-- Name: product_images_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.product_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_images_id_seq OWNER TO kalil;

--
-- Name: product_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.product_images_id_seq OWNED BY public.product_images_backup.id;


--
-- Name: product_images; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.product_images (
    id integer DEFAULT nextval('public.product_images_id_seq'::regclass) NOT NULL,
    image_url character varying NOT NULL,
    alt_text character varying,
    display_order integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    product_id integer,
    presentation_id integer
);


ALTER TABLE public.product_images OWNER TO kalil;

--
-- Name: product_images_id_seq1; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.product_images_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_images_id_seq1 OWNER TO kalil;

--
-- Name: product_images_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.product_images_id_seq1 OWNED BY public.product_images.id;


--
-- Name: product_price_history; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.product_price_history (
    id integer NOT NULL,
    price numeric(10,2) NOT NULL,
    purchase_price numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "productId" integer
);


ALTER TABLE public.product_price_history OWNER TO kalil;

--
-- Name: product_price_history_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.product_price_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_price_history_id_seq OWNER TO kalil;

--
-- Name: product_price_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.product_price_history_id_seq OWNED BY public.product_price_history.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying DEFAULT ''::character varying NOT NULL,
    price numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    purchase_price numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    display boolean DEFAULT false NOT NULL,
    image character varying DEFAULT ''::character varying,
    stock numeric DEFAULT '0'::numeric NOT NULL,
    unidad_venta numeric DEFAULT '1'::numeric NOT NULL,
    unidad character varying DEFAULT 'u'::character varying NOT NULL,
    highlight character varying DEFAULT ''::character varying NOT NULL,
    informacion_nutricional character varying DEFAULT ''::character varying NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    discount integer DEFAULT 0 NOT NULL,
    category character varying DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.products OWNER TO kalil;

--
-- Name: products_backup; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.products_backup (
    id integer DEFAULT nextval('public.product_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    price numeric(10,2) NOT NULL,
    description character varying NOT NULL,
    image character varying,
    unidad character varying NOT NULL,
    stock numeric NOT NULL,
    unidad_venta numeric NOT NULL,
    purchase_price numeric,
    informacion_nutricional character varying,
    display_order numeric,
    display boolean NOT NULL,
    category character varying,
    discount integer,
    highlight character varying(20)
);


ALTER TABLE public.products_backup OWNER TO kalil;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO kalil;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: sale_details; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.sale_details (
    id integer NOT NULL,
    quantity integer NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    product_id integer,
    sale_id integer,
    presentation_id integer,
    unit_price numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    discount numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    purchase_price numeric(10,2) DEFAULT '0'::numeric NOT NULL
);


ALTER TABLE public.sale_details OWNER TO kalil;

--
-- Name: sale_details_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.sale_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sale_details_id_seq OWNER TO kalil;

--
-- Name: sale_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.sale_details_id_seq OWNED BY public.sale_details.id;


--
-- Name: sale_status; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.sale_status (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.sale_status OWNER TO kalil;

--
-- Name: sale_status_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.sale_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sale_status_id_seq OWNER TO kalil;

--
-- Name: sale_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.sale_status_id_seq OWNED BY public.sale_status.id;


--
-- Name: sales; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.sales (
    id integer NOT NULL,
    total numeric(10,2) NOT NULL,
    shipping integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "paymentMethod" character varying NOT NULL,
    user_id integer,
    "saleStatus" public.sales_salestatus_enum DEFAULT 'PENDING'::public.sales_salestatus_enum NOT NULL,
    known_client boolean DEFAULT false NOT NULL,
    "paymentChannel" character varying DEFAULT 'Local'::character varying
);


ALTER TABLE public.sales OWNER TO kalil;

--
-- Name: sales_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.sales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sales_id_seq OWNER TO kalil;

--
-- Name: sales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.sales_id_seq OWNED BY public.sales.id;


--
-- Name: shifts; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.shifts (
    id integer NOT NULL,
    "startTime" timestamp without time zone NOT NULL,
    "endTime" timestamp without time zone NOT NULL,
    notes character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer
);


ALTER TABLE public.shifts OWNER TO kalil;

--
-- Name: shifts_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.shifts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shifts_id_seq OWNER TO kalil;

--
-- Name: shifts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.shifts_id_seq OWNED BY public.shifts.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying NOT NULL,
    surname character varying NOT NULL,
    address character varying NOT NULL,
    mail character varying NOT NULL,
    phone character varying,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO kalil;

--
-- Name: user_activity; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.user_activity (
    id integer NOT NULL,
    action character varying NOT NULL,
    metadata json,
    ip character varying,
    "userAgent" character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer
);


ALTER TABLE public.user_activity OWNER TO kalil;

--
-- Name: user_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.user_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_activity_id_seq OWNER TO kalil;

--
-- Name: user_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.user_activity_id_seq OWNED BY public.user_activity.id;


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO kalil;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: users_backup; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.users_backup (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    mail character varying(255) NOT NULL,
    phone character varying(255),
    password character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    address jsonb,
    role character varying(50) DEFAULT 'user'::character varying NOT NULL
);


ALTER TABLE public.users_backup OWNER TO kalil;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO kalil;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users_backup.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.users (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    name character varying,
    surname character varying,
    address jsonb NOT NULL,
    mail character varying NOT NULL,
    phone character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'user'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO kalil;

--
-- Name: users_id_seq1; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.users_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq1 OWNER TO kalil;

--
-- Name: users_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.users_id_seq1 OWNED BY public.users.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: kalil
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL,
    surname character varying NOT NULL,
    address character varying NOT NULL,
    mail character varying NOT NULL,
    phone character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.usuarios OWNER TO kalil;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: kalil
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO kalil;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kalil
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: categories_backup id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.categories_backup ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: payment_method id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.payment_method ALTER COLUMN id SET DEFAULT nextval('public.payment_method_id_seq'::regclass);


--
-- Name: presentation_backup id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.presentation_backup ALTER COLUMN id SET DEFAULT nextval('public.presentation_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: product_images_backup id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.product_images_backup ALTER COLUMN id SET DEFAULT nextval('public.product_images_id_seq'::regclass);


--
-- Name: product_price_history id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.product_price_history ALTER COLUMN id SET DEFAULT nextval('public.product_price_history_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: sale_details id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.sale_details ALTER COLUMN id SET DEFAULT nextval('public.sale_details_id_seq'::regclass);


--
-- Name: sale_status id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.sale_status ALTER COLUMN id SET DEFAULT nextval('public.sale_status_id_seq'::regclass);


--
-- Name: sales id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.sales ALTER COLUMN id SET DEFAULT nextval('public.sales_id_seq'::regclass);


--
-- Name: shifts id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.shifts ALTER COLUMN id SET DEFAULT nextval('public.shifts_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: user_activity id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.user_activity ALTER COLUMN id SET DEFAULT nextval('public.user_activity_id_seq'::regclass);


--
-- Name: users_backup id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.users_backup ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.categories (id, name) FROM stdin;
1	frutos secos
2	frutas disecadas
3	cereales
4	chocolates
6	verduras deshidratadas
7	especias
8	pimientas y sales
9	hierbas y yuyos
10	harinas
11	legumbres
12	semillas
13	suplementos deportivos
5	reposteria
14	frutos secos con chocolate
\.


--
-- Data for Name: categories_backup; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.categories_backup (id, name) FROM stdin;
1	frutos secos
2	frutas disecadas
3	cereales
4	chocolates
6	verduras deshidratadas
7	especias
8	pimientas y sales
9	hierbas y yuyos
10	harinas
11	legumbres
12	semillas
13	suplementos deportivos
5	reposteria
14	frutos secos con chocolate
\.


--
-- Data for Name: payment_method; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.payment_method (id, name) FROM stdin;
1	Efectivo
4	Transferencia
5	Tarjeta de Debito
6	Tarjeta de Credito
7	Credito
8	Mercaderia
9	Regalo
10	Donacion
11	Promo
2	Link de Pago
3	QR
\.


--
-- Data for Name: presentation; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.presentation (id, name, price, flavour, description, display, image, stock, informacion_nutricional, product) FROM stdin;
96	Mermelada de Rosa Mosqueta - "El Brocal" 420g	3990.00	Rosa Mosqueta	a	f	rosehip_jam	12	a	453
93	Mermelada de Tomate - "El Brocal" 420g	3990.00	Tomate	a	t	tomato_jam	12	a	453
94	Mermelada de Higo - "El Brocal" 420g	3590.00	Higo	a	t	fig_jam	12	a	453
95	Mermelada de Ciruela y Naranja - "El Brocal" 420g	3490.00	Ciruela y Naranja	a	t	plum_orange_jam	12	a	453
97	Mermelada Light de Frutilla - "El Brocal" 400g	4990.00	Frutilla	a	t	strawberry_light_jam	12	a	454
98	Mermelada Light de Durazno - "El Brocal" 400g	3990.00	Durazno	a	t	peach_light_jam	12	a	454
99	Mermelada Light de Naranja Inglesa - "El Brocal" 400g	3990.00	Naranja Inglesa	a	t	orange_light_jam	12	a	454
100	Mermelada Light de Ciruela - "El Brocal" 400g	3990.00	Ciruela	a	t	plum_light_jam	12	a	454
101	Mermelada Light de Pera - "El Brocal" 400g	3990.00	Pera	a	t	pear_light_jam	12	a	454
102	Mermelada Light de Membrillo - "El Brocal" 400g	3990.00	Membrillo	a	t	quince_light_jam	12	a	454
103	Mermelada Diet de Arándanos - "El Brocal" 200g	3790.00	Arándanos	a	t	blueberry_diet_jam	12	a	455
104	Mermelada Diet de Frutos Rojos - "El Brocal" 200g	3890.00	Frutos Rojos	a	t	red_fruits_diet_jam	12	a	455
112	Whey Protein Chocolate - 1kg Gentech	29990.00	Chocolate	a	t	chocolate_whey	2	a	458
113	Whey Protein Vainilla - 1kg Gentech	29990.00	Vainilla	a	t	vanilla_whey	2	a	458
115	Whey Protein Banana - 1kg Gentech	29990.00	Banana	a	t	banana_whey	2	a	458
114	Whey Protein Frutilla - 1kg Gentech	29990.00	Frutilla	a	f	strawberry_whey	2	a	458
106	Iron Bar Frutilla - Gentech	990.00	Frutilla	a	t	strawberry_iron_bar	20	a	\N
105	Iron Bar Chocolate - Gentech	990.00	Chocolate	a	t	chocolate_iron_bar	20	a	\N
107	Iron Bar Menta - Gentech	990.00	Menta	a	t	mint_iron_bar	20	a	\N
108	Iron Bar Limón - Gentech	990.00	Limón	a	t	lemon_iron_bar	20	a	\N
110	Iron Bar Cookies - Gentech	990.00	Cookies	a	t	cookies_iron_bar	20	a	\N
111	Iron Bar Coco - Gentech	990.00	Coco	a	t	coconut_iron_bar	20	a	\N
109	Iron Bar Dulce de Leche - Gentech	990.00	Dulce de Leche	a	t	ddl_iron_bar	20	a	\N
\.


--
-- Data for Name: presentation_backup; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.presentation_backup (id, name, price, description, display, image, stock, informacion_nutricional, product, flavour) FROM stdin;
96	Mermelada de Rosa Mosqueta - "El Brocal" 420g	3990.00	a	f	rosehip_jam	12	a	453	Rosa Mosqueta
93	Mermelada de Tomate - "El Brocal" 420g	3990.00	a	t	tomato_jam	12	a	453	Tomate
94	Mermelada de Higo - "El Brocal" 420g	3590.00	a	t	fig_jam	12	a	453	Higo
95	Mermelada de Ciruela y Naranja - "El Brocal" 420g	3490.00	a	t	plum_orange_jam	12	a	453	Ciruela y Naranja
97	Mermelada Light de Frutilla - "El Brocal" 400g	4990.00	a	t	strawberry_light_jam	12	a	454	Frutilla
98	Mermelada Light de Durazno - "El Brocal" 400g	3990.00	a	t	peach_light_jam	12	a	454	Durazno
99	Mermelada Light de Naranja Inglesa - "El Brocal" 400g	3990.00	a	t	orange_light_jam	12	a	454	Naranja Inglesa
100	Mermelada Light de Ciruela - "El Brocal" 400g	3990.00	a	t	plum_light_jam	12	a	454	Ciruela
101	Mermelada Light de Pera - "El Brocal" 400g	3990.00	a	t	pear_light_jam	12	a	454	Pera
102	Mermelada Light de Membrillo - "El Brocal" 400g	3990.00	a	t	quince_light_jam	12	a	454	Membrillo
103	Mermelada Diet de Arándanos - "El Brocal" 200g	3790.00	a	t	blueberry_diet_jam	12	a	455	Arándanos
104	Mermelada Diet de Frutos Rojos - "El Brocal" 200g	3890.00	a	t	red_fruits_diet_jam	12	a	455	Frutos Rojos
112	Whey Protein Chocolate - 1kg Gentech	29990.00	a	t	chocolate_whey	2	a	458	Chocolate
113	Whey Protein Vainilla - 1kg Gentech	29990.00	a	t	vanilla_whey	2	a	458	Vainilla
115	Whey Protein Banana - 1kg Gentech	29990.00	a	t	banana_whey	2	a	458	Banana
114	Whey Protein Frutilla - 1kg Gentech	29990.00	a	f	strawberry_whey	2	a	458	Frutilla
106	Iron Bar Frutilla - Gentech	990.00	a	t	strawberry_iron_bar	20	a	\N	Frutilla
105	Iron Bar Chocolate - Gentech	990.00	a	t	chocolate_iron_bar	20	a	\N	Chocolate
107	Iron Bar Menta - Gentech	990.00	a	t	mint_iron_bar	20	a	\N	Menta
108	Iron Bar Limón - Gentech	990.00	a	t	lemon_iron_bar	20	a	\N	Limón
110	Iron Bar Cookies - Gentech	990.00	a	t	cookies_iron_bar	20	a	\N	Cookies
111	Iron Bar Coco - Gentech	990.00	a	t	coconut_iron_bar	20	a	\N	Coco
109	Iron Bar Dulce de Leche - Gentech	990.00	a	t	ddl_iron_bar	20	a	\N	Dulce de Leche
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.product (id, name, price, description, image, unidad, stock, unidad_venta, purchase_price, category_id, informacion_nutricional, display_order) FROM stdin;
41	Almendra Nom Pareil	1990.00		almond	gr	10000	100	\N	1	Porción 30 g: Valor energético: 185 Kcal=774 kJ; Carbohidratos: 1,3g; Proteínas: 6,6 g; Grasas Totales: 17g (Saturadas: 1,2g; Trans: 0); Fibra Alimentaria: 3,6g.	1
44	Castañas de Cajú W4 Enteras	1690.00		cashew_nut	gr	22680	100	\N	1	Porción 28 g: Valor energético: 157 Kcal; Carbohidratos: 8,6 g; Proteínas: 5,2 g; Grasas Totales: 12 g (Saturadas: 2,2 g); Fibra Alimentaria: 0,9 g.	1
57	Almohaditas de Manzana y Canela - Granix	990.00		apple_pillow	gr	4000	250	\N	3	Porción 30 g: Valor energético: 130 Kcal=544 kJ; Carbohidratos: 27 g; Proteínas: 2 g; Grasas Totales: 3 g (Saturadas: 0.5 g; Trans: 0); Fibra Alimentaria: 1.5 g.	12
64	Mix (Pera - Damasco - Ciruela - Durazno)	2790.00		mix	gr	5000	250	\N	2	Porción 30 g: Valor energético: 80 Kcal=336 kJ; Carbohidratos: 21g; Proteínas: 0g; Grasas Totales: 0g (Saturadas: 0g; Trans: 0); Fibra Alimentaria: 3g.	2
45	Maní con Cáscara	1190.00		peanut	gr	20000	250	\N	1	Porción 30 g: Valor energético: 160 Kcal; Carbohidratos: 6g; Proteínas: 7g; Grasas Totales: 14g (Saturadas: 2g; Trans: 0g); Fibra Alimentaria: 2g.	1
53	Nuez Mariposa Extra Light	1990.00		walnut	gr	10000	100	\N	1	Porción 30 g: Valor energético: 200 Kcal=837 kJ; Carbohidratos: 4 g; Proteínas: 5 g; Grasas Totales: 20 g (Saturadas: 2 g; Trans: 0); Fibra Alimentaria: 2 g.	8
67	Aritos con Miel - Granix	1690.00		honey_rounds	gr	3000	250	\N	3	Porción 30 g: Valor energético: 120 Kcal=504 kJ; Carbohidratos: 25g; Proteínas: 2g; Grasas Totales: 3g (Saturadas: 0g; Trans: 0); Fibra Alimentaria: 1g.	3
60	Ciruela Presidente sin carozo	990.00		plum	gr	5000	100	\N	2	Porción 30 g: Valor energético: 95 Kcal=398 kJ; Carbohidratos: 22 g; Proteínas: 1 g; Grasas Totales: 0 g (Saturadas: 0 g; Trans: 0); Fibra Alimentaria: 2 g.	15
42	Arándanos Rojos Deshidratados	1590.00		cranberry	gr	11000	100	\N	2	Porción 40 g: Valor energético: 123 Kcal; Carbohidratos: 33 g; Azúcares: 29 g; Proteínas: 0 g; Grasas Totales: 0 g; Fibra Alimentaria: 2 g.	1
43	Avellana Pelada Grande	2990.00		hazelnut	gr	10000	100	\N	1	Porción 28 g: Valor energético: 176 Kcal; Carbohidratos: 4,7 g; Proteínas: 4,2 g; Grasas Totales: 17 g (Saturadas: 1,3 g); Fibra Alimentaria: 2,7 g.	1
46	Maní Tostado	990.00		peeled_peanut	gr	25000	100	\N	1	Porción 30 g: Valor energético: 166 Kcal; Carbohidratos: 6g; Proteínas: 7g; Grasas Totales: 14g (Saturadas: 2g; Trans: 0g); Fibra Alimentaria: 2g.	2
48	Pistacho Tostado y Salado	3590.00		pistachio	gr	11340	100	\N	1	Porción 30 g: Valor energético: 160 Kcal=669 kJ; Carbohidratos: 8 g; Proteínas: 6 g; Grasas Totales: 13 g (Saturadas: 1.5 g; Trans: 0); Fibra Alimentaria: 3 g.	3
55	Almohaditas rellenas de Frutilla - Granix	990.00		strawberry_pillow	gr	4000	100	\N	3	Porción 30 g: Valor energético: 120 Kcal=502 kJ; Carbohidratos: 25 g; Proteínas: 2 g; Grasas Totales: 2 g (Saturadas: 0.5 g; Trans: 0); Fibra Alimentaria: 1 g.	10
50	Pasta de Maní "Nogales"	2990.00		peanut_cream	unidad	10	1	\N	1	Porción 30 g: Valor energético: 190 Kcal=795 kJ; Carbohidratos: 6 g; Proteínas: 7 g; Grasas Totales: 16 g (Saturadas: 3 g; Trans: 0); Fibra Alimentaria: 2 g.	5
47	Maní Tostado y Salado	990.00		salty_peanut	gr	25000	250	\N	1	Porción 30 g: Valor energético: 170 Kcal=711 kJ; Carbohidratos: 6 g; Proteínas: 7 g; Grasas Totales: 14 g (Saturadas: 2 g; Trans: 0); Fibra Alimentaria: 2 g.	2
65	Dátiles sin carozo	1390.00		date	gr	5000	100	\N	2	Porción 30 g: Valor energético: 85 Kcal=356 kJ; Carbohidratos: 23g; Proteínas: 1g; Grasas Totales: 0g (Saturadas: 0g; Trans: 0); Fibra Alimentaria: 3g.	2
62	Durazno Grande (mitades)	1590.00		peach	gr	5000	100	\N	2	Porción 30 g: Valor energético: 70 Kcal=294 kJ; Carbohidratos: 18g; Proteínas: 0g; Grasas Totales: 0g (Saturadas: 0g; Trans: 0); Fibra Alimentaria: 2g.	2
54	Nuez Pelada PECAN	2590.00		pecan	gr	10000	100	\N	1	Porción 30 g: Valor energético: 210 Kcal=879 kJ; Carbohidratos: 4 g; Proteínas: 3 g; Grasas Totales: 22 g (Saturadas: 2 g; Trans: 0); Fibra Alimentaria: 3 g.	9
58	Kiwi en Rodajas	1590.00		kiwi	gr	20000	100	\N	2	Porción 30 g: Valor energético: 100 Kcal=418 kJ; Carbohidratos: 23 g; Proteínas: 1 g; Grasas Totales: 0.5 g (Saturadas: 0 g; Trans: 0); Fibra Alimentaria: 2 g.	13
59	Chips de Banana	990.00		banana	gr	6800	100	\N	2	Porción 30 g: Valor energético: 110 Kcal=460 kJ; Carbohidratos: 25 g; Proteínas: 1 g; Grasas Totales: 1 g (Saturadas: 0 g; Trans: 0); Fibra Alimentaria: 2 g.	14
56	Almohaditas de Chocolate y LImón - Granix	990.00		choco_pillow	gr	4000	100	\N	3	Porción 30 g: Valor energético: 125 Kcal=523 kJ; Carbohidratos: 26 g; Proteínas: 2 g; Grasas Totales: 2.5 g (Saturadas: 0.5 g; Trans: 0); Fibra Alimentaria: 1 g.	11
72	Poroto Negro	2990.00		black_bean	kg	25000	1	\N	11	Porción 30 g: Valor energético: 100 Kcal=420 kJ; Carbohidratos: 17g; Proteínas: 7g; Grasas Totales: 1g (Saturadas: 0g; Trans: 0); Fibra Alimentaria: 6g.	11
89	Albahaca Deshidratada	990.00		basil	gr	15000	50	\N	1	Porción 2g: Valor energético: 5 Kcal; Carbohidratos: 1g; Proteínas: 0.5g.	13
66	Dátiles con carozo	990.00		date	gr	5000	100	\N	2	Porción 30 g: Valor energético: 80 Kcal=336 kJ; Carbohidratos: 22g; Proteínas: 1g; Grasas Totales: 0g (Saturadas: 0g; Trans: 0); Fibra Alimentaria: 3g.	2
71	Harina de Algarroba	4990.00		carob	kg	25000	1	\N	10	Porción 30 g: Valor energético: 120 Kcal=504 kJ; Carbohidratos: 15g; Proteínas: 2g; Grasas Totales: 3g (Saturadas: 1g; Trans: 0); Fibra Alimentaria: 6g.	10
69	Melón en Cubo	1590.00		melon	gr	10000	100	\N	2	Porción 30 g: Valor energético: 80 Kcal=336 kJ; Carbohidratos: 21g; Proteínas: 1g; Grasas Totales: 0g (Saturadas: 0g; Trans: 0); Fibra Alimentaria: 2g.	2
76	Chips de Chocolate SemiAmargo	990.00		chocolate_chip	gr	6000	100	\N	5	Porción 30 g: Valor energético: 160 Kcal=672 kJ; Carbohidratos: 21g; Proteínas: 2g; Grasas Totales: 9g (Saturadas: 5g; Trans: 0); Fibra Alimentaria: 2g.	5
73	Aritos Frutados  - Granix	1690.00		fruit_round	gr	3000	250	\N	3	Porción 30 g: Valor energético: 110 Kcal=462 kJ; Carbohidratos: 23g; Proteínas: 2g; Grasas Totales: 3g (Saturadas: 0g; Trans: 0); Fibra Alimentaria: 1g.	3
74	Copos de Maíz sin Azúcar - Granix	990.00		pin	gr	3000	250	\N	3	Porción 30 g: Valor energético: 120 Kcal=504 kJ; Carbohidratos: 25g; Proteínas: 2g; Grasas Totales: 3g (Saturadas: 0g; Trans: 0); Fibra Alimentaria: 1g.	3
61	Coco Rallado Low Fat	990.00		coconut	gr	20000	100	\N	5	Porción 30 g: Valor energético: 140 Kcal=586 kJ; Carbohidratos: 3g; Proteínas: 1g; Grasas Totales: 14g (Saturadas: 11g; Trans: 0); Fibra Alimentaria: 9g.	1
91	Perejil Deshidratado FINO	1890.00		parsley	gr	25000	100	\N	1	Porción 1g: Valor energético: 3 Kcal; Carbohidratos: 0.5g.	15
83	Azucar Mascabo Rubia	990.00		brown_sugar	gr	25000	250	\N	1	Porción 4g: Valor energético: 15 Kcal; Carbohidratos: 4g; Azúcares: 3g.	7
86	Stevia Liquida Clasica	3990.00		pin	u	12	100	\N	1	Porción 5 gotas: Valor energético: 0 Kcal; Carbohidratos: 0g; Azúcares: 0g.	10
82	Polvo para Hornear	690.00		baking_powder	gr	20000	100	\N	1	Porción 5g: Valor energético: 10 Kcal; Carbohidratos: 2g; Proteínas: 0g; Grasas Totales: 0g; Sodio: 130mg.	6
84	Azucar Impalpable	790.00		powdered_sugar	gr	25000	250	\N	1	Porción 4g: Valor energético: 16 Kcal; Carbohidratos: 4g; Azúcares: 4g.	8
85	Azucar Negra	890.00		brown_sugar	gr	10000	250	\N	1	Porción 4g: Valor energético: 16 Kcal; Carbohidratos: 4g; Azúcares: 4g.	9
88	Ajo en Polvo	990.00		garlic	gr	25000	50	\N	1	Porción 3g: Valor energético: 10 Kcal; Carbohidratos: 2g; Proteínas: 0.5g.	12
92	Tomate Rojo Deshidratado	1990.00		tomato	gr	10000	100	\N	1	Porción 10g: Valor energético: 32 Kcal; Carbohidratos: 7g; Proteínas: 1.5g.	16
93	Aji Molido Premium (importado)	1990.00		chili	gr	25000	100	\N	1	Porción 2g: Valor energético: 6 Kcal; Carbohidratos: 1g.	17
63	Pera Williams	990.00		pear	gr	5000	100	\N	2	Porción 30 g: Valor energético: 50 Kcal=210 kJ; Carbohidratos: 13g; Proteínas: 0g; Grasas Totales: 0g (Saturadas: 0g; Trans: 0); Fibra Alimentaria: 2g.	2
51	Pasas de Uva Rubias Sin Semilla	990.00		blonde_raisin	gr	10000	100	\N	2	Porción 30 g: Valor energético: 90 Kcal=377 kJ; Carbohidratos: 22 g; Proteínas: 1 g; Grasas Totales: 0 g (Saturadas: 0 g; Trans: 0); Fibra Alimentaria: 1 g.	6
52	Pasas de Uva Jumbo Sin Semilla	890.00		raisin	gr	10000	100	\N	2	Porción 30 g: Valor energético: 85 Kcal=356 kJ; Carbohidratos: 20 g; Proteínas: 1 g; Grasas Totales: 0 g (Saturadas: 0 g; Trans: 0); Fibra Alimentaria: 1.5 g.	7
79	Cacao en Polvo	1690.00		cocoa	gr	25000	100	\N	5	Porción 30 g: Valor energético: 120 Kcal=504 kJ; Carbohidratos: 15g; Proteínas: 3g; Grasas Totales: 6g (Saturadas: 4g; Trans: 0); Fibra Alimentaria: 5g.	5
87	Cebolla Deshidratada AHUMADA	1990.00		pin	gr	10000	100	\N	1	Porción 10g: Valor energético: 36 Kcal; Carbohidratos: 8g; Proteínas: 1g.	11
97	Nuez Moscada Molida - Premium	2990.00		nutmeg	gr	5000	100	\N	1	Porción 2g: Valor energético: 14 Kcal; Carbohidratos: 1.5g.	21
98	Oregano Premium	990.00		oregano	gr	15000	50	\N	7	Porción 2g: Valor energético: 5 Kcal; Carbohidratos: 1g.	22
99	Paprika - Premium	1990.00		paprika	gr	25000	100	\N	7	Porción 2g: Valor energético: 6 Kcal; Carbohidratos: 1.2g.	23
101	Pimienta Blanca Molida Pura	2990.00		white_pepper	gr	1000	50	\N	7	Porción 2g: Valor energético: 6 Kcal; Carbohidratos: 1g.	25
102	Pimienta Negra Molida Pura	2490.00		pepper	gr	25000	50	\N	7	Porción 2g: Valor energético: 6 Kcal; Carbohidratos: 1.1g.	26
103	Curry Suave	1490.00		curry	gr	25000	100	\N	7	Porción 2g: Valor energético: 6 Kcal; Carbohidratos: 1.5g.	27
104	Avena Arrollada - Mediana	2690.00		oatmeal	kg	25000	1	\N	3	Porción 30g: Valor energético: 114 Kcal; Carbohidratos: 20g; Proteínas: 4g.	28
111	Poroto de Soja	2990.00		soybean	kg	25000	1	\N	2		31
112	Soja Texturizada	2390.00		textured_soy	kg	20000	1	\N	2		32
113	Garbanzo	2990.00		chickpea	kg	25000	1	\N	2		33
114	Fécula de mandioca	1990.00		cassava_starch	kg	25000	1	\N	1		1
116	Harina de ARROZ	2490.00		rice_flour	kg	25000	1	\N	1		3
117	Harina de AVENA	2990.00		oatmeal_powder	kg	25000	1	\N	1		4
119	Harina Paraguaya	2690.00		paraguaya	kg	25000	1	\N	1		6
120	Harina de Maiz AMARILLO Precocida P.A.N	2890.00		white_pan	packs	3000	1	\N	1		7
121	Harina de Maiz BLANCO Precocida P.A.N.	2890.00		yellow_pan	packs	3000	1	\N	1		8
122	Semillas de Chia	1490.00		chia_seeds	gr	0	250	\N	3		17
123	Semillas de Girasol Pelado	990.00		sunflower_seeds	gr	0	250	\N	3		18
124	Semillas de Quinoa - nacional	1990.00		quinoa_seeds	gr	25000	250	\N	3		19
125	Semillas de Sesamo Integral	990.00		sesame_seeds	gr	25000	250	\N	3		20
126	Aceite de Coco Neutro "Cosaco"	3990.00		coconut_oil	unidades	10000	1	\N	4		21
143	Ruda	990.00		\N	gr	1000	50	\N	6		38
107	Arroz Largo Fino Integral	2990.00		rice	kg	30000	1	\N	11	Porción 50g: Valor energético: 180 Kcal; Carbohidratos: 38g; Proteínas: 4g.	30
106	Arroz Yamani Integral	1990.00		yamani	kg	30000	1	\N	11	Porción 50g: Valor energético: 180 Kcal; Carbohidratos: 38g; Proteínas: 4g.	30
105	Almidón de maiz MAIZENA	2990.00		maizena	kg	25000	1	\N	10	Porción 30g: Valor energético: 100 Kcal; Carbohidratos: 24g.	29
127	Salsa de Soja	2990.00		\N	unidad	12000	1	\N	4		22
94	Canela Molida - Premium	2990.00		cinnamon	gr	25000	100	\N	1	Porción 2g: Valor energético: 6 Kcal; Carbohidratos: 2g.	18
95	Cúrcuma Molida - Premium	1990.00		turmeric	gr	25000	100	\N	1	Porción 2g: Valor energético: 6 Kcal; Carbohidratos: 1.3g.	19
96	Jengibre Molido - Premium	1990.00		ginger	gr	25000	100	\N	1	Porción 2g: Valor energético: 6 Kcal; Carbohidratos: 1.5g.	20
115	Harina de Almendras con Piel	5990.00		almond_flour	kg	25000	1	\N	1		2
140	Moringa	1990.00		\N	gr	1000	50	\N	6		35
141	Poleo	990.00		\N	gr	20000	50	\N	6		36
128	Sal Fina del Himalaya	990.00		\N	gr	25000	250	\N	5		23
129	Sal Marina Gruesa	990.00		\N	gr	10000	250	\N	5		24
130	Boldo Entero	1890.00		\N	gr	1000	50	\N	6		25
131	Burrito	990.00		\N	gr	1000	50	\N	6		26
132	Carqueja	690.00		\N	gr	20000	50	\N	6		27
133	Cedron	990.00		\N	gr	1000	50	\N	6		28
134	Cola de Caballo	890.00		\N	gr	1000	50	\N	6		29
135	Eucalipto	890.00		\N	gr	20000	50	\N	6		30
136	Malva	890.00		\N	gr	1000	50	\N	6		31
137	Manzanilla en Flor	2790.00		\N	gr	1000	50	\N	6		32
138	Melisa	790.00		\N	gr	0	50	\N	6		33
144	Salvia	990.00		\N	gr	1000	50	\N	6		39
139	Menta en Hojas	990.00		\N	gr	60000	50	\N	6		34
142	Romero	990.00		\N	gr	1000	50	\N	6		37
145	Tomillo	890.00		\N	gr	1000	50	\N	6		40
146	Bicarbonato de Sodio - industrial	990.00		\N	gr	25000	100	\N	7		41
147	Almendra con Chocolate Negro	2990.00		\N	gr	6000	100	\N	8		42
108	Arvejas Enteras	1990.00		peas	kg	25000	1	\N	2		31
109	Lentejas	3990.00		lentils	kg	25000	1	\N	2		31
110	Maíz Pisingallo	2690.00		popcorn	kg	25000	1	\N	2		31
118	Harina INTEGRAL	1690.00		whole_wheat	kg	25000	1	\N	1		5
70	Manzana en Rodaja	990.00		apple	gr	10000	100	\N	2	Porción 30 g: Valor energético: 40 Kcal=168 kJ; Carbohidratos: 11g; Proteínas: 0g; Grasas Totales: 0g (Saturadas: 0g; Trans: 0); Fibra Alimentaria: 2g.	2
49	Maní Japonés	3590.00		japanese_peanut	gr	9000	250	\N	1	Porción 30 g: Valor energético: 180 Kcal=753 kJ; Carbohidratos: 5 g; Proteínas: 8 g; Grasas Totales: 15 g (Saturadas: 2.5 g; Trans: 0); Fibra Alimentaria: 2.5 g.	4
148	Pasa de Uva con Chocolate	1990.00		\N	kg	6000	100	\N	8		43
149	Mani con Chocolate	1690.00		\N	kg	6000	100	\N	8		44
\.


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.product_images (id, image_url, alt_text, display_order, created_at, product_id, presentation_id) FROM stdin;
1	honey_rounds	Aritos con Miel - GRANIX	1	2025-06-11 12:08:13.577515	375	\N
2	corn_flakes	Copos de Maíz sin Azucar - GRANIX	1	2025-06-11 12:08:13.577515	381	\N
3	brown_sugar	Azúcar Mascabo	1	2025-06-11 12:08:13.577515	385	\N
4	white_pepper	Pimienta Blanca Molida	1	2025-06-11 12:08:13.577515	404	\N
5	cinnamon	Canela Molida	1	2025-06-11 12:08:13.577515	398	\N
6	turmeric	Curcuma Molida	1	2025-06-11 12:08:13.577515	399	\N
7	ginger	Jengibre Molido	1	2025-06-11 12:08:13.577515	400	\N
8	chili	Ají Molido	1	2025-06-11 12:08:13.577515	397	\N
9	pepper	Pimienta Negra Molida	1	2025-06-11 12:08:13.577515	405	\N
10	mix	Mix (Peras - Damascos - Ciruelas - Medallones de Duraznos)	1	2025-06-11 12:08:13.577515	372	\N
11	melon	Melón en Cubo	1	2025-06-11 12:08:13.577515	376	\N
12	marine_salt	Sal Marina Gruesa	1	2025-06-11 12:08:13.577515	432	\N
13	peeled_peanut	Maní Tostado	1	2025-06-11 12:08:13.577515	354	\N
14	malva	Malva	1	2025-06-11 12:08:13.577515	439	\N
15	melisa	Melisa	1	2025-06-11 12:08:13.577515	441	\N
16	moringa	Moringa	1	2025-06-11 12:08:13.577515	443	\N
17	jam	Mermelada "El Brocal" 420g	1	2025-06-11 12:08:13.577515	453	\N
18	light_jam	Mermelada Light "El Brocal" 400g	1	2025-06-11 12:08:13.577515	454	\N
19	diet_jam	Mermelada Dietética "El Brocal" 220g	1	2025-06-11 12:08:13.577515	455	\N
20	honey	Miel "El Brocal" 500g	1	2025-06-11 12:08:13.577515	456	\N
21	omega	Omega 3 FIsh OIl - Gentech	1	2025-06-11 12:08:13.577515	464	\N
22	collagen	Colágeno Sport Fruit Punch - ENA 3 FIsh OIl - Gentech	1	2025-06-11 12:08:13.577515	465	\N
23	hazelnut	Avellana Pelada Grande	1	2025-06-11 12:08:13.577515	351	\N
24	pistachio	Pistacho Tostado y Salado	1	2025-06-11 12:08:13.577515	356	\N
25	spinach	Espinaca en Escamas	1	2025-06-11 12:08:13.577515	388	\N
26	choco_pillow	Bocaditos rellenos CHOCO Y LIMON	1	2025-06-11 12:08:13.577515	364	\N
27	apple_pillow	Bocaditos rellenos MANZANA Y CANELA	1	2025-06-11 12:08:13.577515	365	\N
28	walnut	Nuez Pelada Extra LIght	1	2025-06-11 12:08:13.577515	361	\N
29	pecan	Nuez Pelada PECAN	1	2025-06-11 12:08:13.577515	362	\N
30	rice	Arroz Largo Fino Integral	1	2025-06-11 12:08:13.577515	418	\N
31	coconut	Coco Rallado LOW FAT	1	2025-06-11 12:08:13.577515	369	\N
32	fruit_round	Aritos Frutados - GRANIX	1	2025-06-11 12:08:13.577515	380	\N
33	cocoa	Cacao en Polvo	1	2025-06-11 12:08:13.577515	383	\N
34	baking_powder	Polvo para Hornear	1	2025-06-11 12:08:13.577515	384	\N
35	laurel	Laurel en Hoja	1	2025-06-11 12:08:13.577515	393	\N
36	almond_flour	Harina de Almendras con Piel	1	2025-06-11 12:08:13.577515	410	\N
37	paraguaya	Harina Paraguaya	1	2025-06-11 12:08:13.577515	414	\N
38	powdered_sugar	Azúcar Impalpable	1	2025-06-11 12:08:13.577515	386	\N
39	brown_sugar	Azúcar Negra	1	2025-06-11 12:08:13.577515	387	\N
40	cashew_nut	Castañas de Cajú W4 Enteras	1	2025-06-11 12:08:13.577515	352	\N
41	stevia	Stevia Líquida "Trever" - 200ml	1	2025-06-11 12:08:13.577515	389	\N
42	curry	Curry Suave	1	2025-06-11 12:08:13.577515	406	\N
43	oatmeal	Avena Arrollada	1	2025-06-11 12:08:13.577515	407	\N
44	peas	Arvejas Enteras	1	2025-06-11 12:08:13.577515	419	\N
45	soybean	Poroto de Soja	1	2025-06-11 12:08:13.577515	422	\N
46	coconut_oil	Aceite de Coco Neutro "El Cosaco"	1	2025-06-11 12:08:13.577515	429	\N
47	himalayan_salt	Sal Fina del Himalaya	1	2025-06-11 12:08:13.577515	431	\N
48	rice_flour	Harina de Arroz	1	2025-06-11 12:08:13.577515	411	\N
49	chocolate_chip	Chips de Chocolate	1	2025-06-11 12:08:13.577515	382	\N
50	blonde_raisin	Pasas de Uvas Rubias sin Semilla	1	2025-06-11 12:08:13.577515	359	\N
51	kiwi	Kiwi en Rodajas	1	2025-06-11 12:08:13.577515	366	\N
52	banana	Chips de Banana	1	2025-06-11 12:08:13.577515	367	\N
53	plum	Ciruela Presidente SIN CAROZO	1	2025-06-11 12:08:13.577515	368	\N
54	peach	Durazno Grande (mitades)	1	2025-06-11 12:08:13.577515	370	\N
55	pear	Pera Williams	1	2025-06-11 12:08:13.577515	371	\N
56	cranberry	Arándanos Rojos Deshidratados	1	2025-06-11 12:08:13.577515	350	\N
57	date	Dátiles DEGLET NOUR sin/carozo	1	2025-06-11 12:08:13.577515	373	\N
58	basil	Albahaca Deshidratada	1	2025-06-11 12:08:13.577515	392	\N
59	tomato	Tomate Rojo Deshidratado	1	2025-06-11 12:08:13.577515	395	\N
60	onion	Cebolla Deshidratada Ahumada	1	2025-06-11 12:08:13.577515	390	\N
61	parsley	Perejil Deshidratado	1	2025-06-11 12:08:13.577515	394	\N
62	boldo	Boldo Entero	1	2025-06-11 12:08:13.577515	433	\N
63	donkey	Burrito	1	2025-06-11 12:08:13.577515	434	\N
64	carqueja	Carqueja	1	2025-06-11 12:08:13.577515	435	\N
65	cedron	Cedron	1	2025-06-11 12:08:13.577515	436	\N
66	cola_caballo	Cola de Caballo	1	2025-06-11 12:08:13.577515	437	\N
67	eucalipto	Eucalipto	1	2025-06-11 12:08:13.577515	438	\N
68	carob	Harina de Algarroba	1	2025-06-11 12:08:13.577515	378	\N
69	garlic	Ajo en Polvo	1	2025-06-11 12:08:13.577515	391	\N
70	poleo	Poleo	1	2025-06-11 12:08:13.577515	444	\N
71	romero	Romero	1	2025-06-11 12:08:13.577515	445	\N
72	ruda	Ruda	1	2025-06-11 12:08:13.577515	446	\N
73	salvia	Salvia	1	2025-06-11 12:08:13.577515	447	\N
74	tomillo	Tomillo	1	2025-06-11 12:08:13.577515	448	\N
75	ddl	Dulce de Leche "El Brocal" 450g	1	2025-06-11 12:08:13.577515	457	\N
76	low_carb	Protein Bar Low Carb	1	2025-06-11 12:08:13.577515	460	\N
77	date	Dátiles DEGLET NOUR con/carozo	1	2025-06-11 12:08:13.577515	374	\N
78	raisin	Pasas de Uvas Jumbo sin Semilla	1	2025-06-11 12:08:13.577515	360	\N
79	strawberry_pillow	Bocaditos rellenos FRUTILLA	1	2025-06-11 12:08:13.577515	363	\N
80	black_bean	Poroto negro	1	2025-06-11 12:08:13.577515	379	\N
81	oregano	Orégano	1	2025-06-11 12:08:13.577515	402	\N
82	paprika	Paprika	1	2025-06-11 12:08:13.577515	403	\N
83	oatmeal_powder	Harina de Avena	1	2025-06-11 12:08:13.577515	412	\N
84	whole_wheat	Harina Integral	1	2025-06-11 12:08:13.577515	413	\N
85	yamani	Arroz Yamaní Integral	1	2025-06-11 12:08:13.577515	417	\N
86	lentils	Lentejas	1	2025-06-11 12:08:13.577515	420	\N
87	textured_soy	Soja Texturizada	1	2025-06-11 12:08:13.577515	423	\N
88	chickpea	Garbanzos	1	2025-06-11 12:08:13.577515	424	\N
89	chia_seeds	Semillas de Chía	1	2025-06-11 12:08:13.577515	425	\N
90	quinoa_seeds	Semillas de Quinoa	1	2025-06-11 12:08:13.577515	427	\N
91	sesame_seeds	Semillas de Sésamo Integral	1	2025-06-11 12:08:13.577515	428	\N
93	saffron	Azafrán molido	1	2025-06-11 12:08:13.577515	396	\N
94	whey	Whey Protein - 7900 AFA - Gentech 1kg	1	2025-06-11 12:08:13.577515	458	\N
95	chocolate_almond	Almendras con Chocolate	1	2025-06-11 12:08:13.577515	450	\N
96	chocolate_raisin	Pasas de Uva con Chocolate	1	2025-06-11 12:08:13.577515	451	\N
97	sunflower_seeds	Semillas de Girasol Pelado	1	2025-06-11 12:08:13.577515	426	\N
98	soy_sauce	Salsa de Soja	1	2025-06-11 12:08:13.577515	430	\N
99	bicarbonate	Bicarbonato de Sodio	1	2025-06-11 12:08:13.577515	449	\N
100	almond	Almendras Non Pareil	1	2025-06-11 12:08:13.577515	349	\N
101	creatine	Creatina MonoHidrato - 500gr	1	2025-06-11 12:08:13.577515	459	\N
102	multivitamin	MultiVitamin Gentech - 60 tabs	1	2025-06-11 12:08:13.577515	462	\N
103	nutmeg	Nuez Moscada Molida	1	2025-06-11 12:08:13.577515	401	\N
104	popcorn	Maíz Pisingallo	1	2025-06-11 12:08:13.577515	421	\N
105	mint	Menta en Hojas	1	2025-06-11 12:08:13.577515	442	\N
106	salty_peanut	Maní Tostado y Salado	1	2025-06-11 12:08:13.577515	355	\N
107	japanese_peanut	Maní Japonés	1	2025-06-11 12:08:13.577515	357	\N
108	cassava_starch	Fécula de Mandioca	1	2025-06-11 12:08:13.577515	409	\N
109	apple	Manzana en Rodaja	1	2025-06-11 12:08:13.577515	377	\N
110	manzanilla	Manzanilla en Flor	1	2025-06-11 12:08:13.577515	440	\N
111	peanut	Maní con Cáscara Grande	1	2025-06-11 12:08:13.577515	353	\N
112	chocolate_peanut	Maní con Chocolate	1	2025-06-11 12:08:13.577515	452	\N
113	peanut_cream	Pasta de Maní "Nogales"	1	2025-06-11 12:08:13.577515	358	\N
114	white_pan	Harina de Maiz Amarillo - P.A.N	1	2025-06-11 12:08:13.577515	415	\N
115	maizena	Almidón de Maíz (Maizena)	1	2025-06-11 12:08:13.577515	408	\N
116	yellow_pan	Harina de Maiz Blanco - P.A.N.	1	2025-06-11 12:08:13.577515	416	\N
118	honey_rounds	maizen	1	2025-06-11 13:46:40.148077	408	\N
117	corn_flakes	maizen	1	2025-06-11 13:33:06.999744	408	\N
119	honey_rounds	maizen	1	2025-06-11 15:29:30.762364	408	93
120	honey_rounds	maizen	1	2025-06-11 15:29:40.519891	408	96
125	maizena	maizen	1	2025-06-11 15:30:32.489522	400	96
\.


--
-- Data for Name: product_images_backup; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.product_images_backup (id, product_id, image_url, alt_text, display_order, created_at, presentation_id) FROM stdin;
1	375	honey_rounds	Aritos con Miel - GRANIX	1	2025-06-11 12:08:13.577515	\N
2	381	corn_flakes	Copos de Maíz sin Azucar - GRANIX	1	2025-06-11 12:08:13.577515	\N
3	385	brown_sugar	Azúcar Mascabo	1	2025-06-11 12:08:13.577515	\N
4	404	white_pepper	Pimienta Blanca Molida	1	2025-06-11 12:08:13.577515	\N
5	398	cinnamon	Canela Molida	1	2025-06-11 12:08:13.577515	\N
6	399	turmeric	Curcuma Molida	1	2025-06-11 12:08:13.577515	\N
7	400	ginger	Jengibre Molido	1	2025-06-11 12:08:13.577515	\N
8	397	chili	Ají Molido	1	2025-06-11 12:08:13.577515	\N
9	405	pepper	Pimienta Negra Molida	1	2025-06-11 12:08:13.577515	\N
10	372	mix	Mix (Peras - Damascos - Ciruelas - Medallones de Duraznos)	1	2025-06-11 12:08:13.577515	\N
11	376	melon	Melón en Cubo	1	2025-06-11 12:08:13.577515	\N
12	432	marine_salt	Sal Marina Gruesa	1	2025-06-11 12:08:13.577515	\N
13	354	peeled_peanut	Maní Tostado	1	2025-06-11 12:08:13.577515	\N
14	439	malva	Malva	1	2025-06-11 12:08:13.577515	\N
15	441	melisa	Melisa	1	2025-06-11 12:08:13.577515	\N
16	443	moringa	Moringa	1	2025-06-11 12:08:13.577515	\N
17	453	jam	Mermelada "El Brocal" 420g	1	2025-06-11 12:08:13.577515	\N
18	454	light_jam	Mermelada Light "El Brocal" 400g	1	2025-06-11 12:08:13.577515	\N
19	455	diet_jam	Mermelada Dietética "El Brocal" 220g	1	2025-06-11 12:08:13.577515	\N
20	456	honey	Miel "El Brocal" 500g	1	2025-06-11 12:08:13.577515	\N
21	464	omega	Omega 3 FIsh OIl - Gentech	1	2025-06-11 12:08:13.577515	\N
22	465	collagen	Colágeno Sport Fruit Punch - ENA 3 FIsh OIl - Gentech	1	2025-06-11 12:08:13.577515	\N
23	351	hazelnut	Avellana Pelada Grande	1	2025-06-11 12:08:13.577515	\N
24	356	pistachio	Pistacho Tostado y Salado	1	2025-06-11 12:08:13.577515	\N
25	388	spinach	Espinaca en Escamas	1	2025-06-11 12:08:13.577515	\N
26	364	choco_pillow	Bocaditos rellenos CHOCO Y LIMON	1	2025-06-11 12:08:13.577515	\N
27	365	apple_pillow	Bocaditos rellenos MANZANA Y CANELA	1	2025-06-11 12:08:13.577515	\N
28	361	walnut	Nuez Pelada Extra LIght	1	2025-06-11 12:08:13.577515	\N
29	362	pecan	Nuez Pelada PECAN	1	2025-06-11 12:08:13.577515	\N
30	418	rice	Arroz Largo Fino Integral	1	2025-06-11 12:08:13.577515	\N
31	369	coconut	Coco Rallado LOW FAT	1	2025-06-11 12:08:13.577515	\N
32	380	fruit_round	Aritos Frutados - GRANIX	1	2025-06-11 12:08:13.577515	\N
33	383	cocoa	Cacao en Polvo	1	2025-06-11 12:08:13.577515	\N
34	384	baking_powder	Polvo para Hornear	1	2025-06-11 12:08:13.577515	\N
35	393	laurel	Laurel en Hoja	1	2025-06-11 12:08:13.577515	\N
36	410	almond_flour	Harina de Almendras con Piel	1	2025-06-11 12:08:13.577515	\N
37	414	paraguaya	Harina Paraguaya	1	2025-06-11 12:08:13.577515	\N
38	386	powdered_sugar	Azúcar Impalpable	1	2025-06-11 12:08:13.577515	\N
39	387	brown_sugar	Azúcar Negra	1	2025-06-11 12:08:13.577515	\N
40	352	cashew_nut	Castañas de Cajú W4 Enteras	1	2025-06-11 12:08:13.577515	\N
41	389	stevia	Stevia Líquida "Trever" - 200ml	1	2025-06-11 12:08:13.577515	\N
42	406	curry	Curry Suave	1	2025-06-11 12:08:13.577515	\N
43	407	oatmeal	Avena Arrollada	1	2025-06-11 12:08:13.577515	\N
44	419	peas	Arvejas Enteras	1	2025-06-11 12:08:13.577515	\N
45	422	soybean	Poroto de Soja	1	2025-06-11 12:08:13.577515	\N
46	429	coconut_oil	Aceite de Coco Neutro "El Cosaco"	1	2025-06-11 12:08:13.577515	\N
47	431	himalayan_salt	Sal Fina del Himalaya	1	2025-06-11 12:08:13.577515	\N
48	411	rice_flour	Harina de Arroz	1	2025-06-11 12:08:13.577515	\N
49	382	chocolate_chip	Chips de Chocolate	1	2025-06-11 12:08:13.577515	\N
50	359	blonde_raisin	Pasas de Uvas Rubias sin Semilla	1	2025-06-11 12:08:13.577515	\N
51	366	kiwi	Kiwi en Rodajas	1	2025-06-11 12:08:13.577515	\N
52	367	banana	Chips de Banana	1	2025-06-11 12:08:13.577515	\N
53	368	plum	Ciruela Presidente SIN CAROZO	1	2025-06-11 12:08:13.577515	\N
54	370	peach	Durazno Grande (mitades)	1	2025-06-11 12:08:13.577515	\N
55	371	pear	Pera Williams	1	2025-06-11 12:08:13.577515	\N
56	350	cranberry	Arándanos Rojos Deshidratados	1	2025-06-11 12:08:13.577515	\N
57	373	date	Dátiles DEGLET NOUR sin/carozo	1	2025-06-11 12:08:13.577515	\N
58	392	basil	Albahaca Deshidratada	1	2025-06-11 12:08:13.577515	\N
59	395	tomato	Tomate Rojo Deshidratado	1	2025-06-11 12:08:13.577515	\N
60	390	onion	Cebolla Deshidratada Ahumada	1	2025-06-11 12:08:13.577515	\N
61	394	parsley	Perejil Deshidratado	1	2025-06-11 12:08:13.577515	\N
62	433	boldo	Boldo Entero	1	2025-06-11 12:08:13.577515	\N
63	434	donkey	Burrito	1	2025-06-11 12:08:13.577515	\N
64	435	carqueja	Carqueja	1	2025-06-11 12:08:13.577515	\N
65	436	cedron	Cedron	1	2025-06-11 12:08:13.577515	\N
66	437	cola_caballo	Cola de Caballo	1	2025-06-11 12:08:13.577515	\N
67	438	eucalipto	Eucalipto	1	2025-06-11 12:08:13.577515	\N
68	378	carob	Harina de Algarroba	1	2025-06-11 12:08:13.577515	\N
69	391	garlic	Ajo en Polvo	1	2025-06-11 12:08:13.577515	\N
70	444	poleo	Poleo	1	2025-06-11 12:08:13.577515	\N
71	445	romero	Romero	1	2025-06-11 12:08:13.577515	\N
72	446	ruda	Ruda	1	2025-06-11 12:08:13.577515	\N
73	447	salvia	Salvia	1	2025-06-11 12:08:13.577515	\N
74	448	tomillo	Tomillo	1	2025-06-11 12:08:13.577515	\N
75	457	ddl	Dulce de Leche "El Brocal" 450g	1	2025-06-11 12:08:13.577515	\N
76	460	low_carb	Protein Bar Low Carb	1	2025-06-11 12:08:13.577515	\N
77	374	date	Dátiles DEGLET NOUR con/carozo	1	2025-06-11 12:08:13.577515	\N
78	360	raisin	Pasas de Uvas Jumbo sin Semilla	1	2025-06-11 12:08:13.577515	\N
79	363	strawberry_pillow	Bocaditos rellenos FRUTILLA	1	2025-06-11 12:08:13.577515	\N
80	379	black_bean	Poroto negro	1	2025-06-11 12:08:13.577515	\N
81	402	oregano	Orégano	1	2025-06-11 12:08:13.577515	\N
82	403	paprika	Paprika	1	2025-06-11 12:08:13.577515	\N
83	412	oatmeal_powder	Harina de Avena	1	2025-06-11 12:08:13.577515	\N
84	413	whole_wheat	Harina Integral	1	2025-06-11 12:08:13.577515	\N
85	417	yamani	Arroz Yamaní Integral	1	2025-06-11 12:08:13.577515	\N
86	420	lentils	Lentejas	1	2025-06-11 12:08:13.577515	\N
87	423	textured_soy	Soja Texturizada	1	2025-06-11 12:08:13.577515	\N
88	424	chickpea	Garbanzos	1	2025-06-11 12:08:13.577515	\N
89	425	chia_seeds	Semillas de Chía	1	2025-06-11 12:08:13.577515	\N
90	427	quinoa_seeds	Semillas de Quinoa	1	2025-06-11 12:08:13.577515	\N
91	428	sesame_seeds	Semillas de Sésamo Integral	1	2025-06-11 12:08:13.577515	\N
93	396	saffron	Azafrán molido	1	2025-06-11 12:08:13.577515	\N
94	458	whey	Whey Protein - 7900 AFA - Gentech 1kg	1	2025-06-11 12:08:13.577515	\N
95	450	chocolate_almond	Almendras con Chocolate	1	2025-06-11 12:08:13.577515	\N
96	451	chocolate_raisin	Pasas de Uva con Chocolate	1	2025-06-11 12:08:13.577515	\N
97	426	sunflower_seeds	Semillas de Girasol Pelado	1	2025-06-11 12:08:13.577515	\N
98	430	soy_sauce	Salsa de Soja	1	2025-06-11 12:08:13.577515	\N
99	449	bicarbonate	Bicarbonato de Sodio	1	2025-06-11 12:08:13.577515	\N
100	349	almond	Almendras Non Pareil	1	2025-06-11 12:08:13.577515	\N
101	459	creatine	Creatina MonoHidrato - 500gr	1	2025-06-11 12:08:13.577515	\N
102	462	multivitamin	MultiVitamin Gentech - 60 tabs	1	2025-06-11 12:08:13.577515	\N
103	401	nutmeg	Nuez Moscada Molida	1	2025-06-11 12:08:13.577515	\N
104	421	popcorn	Maíz Pisingallo	1	2025-06-11 12:08:13.577515	\N
105	442	mint	Menta en Hojas	1	2025-06-11 12:08:13.577515	\N
106	355	salty_peanut	Maní Tostado y Salado	1	2025-06-11 12:08:13.577515	\N
107	357	japanese_peanut	Maní Japonés	1	2025-06-11 12:08:13.577515	\N
108	409	cassava_starch	Fécula de Mandioca	1	2025-06-11 12:08:13.577515	\N
109	377	apple	Manzana en Rodaja	1	2025-06-11 12:08:13.577515	\N
110	440	manzanilla	Manzanilla en Flor	1	2025-06-11 12:08:13.577515	\N
111	353	peanut	Maní con Cáscara Grande	1	2025-06-11 12:08:13.577515	\N
112	452	chocolate_peanut	Maní con Chocolate	1	2025-06-11 12:08:13.577515	\N
113	358	peanut_cream	Pasta de Maní "Nogales"	1	2025-06-11 12:08:13.577515	\N
114	415	white_pan	Harina de Maiz Amarillo - P.A.N	1	2025-06-11 12:08:13.577515	\N
115	408	maizena	Almidón de Maíz (Maizena)	1	2025-06-11 12:08:13.577515	\N
116	416	yellow_pan	Harina de Maiz Blanco - P.A.N.	1	2025-06-11 12:08:13.577515	\N
118	408	honey_rounds	maizen	1	2025-06-11 13:46:40.148077	\N
117	408	corn_flakes	maizen	1	2025-06-11 13:33:06.999744	\N
119	408	honey_rounds	maizen	1	2025-06-11 15:29:30.762364	93
120	408	honey_rounds	maizen	1	2025-06-11 15:29:40.519891	96
125	400	maizena	maizen	1	2025-06-11 15:30:32.489522	96
\.


--
-- Data for Name: product_price_history; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.product_price_history (id, price, purchase_price, created_at, "productId") FROM stdin;
1	6000.00	4000.00	2025-12-08 19:31:44.852867	1
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.products (id, name, price, purchase_price, description, display, image, stock, unidad_venta, unidad, highlight, informacion_nutricional, display_order, discount, category) FROM stdin;
404	Pimienta Blanca Molida	2999.00	11200.00	a	t	white_pepper	1	50	gr	Nuevo	a	1	0	especias
398	Canela Molida	2999.00	6900.00	a	t	cinnamon	25	100	gr	Nuevo	a	1	0	especias
464	Omega 3 FIsh OIl - Gentech	19999.00	0.00		t	omega	1	1	u			1	0	suplementos
400	Jengibre Molido	1999.00	6200.00	a	t	ginger	5	100	gr	Nuevo	a	1	0	especias
397	Ají Molido	1999.00	5000.00	a	t	chili	25	100	gr	Nuevo	a	1	0	especias
372	Mix (Peras - Damascos - Ciruelas - Medallones de Duraznos)	2799.00	6000.00	a	t	mix	5	250	gr	Nuevo	a	1	0	Frutas Desecadas
376	Melón en Cubo	1599.00	6800.00	a	t	melon	10	100	gr	Nuevo	a	1	0	Frutas Desecadas
432	Sal Marina Gruesa	999.00	1500.00	a	t	marine_salt	10	250	gr	Nuevo	a	1	0	especias
354	Maní Tostado	999.00	2000.00	a	t	peeled_peanut	25	250	gr	Nuevo	a	1	0	frutos secos
439	Malva	899.00	5050.00	a	t	malva	5	50	gr	Nuevo	a	1	0	yuyos y hierbas
441	Melisa	799.00	1190.00	a	t	melisa	5	50	gr	Nuevo	a	1	0	yuyos y hierbas
443	Moringa	1999.00	11500.00	a	t	moringa	1	50	gr	Nuevo	a	1	0	yuyos y hierbas
465	Colágeno Sport Fruit Punch - ENA 3 FIsh OIl - Gentech	29999.00	0.00		t	collagen	1	1	u			1	0	suplementos
454	Mermelada Light "El Brocal" 400g	3999.00	2650.00	a	t	light_jam	72	1	u	Nuevo	a	1	0	reposteria
455	Mermelada Dietética "El Brocal" 220g	3799.00	2300.00	a	t	diet_jam	24	1	u	Nuevo	a	1	0	reposteria
456	Miel "El Brocal" 500g	4599.00	2600.00	a	t	honey	12	1	u	Nuevo	a	1	0	reposteria
399	Curcuma Molida	1999.00	6300.00	a	t	turmeric	25	100	gr	Nuevo	{\n  "portion": "100 g",\n  "nutritional_values": [\n    {"nutrient": "Energía", "amount": "312 kcal", "daily_value_percent": 16},\n    {"nutrient": "Grasas Totales", "amount": "10 g", "daily_value_percent": 15},\n    {"nutrient": "Grasas Saturadas", "amount": "3 g", "daily_value_percent": 15},\n    {"nutrient": "Grasas Trans", "amount": "0 g", "daily_value_percent": null},\n    {"nutrient": "Colesterol", "amount": "0 mg", "daily_value_percent": 0},\n    {"nutrient": "Sodio", "amount": "38 mg", "daily_value_percent": 2},\n    {"nutrient": "Carbohidratos Totales", "amount": "67 g", "daily_value_percent": 22},\n    {"nutrient": "Fibra Dietaria", "amount": "22 g", "daily_value_percent": 88},\n    {"nutrient": "Azúcares", "amount": "3 g", "daily_value_percent": null},\n    {"nutrient": "Proteínas", "amount": "8 g", "daily_value_percent": 16}\n  ],\n  "daily_value_note": "Valores diarios basados en una dieta de 2000 kcal."\n}\n	1	0	especias
388	Espinaca en Escamas	9.00	0.00	a	f	spinach	0	100	gr		a	1	0	Verduras Desecadas
351	Avellana Pelada Grande	2999.00	18500.00	a	t	hazelnut	10	100	gr		a	1	0	frutos secos
356	Pistacho Tostado y Salado	3599.00	25900.00	a	t	pistachio	10	100	gr		a	1	0	frutos secos
364	Bocaditos rellenos CHOCO Y LIMON	999.00	5800.00	a	t	choco_pillow	4	100	gr	Nuevo	a	1	0	cereales
365	Bocaditos rellenos MANZANA Y CANELA	999.00	5800.00	a	t	apple_pillow	4	100	gr	Nuevo	a	1	0	cereales
453	Mermelada "El Brocal" 420g	3599.00	2350.00	a	t	jam	48	1	u	Nuevo	{\n  "portion": "100 g",\n  "nutritional_values": [\n    { "nutrient": "Energía", "amount": "337 kcal", "daily_value_percent": 17 },\n    { "nutrient": "Grasas Totales", "amount": "15.9 g", "daily_value_percent": 24 },\n    { "nutrient": "Grasas Saturadas", "amount": "0.6 g", "daily_value_percent": 3 },\n    { "nutrient": "Grasas Trans", "amount": "0 g", "daily_value_percent": null },\n    { "nutrient": "Colesterol", "amount": "0 mg", "daily_value_percent": 0 },\n    { "nutrient": "Sodio", "amount": "16 mg", "daily_value_percent": 1 },\n    { "nutrient": "Carbohidratos Totales", "amount": "50.0 g", "daily_value_percent": 17 },\n    { "nutrient": "Fibra Dietaria", "amount": "14.6 g", "daily_value_percent": 58 },\n    { "nutrient": "Azúcares", "amount": "6.8 g", "daily_value_percent": null },\n    { "nutrient": "Proteínas", "amount": "17.6 g", "daily_value_percent": 35 },\n    { "nutrient": "Calcio", "amount": "646 mg", "daily_value_percent": 65 },\n    { "nutrient": "Hierro", "amount": "36.96 mg", "daily_value_percent": 205 },\n    { "nutrient": "Potasio", "amount": "1441 mg", "daily_value_percent": 41 },\n    { "nutrient": "Magnesio", "amount": "0 mg", "daily_value_percent": 0 }\n  ],\n  "daily_value_note": "Valores diarios basados en una dieta de 2000 kcal."\n}\n	1	0	reposteria
362	Nuez Pelada PECAN	2599.00	18000.00	a	t	pecan	10	100	gr		a	1	0	frutos secos
418	Arroz Largo Fino Integral	2999.00	1300.00	a	t	rice	25	1	kg		a	1	0	legumbres
369	Coco Rallado LOW FAT	999.00	4300.00	a	t	coconut	25	100	gr		a	1	0	reposteria
380	Aritos Frutados - GRANIX	1699.00	4300.00	a	t	fruit_round	3	250	gr		a	1	0	cereales
383	Cacao en Polvo	1699.00	6300.00	a	t	cocoa	25	100	gr		a	1	0	reposteria
384	Polvo para Hornear	699.00	3200.00	a	t	baking_powder	20	100	gr		a	1	0	reposteria
410	Harina de Almendras con Piel	5999.00	2400.00	a	t	almond_flour	25	1	kg		a	1	0	harinas
414	Harina Paraguaya	2699.00	750.00	a	t	paraguaya	25	1	kg		a	1	0	harinas
386	Azúcar Impalpable	799.00	800.00	a	t	powdered_sugar	25	250	gr		a	1	0	reposteria
387	Azúcar Negra	899.00	1100.00	a	t	brown_sugar	10	250	gr		a	1	0	reposteria
389	Stevia Líquida "Trever" - 200ml	3999.00	2500.00	a	t	stevia	12	1	u		a	1	0	reposteria
406	Curry Suave	1499.00	2800.00	a	t	curry	25	100	gr		a	1	0	especias
407	Avena Arrollada	2699.00	1700.00	a	t	oatmeal	25	1	kg		a	1	0	cereales
419	Arvejas Enteras	1999.00	650.00	a	t	peas	25	1	kg		a	1	0	legumbres
431	Sal Fina del Himalaya	999.00	1500.00	a	t	himalayan_salt	25	250	gr		a	1	0	especias
411	Harina de Arroz	2499.00	1000.00	a	t	rice_flour	30	1	kg		a	1	0	harinas
359	Pasas de Uvas Rubias sin Semilla	999.00	5400.00	a	t	blonde_raisin	10	100	gr		a	1	0	Frutas Desecadas
366	Kiwi en Rodajas	1599.00	9000.00	a	t	kiwi	20	100	gr		a	1	0	Frutas Desecadas
367	Chips de Banana	999.00	6400.00	a	t	banana	6.8	100	gr		a	1	0	Frutas Desecadas
405	Pimienta Negra Molida	2499.00	9600.00	a	t	pepper	-4	50	gr	Nuevo	a	94	0	especias
375	Aritos con Miel - GRANIX	1699.00	3800.00	a	t	honey_rounds	2	250	gr	Nuevo	a	1	0	cereales
382	Chips de Chocolate	999.00	4700.00	a	t	chocolate_chip	4	100	gr		a	1	0	reposteria
361	Nuez Pelada Extra LIght	1999.00	14500.00	a	t	walnut	4	100	gr		a	1	0	frutos secos
352	Castañas de Cajú W4 Enteras	1699.00	9900.00	a	t	cashew_nut	10.68	100	gr		a	99	0	frutos secos
368	Ciruela Presidente SIN CAROZO	999.00	6300.00	a	t	plum	5	100	gr		a	1	0	Frutas Desecadas
370	Durazno Grande (mitades)	1599.00	9700.00	a	t	peach	5	100	gr		a	1	0	Frutas Desecadas
371	Pera Williams	999.00	4900.00	a	t	pear	5	100	gr		a	1	0	Frutas Desecadas
350	Arándanos Rojos Deshidratados	1599.00	7950.00	a	t	cranberry	6.8	100	gr		a	1	0	Frutas Desecadas
373	Dátiles DEGLET NOUR sin/carozo	1399.00	7400.00	a	t	date	5	100	gr		a	1	0	Frutas Desecadas
392	Albahaca Deshidratada	999.00	4200.00	a	t	basil	15	50	gr		a	1	0	Verduras Desecadas
395	Tomate Rojo Deshidratado	1999.00	10000.00	a	t	tomato	10	100	gr		a	1	0	Verduras Desecadas
390	Cebolla Deshidratada Ahumada	1999.00	6900.00	a	t	onion	25	100	gr		a	1	0	Verduras Desecadas
394	Perejil Deshidratado	1899.00	4700.00	a	t	parsley	15	100	gr		a	1	0	Verduras Desecadas
433	Boldo Entero	1899.00	8900.00	a	t	boldo	5	50	gr		a	1	0	yuyos y hierbas
434	Burrito	999.00	8300.00	a	t	donkey	20	50	gr		a	1	0	yuyos y hierbas
435	Carqueja	699.00	2700.00	a	t	carqueja	20	50	gr		a	1	0	yuyos y hierbas
437	Cola de Caballo	899.00	5100.00	a	t	cola_caballo	1	50	gr		a	1	0	yuyos y hierbas
438	Eucalipto	899.00	4400.00	a	t	eucalipto	20	50	gr		a	1	0	yuyos y hierbas
378	Harina de Algarroba	4999.00	3100.00	a	f	carob	25	1	kg		a	1	0	harinas
391	Ajo en Polvo	999.00	3800.00	a	t	garlic	25	50	gr		a	90	0	especias
444	Poleo	999.00	4700.00	a	t	poleo	1	50	gr		a	1	0	yuyos y hierbas
446	Ruda	999.00	7200.00	a	t	ruda	1	50	gr		a	1	0	yuyos y hierbas
447	Salvia	999.00	8100.00	a	t	salvia	1	50	gr		a	1	0	yuyos y hierbas
448	Tomillo	899.00	5700.00	a	t	tomillo	1	50	gr		a	1	0	yuyos y hierbas
457	Dulce de Leche "El Brocal" 450g	4799.00	2800.00	a	t	ddl	6	1	u		a	1	0	reposteria
422	Poroto de Soja	1999.00	700.00	a	t	soybean	25	1	kg	Destacado	a	1	0	legumbres
429	Aceite de Coco Neutro "El Cosaco"	3999.00	2100.00	a	t	coconut_oil	10	1	u	Destacado	a	1	0	aceites y salsas
393	Laurel en Hoja	9.00	0.00	a	f	laurel	0	100	gr		a	1	0	especias
460	Protein Bar Low Carb	1799.00	1100.00	a	t	low_carb	240	1	u		a	1	0	suplementos
374	Dátiles DEGLET NOUR con/carozo	999.00	5900.00	a	t	date	5	100	gr		a	1	0	Frutas Desecadas
360	Pasas de Uvas Jumbo sin Semilla	899.00	4340.00	a	t	raisin	10	100	gr		a	89	10	Frutas Desecadas
363	Bocaditos rellenos FRUTILLA	999.00	5800.00	a	t	strawberry_pillow	4	100	gr		a	1	0	cereales
379	Poroto negro	2999.00	1900.00	a	t	black_bean	25	1	kg		a	1	0	legumbres
402	Orégano	999.00	3900.00	a	t	oregano	15	50	gr		a	1	0	especias
403	Paprika	1999.00	3900.00	a	t	paprika	25	100	gr		a	1	0	especias
412	Harina de Avena	2999.00	1500.00	a	t	oatmeal_powder	25	1	kg		a	1	0	harinas
413	Harina Integral	1699.00	550.00	a	t	whole_wheat	25	1	kg		a	1	0	harinas
417	Arroz Yamaní Integral	1999.00	1300.00	a	t	yamani	30	1	kg		a	1	0	legumbres
423	Soja Texturizada	2399.00	1300.00	a	t	textured_soy	20	1	kg		a	1	0	legumbres
424	Garbanzos	2999.00	1130.00	a	t	chickpea	25	1	kg		a	1	0	legumbres
425	Semillas de Chía	1499.00	3350.00	a	t	chia_seeds	25	250	gr		a	1	0	semillas
427	Semillas de Quinoa	1999.00	4900.00	a	t	quinoa_seeds	25	250	gr		a	1	0	semillas
428	Semillas de Sésamo Integral	999.00	2150.00	a	t	sesame_seeds	25	250	gr		a	1	0	semillas
458	Whey Protein - 7900 AFA - Gentech 1kg	29999.00	14600.00	a	t	whey	10	1	u		a	1	0	suplementos
450	Almendras con Chocolate	2999.00	18300.00	a	f	chocolate_almond	6	100	gr		a	1	0	frutos secos con chocolate
451	Pasas de Uva con Chocolate	1999.00	11500.00	a	f	chocolate_raisin	6	100	gr		a	1	0	frutos secos con chocolate
430	Salsa de Soja	2999.00	1400.00	a	f	soy_sauce	12	1	u		a	1	0	aceites y salsas
449	Bicarbonato de Sodio	999.00	1440.00	a	t	bicarbonate	25	100	gr		a	91	0	reposteria
349	Almendras Non Pareil	1999.00	12500.00	a	t	almond	10	100	gr		a	86	0	frutos secos
474	asdas	100.00	100.00	asd	f		10	1	u			0	0	Suplementos
396	Azafrán molido	5999.00	0.00	a	f	saffron	0	100	gr		a	1	0	especias
459	Creatina MonoHidrato - 500gr	29999.00	21700.00	a	t	creatine	12	1	u	Nuevo	a	1	0	suplementos
462	MultiVitamin Gentech - 60 tabs	4499.00	3150.00	a	t	multivitamin	24	1	u	Nuevo	a	1	0	suplementos
401	Nuez Moscada Molida	2999.00	10800.00	a	t	nutmeg	5	100	gr	Nuevo	a	1	0	especias
421	Maíz Pisingallo	2699.00	800.00	a	t	popcorn	25	1	kg	Nuevo	a	1	0	legumbres
409	Fécula de Mandioca	1999.00	1200.00	a	t	cassava_starch	25	1	kg	Nuevo	a	1	0	harinas
357	Maní Japonés	3599.00	4000.00	a	f	japanese_peanut	8	250	gr	Nuevo	a	1	0	frutos secos
355	Maní Tostado y Salado	999.00	2000.00	a	t	salty_peanut	18	250	gr	Nuevo	a	1	0	frutos secos
420	Lentejas	3999.00	1800.00	a	t	lentils	22	1	kg		a	1	0	legumbres
426	Semillas de Girasol Pelado	999.00	1900.00	a	t	sunflower_seeds	15	250	gr		a	95	0	semillas
445	Romero	999.00	7400.00	a	t	romero	-11	50	gr		a	1	0	yuyos y hierbas
442	Menta en Hojas	999.00	2400.00	a	t	mint	21	50	gr	Nuevo	a	98	0	yuyos y hierbas
436	Cedron	999.00	9100.00	a	t	cedron	1	50	gr		a	1	0	yuyos y hierbas
377	Manzana en Rodaja	999.00	3700.00	a	t	apple	10	100	gr	Nuevo	a	1	0	Frutas Desecadas
440	Manzanilla en Flor	2799.00	17000.00	a	t	manzanilla	1	50	gr	Nuevo	a	1	0	yuyos y hierbas
353	Maní con Cáscara Grande	1199.00	2250.00	a	t	peanut	20	250	gr	Nuevo	a	1	0	frutos secos
452	Maní con Chocolate	1699.00	9600.00	a	t	chocolate_peanut	6	100	gr	Nuevo	a	1	0	frutos secos con chocolate
358	Pasta de Maní "Nogales"	2999.00	1900.00	a	t	peanut_cream	10	1	u	Nuevo	a	1	0	frutos secos
415	Harina de Maiz Amarillo - P.A.N	2899.00	1200.00	a	t	white_pan	30	1	kg	Nuevo	a	1	0	harinas
416	Harina de Maiz Blanco - P.A.N.	2899.00	1200.00	a	t	yellow_pan	30	1	kg	Nuevo	a	1	0	harinas
408	Almidón de Maíz (Maizena)	2999.00	880.00	La mejor harina de maíz para cocinar y preparar postres, ideal para espesar salsas y darle textura suave a tus recetas. Calidad y sabor garantizados.	t	maizena	104	1	kg	Nuevo	{\n  "portion": "100 g",\n  "nutritional_values": [\n    {"nutrient": "Energía", "amount": "381 kcal", "daily_value_percent": 19},\n    {"nutrient": "Grasas Totales", "amount": "0.1 g", "daily_value_percent": 0},\n    {"nutrient": "Grasas Saturadas", "amount": "0 g", "daily_value_percent": 0},\n    {"nutrient": "Grasas Trans", "amount": "0 g", "daily_value_percent": null},\n    {"nutrient": "Colesterol", "amount": "0 mg", "daily_value_percent": 0},\n    {"nutrient": "Sodio", "amount": "35 mg", "daily_value_percent": 1},\n    {"nutrient": "Carbohidratos Totales", "amount": "91 g", "daily_value_percent": 30},\n    {"nutrient": "Fibra Dietaria", "amount": "0.9 g", "daily_value_percent": 4},\n    {"nutrient": "Azúcares", "amount": "0.2 g", "daily_value_percent": null},\n    {"nutrient": "Proteínas", "amount": "0.3 g", "daily_value_percent": 1}\n  ],\n  "daily_value_note": "Valores diarios basados en una dieta de 2000 kcal."\n}\n	100	20	harinas
385	Azúcar Mascabo	999.00	1700.00	a	t	brown_sugar	100	250	gr	Nuevo	a	1	0	reposteria
381	Copos de Maíz sin Azucar - GRANIX	999.00	3000.00	a	t	corn_flakes	2	250	gr	Nuevo	a	1	0	cereales
1	vinagre	6000.00	4000.00	Vinagre de Manzana muy rico	f	products/35_ba0927a1-95e3-4d4e-be4b-9a491e634284_480x480	3	1	u			0	0	Aceites y Salsas
\.


--
-- Data for Name: products_backup; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.products_backup (id, name, price, description, image, unidad, stock, unidad_venta, purchase_price, informacion_nutricional, display_order, display, category, discount, highlight) FROM stdin;
375	Aritos con Miel - GRANIX	1699.00	a	honey_rounds	gr	3	250	3800	a	1	t	cereales	0	Nuevo
381	Copos de Maíz sin Azucar - GRANIX	999.00	a	corn_flakes	gr	3	250	3000	a	1	t	cereales	0	Nuevo
385	Azúcar Mascabo	999.00	a	brown_sugar	gr	25	250	1700	a	1	t	reposteria	0	Nuevo
404	Pimienta Blanca Molida	2999.00	a	white_pepper	gr	1	50	11200	a	1	t	especias	0	Nuevo
398	Canela Molida	2999.00	a	cinnamon	gr	25	100	6900	a	1	t	especias	0	Nuevo
464	Omega 3 FIsh OIl - Gentech	19999.00		omega	u	1	1	0		1	t	suplementos	0	
400	Jengibre Molido	1999.00	a	ginger	gr	5	100	6200	a	1	t	especias	0	Nuevo
397	Ají Molido	1999.00	a	chili	gr	25	100	5000	a	1	t	especias	0	Nuevo
405	Pimienta Negra Molida	2499.00	a	pepper	gr	5	50	9600	a	94	t	especias	0	Nuevo
372	Mix (Peras - Damascos - Ciruelas - Medallones de Duraznos)	2799.00	a	mix	gr	5	250	6000	a	1	t	Frutas Desecadas	0	Nuevo
376	Melón en Cubo	1599.00	a	melon	gr	10	100	6800	a	1	t	Frutas Desecadas	0	Nuevo
432	Sal Marina Gruesa	999.00	a	marine_salt	gr	10	250	1500	a	1	t	especias	0	Nuevo
354	Maní Tostado	999.00	a	peeled_peanut	gr	25	250	2000	a	1	t	frutos secos	0	Nuevo
439	Malva	899.00	a	malva	gr	5	50	5050	a	1	t	yuyos y hierbas	0	Nuevo
441	Melisa	799.00	a	melisa	gr	5	50	1190	a	1	t	yuyos y hierbas	0	Nuevo
443	Moringa	1999.00	a	moringa	gr	1	50	11500	a	1	t	yuyos y hierbas	0	Nuevo
465	Colágeno Sport Fruit Punch - ENA 3 FIsh OIl - Gentech	29999.00		collagen	u	1	1	0		1	t	suplementos	0	
454	Mermelada Light "El Brocal" 400g	3999.00	a	light_jam	u	72	1	2650	a	1	t	reposteria	0	Nuevo
455	Mermelada Dietética "El Brocal" 220g	3799.00	a	diet_jam	u	24	1	2300	a	1	t	reposteria	0	Nuevo
456	Miel "El Brocal" 500g	4599.00	a	honey	u	12	1	2600	a	1	t	reposteria	0	Nuevo
399	Curcuma Molida	1999.00	a	turmeric	gr	25	100	6300	{\n  "portion": "100 g",\n  "nutritional_values": [\n    {"nutrient": "Energía", "amount": "312 kcal", "daily_value_percent": 16},\n    {"nutrient": "Grasas Totales", "amount": "10 g", "daily_value_percent": 15},\n    {"nutrient": "Grasas Saturadas", "amount": "3 g", "daily_value_percent": 15},\n    {"nutrient": "Grasas Trans", "amount": "0 g", "daily_value_percent": null},\n    {"nutrient": "Colesterol", "amount": "0 mg", "daily_value_percent": 0},\n    {"nutrient": "Sodio", "amount": "38 mg", "daily_value_percent": 2},\n    {"nutrient": "Carbohidratos Totales", "amount": "67 g", "daily_value_percent": 22},\n    {"nutrient": "Fibra Dietaria", "amount": "22 g", "daily_value_percent": 88},\n    {"nutrient": "Azúcares", "amount": "3 g", "daily_value_percent": null},\n    {"nutrient": "Proteínas", "amount": "8 g", "daily_value_percent": 16}\n  ],\n  "daily_value_note": "Valores diarios basados en una dieta de 2000 kcal."\n}\n	1	t	especias	0	Nuevo
388	Espinaca en Escamas	9.00	a	spinach	gr	0	100	0	a	1	f	Verduras Desecadas	0	
351	Avellana Pelada Grande	2999.00	a	hazelnut	gr	10	100	18500	a	1	t	frutos secos	0	
356	Pistacho Tostado y Salado	3599.00	a	pistachio	gr	10	100	25900	a	1	t	frutos secos	0	
364	Bocaditos rellenos CHOCO Y LIMON	999.00	a	choco_pillow	gr	4	100	5800	a	1	t	cereales	0	Nuevo
365	Bocaditos rellenos MANZANA Y CANELA	999.00	a	apple_pillow	gr	4	100	5800	a	1	t	cereales	0	Nuevo
453	Mermelada "El Brocal" 420g	3599.00	a	jam	u	48	1	2350	{\n  "portion": "100 g",\n  "nutritional_values": [\n    { "nutrient": "Energía", "amount": "337 kcal", "daily_value_percent": 17 },\n    { "nutrient": "Grasas Totales", "amount": "15.9 g", "daily_value_percent": 24 },\n    { "nutrient": "Grasas Saturadas", "amount": "0.6 g", "daily_value_percent": 3 },\n    { "nutrient": "Grasas Trans", "amount": "0 g", "daily_value_percent": null },\n    { "nutrient": "Colesterol", "amount": "0 mg", "daily_value_percent": 0 },\n    { "nutrient": "Sodio", "amount": "16 mg", "daily_value_percent": 1 },\n    { "nutrient": "Carbohidratos Totales", "amount": "50.0 g", "daily_value_percent": 17 },\n    { "nutrient": "Fibra Dietaria", "amount": "14.6 g", "daily_value_percent": 58 },\n    { "nutrient": "Azúcares", "amount": "6.8 g", "daily_value_percent": null },\n    { "nutrient": "Proteínas", "amount": "17.6 g", "daily_value_percent": 35 },\n    { "nutrient": "Calcio", "amount": "646 mg", "daily_value_percent": 65 },\n    { "nutrient": "Hierro", "amount": "36.96 mg", "daily_value_percent": 205 },\n    { "nutrient": "Potasio", "amount": "1441 mg", "daily_value_percent": 41 },\n    { "nutrient": "Magnesio", "amount": "0 mg", "daily_value_percent": 0 }\n  ],\n  "daily_value_note": "Valores diarios basados en una dieta de 2000 kcal."\n}\n	1	t	reposteria	0	Nuevo
361	Nuez Pelada Extra LIght	1999.00	a	walnut	gr	10	100	14500	a	1	t	frutos secos	0	
362	Nuez Pelada PECAN	2599.00	a	pecan	gr	10	100	18000	a	1	t	frutos secos	0	
418	Arroz Largo Fino Integral	2999.00	a	rice	kg	25	1	1300	a	1	t	legumbres	0	
369	Coco Rallado LOW FAT	999.00	a	coconut	gr	25	100	4300	a	1	t	reposteria	0	
380	Aritos Frutados - GRANIX	1699.00	a	fruit_round	gr	3	250	4300	a	1	t	cereales	0	
383	Cacao en Polvo	1699.00	a	cocoa	gr	25	100	6300	a	1	t	reposteria	0	
384	Polvo para Hornear	699.00	a	baking_powder	gr	20	100	3200	a	1	t	reposteria	0	
410	Harina de Almendras con Piel	5999.00	a	almond_flour	kg	25	1	2400	a	1	t	harinas	0	
414	Harina Paraguaya	2699.00	a	paraguaya	kg	25	1	750	a	1	t	harinas	0	
386	Azúcar Impalpable	799.00	a	powdered_sugar	gr	25	250	800	a	1	t	reposteria	0	
387	Azúcar Negra	899.00	a	brown_sugar	gr	10	250	1100	a	1	t	reposteria	0	
352	Castañas de Cajú W4 Enteras	1699.00	a	cashew_nut	gr	22.68	100	9900	a	99	t	frutos secos	0	
389	Stevia Líquida "Trever" - 200ml	3999.00	a	stevia	u	12	1	2500	a	1	t	reposteria	0	
406	Curry Suave	1499.00	a	curry	gr	25	100	2800	a	1	t	especias	0	
407	Avena Arrollada	2699.00	a	oatmeal	kg	25	1	1700	a	1	t	cereales	0	
419	Arvejas Enteras	1999.00	a	peas	kg	25	1	650	a	1	t	legumbres	0	
431	Sal Fina del Himalaya	999.00	a	himalayan_salt	gr	25	250	1500	a	1	t	especias	0	
411	Harina de Arroz	2499.00	a	rice_flour	kg	30	1	1000	a	1	t	harinas	0	
382	Chips de Chocolate	999.00	a	chocolate_chip	gr	6	100	4700	a	1	t	reposteria	0	
359	Pasas de Uvas Rubias sin Semilla	999.00	a	blonde_raisin	gr	10	100	5400	a	1	t	Frutas Desecadas	0	
366	Kiwi en Rodajas	1599.00	a	kiwi	gr	20	100	9000	a	1	t	Frutas Desecadas	0	
367	Chips de Banana	999.00	a	banana	gr	6.8	100	6400	a	1	t	Frutas Desecadas	0	
368	Ciruela Presidente SIN CAROZO	999.00	a	plum	gr	5	100	6300	a	1	t	Frutas Desecadas	0	
370	Durazno Grande (mitades)	1599.00	a	peach	gr	5	100	9700	a	1	t	Frutas Desecadas	0	
371	Pera Williams	999.00	a	pear	gr	5	100	4900	a	1	t	Frutas Desecadas	0	
350	Arándanos Rojos Deshidratados	1599.00	a	cranberry	gr	6.8	100	7950	a	1	t	Frutas Desecadas	0	
373	Dátiles DEGLET NOUR sin/carozo	1399.00	a	date	gr	5	100	7400	a	1	t	Frutas Desecadas	0	
392	Albahaca Deshidratada	999.00	a	basil	gr	15	50	4200	a	1	t	Verduras Desecadas	0	
395	Tomate Rojo Deshidratado	1999.00	a	tomato	gr	10	100	10000	a	1	t	Verduras Desecadas	0	
390	Cebolla Deshidratada Ahumada	1999.00	a	onion	gr	25	100	6900	a	1	t	Verduras Desecadas	0	
394	Perejil Deshidratado	1899.00	a	parsley	gr	15	100	4700	a	1	t	Verduras Desecadas	0	
433	Boldo Entero	1899.00	a	boldo	gr	5	50	8900	a	1	t	yuyos y hierbas	0	
434	Burrito	999.00	a	donkey	gr	20	50	8300	a	1	t	yuyos y hierbas	0	
435	Carqueja	699.00	a	carqueja	gr	20	50	2700	a	1	t	yuyos y hierbas	0	
436	Cedron	999.00	a	cedron	gr	5	50	9100	a	1	t	yuyos y hierbas	0	
437	Cola de Caballo	899.00	a	cola_caballo	gr	1	50	5100	a	1	t	yuyos y hierbas	0	
438	Eucalipto	899.00	a	eucalipto	gr	20	50	4400	a	1	t	yuyos y hierbas	0	
378	Harina de Algarroba	4999.00	a	carob	kg	25	1	3100	a	1	f	harinas	0	
391	Ajo en Polvo	999.00	a	garlic	gr	25	50	3800	a	90	t	especias	0	
444	Poleo	999.00	a	poleo	gr	1	50	4700	a	1	t	yuyos y hierbas	0	
445	Romero	999.00	a	romero	gr	1	50	7400	a	1	t	yuyos y hierbas	0	
446	Ruda	999.00	a	ruda	gr	1	50	7200	a	1	t	yuyos y hierbas	0	
447	Salvia	999.00	a	salvia	gr	1	50	8100	a	1	t	yuyos y hierbas	0	
448	Tomillo	899.00	a	tomillo	gr	1	50	5700	a	1	t	yuyos y hierbas	0	
457	Dulce de Leche "El Brocal" 450g	4799.00	a	ddl	u	6	1	2800	a	1	t	reposteria	0	
422	Poroto de Soja	1999.00	a	soybean	kg	25	1	700	a	1	t	legumbres	0	Destacado
429	Aceite de Coco Neutro "El Cosaco"	3999.00	a	coconut_oil	u	10	1	2100	a	1	t	aceites y salsas	0	Destacado
393	Laurel en Hoja	9.00	a	laurel	gr	0	100	0	a	1	f	especias	0	
460	Protein Bar Low Carb	1799.00	a	low_carb	u	240	1	1100	a	1	t	suplementos	0	
374	Dátiles DEGLET NOUR con/carozo	999.00	a	date	gr	5	100	5900	a	1	t	Frutas Desecadas	0	
360	Pasas de Uvas Jumbo sin Semilla	899.00	a	raisin	gr	10	100	4340	a	89	t	Frutas Desecadas	10	
363	Bocaditos rellenos FRUTILLA	999.00	a	strawberry_pillow	gr	4	100	5800	a	1	t	cereales	0	
379	Poroto negro	2999.00	a	black_bean	kg	25	1	1900	a	1	t	legumbres	0	
402	Orégano	999.00	a	oregano	gr	15	50	3900	a	1	t	especias	0	
403	Paprika	1999.00	a	paprika	gr	25	100	3900	a	1	t	especias	0	
412	Harina de Avena	2999.00	a	oatmeal_powder	kg	25	1	1500	a	1	t	harinas	0	
413	Harina Integral	1699.00	a	whole_wheat	kg	25	1	550	a	1	t	harinas	0	
417	Arroz Yamaní Integral	1999.00	a	yamani	kg	30	1	1300	a	1	t	legumbres	0	
420	Lentejas	3999.00	a	lentils	kg	25	1	1800	a	1	t	legumbres	0	
423	Soja Texturizada	2399.00	a	textured_soy	kg	20	1	1300	a	1	t	legumbres	0	
424	Garbanzos	2999.00	a	chickpea	kg	25	1	1130	a	1	t	legumbres	0	
425	Semillas de Chía	1499.00	a	chia_seeds	gr	25	250	3350	a	1	t	semillas	0	
427	Semillas de Quinoa	1999.00	a	quinoa_seeds	gr	25	250	4900	a	1	t	semillas	0	
428	Semillas de Sésamo Integral	999.00	a	sesame_seeds	gr	25	250	2150	a	1	t	semillas	0	
458	Whey Protein - 7900 AFA - Gentech 1kg	29999.00	a	whey	u	10	1	14600	a	1	t	suplementos	0	
450	Almendras con Chocolate	2999.00	a	chocolate_almond	gr	6	100	18300	a	1	f	frutos secos con chocolate	0	
451	Pasas de Uva con Chocolate	1999.00	a	chocolate_raisin	gr	6	100	11500	a	1	f	frutos secos con chocolate	0	
426	Semillas de Girasol Pelado	999.00	a	sunflower_seeds	gr	25	250	1900	a	95	t	semillas	0	
430	Salsa de Soja	2999.00	a	soy_sauce	u	12	1	1400	a	1	f	aceites y salsas	0	
449	Bicarbonato de Sodio	999.00	a	bicarbonate	gr	25	100	1440	a	91	t	reposteria	0	
349	Almendras Non Pareil	1999.00	a	almond	gr	10	100	12500	a	86	t	frutos secos	0	
408	Almidón de Maíz (Maizena)	2999.00	La mejor harina de maíz para cocinar y preparar postres, ideal para espesar salsas y darle textura suave a tus recetas. Calidad y sabor garantizados.	maizena	kg	125	1	880	{\n  "portion": "100 g",\n  "nutritional_values": [\n    {"nutrient": "Energía", "amount": "381 kcal", "daily_value_percent": 19},\n    {"nutrient": "Grasas Totales", "amount": "0.1 g", "daily_value_percent": 0},\n    {"nutrient": "Grasas Saturadas", "amount": "0 g", "daily_value_percent": 0},\n    {"nutrient": "Grasas Trans", "amount": "0 g", "daily_value_percent": null},\n    {"nutrient": "Colesterol", "amount": "0 mg", "daily_value_percent": 0},\n    {"nutrient": "Sodio", "amount": "35 mg", "daily_value_percent": 1},\n    {"nutrient": "Carbohidratos Totales", "amount": "91 g", "daily_value_percent": 30},\n    {"nutrient": "Fibra Dietaria", "amount": "0.9 g", "daily_value_percent": 4},\n    {"nutrient": "Azúcares", "amount": "0.2 g", "daily_value_percent": null},\n    {"nutrient": "Proteínas", "amount": "0.3 g", "daily_value_percent": 1}\n  ],\n  "daily_value_note": "Valores diarios basados en una dieta de 2000 kcal."\n}\n	100	t	harinas	20	Nuevo
474	asdas	100.00	asd		u	10	1	100		0	f	Suplementos	0	
357	Maní Japonés	3599.00	a	japanese_peanut	gr	9	250	4000	a	1	f	frutos secos	0	Nuevo
396	Azafrán molido	5999.00	a	saffron	gr	0	100	0	a	1	f	especias	0	
459	Creatina MonoHidrato - 500gr	29999.00	a	creatine	u	12	1	21700	a	1	t	suplementos	0	Nuevo
462	MultiVitamin Gentech - 60 tabs	4499.00	a	multivitamin	u	24	1	3150	a	1	t	suplementos	0	Nuevo
401	Nuez Moscada Molida	2999.00	a	nutmeg	gr	5	100	10800	a	1	t	especias	0	Nuevo
421	Maíz Pisingallo	2699.00	a	popcorn	kg	25	1	800	a	1	t	legumbres	0	Nuevo
442	Menta en Hojas	999.00	a	mint	gr	60	50	2400	a	98	t	yuyos y hierbas	0	Nuevo
355	Maní Tostado y Salado	999.00	a	salty_peanut	gr	25	250	2000	a	1	t	frutos secos	0	Nuevo
409	Fécula de Mandioca	1999.00	a	cassava_starch	kg	25	1	1200	a	1	t	harinas	0	Nuevo
377	Manzana en Rodaja	999.00	a	apple	gr	10	100	3700	a	1	t	Frutas Desecadas	0	Nuevo
440	Manzanilla en Flor	2799.00	a	manzanilla	gr	1	50	17000	a	1	t	yuyos y hierbas	0	Nuevo
353	Maní con Cáscara Grande	1199.00	a	peanut	gr	20	250	2250	a	1	t	frutos secos	0	Nuevo
452	Maní con Chocolate	1699.00	a	chocolate_peanut	gr	6	100	9600	a	1	t	frutos secos con chocolate	0	Nuevo
358	Pasta de Maní "Nogales"	2999.00	a	peanut_cream	u	10	1	1900	a	1	t	frutos secos	0	Nuevo
415	Harina de Maiz Amarillo - P.A.N	2899.00	a	white_pan	kg	30	1	1200	a	1	t	harinas	0	Nuevo
416	Harina de Maiz Blanco - P.A.N.	2899.00	a	yellow_pan	kg	30	1	1200	a	1	t	harinas	0	Nuevo
\.


--
-- Data for Name: sale_details; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.sale_details (id, quantity, subtotal, product_id, sale_id, presentation_id, unit_price, discount, purchase_price) FROM stdin;
1	1	999.00	385	3	\N	0.00	0.00	0.00
2	30	26973.00	385	4	\N	0.00	0.00	0.00
3	1	2499.00	405	10	\N	0.00	0.00	0.00
4	1	2499.00	405	11	\N	0.00	0.00	0.00
5	7	15744.00	405	13	\N	0.00	0.00	0.00
6	4	9596.00	408	14	\N	0.00	0.00	0.00
7	1	1699.00	352	14	\N	0.00	0.00	0.00
8	2	1998.00	426	14	\N	0.00	0.00	0.00
9	2	1998.00	426	15	\N	0.00	0.00	0.00
10	3	2997.00	426	16	\N	0.00	0.00	0.00
11	10	8991.00	442	17	\N	0.00	0.00	0.00
12	2	1998.00	382	18	\N	0.00	0.00	0.00
13	1	3599.00	357	18	\N	0.00	0.00	0.00
14	1	999.00	381	18	\N	0.00	0.00	0.00
15	6	10795.00	361	18	\N	0.00	0.00	0.00
16	7	6294.00	355	18	\N	0.00	0.00	0.00
17	2	4798.00	408	19	\N	0.00	0.00	0.00
18	20	17982.00	442	19	\N	0.00	0.00	0.00
19	1	999.00	442	20	\N	0.00	0.00	0.00
20	1	1699.00	352	20	\N	0.00	0.00	0.00
21	1	2399.00	408	21	\N	2399.00	0.00	0.00
22	3	2997.00	426	22	\N	999.00	0.00	0.00
23	2	1998.00	442	22	\N	999.00	0.00	0.00
24	1	2399.00	408	22	\N	2399.00	0.00	0.00
25	12	5988.00	445	23	\N	999.00	500.00	0.00
26	1	6000.00	1	23	\N	6000.00	0.00	0.00
27	1	1699.00	375	24	\N	1699.00	0.00	0.00
28	2	864.00	436	24	\N	999.00	567.00	0.00
29	2	998.00	436	25	\N	999.00	500.00	0.00
30	2	10000.00	1	26	\N	6000.00	1000.00	0.00
31	3	10797.00	420	27	\N	3999.00	400.00	0.00
32	5	8495.00	352	28	\N	1699.00	0.00	0.00
33	4	9596.00	408	28	\N	2399.00	0.00	0.00
34	2	1798.20	442	28	\N	999.00	99.90	0.00
35	9	4046.85	408	29	\N	2399.00	1949.35	0.00
36	5	8495.00	352	29	\N	1699.00	0.00	0.00
37	4	4395.60	442	29	\N	999.00	-99.90	0.00
\.


--
-- Data for Name: sale_status; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.sale_status (id, name) FROM stdin;
1	Pending
2	Completed
\.


--
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.sales (id, total, shipping, created_at, updated_at, "paymentMethod", user_id, "saleStatus", known_client, "paymentChannel") FROM stdin;
3	999.00	0	2025-12-07 14:55:38.597393	2025-12-07 14:55:38.597393	EFECTIVO	35	PENDING	f	Local
4	26973.00	0	2025-12-07 15:03:01.410743	2025-12-07 15:03:01.410743	EFECTIVO	35	PENDING	f	Local
5	90809.00	0	2025-12-07 15:06:37.239319	2025-12-07 15:06:37.239319	EFECTIVO	35	PENDING	f	Local
10	2499.00	0	2025-12-07 16:08:28.226219	2025-12-07 16:08:28.226219	Efectivo	39	PENDING	f	Local
11	2499.00	0	2025-12-07 19:48:01.602121	2025-12-07 19:48:01.602121	Efectivo	39	COMPLETED	f	Local
12	134946.00	0	2025-12-07 19:48:36.688932	2025-12-07 19:48:36.688932	Efectivo	39	COMPLETED	f	Local
13	15744.00	0	2025-12-07 19:48:48.86442	2025-12-07 19:48:48.86442	Efectivo	39	COMPLETED	f	Local
14	13293.00	0	2025-12-07 19:56:29.056893	2025-12-07 19:56:29.056893	Transferencia	39	COMPLETED	f	Local
15	1998.00	0	2025-12-07 21:00:00	2025-12-08 01:53:20.50983	Efectivo	39	COMPLETED	f	Local
16	2997.00	0	2025-12-05 21:00:00	2025-12-08 01:53:32.326062	Efectivo	39	COMPLETED	f	Local
17	8991.00	0	2025-12-03 21:00:00	2025-12-08 01:54:50.574071	Efectivo	39	COMPLETED	f	Local
18	23685.00	0	2025-11-07 21:00:00	2025-12-08 01:58:08.4095	Efectivo	39	COMPLETED	f	Local
19	22780.00	0	2025-10-09 21:00:00	2025-12-08 02:03:57.187255	Efectivo	39	COMPLETED	f	Local
20	2698.00	0	2025-08-06 21:00:00	2025-12-08 02:04:48.750768	Efectivo	39	COMPLETED	f	Local
21	2399.00	0	2025-12-08 21:00:00	2025-12-09 00:15:05.979563	Efectivo	39	COMPLETED	f	Local
22	7394.00	0	2025-12-08 21:00:00	2025-12-09 00:16:41.444032	Efectivo	39	COMPLETED	f	Local
23	11988.00	0	2025-12-08 21:00:00	2025-12-09 00:18:21.311273	Transferencia	39	COMPLETED	t	Local
24	2563.00	0	2025-12-08 21:00:00	2025-12-09 00:19:02.469003	Transferencia	39	COMPLETED	t	Local
25	998.00	0	2025-12-08 21:00:00	2025-12-09 00:19:26.932966	Transferencia	39	COMPLETED	t	Local
26	10000.00	0	2025-12-08 21:00:00	2025-12-09 00:19:49.682574	Transferencia	39	COMPLETED	t	Local
27	10797.00	0	2025-12-08 21:00:00	2025-12-09 00:20:21.093502	Transferencia	39	COMPLETED	t	Local
28	19889.20	0	2025-12-08 21:00:00	2025-12-09 00:39:53.712557	Efectivo	39	COMPLETED	f	Local
29	16937.45	0	2025-12-08 21:00:00	2025-12-09 00:45:32.761136	Efectivo	39	COMPLETED	f	Local
30	700.00	200	2025-12-09 01:33:10.261	2025-12-09 01:33:10.274691	Efectivo	\N	COMPLETED	f	Redes
31	700.00	200	2025-12-09 01:33:41.691	2025-12-09 01:33:41.701965	Efectivo	\N	COMPLETED	f	Redes
32	700.00	200	2025-12-09 01:34:32.346	2025-12-09 01:34:32.357716	Efectivo	\N	COMPLETED	f	Redes
\.


--
-- Data for Name: shifts; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.shifts (id, "startTime", "endTime", notes, "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public."user" (id, name, surname, address, mail, phone, password, "createdAt", "updatedAt") FROM stdin;
1	John	Doe	123 Main St, Springfield, IL	john.doe@example.com	555-1234	securePassword123	2025-01-22 02:50:10.692288	2025-01-22 02:50:10.692288
3	John	Doe	123 Main St, Springfield, IL	john.do2e@example.com	555-1234	securePassword123	2025-01-22 02:50:10.692288	2025-01-22 02:50:10.692288
6	John	Doe	123 Main St, Springfield, IL	john.do2e3@example.com	555-1234	securePassword123	2025-01-22 02:51:54.806549	2025-01-22 02:51:54.806549
7	John	Doe	123 Main St, Springfield, IL	john.do2e34@example.com	555-1234	securePassword123	2025-01-22 02:53:23.277379	2025-01-22 02:53:23.277379
8	John	Doe	123 Main St, Springfield, IL	john.d2e34@example.com	555-1234	securePassword123	2025-01-22 02:57:16.26297	2025-01-22 02:57:16.26297
\.


--
-- Data for Name: user_activity; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.user_activity (id, action, metadata, ip, "userAgent", created_at, user_id) FROM stdin;
1	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 02:16:57.467009	\N
2	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1	2025-12-08 02:16:57.667702	\N
3	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1	2025-12-08 02:16:57.827574	\N
4	TEST_EVENT	{"foo":"bar"}	::1	curl/8.5.0	2025-12-08 02:18:32.115738	\N
5	TEST_EVENT	{"foo":"bar"}	::1	curl/8.5.0	2025-12-08 02:20:48.50828	\N
6	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:17:02.72384	\N
7	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:17:14.094526	\N
8	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:17:17.517823	\N
9	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:17:22.389025	\N
10	PAGE_VIEW	{"path":"/product/408","name":"ProductView"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:17:32.728119	\N
11	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:17:47.059727	\N
12	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:23:36.399009	\N
13	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:47:53.552928	\N
14	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:47:54.890891	\N
15	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:47:57.178835	\N
16	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:53:34.832959	\N
17	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:53:34.836286	\N
18	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:53:34.927877	\N
19	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 17:53:35.086945	\N
20	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 18:25:29.615511	\N
21	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 18:39:07.209303	\N
22	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 18:39:07.254086	\N
23	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 18:39:07.305952	\N
24	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 18:39:07.342055	\N
25	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 18:40:46.720675	\N
26	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 18:40:48.483321	\N
27	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 18:42:33.702298	\N
28	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 18:49:23.112177	\N
29	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 19:02:42.288648	\N
30	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 19:02:43.950547	\N
31	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 19:03:13.342667	\N
32	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 19:31:52.080346	\N
33	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 19:31:53.599273	\N
34	PAGE_VIEW	{"path":"/product/1","name":"ProductView"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 19:32:04.793031	\N
35	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 19:32:13.643157	\N
36	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 19:35:03.670936	\N
37	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 19:37:48.769372	\N
38	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 19:37:50.914855	\N
39	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:13:21.205609	\N
40	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:18:21.825752	\N
41	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:18:23.087891	\N
42	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:18:25.777948	\N
43	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:18:27.955383	\N
44	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:23:00.361644	\N
45	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:23:23.338853	\N
46	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:23:26.114541	\N
47	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:23:28.237503	\N
48	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:24:22.881393	\N
49	PAGE_VIEW	{"path":"/product/442","name":"ProductView"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:25:12.888989	\N
50	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:25:16.304374	\N
51	PAGE_VIEW	{"path":"/cart","name":"ProductsCart","title":"Tu Carrito"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:25:21.009507	\N
52	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:25:22.276366	\N
53	ADD_TO_CART	{"productId":405,"productName":"Pimienta Negra Molida","price":"2499.00","quantity":1,"presentationId":null}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:25:23.727316	\N
54	ADD_TO_CART	{"productId":405,"productName":"Pimienta Negra Molida","price":"2499.00","quantity":1,"presentationId":null}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:25:23.836732	\N
55	ADD_TO_CART	{"productId":405,"productName":"Pimienta Negra Molida","price":"2499.00","quantity":1,"presentationId":null}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:25:23.962856	\N
56	ADD_TO_CART	{"productId":405,"productName":"Pimienta Negra Molida","price":"2499.00","quantity":1,"presentationId":null}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:25:24.142927	\N
57	PAGE_VIEW	{"path":"/cart","name":"ProductsCart","title":"Tu Carrito"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:25:25.589973	\N
58	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:25:32.733915	\N
59	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:25:37.548381	\N
60	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:26:26.402883	\N
61	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:30:54.514893	\N
62	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:30:56.457485	\N
63	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:30:57.64446	\N
64	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:31:02.132594	\N
65	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:31:55.629609	\N
66	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:31:57.218332	\N
67	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:32:20.657116	\N
68	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 21:32:21.454428	\N
69	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 22:54:10.26972	\N
70	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 22:54:11.675269	\N
71	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 22:54:13.15447	\N
72	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 22:54:14.225038	\N
73	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1	2025-12-08 22:55:38.916259	\N
74	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1	2025-12-08 22:55:46.890243	\N
75	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 22:56:00.037026	\N
76	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 22:56:02.940942	\N
77	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1	2025-12-08 23:04:01.845815	\N
78	PAGE_VIEW	{"path":"/login","name":"UsersPage","title":"Iniciar Sesión"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:14:51.472363	\N
79	PAGE_VIEW	{"path":"/login","name":"UsersPage","title":"Iniciar Sesión"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:14:52.818036	\N
80	LOGIN	{"userId":39,"method":"email"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:14:55.586788	\N
81	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:14:57.604194	\N
82	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:14:58.087361	\N
83	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:15:05.756374	\N
84	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:15:09.743246	\N
85	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:15:15.147045	\N
86	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:20:21.643328	\N
87	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:24:23.16824	\N
88	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:24:33.625031	\N
89	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:24:35.916685	\N
90	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:24:38.372021	\N
91	PAGE_VIEW	{"path":"/product/408","name":"ProductView"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:31:42.648044	\N
92	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:31:50.365572	\N
93	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:32:09.184771	\N
94	PAGE_VIEW	{"path":"/cart","name":"ProductsCart","title":"Tu Carrito"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:35:43.50623	\N
95	PAGE_VIEW	{"path":"/cart","name":"ProductsCart","title":"Tu Carrito"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:51:47.667053	\N
96	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:51:49.465015	\N
97	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:51:50.805184	\N
98	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:51:52.537199	\N
99	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1	2025-12-08 23:52:08.75302	\N
100	PAGE_VIEW	{"path":"/login","name":"UsersPage","title":"Iniciar Sesión"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:52:16.607487	\N
101	PAGE_VIEW	{"path":"/login","name":"UsersPage","title":"Iniciar Sesión"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:52:18.555047	\N
102	LOGIN	{"userId":39,"method":"email"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:52:21.69199	\N
103	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:52:23.72822	\N
104	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:52:27.096548	\N
105	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:53:09.704671	\N
106	PAGE_VIEW	{"path":"/cart","name":"ProductsCart","title":"Tu Carrito"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:53:11.176399	\N
107	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-08 23:53:13.043903	\N
108	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:08:17.738164	\N
109	PAGE_VIEW	{"path":"/cart","name":"ProductsCart","title":"Tu Carrito"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:08:19.241184	\N
110	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:08:20.213101	\N
111	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1	2025-12-09 00:08:22.110627	\N
112	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1	2025-12-09 00:14:55.293977	\N
113	MANUAL_SALE	{"total":2999,"itemCount":1,"paymentMethod":"Efectivo"}	::1	Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1	2025-12-09 00:15:07.714191	\N
114	MANUAL_SALE	{"total":7994,"itemCount":3,"paymentMethod":"Efectivo"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:16:42.184769	\N
115	MANUAL_SALE	{"total":17988,"itemCount":2,"paymentMethod":"Transferencia"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:18:22.210405	\N
116	MANUAL_SALE	{"total":3697,"itemCount":2,"paymentMethod":"Transferencia"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:19:03.349904	\N
117	MANUAL_SALE	{"total":1998,"itemCount":1,"paymentMethod":"Transferencia"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:19:27.994457	\N
118	MANUAL_SALE	{"total":12000,"itemCount":1,"paymentMethod":"Transferencia"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:19:50.057872	\N
119	MANUAL_SALE	{"total":11997,"itemCount":1,"paymentMethod":"Transferencia"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:20:21.572886	\N
120	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:27:32.001375	\N
121	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:39:26.430874	\N
122	PAGE_VIEW	{"path":"/cart","name":"ProductsCart","title":"Tu Carrito"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:39:28.936657	\N
123	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:39:31.30569	\N
124	MANUAL_SALE	{"total":22289.2,"itemCount":3,"paymentMethod":"Efectivo"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:39:54.711014	\N
125	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:44:26.048774	\N
126	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:45:11.981986	\N
127	MANUAL_SALE	{"total":22337.449999999997,"itemCount":3,"paymentMethod":"Efectivo"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:45:33.424103	\N
128	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:48:11.940162	\N
129	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:48:16.518172	\N
130	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:48:19.054572	\N
131	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:56:12.670944	\N
132	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:56:12.735671	\N
133	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:59:36.483603	\N
134	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:59:38.891066	\N
135	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 00:59:40.960429	\N
136	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 01:14:24.874498	\N
137	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 01:20:22.557064	\N
138	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 01:20:24.568496	\N
139	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 01:20:27.685195	\N
140	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 01:22:08.370218	\N
141	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 01:29:05.11016	\N
142	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 21:46:05.916821	\N
143	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 21:46:19.780082	\N
144	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 21:48:08.220003	\N
145	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 21:48:11.723614	\N
146	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 21:48:20.024624	\N
147	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 21:54:48.575846	\N
148	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 22:02:17.891149	\N
149	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 22:02:41.847426	\N
150	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 22:02:44.3714	\N
151	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 22:02:46.015211	\N
152	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 22:04:42.223695	\N
153	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 23:15:21.544134	\N
154	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 23:15:37.577165	\N
155	PAGE_VIEW	{"path":"/catalog","name":"ProductList","title":"Catálogo de Productos"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 23:17:49.457074	\N
156	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 23:17:51.522841	\N
157	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 23:17:53.565515	\N
158	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-09 23:25:15.533429	\N
159	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1	2025-12-09 23:32:29.430678	\N
160	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1	2025-12-09 23:33:29.30216	\N
161	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:39:51.409314	\N
162	PAGE_VIEW	{"path":"/admin/statistics","name":"SalesStatistics"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:40:56.217565	\N
163	PAGE_VIEW	{"path":"/admin/sales","name":"ManualSale"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:40:58.506912	\N
164	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:41:00.466172	\N
165	PAGE_VIEW	{"path":"/login","name":"UsersPage","title":"Iniciar Sesión"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:41:02.34093	\N
166	PAGE_VIEW	{"path":"/cart","name":"ProductsCart","title":"Tu Carrito"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:41:03.324123	\N
167	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:41:05.074706	\N
168	ADD_TO_CART	{"productId":405,"productName":"Pimienta Negra Molida","price":"2499.00","quantity":1,"presentationId":null}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:41:06.345938	\N
169	ADD_TO_CART	{"productId":405,"productName":"Pimienta Negra Molida","price":"2499.00","quantity":1,"presentationId":null}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:41:06.477575	\N
170	ADD_TO_CART	{"productId":405,"productName":"Pimienta Negra Molida","price":"2499.00","quantity":1,"presentationId":null}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:41:06.656984	\N
171	PAGE_VIEW	{"path":"/cart","name":"ProductsCart","title":"Tu Carrito"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:41:07.934969	\N
172	INITIATE_CHECKOUT	{"method":"WHATSAPP","total":7497,"itemCount":1}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:41:09.237271	\N
173	PAGE_VIEW	{"path":"/cart","name":"ProductsCart","title":"Tu Carrito"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:41:17.061427	\N
174	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:41:18.768944	\N
175	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:55:58.518745	\N
176	PAGE_VIEW	{"path":"/product/442","name":"ProductView"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:56:02.459632	\N
177	PAGE_VIEW	{"path":"/","name":"HomePage","title":"Inicio - Suplementos y Nutrición"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:56:06.089621	\N
178	PAGE_VIEW	{"path":"/product/408","name":"ProductView"}	::1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36	2025-12-10 00:57:51.421098	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.users (id, name, surname, address, mail, phone, password, role, "createdAt", "updatedAt") FROM stdin;
40	Kalil	Movia	{"city": "Buenos Aires", "road": "Castro Barros", "state": "Autonomous City of Buenos Aires", "suburb": "Boedo", "country": "Argentina", "postcode": "1239", "country_code": "ar", "house_number": "2085", "ISO3166-2-lvl4": "AR-C", "ISO3166-2-lvl8": "AR-C", "state_district": "Comuna 5"}	hola@gmail.com	1139276499	$2a$10$c4buOoNaTS3K9LlB4qBxpO3bv/J0ffM7rFXwd0NYYuN2zbHqzY9/m	user	2025-02-15 20:15:02.328303	2025-02-15 20:15:02.328303
39	Kalil	Movia	{"city": "Buenos Aires", "road": "Castro Barros", "state": "Autonomous City of Buenos Aires", "suburb": "Boedo", "country": "Argentina", "postcode": "1239", "country_code": "ar", "house_number": "2085", "ISO3166-2-lvl4": "AR-C", "ISO3166-2-lvl8": "AR-C", "state_district": "Comuna 5"}	kalilvasquesmovia@gmail.com	1139276499	$2a$10$MAYR6xfSa.9os6nf7AjIe.9GxlAigDd97vsICfGIe0RngiQChlAwK	admin	2025-02-15 02:11:47.389996	2025-02-15 02:11:47.389996
36	Kalil	Movia	{"city": "Buenos Aires", "road": "Castro Barros", "state": "Autonomous City of Buenos Aires", "suburb": "Boedo", "country": "Argentina", "postcode": "1239", "country_code": "ar", "house_number": "2085", "ISO3166-2-lvl4": "AR-C", "ISO3166-2-lvl8": "AR-C", "state_district": "Comuna 5"}	tttt@gmail.com	1139276499	$2a$10$2f/bSv0sgguT9Itpm.e1t.p3bKkZzAJdFzrNFI3weDPMwHrstotP6	user	2025-02-13 13:38:25.476165	2025-02-13 16:57:15.736131
35	Kalil	Movia	{"road": "Ambrosetti", "town": "El Palomar", "state": "Buenos Aires", "country": "Argentina", "postcode": "B1706CGO", "country_code": "ar", "house_number": "618", "ISO3166-2-lvl4": "AR-B", "state_district": "Partido de Morón"}	ttt@gmail.com	1139276499	$2a$10$RqMhjfRVVWg1rnrajbbveeY/5.i7gFeI0fAqIzup1NEj7XhaGyLB6	admin	2025-02-13 13:37:36.313906	2025-02-14 23:45:42.679806
\.


--
-- Data for Name: users_backup; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.users_backup (id, name, surname, mail, phone, password, "createdAt", "updatedAt", address, role) FROM stdin;
35	Kalil	Movia	ttt@gmail.com	1139276499	$2a$10$RP5Oyd4aknq3xR4ajztmjOWyDYNC6JB.X0RK1NVZty64szbwviCHe	2025-02-13 13:37:36.313906	2025-02-14 23:45:42.679806	{"road": "Ambrosetti", "town": "El Palomar", "state": "Buenos Aires", "country": "Argentina", "postcode": "B1706CGO", "country_code": "ar", "house_number": "618", "ISO3166-2-lvl4": "AR-B", "state_district": "Partido de Morón"}	user
40	Kalil	Movia	hola@gmail.com	1139276499	$2a$10$c4buOoNaTS3K9LlB4qBxpO3bv/J0ffM7rFXwd0NYYuN2zbHqzY9/m	2025-02-15 20:15:02.328303	2025-02-15 20:15:02.328303	{"city": "Buenos Aires", "road": "Castro Barros", "state": "Autonomous City of Buenos Aires", "suburb": "Boedo", "country": "Argentina", "postcode": "1239", "country_code": "ar", "house_number": "2085", "ISO3166-2-lvl4": "AR-C", "ISO3166-2-lvl8": "AR-C", "state_district": "Comuna 5"}	user
39	Kalil	Movia	kalilvasquesmovia@gmail.com	1139276499	$2a$10$MAYR6xfSa.9os6nf7AjIe.9GxlAigDd97vsICfGIe0RngiQChlAwK	2025-02-15 02:11:47.389996	2025-02-15 02:11:47.389996	{"city": "Buenos Aires", "road": "Castro Barros", "state": "Autonomous City of Buenos Aires", "suburb": "Boedo", "country": "Argentina", "postcode": "1239", "country_code": "ar", "house_number": "2085", "ISO3166-2-lvl4": "AR-C", "ISO3166-2-lvl8": "AR-C", "state_district": "Comuna 5"}	admin
36	Kalil	Movia	tttt@gmail.com	1139276499	$2a$10$2f/bSv0sgguT9Itpm.e1t.p3bKkZzAJdFzrNFI3weDPMwHrstotP6	2025-02-13 13:38:25.476165	2025-02-13 16:57:15.736131	{"city": "Buenos Aires", "road": "Castro Barros", "state": "Autonomous City of Buenos Aires", "suburb": "Boedo", "country": "Argentina", "postcode": "1239", "country_code": "ar", "house_number": "2085", "ISO3166-2-lvl4": "AR-C", "ISO3166-2-lvl8": "AR-C", "state_district": "Comuna 5"}	user
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: kalil
--

COPY public.usuarios (id, "createdAt", "updatedAt", name, surname, address, mail, phone, password) FROM stdin;
1	2025-01-22 03:09:49.267562	2025-01-22 03:09:49.267562	John	Doe	123 Main St, Springfield, IL	john.da2e34@example.com	555-1234	securePassword123
6	2025-01-23 20:43:34.823608	2025-01-23 20:43:34.823608	Juan	Pérez	Calle Ficticia 123, Ciudad, País	usuario@ejemplo.com	+1234567890	$2a$10$rSo3/JzL0/SpA3iaJmvz3ePN5xB1.wYveh9qCnhe6L0f7uvIPuFji
8	2025-01-23 20:48:12.103234	2025-01-23 20:48:12.103234	Juan	Pérez	Calle Ficticia 123, Ciudad, País	a	+1234567890	$2a$10$6b0O24SVq50yuBCakBFXHu2dH8K1bP50AAoKIPhsZJxdV9ryDJQUq
12	2025-01-23 20:49:39.011875	2025-01-23 20:49:39.011875	Juan	Pérez	Calle Ficticia 123, Ciudad, País	asda	+1234567890	$2a$10$bxEEikwyIGFld2XQCdadCeT2/3hxmIb0EeiyhkbfsxjMzBAliW6QS
13	2025-01-23 20:51:52.756345	2025-01-23 20:51:52.756345	Juan	Pérez	Calle Ficticia 123, Ciudad, País	b@gmail.com	+1234567890	$2a$10$UidyBmgljd6PGeVn.TSGq.QTiD3Ml4ZDcV.ClJK8iq/yDeiryJ3TG
14	2025-01-23 20:57:22.858229	2025-01-23 20:57:22.858229	Juan	Pérez	Calle Ficticia 123, Ciudad, País	usuaraio@ejemplo.com	+1234567890	$2a$10$zTioEc2ZYomGPKV0HYg43OGCu.ZoGL0C02NdhGsTXJ8Sd6vWvDY8O
15	2025-01-23 20:57:43.019659	2025-01-23 20:57:43.019659	Juan	Pérez	Calle Ficticia 123, Ciudad, País	d@gmail.com	+1234567890	$2a$10$KK9JsN31.Pv49AYOmDzJT.Ru2mFeCSjBIKFZVJ1ZkBebd7KMN86dy
16	2025-01-23 21:01:05.229567	2025-01-23 21:01:05.229567	Juan	Pérez	Calle Ficticia 123, Ciudad, País	e@gmail.com	+1234567890	$2a$10$ucgi/1vlBUMR5rFgCoB7YullRoa2UZevyxNP4k3YtvPi9C29HITeW
17	2025-01-23 21:01:15.654624	2025-01-23 21:01:15.654624	Juan	Pérez	Calle Ficticia 123, Ciudad, País	a@a.com	+1234567890	$2a$10$QD9hG3P4E8QHnGGVc7jDUO677eh4KdKcpLNOmXW2xJHHLgMC05mv.
18	2025-01-23 22:27:55.699297	2025-01-23 22:27:55.699297	Juan	Pérez	Calle Ficticia 123, Ciudad, País	hola@gmail.com	+1234567890	$2a$10$fjnBpZJWnExu37pOOA1rEeASkK3xVtczLPKtRTxNCnVB39nmbbrfa
19	2025-01-23 22:36:39.586501	2025-01-23 22:36:39.586501	Juan	Pérez	Calle Ficticia 123, Ciudad, País	q@gmail.com	+1234567890	$2a$10$GQ4PCmQBfBrWuQMEh3rrVulQ4Lo2IVY/PErtVzzuGrmD5R9EuQwwS
21	2025-01-23 22:37:27.29878	2025-01-23 22:37:27.29878	Juan	Pérez	Calle Ficticia 123, Ciudad, País	2@gmail.com	+1234567890	$2a$10$Iwxe7VJodp60LuxN7tG74Or/I1PCsE3Ms4gxvsimTUKQOifeO4G2S
22	2025-01-23 22:38:01.768295	2025-01-23 22:38:01.768295	Juan	Pérez	Calle Ficticia 123, Ciudad, País	p@gmail.com	+1234567890	$2a$10$3n27VbyfibEZdABJw.TaRegOBfY1wVI1uPw9l.AQ6JAD9mxnbdUAS
23	2025-01-23 22:43:42.680287	2025-01-23 22:43:42.680287	Juan	Pérez	Calle Ficticia 123, Ciudad, País	t@gmail.com	+1234567890	$2a$10$cKWuxrUixgGrKdBKT1V46elvK8hSIEwsW1QPWpnbSusgbhRyHY/Ri
24	2025-01-23 22:54:58.456283	2025-01-23 22:54:58.456283	Juan	Pérez	Calle Ficticia 123, Ciudad, País	aa@gmail.com	+1234567890	$2a$10$0uHPT45C8w4VBtGC2u.I/u9yk5GjV.rk1gBak1CBWUskLMgF/J9MK
25	2025-01-23 22:57:16.089032	2025-01-23 22:57:16.089032	Juan	Pérez	Calle Ficticia 123, Ciudad, País	nay@gmail.com	+1234567890	$2a$10$1v9cii0SuoGkBh3DWtcB3ueS0RSZ3BEEwDsKK6kYj5qjK8aw7weJm
26	2025-01-23 23:06:02.713349	2025-01-23 23:06:02.713349	Juan	Pérez	Calle Ficticia 123, Ciudad, País	o@gmail.com	+1234567890	$2a$10$ioT23.g4UYltd.qHqxy.4exUyT9KQ7xrouucv/ws9LkmCrKrhp0m.
27	2025-01-23 23:06:30.426279	2025-01-23 23:06:30.426279	Juan	Pérez	Calle Ficticia 123, Ciudad, País	papa@gmail.com	+1234567890	$2a$10$X7pW8OXD9CPdB3wDMjAxbu.mNHokBZIxZAGhoZcTYtCCseEsy1Gg2
28	2025-01-23 23:20:53.292575	2025-01-23 23:20:53.292575	Juan	Pérez	Calle Ficticia 123, Ciudad, País	j@gmail.com	+1234567890	$2a$10$8CLQRYXVc41UUGLvP/bIPumYzTHza.SYzr2ejFFVAXpiIU3373EbC
29	2025-01-23 23:20:59.334399	2025-01-23 23:20:59.334399	Juan	Pérez	Calle Ficticia 123, Ciudad, País	aj@gmail.com	+1234567890	$2a$10$Dc7uLwUOxjpGpagw58xu7OS1ZuceAr5TAoXWWcybrBYfnH/5bYc4i
32	2025-01-23 23:22:50.253413	2025-01-23 23:22:50.253413	Juan	Pérez	Calle Ficticia 123, Ciudad, País	naya@gmail.com	+1234567890	$2a$10$.cnrz8i0ifs7914GmW7TxOxrmE.wzJ4S83QmjcNrmQnc21jeihKsW
33	2025-01-23 23:23:23.662367	2025-01-23 23:23:23.662367	Juan	Pérez	Calle Ficticia 123, Ciudad, País	ch@gmail.com	+1234567890	$2a$10$RUnhe1vJlDITY9s.gPrQMegKZvRT7jhLqMzIxSe4EzmNku.qLdS7S
40	2025-01-24 00:09:24.160602	2025-01-24 00:09:24.160602	Kalil	Movia	Castro Barros 2085	kalilvasquesmovia@gmail.com	1139276499	$2a$10$wQmDNV6swglV1dL/6xcCdum2tNpszp85CbqwYH6djwc45NWMpFGnG
44	2025-01-24 00:18:17.451591	2025-01-24 00:18:17.451591	Kalil	Movia	Castro Barros 2085	kalilvasquesmoviaa@gmail.com	1139276499	$2a$10$bCdUuVTIjwgZH5Kd0b8ci.IL2jj4HB1ubXkTj5zqqaiiUm2bh8/02
45	2025-01-24 00:19:04.118585	2025-01-24 00:19:04.118585	Kalil	Movia	Castro Barros 2085	kalilvasquaesmovia@gmail.com	1139276499	$2a$10$n9N0o1kicI4obJXrdxCpzugD/ZtHLOQpNiJ3kfQ3wIiO4kdepv7.S
46	2025-01-24 00:19:55.854828	2025-01-24 00:19:55.854828	Kalil	Movia	Castro Barros 2085	kaalilvasquesmovia@gmail.com	1139276499	$2a$10$xE1aCkhjh/8tx2ncZebYEenWFx3YEK2cvPrIoV7x2jxcvVQ/43V.G
47	2025-01-24 00:20:33.590428	2025-01-24 00:20:33.590428	Kalil	Movia	Castro Barros 2085	kasslilvasquesmovia@gmail.com	1139276499	$2a$10$SL567cX8HeennXdJwFd5F.qdejxo/1HNFpKmZEvBFrOs0maiMH3XC
48	2025-01-25 01:49:06.401459	2025-01-25 01:49:06.401459	Kalil	Movia	Castro Barros 2085	kalilvasquesmoviaasa@gmail.com	1139276499	$2a$10$NeTjbrSIb.HzMiu22.Iby.6T8qH1u4No7ox/k1L.P3ZZdAO3xM0u2
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.categories_id_seq', 14, true);


--
-- Name: categories_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.categories_id_seq1', 1, false);


--
-- Name: payment_method_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.payment_method_id_seq', 11, true);


--
-- Name: presentation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.presentation_id_seq', 115, true);


--
-- Name: presentation_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.presentation_id_seq1', 1, false);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.product_id_seq', 474, true);


--
-- Name: product_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.product_images_id_seq', 125, true);


--
-- Name: product_images_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.product_images_id_seq1', 1, false);


--
-- Name: product_price_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.product_price_history_id_seq', 1, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.products_id_seq', 1, true);


--
-- Name: sale_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.sale_details_id_seq', 38, true);


--
-- Name: sale_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.sale_status_id_seq', 1, false);


--
-- Name: sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.sales_id_seq', 32, true);


--
-- Name: shifts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.shifts_id_seq', 1, false);


--
-- Name: user_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.user_activity_id_seq', 178, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.user_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.users_id_seq', 40, true);


--
-- Name: users_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.users_id_seq1', 1, false);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kalil
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 48, true);


--
-- Name: products PK_0806c755e0aca124e67c0cf6d7d; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY (id);


--
-- Name: product_images PK_1974264ea7265989af8392f63a1; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT "PK_1974264ea7265989af8392f63a1" PRIMARY KEY (id);


--
-- Name: categories PK_24dbc6126a28ff948da33e97d3b; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY (id);


--
-- Name: sale_status PK_3ecf096db70c27236dbce703e2b; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.sale_status
    ADD CONSTRAINT "PK_3ecf096db70c27236dbce703e2b" PRIMARY KEY (id);


--
-- Name: sales PK_4f0bc990ae81dba46da680895ea; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY (id);


--
-- Name: shifts PK_84d692e367e4d6cdf045828768c; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.shifts
    ADD CONSTRAINT "PK_84d692e367e4d6cdf045828768c" PRIMARY KEY (id);


--
-- Name: product_price_history PK_8ad05105010c053126d79113a5c; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.product_price_history
    ADD CONSTRAINT "PK_8ad05105010c053126d79113a5c" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: sale_details PK_a8e8b6d243f38e3587378d401f5; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.sale_details
    ADD CONSTRAINT "PK_a8e8b6d243f38e3587378d401f5" PRIMARY KEY (id);


--
-- Name: presentation PK_b3d0364e16cd51d8196a13c528d; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.presentation
    ADD CONSTRAINT "PK_b3d0364e16cd51d8196a13c528d" PRIMARY KEY (id);


--
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- Name: products_backup PK_bebc9158e480b949565b4dc7a83; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.products_backup
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a83" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: user_activity PK_daec6d19443689bda7d7785dff5; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.user_activity
    ADD CONSTRAINT "PK_daec6d19443689bda7d7785dff5" PRIMARY KEY (id);


--
-- Name: users UQ_2e5b50f4b7c081eceea476ad128; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_2e5b50f4b7c081eceea476ad128" UNIQUE (mail);


--
-- Name: user UQ_7395ecde6cda2e7fe90253ec59f; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_7395ecde6cda2e7fe90253ec59f" UNIQUE (mail);


--
-- Name: usuarios UQ_76eb67a5fef70ccc191d6dc06c8; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "UQ_76eb67a5fef70ccc191d6dc06c8" UNIQUE (mail);


--
-- Name: categories_backup categories_pkey; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.categories_backup
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: payment_method payment_method_pkey; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.payment_method
    ADD CONSTRAINT payment_method_pkey PRIMARY KEY (id);


--
-- Name: presentation_backup presentation_pkey; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.presentation_backup
    ADD CONSTRAINT presentation_pkey PRIMARY KEY (id);


--
-- Name: product_images_backup product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.product_images_backup
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (id);


--
-- Name: users_backup users_mail_key; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.users_backup
    ADD CONSTRAINT users_mail_key UNIQUE (mail);


--
-- Name: users_backup users_pkey; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.users_backup
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: user_activity FK_11108754ec780c670440e32baad; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.user_activity
    ADD CONSTRAINT "FK_11108754ec780c670440e32baad" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: presentation FK_1d0b458f8ae4612ace81fa24f55; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.presentation
    ADD CONSTRAINT "FK_1d0b458f8ae4612ace81fa24f55" FOREIGN KEY (product) REFERENCES public.products(id);


--
-- Name: sale_details FK_245bcd4eb6fe045d6925d9a0a29; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.sale_details
    ADD CONSTRAINT "FK_245bcd4eb6fe045d6925d9a0a29" FOREIGN KEY (sale_id) REFERENCES public.sales(id);


--
-- Name: product_images FK_4f166bb8c2bfcef2498d97b4068; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT "FK_4f166bb8c2bfcef2498d97b4068" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: sales FK_5f282f3656814ec9ca2675aef6f; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT "FK_5f282f3656814ec9ca2675aef6f" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: product_price_history FK_64438a29390089f436eeeaae038; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.product_price_history
    ADD CONSTRAINT "FK_64438a29390089f436eeeaae038" FOREIGN KEY ("productId") REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: sale_details FK_7677134142fe9df9074f513a265; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.sale_details
    ADD CONSTRAINT "FK_7677134142fe9df9074f513a265" FOREIGN KEY (presentation_id) REFERENCES public.presentation(id);


--
-- Name: shifts FK_7862b9a401e0fe7dc5ef96e9116; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.shifts
    ADD CONSTRAINT "FK_7862b9a401e0fe7dc5ef96e9116" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: product_images FK_a8fc559e734ed965376497e7785; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT "FK_a8fc559e734ed965376497e7785" FOREIGN KEY (presentation_id) REFERENCES public.presentation(id);


--
-- Name: sale_details FK_ff07d1ac574d56390cf66820fae; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.sale_details
    ADD CONSTRAINT "FK_ff07d1ac574d56390cf66820fae" FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: product fk_category; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.categories_backup(id) ON DELETE SET NULL;


--
-- Name: product_images_backup fk_presentation; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.product_images_backup
    ADD CONSTRAINT fk_presentation FOREIGN KEY (presentation_id) REFERENCES public.presentation_backup(id);


--
-- Name: presentation_backup fk_product; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.presentation_backup
    ADD CONSTRAINT fk_product FOREIGN KEY (product) REFERENCES public.products_backup(id) ON DELETE SET NULL;


--
-- Name: product_images_backup product_images_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kalil
--

ALTER TABLE ONLY public.product_images_backup
    ADD CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products_backup(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 4IEk6xkyKxqfMngXt5cRuqqP1o7b5AkkuVdPLZkHueFTecvx5pkJYquOPil0aua

