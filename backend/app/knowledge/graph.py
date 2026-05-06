lines = {
    "L1": [
        "Periferico_Norte",
        "Dermatologico",
        "Atemajac",
        "Division_del_Norte",
        "Avila_Camacho",
        "Mezquitan",
        "Refugio",
        "Juarez",
        "Mexicaltzingo",
        "Washington",
        "Santa_Filomena",
        "Unidad_Deportiva",
        "Urdaneta",
        "18_de_Marzo",
        "Isla_Raza",
        "Patria_Sur",
        "Espana",
        "Santuario_Martires_de_Cristo_Rey",
        "Periferico_Sur"
    ],

    "L2": [
        "Juarez",
        "Centro",
        "San_Juan_de_Dios",
        "Belisario_Dominguez",
        "Oblatos",
        "Cristobal_de_Onate",
        "San_Andres",
        "San_Jacinto",
        "La_Aurora",
        "Tetlan"
    ],
    
    "L3": [
        "Arcos_de_Zapopan",
        "Periferico_Belenes",
        "Mercado_del_Mar",
        "Zapopan_Centro",
        "Plaza_Patria",
        "Circunvalacion_Country",
        "Avila_Camacho",
        "La_Normal",
        "Santuario",
        "Centro",
        "Independencia",
        "Plaza_de_la_Bandera",
        "CUCEI",
        "Revolucion",
        "Rio_Nilo",
        "Tlaquepaque_Centro",
        "Lazaro_Cardenas_L3",
        "Central_de_Autobuses"
    ],

    "L4": [
        "Tlajomulco_Centro",
        "CUTLAJO",
        "Lomas_del_Sur",
        "El_Cuervo",
        "Concepcion_del_Valle",
        "Real_del_Valle",
        "Jalisco_200_Anos",
        "Las_Juntas"
    ],

    "L6": [
        "Mirador",
        "Huentitan",
        "Zoologico",
        "Independencia_Norte",
        "San_Patricio",
        "Igualdad",
        "Monumental",
        "Monte_Olivete",
        "Circunvalacion",
        "Ciencias_de_la_Salud",
        "Juan_Alvarez",
        "Alameda",
        "San_Juan_de_Dios",
        "Independencia",
        "La_Paz",
        "Ninos_Heroes",
        "Agua_Azul",
        "Cipres",
        "Heroes_de_Nacozari",
        "Lazaro_Cardenas_L6",
        "El_Dean",
        "Zona_Industrial",
        "Lopez_de_Legaspi",
        "Clemente_Orozco",
        "Artes_Plasticas",
        "Esculturas",
        "Las_Juntas"
    ],

    "L7": [
        "Carretera_a_Chapala",
        "Las_Pintas",
        "Artesanos",
        "Jalisco_200_Anos",
        "Adolf_Horn",
        "Toluquilla",
        "8_de_Julio",
        "San_Sebastianito",
        "Periferico_Sur",
        "Terminal_Sur_de_Autobuses",
        "Iteso",
        "Lopez_Mateos",
        "Agricola",
        "El_Briseno",
        "Mariano_Otero",
        "Miramar",
        "Felipe_Ruvalcaba",
        "El_Colli",
        "Chapalita_Inn",
        "Parque_Metropolitano",
        "Ciudad_Granja",
        "Ciudad_Judicial",
        "Estadio_Chivas",
        "Vallarta",
        "San_Juan_de_Ocotan",
        "5_de_Mayo",
        "Acueducto",
        "Santa_Margarita",
        "La_Tuzania",
        "Periferico_Belenes",
        "San_Isidro",
        "Centro_Cultural_Universitario",
        "Constitucion",
        "Tabachines",
        "La_Cantera",
        "Periferico_Norte",
        "El_Batan",
        "La_Experiencia",
        "Rancho_Nuevo",
        "Lomas_del_Paraiso",
        "Independencia_Norte",
        "Zoologico_Guadalajara",
        "Barranca_de_Huentitan",
        "Comisaria_de_Guadalajara",
        "Colonia_Jalisco",
        "Los_Conejos"
    ]
    
}

def get_weight(line):
    if line == "L4":
        return 7
    elif line in ["L6", "L7"]:
        return 3
    return 2

def build_graph(lines_dict):
    graph = {}

    for line, stations in lines_dict.items():
        for i, current in enumerate(stations):

            if current not in graph:
                graph[current] = set()

            weight = get_weight(line)

            if i > 0:
                prev_station = stations[i - 1]
                graph[current].add((prev_station, line, weight))

            if i < len(stations) - 1:
                next_station = stations[i + 1]
                graph[current].add((next_station, line, weight))

    return {k: list(v) for k, v in graph.items()}

if __name__ == "__main__":
    from pprint import pprint

    graph = build_graph(lines)
    pprint(graph)