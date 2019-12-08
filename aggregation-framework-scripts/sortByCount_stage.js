/*****************************

    Etapa: $sortByCount

******************************/

// realizar una agrupación seguida de una ordenación
db.movies.aggregate([
  {
    "$group": {
      "_id": "$imdb.rating",
      "count": { "$sum": 1 }
    }
  },
  {
    "$sort": { "count": -1 }
  }
])

// sortByCount equivalente al anterior. De hecho, si ejecutas este pipeline con
// { explain: true } verás que se transofrma en la consulta anterior!
db.movies.aggregate([
  {
    "$sortByCount": "$imdb.rating"
  }
])
