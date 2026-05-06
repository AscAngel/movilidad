"""
    Glosario de lineas:
    
    L1: Linea 1 del tren ligero
    L2: Linea 2 del tren ligero
    L3: Linea 3 del tren ligero
    L4: Linea 4 del tren ligero
    L5: Macro aeropuerto pero no existe, esta en planes
    L6: Macro Calzada 
    L7: Macro Periferico
"""

#Link del mapa de siteur: https://www.siteur.gob.mx/images/jal_red_siteur_mapa_movilidad_(1)-01.png

stations = {
    
    "Periferico_Norte": {
        "name": "Periférico Norte",
        "aliases": {
            "L1": "Periférico Norte",
            "L7": "Periférico Norte"
        },
        "lines": ["L1", "L7"]
    },
    "Dermatologico": {
        "name": "Dermatológico",
        "aliases": {
            "L1": "Dermatológico"
        },
        "lines": ["L1"]
    },
    "Atemajac": {
        "name": "Atemajac",
        "aliases": {
            "L1": "Atemajac"
        },
        "lines": ["L1"]
    },
    "Division_del_Norte": {
        "name": "División del Norte",
        "aliases": {
            "L1": "División del Norte"
        },
        "lines": ["L1"]
    },
    "Avila_Camacho": {
        "name": "Ávila Camacho",
        "aliases": {
            "L1": "Ávila Camacho",
            "L3": "Ávila Camacho"
        },
        "lines": ["L1", "L3"]
    },
    "Mezquitan": {
        "name": "Mezquitán",
        "aliases": {
            "L1": "Mezquitán"
        },
        "lines": ["L1"]
    },
    "Refugio": {
        "name": "Refugio",
        "aliases": {
            "L1": "Refugio"
        },
        "lines": ["L1"]
    },
    "Juarez": {
        "name": "Juárez",
        "aliases": {
            "L1": "Juárez",
            "L2": "Juárez"
        },
        "lines": ["L1", "L2"]
    },
    "Mexicaltzingo": {
        "name": "Mexicaltzingo",
        "aliases": {
            "L1": "Mexicaltzingo"
        },
        "lines": ["L1"]
    },
    "Washington": {
        "name": "Washington",
        "aliases": {
            "L1": "Washington"
        },
        "lines": ["L1"]
    },
    "Santa_Filomena": {
        "name": "Santa Filomena",
        "aliases": {
            "L1": "Santa Filomena"
        },
        "lines": ["L1"]
    },
    "Unidad_Deportiva": {
        "name": "Unidad Deportiva",
        "aliases": {
            "L1": "Unidad Deportiva"
        },
        "lines": ["L1"]
    },
    "Urdaneta": {
        "name": "Urdaneta",
        "aliases": {
            "L1": "Urdaneta"
        },
        "lines": ["L1"]
    },
    "18_de_Marzo": {
        "name": "18 de Marzo",
        "aliases": {
            "L1": "18 de Marzo"
        },
        "lines": ["L1"]
    },
    "Isla_Raza": {
        "name": "Isla Raza",
        "aliases": {
            "L1": "Isla Raza"
        },
        "lines": ["L1"]
    },
    "Patria_Sur": {
        "name": "Patria Sur",
        "aliases": {
            "L1": "Patria Sur"
        },
        "lines": ["L1"]
    },
    "Espana": {
        "name": "España",
        "aliases": {
            "L1": "España"
        },
        "lines": ["L1"]
    },
    "Santuario_Martires_de_Cristo_Rey": {
        "name": "Santuario Mártires de Cristo Rey",
        "aliases": {
            "L1": "Santuario Mártires de Cristo Rey"
        },
        "lines": ["L1"]
    },
    "Periferico_Sur": {
        "name": "Periférico Sur",
        "aliases": {
            "L1": "Periférico Sur",
            "L7": "Periférico Sur"
        },
        "lines": ["L1", "L7"]
    },
    "Centro": {
        "name": "Centro",
        "aliases": {
            "L2": "Plaza Universidad",
            "L3": "Guadalajara Centro"
        },
        "lines": ["L2", "L3"]
    },
    "San_Juan_de_Dios": {
        "name": "San Juan de Dios",
        "aliases": {
            "L2": "San Juan de Dios",
            "L6": "San Juan de Dios"
        },
        "lines": ["L2", "L6"]
    },
    "Belisario_Dominguez": {
        "name": "Belisario Dominguez",
        "aliases": {
            "L2": "Belisario Dominguez"
        },
        "lines": ["L2"]
    },
    "Oblatos": {
        "name": "Oblatos",
        "aliases": {
            "L2": "Oblatos"
        },
        "lines": ["L2"]
    },
    "Cristobal_de_Onate": {
        "name": "Cristóbal de Oñate",
        "aliases": {
            "L2": "Cristóbal de Oñate"
        },
        "lines": ["L2"]
    },
    "San_Andres": {
        "name": "San Andrés",
        "aliases": {
            "L2": "San Andrés"
        },
        "lines": ["L2"]
    },
    "San_Jacinto": {
        "name": "San Jacinto",
        "aliases": {
            "L2": "San Jacinto"
        },
        "lines": ["L2"]
    },
    "La_Aurora": {
        "name": "La Aurora",
        "aliases": {
            "L2": "La Aurora"
        },
        "lines": ["L2"]
    },
    "Tetlan": {
        "name": "Tetlán",
        "aliases": {
            "L2": "Tetlán"
        },
        "lines": ["L2"]
    },
    "Arcos_de_Zapopan": {
        "name": "Arcos de Zapopan",
        "aliases": {
            "L3": "Arcos de Zapopan"
        },
        "lines": ["L3"]
    },
    "Periferico_Belenes": {
        "name": "Periférico Belenes",
        "aliases": {
            "L3": "Periférico Belenes",
            "L7": "Periférico Belenes"
        },
        "lines": ["L3", "L7"]
    },
    "Mercado_del_Mar": {
        "name": "Mercado del Mar",
        "aliases": {
            "L3": "Mercado del Mar"
        },
        "lines": ["L3"]
    },
    "Zapopan_Centro": {
        "name": "Zapopan Centro",
        "aliases": {
            "L3": "Zapopan Centro"
        },
        "lines": ["L3"]
    },
    "Plaza_Patria": {
        "name": "Plaza Patria",
        "aliases": {
            "L3": "Plaza Patria"
        },
        "lines": ["L3"]
    },
    "Circunvalacion_Country": {
        "name": "Circunvalación Country",
        "aliases": {
            "L3": "Circunvalación Country"
        },
        "lines": ["L3"]
    },
    "La_Normal": {
        "name": "La Normal (CETRAM)",
        "aliases": {
            "L3": "La Normal (CETRAM)"
        },
        "lines": ["L3"]
    },
    "Santuario": {
        "name": "Santuario",
        "aliases": {
            "L3": "Santuario"
        },
        "lines": ["L3"]
    },
    "Independencia": {
        "name": "Independencia",
        "aliases": {
            "L3": "Independencia",
            "L6": "Bicentenario"
        },
        "lines": ["L3", "L6"]
    },
    "Plaza_de_la_Bandera": {
        "name": "Plaza de la Bandera",
        "aliases": {
            "L3": "Plaza de la Bandera"
        },
        "lines": ["L3"]
    },
    "CUCEI": {
        "name": "CUCEI",
        "aliases": {
            "L3": "CUCEI"
        },
        "lines": ["L3"]
    },
    "Revolucion": {
        "name": "Revolución",
        "aliases": {
            "L3": "Revolución"
        },
        "lines": ["L3"]
    },
    "Rio_Nilo": {
        "name": "Río Nilo",
        "aliases": {
            "L3": "Río Nilo"
        },
        "lines": ["L3"]
    },
    "Tlaquepaque_Centro": {
        "name": "Tlaquepaque Centro",
        "aliases": {
            "L3": "Tlaquepaque Centro"
        },
        "lines": ["L3"]
    },
    "Lazaro_Cardenas_L3": {
        "name": "Lázaro Cárdenas",
        "aliases": {
            "L3": "Lázaro Cárdenas"
        },
        "lines": ["L3"]
    },
    "Central_de_Autobuses": {
        "name": "Central de Autobuses",
        "aliases": {
            "L3": "Central de Autobuses"
        },
        "lines": ["L3"]
    },
    "Tlajomulco_Centro": {
        "name": "Tlajomulco Centro",
        "aliases": {
            "L4": "Tlajomulco Centro"
        },
        "lines": ["L4"]
    },
    "CUTLAJO": {
        "name": "CUTLAJO",
        "aliases": {
            "L4": "CUTLAJO"
        },
        "lines": ["L4"]
    },
    "Lomas_del_Sur": {
        "name": "Lomas del Sur",
        "aliases": {
            "L4": "Lomas del Sur"
        },
        "lines": ["L4"]
    },
    "El_Cuervo": {
        "name": "El Cuervo",
        "aliases": {
            "L4": "El Cuervo"
        },
        "lines": ["L4"]
    },
    "Concepcion_del_Valle": {
        "name": "Concepción del Valle",
        "aliases": {
            "L4": "Concepción del Valle"
        },
        "lines": ["L4"]
    },
    "Real_del_Valle": {
        "name": "Real del Valle",
        "aliases": {
            "L4": "Real del Valle"
        },
        "lines": ["L4"]
    },
    "Jalisco_200_Anos": {
        "name": "Jalisco 200 Años",
        "aliases": {
            "L4": "Jalisco 200 Años",
            "L7": "Jalisco 200 Años"
        },
        "lines": ["L4", "L7"]
    },
    "Las_Juntas": {
        "name": "Las Juntas",
        "aliases": {
            "L4": "Las Juntas",
            "L6": "Fray Angélico"
        },
        "lines": ["L4", "L6"]
    },
    "Mirador": {
        "name": "Mirador",
        "aliases": {
            "L6": "Mirador"
        },
        "lines": ["L6"]
    },
    "Huentitan": {
        "name": "Huentitán",
        "aliases": {
            "L6": "Huentitán"
        },
        "lines": ["L6"]
    },
    "Zoologico": {
        "name": "Zoológico",
        "aliases": {
            "L6": "Zoológico"
        },
        "lines": ["L6"]
    },
    "Independencia_Norte": {
        "name": "Independencia Norte",
        "aliases": {
            "L6": "Independencia Norte",
            "L7": "Independencia Norte"
        },
        "lines": ["L6", "L7"]
    },
    "San_Patricio": {
        "name": "San Patricio",
        "aliases": {
            "L6": "San Patricio"
        },
        "lines": ["L6"]
    },
    "Igualdad": {
        "name": "Igualdad",
        "aliases": {
            "L6": "Igualdad"
        },
        "lines": ["L6"]
    },
    "Monumental": {
        "name": "Monumental",
        "aliases": {
            "L6": "Monumental"
        },
        "lines": ["L6"]
    },
    "Monte_Olivete": {
        "name": "Monte Olivete",
        "aliases": {
            "L6": "Monte Olivete"
        },
        "lines": ["L6"]
    },
    "Circunvalacion": {
        "name": "Circunvalación",
        "aliases": {
            "L6": "Circunvalación"
        },
        "lines": ["L6"]
    },
    "Ciencias_de_la_Salud": {
        "name": "Ciencias de la Salud",
        "aliases": {
            "L6": "Ciencias de la Salud"
        },
        "lines": ["L6"]
    },
    "Juan_Alvarez": {
        "name": "Juan Álvarez",
        "aliases": {
            "L6": "Juan Álvarez"
        },
        "lines": ["L6"]
    },
    "Alameda": {
        "name": "Alameda",
        "aliases": {
            "L6": "Alameda"
        },
        "lines": ["L6"]
    },
    "La_Paz": {
        "name": "La Paz",
        "aliases": {
            "L6": "La Paz"
        },
        "lines": ["L6"]
    },
    "Ninos_Heroes": {
        "name": "Niños Héroes",
        "aliases": {
            "L6": "Niños Héroes"
        },
        "lines": ["L6"]
    },
    "Agua_Azul": {
        "name": "Agua Azul",
        "aliases": {
            "L6": "Agua Azul"
        },
        "lines": ["L6"]
    },
    "Cipres": {
        "name": "Ciprés",
        "aliases": {
            "L6": "Ciprés"
        },
        "lines": ["L6"]
    },
    "Heroes_de_Nacozari": {
        "name": "Héroes de Nacozari",
        "aliases": {
            "L6": "Héroes de Nacozari"
        },
        "lines": ["L6"]
    },
    "Lazaro_Cardenas_L6": {
        "name": "Lázaro Cárdenas",
        "aliases": {
            "L6": "Lázaro Cárdenas"
        },
        "lines": ["L6"]
    },
    "El_Dean": {
        "name": "El Dean",
        "aliases": {
            "L6": "El Dean"
        },
        "lines": ["L6"]
    },
    "Zona_Industrial": {
        "name": "Zona Industrial",
        "aliases": {
            "L6": "Zona Industrial"
        },
        "lines": ["L6"]
    },
    "Lopez_de_Legaspi": {
        "name": "López de Legaspi",
        "aliases": {
            "L6": "López de Legaspi"
        },
        "lines": ["L6"]
    },
    "Clemente_Orozco": {
        "name": "Clemente Orozco",
        "aliases": {
            "L6": "Clemente Orozco"
        },
        "lines": ["L6"]
    },
    "Artes_Plasticas": {
        "name": "Artes Plásticas",
        "aliases": {
            "L6": "Artes Plásticas"
        },
        "lines": ["L6"]
    },
    "Esculturas": {
        "name": "Esculturas",
        "aliases": {
            "L6": "Esculturas"
        },
        "lines": ["L6"]
    },
    "Carretera_a_Chapala": {
        "name": "Carretera a Chapala",
        "aliases": {
            "L7": "Carretera a Chapala"
        },
        "lines": ["L7"]
    },
    "Las_Pintas": {
        "name": "Las Pintas",
        "aliases": {
            "L7": "Las Pintas"
        },
        "lines": ["L7"]
    },
    "Artesanos": {
        "name": "Artesanos",
        "aliases": {
            "L7": "Artesanos"
        },
        "lines": ["L7"]
    },
    "Adolf_Horn": {
        "name": "Adolf Horn",
        "aliases": {
            "L7": "Adolf Horn"
        },
        "lines": ["L7"]
    },
    "Toluquilla": {
        "name": "Toluquilla",
        "aliases": {
            "L7": "Toluquilla"
        },
        "lines": ["L7"]
    },
    "8_de_Julio": {
        "name": "8 de Julio",
        "aliases": {
            "L7": "8 de Julio"
        },
        "lines": ["L7"]
    },
    "San_Sebastianito": {
        "name": "San Sebastianito",
        "aliases": {
            "L7": "San Sebastianito"
        },
        "lines": ["L7"]
    },
    "Terminal_Sur_de_Autobuses": {
        "name": "Terminal Sur de Autobuses",
        "aliases": {
            "L7": "Terminal Sur de Autobuses"
        },
        "lines": ["L7"]
    },
    "Iteso": {
        "name": "Iteso",
        "aliases": {
            "L7": "Iteso"
        },
        "lines": ["L7"]
    },
    "Lopez_Mateos": {
        "name": "López Mateos",
        "aliases": {
            "L7": "López Mateos"
        },
        "lines": ["L7"]
    },
    "Agricola": {
        "name": "Agrícola",
        "aliases": {
            "L7": "Agrícola"
        },
        "lines": ["L7"]
    },
    "El_Briseno": {
        "name": "El Briseño",
        "aliases": {
            "L7": "El Briseño"
        },
        "lines": ["L7"]
    },
    "Mariano_Otero": {
        "name": "Mariano Otero",
        "aliases": {
            "L7": "Mariano Otero"
        },
        "lines": ["L7"]
    },
    "Miramar": {
        "name": "Miramar",
        "aliases": {
            "L7": "Miramar"
        },
        "lines": ["L7"]
    },
    "Felipe_Ruvalcaba": {
        "name": "Felipe Ruvalcaba",
        "aliases": {
            "L7": "Felipe Ruvalcaba"
        },
        "lines": ["L7"]
    },
    "El_Colli": {
        "name": "El Colli",
        "aliases": {
            "L7": "El Colli"
        },
        "lines": ["L7"]
    },
    "Chapalita_Inn": {
        "name": "Chapalita Inn",
        "aliases": {
            "L7": "Chapalita Inn"
        },
        "lines": ["L7"]
    },
    "Parque_Metropolitano": {
        "name": "Parque Metropolitano",
        "aliases": {
            "L7": "Parque Metropolitano"
        },
        "lines": ["L7"]
    },
    "Ciudad_Granja": {
        "name": "Ciudad Granja",
        "aliases": {
            "L7": "Ciudad Granja"
        },
        "lines": ["L7"]
    },
    "Ciudad_Judicial": {
        "name": "Ciudad Judicial",
        "aliases": {
            "L7": "Ciudad Judicial"
        },
        "lines": ["L7"]
    },
    "Estadio_Chivas": {
        "name": "Estadio Chivas",
        "aliases": {
            "L7": "Estadio Chivas"
        },
        "lines": ["L7"]
    },
    "Vallarta": {
        "name": "Vallarta",
        "aliases": {
            "L7": "Vallarta"
        },
        "lines": ["L7"]
    },
    "San_Juan_de_Ocotan": {
        "name": "San Juan de Ocotán",
        "aliases": {
            "L7": "San Juan de Ocotán"
        },
        "lines": ["L7"]
    },
    "5_de_Mayo": {
        "name": "5 de Mayo",
        "aliases": {
            "L7": "5 de Mayo"
        },
        "lines": ["L7"]
    },
    "Acueducto": {
        "name": "Acueducto",
        "aliases": {
            "L7": "Acueducto"
        },
        "lines": ["L7"]
    },
    "Santa_Margarita": {
        "name": "Santa Margarita",
        "aliases": {
            "L7": "Santa Margarita"
        },
        "lines": ["L7"]
    },
    "La_Tuzania": {
        "name": "La Tuzanía",
        "aliases": {
            "L7": "La Tuzanía"
        },
        "lines": ["L7"]
    },
    "San_Isidro": {
        "name": "San Isidro",
        "aliases": {
            "L7": "San Isidro"
        },
        "lines": ["L7"]
    },
    "Centro_Cultural_Universitario": {
        "name": "Centro Cultural Universitario",
        "aliases": {
            "L7": "Centro Cultural Universitario"
        },
        "lines": ["L7"]
    },
    "Constitucion": {
        "name": "Constitución",
        "aliases": {
            "L7": "Constitución"
        },
        "lines": ["L7"]
    },
    "Tabachines": {
        "name": "Tabachines",
        "aliases": {
            "L7": "Tabachines"
        },
        "lines": ["L7"]
    },
    "La_Cantera": {
        "name": "La Cantera",
        "aliases": {
            "L7": "La Cantera"
        },
        "lines": ["L7"]
    },
    "El_Batan": {
        "name": "El Batán",
        "aliases": {
            "L7": "El Batán"
        },
        "lines": ["L7"]
    },
    "La_Experiencia": {
        "name": "La Experiencia",
        "aliases": {
            "L7": "La Experiencia"
        },
        "lines": ["L7"]
    },
    "Rancho_Nuevo": {
        "name": "Rancho Nuevo",
        "aliases": {
            "L7": "Rancho Nuevo"
        },
        "lines": ["L7"]
    },
    "Lomas_del_Paraiso": {
        "name": "Lomas del Paraíso",
        "aliases": {
            "L7": "Lomas del Paraíso"
        },
        "lines": ["L7"]
    },
    "Zoologico_Guadalajara": {
        "name": "Zoológico Guadalajara",
        "aliases": {
            "L7": "Zoológico Guadalajara"
        },
        "lines": ["L7"]
    },
    "Barranca_de_Huentitan": {
        "name": "Barranca de Huentitán",
        "aliases": {
            "L7": "Barranca de Huentitán"
        },
        "lines": ["L7"]
    },
    "Comisaria_de_Guadalajara": {
        "name": "Comisaría de Guadalajara",
        "aliases": {
            "L7": "Comisaría de Guadalajara"
        },
        "lines": ["L7"]
    },
    "Colonia_Jalisco": {
        "name": "Colonia Jalisco",
        "aliases": {
            "L7": "Colonia Jalisco"
        },
        "lines": ["L7"]
    },
    "Los_Conejos": {
        "name": "Los Conejos",
        "aliases": {
            "L7": "Los Conejos"
        },
        "lines": ["L7"]
    },
    
}