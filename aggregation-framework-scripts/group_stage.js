/*****************************

    Etapa: $group

******************************/

// agrupando por año y obteniendo un contar por año usando la expresión { $sum: 1 }
db.movies.aggregate([
  {
    "$group": {
      "_id": "$year",
      "numFilmsThisYear": { "$sum": 1 }
    }
  }
])

// agrupando como antes, luego ordenando de manera descendente en base al contador
db.movies.aggregate([
  {
    "$group": {
      "_id": "$year",
      "count": { "$sum": 1 }
    }
  },
  {
    "$sort": { "count": -1 }
  }
])

// agrupando el número de directores que tiene la película, demistrabdi que
// tenemos que validar los tipos para proteger algunas expresiones
db.movies.aggregate([
  {
    "$group": {
      "_id": {
        "numDirectors": {
          "$cond": [{ "$isArray": "$directors" }, { "$size": "$directors" }, 0]
        }
      },
      "numFilms": { "$sum": 1 },
      "averageMetacritic": { "$avg": "$metacritic" }
    }
  },
  {
    "$sort": { "_id.numDirectors": -1 }
  }
])

// mostrando cómo agrupar todos los documentos. Con convención, usamos null
// o una cadena vacía, ""
db.movies.aggregate([
  {
    "$group": {
      "_id": null,
      "count": { "$sum": 1 }
    }
  }
])

// filtrar resultados de recuperar sólo documentos con valor en "metacritic"
db.movies.aggregate([
  {
    "$match": { "metacritic": { "$gte": 0 } }
  },
  {
    "$group": {
      "_id": null,
      "averageMetacritic": { "$avg": "$metacritic" }
    }
  }
])
