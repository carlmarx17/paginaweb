/* --- Base de Datos del Proyecto --- */

// Configuración Base
const config = {
    baseUrlGuias: "https://sites.google.com/view/carlosmartinezprofesor/guias-estudio",
    baseExclusive: "https://sites.google.com/view/carlosmartinezprofesor/mundos-literarios-excusive",
    suffix: "?authuser=0"
};

// Base de Datos de Guías (Académicas y Literarias)
export const guidesData = [
    // ================== MATEMÁTICAS - SECUNDARIA ==================
    {
        id: "m-s-1", title: "Aritmética", type: "academico", level: "secundaria",
        color: "text-rose-600", bg: "bg-rose-500", icon: "fa-calculator", status: "disponible",
        mainUrl: "articles/Aritmetica.html",
        desc: "Números, fracciones, porcentajes y operaciones básicas.",
        subtopics: [
            { name: "Números enteros y racionales", url: "articles/Numeros enteros y racionales.html" },
            { name: "Fracciones", url: "articles/Fracciones.html" },
            { name: "Porcentajes", url: "articles/Porcentajes.html" },
            { name: "Operaciones Básicas", url: "articles/Operaciones.html" },
            { name: "Proporciones y razones", url: "articles/Proporciones y razones.html" }
        ]
    },
    {
        id: "m-s-2", title: "Álgebra Básica", type: "academico", level: "secundaria",
        color: "text-rose-600", bg: "bg-rose-500", icon: "fa-superscript", status: "disponible",
        mainUrl: "articles/Algebra Basica.html",
        desc: "Ecuaciones, sistemas y factorización.",
        subtopics: [
            { name: "Ecuaciones de primer grado", url: "articles/Ecuaciones de primer grado.html" },
            { name: "Sistemas de ecuaciones", url: "articles/Sistemas de ecuaciones.html" },
            { name: "Factorización", url: "articles/Factorizacion.html" },
            { name: "Productos Notables", url: "#" }
        ]
    },
    {
        id: "m-s-3", title: "Geometría", type: "academico", level: "secundaria",
        color: "text-rose-600", bg: "bg-rose-500", icon: "fa-shapes", status: "disponible",
        mainUrl: "articles/Geometria.html",
        desc: "Figuras, áreas y teoremas fundamentales.",
        subtopics: [
           { name: "Perímetros y Áreas", url: "articles/Perimetros Y Areas.html" },
           { name: "Teorema de Pitágoras", url: "articles/Pitagoras.html" },
           { name: "Teorema de Tales", url: "articles/Teorema de Tales.html" }
        ]
    },
    {
        id: "m-s-4", title: "Trigonometría", type: "academico", level: "secundaria",
        color: "text-rose-600", bg: "bg-rose-500", icon: "fa-draw-polygon", status: "disponible",
        mainUrl: "articles/Trigonometria.html",
        desc: "Relaciones triangulares y funciones.",
        subtopics: [
            { name: "Aplicaciones Trigonometría", url: "articles/Aplicaicones Trigonometria.html" }
        ]
    },
    {
        id: "m-s-5", title: "Estadística y Prob.", type: "academico", level: "secundaria",
        color: "text-rose-600", bg: "bg-rose-500", icon: "fa-chart-bar", status: "pronto",
        mainUrl: "#", desc: "Análisis de datos e interpretación.", subtopics: [] 
    },
    {
        id: "m-s-6", title: "Matemáticas Secundaria", type: "academico", level: "secundaria",
        color: "text-rose-600", bg: "bg-rose-500", icon: "fa-square-root-alt", status: "disponible",
        mainUrl: "articles/Matematicas Segundaria.html",
        desc: "Ruta general de refuerzo con guías base, ejercicios y preparación escolar.",
        subtopics: [
            { name: "Funciones", url: "articles/Funciones.html" },
            { name: "Función Cuadrática", url: "articles/Funcion Cuadratica.html" },
            { name: "Potencia", url: "articles/Potencia.html" },
            { name: "Reglas de 3", url: "articles/Reglas de 3.html" },
            { name: "Problemas Resueltos", url: "articles/Problemas Resueltos.html" },
            { name: "Simulacro ICFES", url: "articles/Simulacro ICFES.html" }
        ]
    },

    // ================== MATEMÁTICAS - UNIVERSITARIA ==================
    {
        id: "m-u-1", title: "Cálculo Diferencial", type: "academico", level: "universitario",
        color: "text-rose-800", bg: "bg-rose-800", icon: "fa-chart-line", status: "disponible",
        mainUrl: "articles/Calculo Diferencial.html",
        desc: "Límites, derivadas y estudio de funciones.",
        subtopics: [
            { name: "Funciones Exponenciales", url: "articles/Funciones Exponenciales.html" },
            { name: "Límites y continuidad", url: "articles/Limites y continuidad.html" },
            { name: "Derivadas", url: "articles/Derivadas.html" },
            { name: "Regla de la Cadena", url: "articles/Regla de la Cadena.html" },
            { name: "Optimización", url: "articles/Optimizacion.html" }
        ]
    },
    {
        id: "m-u-2", title: "Cálculo Integral", type: "academico", level: "universitario",
        color: "text-rose-800", bg: "bg-rose-800", icon: "fa-infinity", status: "disponible",
        mainUrl: "articles/Calculo Integral.html",
        desc: "Integración, áreas y volúmenes.",
        subtopics: [
            { name: "Sumas de Riemann", url: "articles/Sumas de Riemann.html" },
            { name: "Integral Definida e Indefinida", url: "articles/Integral Definida e Indefinida.html" },
            { name: "Técnicas de Integración", url: "articles/Tecnicas de Integracion.html" },
            { name: "Teorema Fundamental", url: "articles/Teorema Fundamental del Calculo.html" },
            { name: "Aplicaciones", url: "articles/Aplicaciones.html" }
        ]
    },
    {
        id: "m-u-3", title: "Álgebra Lineal", type: "academico", level: "universitario",
        color: "text-rose-800", bg: "bg-rose-800", icon: "fa-vector-square", status: "disponible",
        mainUrl: "articles/Algebra Lineal.html",
        desc: "Espacios vectoriales y matrices.",
        subtopics: [
            { name: "Matrices y Determinantes", url: "articles/Matrices y Determinantes.html" },
            { name: "Sistemas Lineales", url: "articles/Sistemas de Ecuaciones Lineales.html" },
            { name: "Transformaciones Lineales", url: "articles/Transformaciones Lineales.html" }
        ]
    },
    {
        id: "m-u-4", title: "Ec. Diferenciales", type: "academico", level: "universitario",
        color: "text-rose-800", bg: "bg-rose-800", icon: "fa-wave-square", status: "disponible",
        mainUrl: "articles/Ecuaciones Diferenciales.html",
        desc: "Modelado matemático y ecuaciones dinámicas.",
        subtopics: [
            { name: "EDO Primer Orden", url: "articles/EDO Primer Orden.html" },
            { name: "Ecuación de Bernoulli", url: "articles/Ecuacion Diferencial de Bernoulli.html" },
            { name: "EDO Lineales", url: "articles/EDO Lineales.html" }
        ]
    },
    {
        id: "m-u-5", title: "Probabilidad Univ.", type: "academico", level: "universitario",
        color: "text-rose-800", bg: "bg-rose-800", icon: "fa-dice", status: "disponible",
        mainUrl: "articles/Probabilidad y Estadistica.html", 
        desc: "Estadística inferencial y distribuciones.", 
        subtopics: [
            { name: "Inferencia Estadística", url: "articles/Inferencia Estadistica.html" },
            { name: "Deducción", url: "articles/Deduccion.html" }
        ] 
    },
    {
        id: "m-u-6", title: "Métodos Numéricos", type: "academico", level: "universitario",
        color: "text-rose-800", bg: "bg-rose-800", icon: "fa-laptop-code", status: "disponible",
        mainUrl: "articles/Metodos Numericos.html",
        desc: "Aproximación computacional para resolver ecuaciones, integrar y modelar sistemas.",
        subtopics: [
            { name: "Newton Rapson", url: "articles/Newton Rapson.html" },
            { name: "Runge Kuta", url: "articles/Runge Kuta.html" },
            { name: "Integración Numérica", url: "articles/Integracion Numerica.html" },
            { name: "Diferencias Finitas", url: "articles/Diferencias Finitas.html" }
        ]
    },

    // ================== FÍSICA - SECUNDARIA ==================
    {
        id: "f-s-1", title: "Mecánica", type: "academico", level: "secundaria",
        color: "text-cyan-600", bg: "bg-cyan-500", icon: "fa-cogs", status: "disponible",
        mainUrl: "articles/Mecanica.html",
        desc: "Movimiento, fuerzas y energía.",
        subtopics: [
            { name: "Magnitudes", url: "articles/Magnitudes.html" },
            { name: "Conversión de Unidades", url: "articles/Conversion de Unidades.html" },
            { name: "Vectores", url: "articles/Vectores.html" },
            { name: "Movimiento Circular", url: "articles/Movimiento Circular.html" },
            { name: "Leyes de Newton", url: "articles/Leyes de Newton.html" },
            { name: "Conservación Momento", url: "articles/Conservacion Momento.html" },
            { name: "Trabajo y Energía", url: "articles/Trabajo y Energia.html" }
        ]
    },
    {
        id: "f-s-2", title: "Calor y Temperatura", type: "academico", level: "secundaria",
        color: "text-cyan-600", bg: "bg-cyan-500", icon: "fa-thermometer-half", status: "disponible",
        mainUrl: "articles/Calor y Temperatura.html",
        desc: "Termodinámica básica.",
        subtopics: [
            { name: "Dilatación Térmica", url: "articles/Dilatacion Termica.html" }
        ]
    },
    {
        id: "f-s-3", title: "Óptica", type: "academico", level: "secundaria",
        color: "text-cyan-600", bg: "bg-cyan-500", icon: "fa-eye", status: "disponible",
        mainUrl: "articles/Optica.html",
        desc: "Luz, reflexión y refracción.",
        subtopics: [
            { name: "Espejos", url: "articles/Espejos.html" },
            { name: "Lentes", url: "articles/Lentes.html" }
        ]
    },
    {
        id: "f-s-4", title: "Electricidad", type: "academico", level: "secundaria",
        color: "text-cyan-600", bg: "bg-cyan-500", icon: "fa-bolt", status: "disponible",
        mainUrl: "articles/Electricidad.html",
        desc: "Circuitos y carga eléctrica.",
        subtopics: [
            { name: "Ley de Ohm", url: "articles/Ley de Ohm.html" }
        ]
    },
    {
        id: "f-s-5", title: "Física Secundaria", type: "academico", level: "secundaria",
        color: "text-cyan-600", bg: "bg-cyan-500", icon: "fa-person-running", status: "disponible",
        mainUrl: "articles/Fisica Segundaria.html",
        desc: "Panorama completo de cinemática, calor, óptica y electricidad para bachillerato.",
        subtopics: [
            { name: "Cinemática", url: "articles/Cinematica.html" },
            { name: "Calorimetría", url: "articles/Calorimetria.html" },
            { name: "Electricidad", url: "articles/Electricidad.html" },
            { name: "Óptica", url: "articles/Optica.html" }
        ]
    },
    {
        id: "f-s-6", title: "Astronomía", type: "academico", level: "secundaria",
        color: "text-cyan-600", bg: "bg-cyan-500", icon: "fa-star", status: "disponible",
        mainUrl: "articles/Astronomia.html",
        desc: "El cosmos y la vida en el universo.",
        subtopics: [
            { name: "Astrobiología", url: "articles/Astrobiologia.html" },
            { name: "Coordenadas Astronómicas", url: "articles/Coordenadas Astornomicas.html" }
        ]
    },

    // ================== FÍSICA - UNIVERSITARIA ==================
    {
        id: "f-u-5", title: "Física Universitaria", type: "academico", level: "universitario",
        color: "text-cyan-800", bg: "bg-cyan-700", icon: "fa-satellite-dish", status: "disponible",
        mainUrl: "articles/Fisica Universitaria.html",
        desc: "Colección avanzada con mecánica, electromagnetismo y termodinámica aplicada.",
        subtopics: [
            { name: "Mecánica", url: "articles/Mecanica.html" },
            { name: "Electromagnetismo", url: "articles/Electromagnetismo.html" },
            { name: "Calor y Temperatura", url: "articles/Calor y Temperatura.html" },
            { name: "Movimiento Circular", url: "articles/Movimiento Circular.html" }
        ]
    },
    {
        id: "f-u-1", title: "Mecánica Univ.", type: "academico", level: "universitario",
        color: "text-cyan-800", bg: "bg-cyan-700", icon: "fa-atom", status: "disponible",
        mainUrl: "articles/Fisica Universitaria.html",
        desc: "Física clásica avanzada.",
        subtopics: [
            { name: "Cinemática Vectorial", url: "articles/Cinematica Vectorial.html" },
            { name: "Dinámica", url: "articles/Dinamica.html" },
            { name: "Cuerpo Rígido", url: "articles/Cuerpo Rigidio.html" },
            { name: "Sistema de referencia", url: "articles/Sistema de referencia.html" }
        ]
    },
    {
        id: "f-u-2", title: "Electromagnetismo", type: "academico", level: "universitario",
        color: "text-cyan-800", bg: "bg-cyan-700", icon: "fa-magnet", status: "disponible",
        mainUrl: "articles/Electromagnetismo.html",
        desc: "Campos y ondas electromagnéticas.",
        subtopics: [
            { name: "Ley de Coulomb", url: "articles/Ley de Columb.html" },
            { name: "Leyes de Kirchhoff", url: "articles/Leyes de Kirchoff.html" }
        ]
    },
    {
        id: "f-u-3", title: "Termodinámica", type: "academico", level: "universitario",
        color: "text-cyan-800", bg: "bg-cyan-700", icon: "fa-temperature-high", status: "pronto",
        mainUrl: "#", desc: "Energía, entropía y calor.", subtopics: []
    },
    {
        id: "f-u-4", title: "Física Moderna", type: "academico", level: "universitario",
        color: "text-cyan-800", bg: "bg-cyan-700", icon: "fa-radiation", status: "pronto",
        mainUrl: "#", desc: "Relatividad y cuántica.", subtopics: []
    },

    // ================== QUÍMICA - SECUNDARIA ==================
    {
        id: "q-s-1", title: "Modelos Atómicos", type: "academico", level: "secundaria",
        color: "text-teal-600", bg: "bg-teal-500", icon: "fa-atom", status: "disponible",
        mainUrl: "articles/Modelos Atomicos.html",
        desc: "Estructura de la materia.",
        subtopics: [
            { name: "Distribuciones Electrónicas", url: "articles/Distribuciones Electronicas.html" }
        ]
    },
    {
        id: "q-s-5", title: "Soluciones", type: "academico", level: "secundaria",
        color: "text-teal-600", bg: "bg-teal-500", icon: "fa-vial", status: "disponible",
        mainUrl: "articles/Soluciones.html",
        desc: "Mezclas homogéneas y pH.",
        subtopics: [
            { name: "Ácidos y Bases", url: "articles/Acidos y Bases.html" }
        ]
    },
    {
        id: "q-s-4", title: "Reacciones", type: "academico", level: "secundaria",
        color: "text-teal-600", bg: "bg-teal-500", icon: "fa-flask", status: "disponible",
        mainUrl: "articles/Reacciones Quimicas.html",
        desc: "Cambios químicos y estequiometría.",
        subtopics: [
            { name: "Estequiometría", url: "articles/Estecquiometria.html" }
        ]
    },
    {
        id: "q-s-2", title: "Tabla Periódica", type: "academico", level: "secundaria",
        color: "text-teal-600", bg: "bg-teal-500", icon: "fa-table", status: "disponible",
        mainUrl: "articles/Tabla Periodica.html", 
        desc: "Elementos y propiedades.", subtopics: []
    },
    {
        id: "q-s-6", title: "Química Orgánica", type: "academico", level: "secundaria",
        color: "text-teal-600", bg: "bg-teal-500", icon: "fa-leaf", status: "disponible",
        mainUrl: "articles/Quimca Organica.html", 
        desc: "El carbono y sus compuestos.", subtopics: []
    },
    {
        id: "q-s-7", title: "Nomenclatura", type: "academico", level: "secundaria",
        color: "text-teal-600", bg: "bg-teal-500", icon: "fa-tag", status: "disponible",
        mainUrl: "articles/Nomenclatura.html", 
        desc: "Reglas para nombrar compuestos.", 
        subtopics: [
            { name: "Estados de Oxidación", url: "articles/Estados de Oxidacion.html" }
        ]
    },
    {
        id: "q-s-8", title: "Gases", type: "academico", level: "secundaria",
        color: "text-teal-600", bg: "bg-teal-500", icon: "fa-cloud", status: "disponible",
        mainUrl: "articles/Gases.html", 
        desc: "Leyes y comportamiento de los gases.", subtopics: []
    },
    {
        id: "q-s-9", title: "Química Secundaria", type: "academico", level: "secundaria",
        color: "text-teal-600", bg: "bg-teal-500", icon: "fa-vials", status: "disponible",
        mainUrl: "articles/Quimica Segundaria.html",
        desc: "Mapa general con estructura atómica, enlaces, mezclas y química del carbono.",
        subtopics: [
            { name: "Mezclas, Elementos y Compuestos", url: "articles/Mezclas  Elementos y Compuestos.html" },
            { name: "Enlaces Químicos", url: "articles/Enlaces Quimicos_.html" },
            { name: "Estructuras de Lewis", url: "articles/Estructuras de lewis.html" },
            { name: "Propiedades periódicas", url: "articles/Propiedades periodicas.html" },
            { name: "Solubilidad y Factores", url: "articles/Solubilidad y Factores que la Afectan.html" },
            { name: "Hidrocarburos", url: "articles/Hidrocarburos.html" },
            { name: "Funciones Oxigenadas", url: "articles/Funciones Oxigenadas.html" }
        ]
    },

    // ================== QUÍMICA - UNIVERSITARIA / BIOQUÍMICA ==================
    {
        id: "q-u-3", title: "Bioquímica", type: "academico", level: "universitario",
        color: "text-teal-800", bg: "bg-teal-700", icon: "fa-dna", status: "disponible",
        mainUrl: "articles/Bioquimica.html",
        desc: "Moléculas de la vida.",
        subtopics: [
            { name: "Lípidos", url: "articles/Lipidos.html" },
            { name: "Proteínas", url: "articles/Proteinas.html" }
        ]
    },
    {
        id: "q-u-1", title: "Química Orgánica", type: "academico", level: "universitario",
        color: "text-teal-800", bg: "bg-teal-700", icon: "fa-leaf", status: "pronto",
        mainUrl: "#", desc: "Mecanismos de reacción.", subtopics: []
    },

    // ================== BIOLOGÍA - SECUNDARIA ==================
    {
        id: "b-s-1", title: "Teoría Celular", type: "academico", level: "secundaria",
        color: "text-green-600", bg: "bg-green-500", icon: "fa-circle", status: "disponible",
        mainUrl: "articles/Teoria Celular.html",
        desc: "La unidad de la vida.",
        subtopics: [
            { name: "Mitosis y Meiosis", url: "articles/Mitosis y Meiosis.html" }
        ]
    },
    {
        id: "b-s-4", title: "Ecología", type: "academico", level: "secundaria",
        color: "text-green-600", bg: "bg-green-500", icon: "fa-tree", status: "disponible",
        mainUrl: "articles/Ecologia.html",
        desc: "Interacciones biológicas.",
        subtopics: [
            { name: "Metrología Macondo", url: "articles/Metrologia Macondo.html" },
            { name: "Ecosistemas y Biomas", url: "articles/Ecosistemas y Biomas.html" }
        ]
    },
    {
        id: "b-s-3", title: "Cuerpo Humano", type: "academico", level: "secundaria",
        color: "text-green-600", bg: "bg-green-500", icon: "fa-walking", status: "disponible",
        mainUrl: "articles/Cuerpo Humano.html",
        desc: "Anatomía y fisiología.",
        subtopics: [
            { name: "Aparato Digestivo", url: "articles/Aparato Digestivo.html" }
        ]
    },
    {
        id: "b-s-2", title: "Genética", type: "academico", level: "secundaria",
        color: "text-green-600", bg: "bg-green-500", icon: "fa-dna", status: "disponible",
        mainUrl: "articles/Genetica.html", 
        desc: "Herencia y ADN.", 
        subtopics: [
            { name: "Leyes de Mendel", url: "articles/Leyes de Mendel.html" },
            { name: "ADN y ARN", url: "articles/ADN y ARN.html" }
        ]
    },
    {
        id: "b-u-10", title: "Biología Univ.", type: "academico", level: "universitario",
        color: "text-green-800", bg: "bg-green-700", icon: "fa-microscope", status: "disponible",
        mainUrl: "articles/Biologia Universitaria.html", 
        desc: "Biología avanzada.", 
        subtopics: [
            { name: "Neurociencia del Soma", url: "articles/Neurociencia del Soma.html" }
        ]
    },
    {
        id: "b-s-5", title: "Biología Secundaria", type: "academico", level: "secundaria",
        color: "text-green-600", bg: "bg-green-500", icon: "fa-seedling", status: "disponible",
        mainUrl: "articles/Biologia Segundaria.html",
        desc: "Biblioteca general de biología con genética, célula, cuerpo humano y ecología.",
        subtopics: [
            { name: "Teoría Celular", url: "articles/Teoria Celular.html" },
            { name: "Genética", url: "articles/Genetica.html" },
            { name: "Cuerpo Humano", url: "articles/Cuerpo Humano.html" },
            { name: "Ecología", url: "articles/Ecologia.html" }
        ]
    },

    // ================== MUNDOS LITERARIOS EXCLUSIVE ==================
    { 
        id: "l-1", title: "Macondo", type: "literatura", level: null,
        color: "text-emerald-700", bg: "bg-emerald-600", icon: "fa-leaf", status: "disponible", 
        mainUrl: "articles/Macondo.html",
        desc: "Cien años de soledad. Ecología y genética.",
        subtopics: [
            { name: "Peligros de la endogamia", url: "articles/Peligros de la Endogamia.html" },
            { name: "Descubrimientos científicos", url: "articles/Descubrimientos cientificos.html" },
            { name: "Metrología Macondo", url: "articles/Metrologia Macondo.html" }
        ]
    },
    { 
        id: "l-3", title: "La Odisea", type: "literatura", level: null,
        color: "text-orange-700", bg: "bg-orange-500", icon: "fa-ship", status: "disponible", 
        mainUrl: "articles/Odisea.html",
        desc: "Homero. Ciencia antigua y navegación.",
        subtopics: [
            { name: "Astronomía Homérica", url: "articles/Astronomia Homerica.html" }
        ]
    },
    { 
        id: "l-12", title: "Sherlock Holmes", type: "literatura", level: null,
        color: "text-red-900", bg: "bg-red-800", icon: "fa-search", status: "disponible", 
        mainUrl: "articles/Sherlock.html",
        desc: "A. Conan Doyle. Deducción y forense.",
        subtopics: [
            { name: "Venenos", url: "articles/Venenos.html" },
            { name: "Lógica", url: "articles/Logica.html" }
        ]
    },
    { 
        id: "l-14", title: "Jurassic Park", type: "literatura", level: null,
        color: "text-emerald-800", bg: "bg-emerald-700", icon: "fa-dragon", status: "disponible", 
        mainUrl: "articles/Jurasic.html",
        desc: "Michael Crichton. Clonación y Caos.",
        subtopics: []
    },
    { 
        id: "l-20", title: "El Principito", type: "literatura", level: null,
        color: "text-yellow-600", bg: "bg-yellow-500", icon: "fa-star", status: "disponible", 
        mainUrl: "articles/Principito.html",
        desc: "Saint-Exupéry. Astrobiología poética.",
        subtopics: [
            { name: "Bao Baos", url: "articles/Bao baos.html" },
            { name: "Astrobiología asteroide", url: "articles/Astobiologia en el asteroide.html" }
        ]
    },
    { 
        id: "l-10", title: "Frankenstein", type: "literatura", level: null,
        color: "text-green-800", bg: "bg-green-700", icon: "fa-bolt", status: "disponible", 
        mainUrl: "articles/Frankestein.html",
        desc: "Mary Shelley. Bioética y electricidad.",
        subtopics: []
    },
    { 
        id: "l-7", title: "Viaje al Centro", type: "literatura", level: null,
        color: "text-amber-800", bg: "bg-amber-700", icon: "fa-mountain", status: "disponible", 
        mainUrl: `${config.baseExclusive}/vaije-al-centro-de-la-tierra${config.suffix}`,
        desc: "Julio Verne. Geología profunda.",
        subtopics: []
    },
    
    // --- RESTAURACIÓN DE LIBROS PENDIENTES ---
    { id: "l-13", title: "Dune", type: "literatura", level: null, color: "text-amber-600", bg: "bg-amber-500", icon: "fa-wind", status: "pronto", mainUrl: "#", desc: "Frank Herbert. Ecología.", subtopics: [] },
    { id: "l-5", title: "1984", type: "literatura", level: null, color: "text-slate-700", bg: "bg-slate-600", icon: "fa-eye", status: "pronto", mainUrl: "#", desc: "Orwell. Vigilancia.", subtopics: [] },
    { id: "l-15", title: "Un Mundo Feliz", type: "literatura", level: null, color: "text-pink-700", bg: "bg-pink-600", icon: "fa-vial", status: "pronto", mainUrl: "#", desc: "Huxley. Genética.", subtopics: [] },
    { id: "l-17", title: "El Marciano", type: "literatura", level: null, color: "text-orange-600", bg: "bg-orange-500", icon: "fa-space-shuttle", status: "pronto", mainUrl: "#", desc: "Andy Weir. Supervivencia.", subtopics: [] },
    { id: "l-16", title: "Solaris", type: "literatura", level: null, color: "text-indigo-600", bg: "bg-indigo-500", icon: "fa-brain", status: "pronto", mainUrl: "#", desc: "Lem. Consciencia.", subtopics: [] },
    { id: "l-2", title: "Utopía", type: "literatura", level: null, color: "text-blue-700", bg: "bg-blue-600", icon: "fa-city", status: "pronto", mainUrl: "#", desc: "Moro. Sociedad.", subtopics: [] },
    { id: "l-4", title: "Dante", type: "literatura", level: null, color: "text-purple-700", bg: "bg-purple-600", icon: "fa-fire", status: "pronto", mainUrl: "#", desc: "Cosmología medieval.", subtopics: [] },
    { id: "l-6", title: "Fahrenheit 451", type: "literatura", level: null, color: "text-red-700", bg: "bg-red-600", icon: "fa-fire-extinguisher", status: "pronto", mainUrl: "#", desc: "Bradbury. Censura.", subtopics: [] },
    { id: "l-8", title: "Guerra de Mundos", type: "literatura", level: null, color: "text-lime-700", bg: "bg-lime-600", icon: "fa-rocket", status: "pronto", mainUrl: "#", desc: "Wells. Invasión.", subtopics: [] },
    { id: "l-9", title: "Yo, Robot", type: "literatura", level: null, color: "text-cyan-700", bg: "bg-cyan-600", icon: "fa-robot", status: "pronto", mainUrl: "#", desc: "Asimov. Leyes robóticas.", subtopics: [] },
    { id: "l-11", title: "Drácula", type: "literatura", level: null, color: "text-rose-900", bg: "bg-rose-900", icon: "fa-wine-glass", status: "pronto", mainUrl: "#", desc: "Stoker. Hematología.", subtopics: [] }
];

// Base de Datos de Libros Distópicos / 3D
export const booksData = [
    { 
        id: "l-1", title: "Macondo", author: "G. García Márquez", genre: "fantasia",
        color: "bg-emerald-900", icon: "fa-leaf",
        mainUrl: "articles/Macondo.html",
        desc: "Un análisis de 'Cien Años de Soledad' explorando la genética mendeliana en la familia Buendía, la química detrás de los experimentos de alquimia y los ciclos ecológicos de la selva.",
        science: ["Genética", "Química", "Ecología"],
        subtopics: [
            { name: "Peligros de la Endogamia", url: "articles/Peligros de la Endogamia.html" },
            { name: "Descubrimientos Científicos", url: "articles/Descubrimientos cientificos.html" },
            { name: "Metrología Macondo", url: "articles/Metrologia Macondo.html" }
        ]
    },
    { 
        id: "l-18", title: "El Principito", author: "Antoine de Saint-Exupéry", genre: "fantasia",
        color: "bg-indigo-500", icon: "fa-star",
        mainUrl: "articles/Principito.html",
        desc: "Un viaje por el asteroide B-612 para comprender la astrobiología en cuerpos menores y la amenaza ecológica de las especies invasoras (Baobabs).",
        science: ["Astrobiología", "Ecología", "Astronomía"],
        subtopics: [
            { name: "Los Bao Baos", url: "articles/Bao baos.html" },
            { name: "Astrobiología en el Asteroide", url: "articles/Astobiologia en el asteroide.html" }
        ]
    },
    { 
        id: "l-13", title: "Dune", author: "Frank Herbert", genre: "scifi",
        color: "bg-amber-700", icon: "fa-wind",
        mainUrl: "#",
        desc: "La obra maestra de la ecología planetaria. Exploramos la gestión de recursos hídricos (destiltrajes), la terraformación de Arrakis y la sociología en entornos extremos.",
        science: ["Ecología", "Hidrología", "Sociología"],
        subtopics: [
             { name: "Ecología de Arrakis", url: "#" },
             { name: "Hidrología y Escasez", url: "#" },
             { name: "Terraformación", url: "#" }
        ]
    },
    { 
        id: "l-14", title: "Jurassic Park", author: "Michael Crichton", genre: "scifi",
        color: "bg-green-800", icon: "fa-dragon",
        mainUrl: "articles/Jurasic.html",
        desc: "Más allá de los dinosaurios: un estudio sobre los límites de la ingeniería genética, la viabilidad de la clonación antigua y las inevitables consecuencias de la Teoría del Caos.",
        science: ["Genética", "Matemáticas", "Paleontología"],
        subtopics: [
            { name: "Clonación y ADN", url: "#" },
            { name: "Teoría del Caos", url: "#" },
            { name: "Paleobiología", url: "#" }
        ]
    },
    { 
        id: "l-5", title: "1984", author: "George Orwell", genre: "distopia",
        color: "bg-slate-800", icon: "fa-eye",
        mainUrl: "#",
        desc: "Un examen escalofriante sobre la vigilancia tecnológica (telepantallas), la manipulación de la verdad histórica y la psicología del control de masas.",
        science: ["Tecnología", "Psicología", "Sociología"],
        subtopics: [
            { name: "Tecnología de Vigilancia", url: "#" },
            { name: "Psicología Conductista", url: "#" },
            { name: "Neurolingüística", url: "#" }
        ]
    },
    { 
        id: "l-15", title: "Un Mundo Feliz", author: "Aldous Huxley", genre: "distopia",
        color: "bg-pink-900", icon: "fa-vial",
        mainUrl: "#",
        desc: "Una sociedad 'perfecta' construida sobre la eugenesia (decantación), el condicionamiento psicológico hipnopédico y el control farmacológico mediante el Soma.",
        science: ["Biología", "Farmacología", "Psicología"],
        subtopics: [
             { name: "Eugenesia y Clonación", url: "#" },
             { name: "Neurociencia del Soma", url: "articles/Neurociencia del Soma.html" },
             { name: "Condicionamiento Pavloviano", url: "#" }
        ]
    },
    { 
        id: "l-17", title: "El Marciano", author: "Andy Weir", genre: "scifi",
        color: "bg-orange-800", icon: "fa-space-shuttle",
        mainUrl: "#",
        desc: "La guía definitiva de supervivencia espacial: botánica en suelo marciano estéril, química básica para crear agua y física orbital para calcular el rescate.",
        science: ["Botánica", "Química", "Física"],
        subtopics: [
            { name: "Botánica en Marte", url: "#" },
            { name: "Química del Agua", url: "#" },
            { name: "Dinámica Orbital", url: "#" }
        ]
    },
    { 
        id: "l-16", title: "Solaris", author: "Stanislaw Lem", genre: "scifi",
        color: "bg-indigo-900", icon: "fa-brain",
        mainUrl: "#",
        desc: "El contacto con una inteligencia totalmente ajena. Un océano viviente que desafía nuestra comprensión de la biología, la evolución y la consciencia.",
        science: ["Xenobiología", "Neurociencia", "Física"],
        subtopics: [
            { name: "Xenobiología", url: "#" },
            { name: "Teoría de la Mente", url: "#" },
            { name: "Física de Océanos", url: "#" }
        ]
    },
    { 
        id: "l-3", title: "La Odisea", author: "Homero", genre: "clasico",
        color: "bg-sky-800", icon: "fa-ship",
        mainUrl: "articles/Odisea.html",
        desc: "La ciencia en la antigüedad: navegación astronómica sin brújula, geografía del Mediterráneo y la posible base biológica de los monstruos mitológicos.",
        science: ["Astronomía", "Geografía", "Biología"],
        subtopics: [
            { name: "Astronomía y Navegación", url: "articles/Astronomia Homerica.html" },
            { name: "Biología Marina y Mitos", url: "#" },
            { name: "Geografía del Mediterráneo", url: "#" }
        ]
    },
    { 
        id: "l-2", title: "Utopía", author: "Tomás Moro", genre: "clasico",
        color: "bg-blue-900", icon: "fa-city",
        mainUrl: "#",
        desc: "El diseño de la sociedad ideal. Ingeniería social, planificación urbana sostenible y economía de recursos distribuidos en una isla imaginaria.",
        science: ["Urbanismo", "Economía", "Sociología"],
        subtopics: [
            { name: "Urbanismo y Geografía", url: "#" },
            { name: "Economía de Recursos", url: "#" },
            { name: "Ingeniería Social", url: "#" }
        ]
    },
    { 
        id: "l-4", title: "Divina Comedia", author: "Dante Alighieri", genre: "clasico",
        color: "bg-purple-900", icon: "fa-fire",
        mainUrl: "#",
        desc: "Una enciclopedia medieval: la estructura cosmológica del universo ptolemaico, geología infernal estratificada y simbolismo matemático preciso.",
        science: ["Astronomía", "Geología", "Matemáticas"],
        subtopics: [
            { name: "Astronomía Medieval", url: "#" },
            { name: "Geología del Infierno", url: "#" },
            { name: "Simbolismo Numérico", url: "#" }
        ]
    },
    { 
        id: "l-6", title: "Fahrenheit 451", author: "Ray Bradbury", genre: "distopia",
        color: "bg-red-800", icon: "fa-fire-extinguisher",
        mainUrl: "#",
        desc: "La temperatura a la que arde el papel. Un análisis de la química de la combustión, la censura y el impacto de la tecnología acelerada en la memoria humana.",
        science: ["Química", "Tecnología", "Neurociencia"],
        subtopics: [
            { name: "Química de la Combustión", url: "#" },
            { name: "Tecnología de Pantallas", url: "#" },
            { name: "Memoria y Cerebro", url: "#" }
        ]
    },
    { 
        id: "l-7", title: "Viaje al Centro de la Tierra", author: "Julio Verne", genre: "clasico",
        color: "bg-stone-800", icon: "fa-mountain",
        mainUrl: `${config.baseExclusive}/vaije-al-centro-de-la-tierra${config.suffix}`,
        desc: "La aventura geológica por excelencia. Estratigrafía, mineralogía y paleontología de vertebrados en las profundidades inexploradas del planeta.",
        science: ["Geología", "Paleontología", "Vulcanología"],
        subtopics: [
            { name: "Geología y Estratos", url: "#" },
            { name: "Paleontología de Vertebrados", url: "#" },
            { name: "Vulcanología", url: "#" }
        ]
    },
    { 
        id: "l-8", title: "La Guerra de los Mundos", author: "H.G. Wells", genre: "scifi",
        color: "bg-lime-900", icon: "fa-rocket",
        mainUrl: "#",
        desc: "La invasión biológica. Un estudio pionero sobre astrobiología, la evolución convergente y el papel fundamental del sistema inmunológico.",
        science: ["Astrobiología", "Inmunología", "Tecnología"],
        subtopics: [
            { name: "Astrobiología y Exovida", url: "#" },
            { name: "Inmunología y Bacterias", url: "#" },
            { name: "Tecnología Bélica", url: "#" }
        ]
    },
    { 
        id: "l-9", title: "Yo, Robot", author: "Isaac Asimov", genre: "scifi",
        color: "bg-cyan-900", icon: "fa-robot",
        mainUrl: "#",
        desc: "Los fundamentos de la ética robótica. Lógica algorítmica, inteligencia artificial y los dilemas imprevistos de la programación rígida.",
        science: ["Robótica", "Lógica", "Psicología"],
        subtopics: [
            { name: "Lógica de las 3 Leyes", url: "#" },
            { name: "Inteligencia Artificial", url: "#" },
            { name: "Psicología Robótica", url: "#" }
        ]
    },
    { 
        id: "l-10", title: "Frankenstein", author: "Mary Shelley", genre: "fantasia",
        color: "bg-teal-950", icon: "fa-bolt",
        mainUrl: "articles/Frankestein.html",
        desc: "El Prometeo moderno. Bioética fundacional, los límites de la vida y la muerte, y el uso histórico de la electricidad (galvanismo) en la biología.",
        science: ["Bioética", "Electricidad", "Anatomía"],
        subtopics: [
            { name: "Bioética y Límites", url: "#" },
            { name: "Galvanismo y Electricidad", url: "#" },
            { name: "Anatomía y Trasplantes", url: "#" }
        ]
    },
    { 
        id: "l-11", title: "Drácula", author: "Bram Stoker", genre: "fantasia",
        color: "bg-rose-950", icon: "fa-wine-glass",
        mainUrl: "#",
        desc: "El vampirismo como metáfora de la enfermedad. Un análisis desde la epidemiología victoriana, la hematología y la psicología del miedo.",
        science: ["Epidemiología", "Hematología", "Psicología"],
        subtopics: [
            { name: "Epidemiología y Contagio", url: "#" },
            { name: "Hematología", url: "#" },
            { name: "Hipnosis y Psicología", url: "#" }
        ]
    },
    { 
        id: "l-12", title: "Sherlock Holmes", author: "A. Conan Doyle", genre: "clasico",
        color: "bg-gray-800", icon: "fa-search",
        mainUrl: "articles/Sherlock.html",
        desc: "El nacimiento de la ciencia forense moderna. Química analítica de venenos, estudio de huellas y la aplicación rigurosa del método deductivo.",
        science: ["Forense", "Química", "Lógica"],
        subtopics: [
            { name: "Venenos", url: "articles/Venenos.html" },
            { name: "Lógica", url: "articles/Logica.html" },
            { name: "Ciencia Forense", url: "#" }
        ]
    }
];
