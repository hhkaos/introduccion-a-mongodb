/*****************************

    Etapa: $bucket

******************************/

// mostrar que sin el campo "default", puede producir errores si existen valores
// que no se puede asociar a los límites
db.movies.aggregate([
  {
    "$bucket": {
      "groupBy": "$imdb.rating",
      "boundaries": [0, 5, 8, Infinity]
    }
  }
])

// protegerse ante este error
db.movies.aggregate([
  {
    "$bucket": {
      "groupBy": "$imdb.rating",
      "boundaries:" [0, 5, 8, Infinity],
      "default": "not rated"
    }
  }
])

// usar expresiones para conseguir el valor medio de los valores de un bucket
db.movies.aggregate([
  {
    "$bucket": {
      "groupBy": "$imdb.rating",
      "boundaries": [0, 5, 8, Infinity],
      "default": "not rated",
      "output": {
        "average_per_bucket": { "$avg": "$imdb.rating" }
      }
    }
  }
])

// hacer la cuenta por bucket después de haber especificado una salida, tenemos
// que calcularla explicitamente
db.movies.aggregate([
  {
    "$bucket": {
      "groupBy": "$imdb.rating",
      "boundaries": [0, 5, 8, Infinity],
      "default": "not rated",
      "output": {
        "average_per_bucket": { "$avg": "$imdb.rating" },
        "count": { "$sum": 1 }
      }
    }
  }
])
