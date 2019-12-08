/*****************************

    Etapa: $bucketAuto

******************************/

// usar bucketAuto para que calcule los buckets por nosotros
db.movies.aggregate([
  {
    "$bucketAuto": {
      "groupBy": "$imdb.rating",
      "buckets": 4,
      "output": {
        "average_per_bucket": { "$avg": "$imdb.rating" },
        "count": { "$sum": 1 }
      }
    }
  }
])

// limpiar los límites de los bucket filtrando documento que no tengan un campo
// imdb.rating o este no contenga un valor numérico
db.movies.aggregate([
  {
    "$match": { "imdb.rating": { "$gte": 0 } }
  },
  {
    "$bucketAuto": {
      "groupBy": "$imdb.rating",
      "buckets": 4,
      "output": {
        "average_per_bucket": { "$avg": "$imdb.rating" },
        "count": { "$sum": 1 }
      }
    }
  }
])

// la cardinalidad importa! Documentos con el mismo valor en la expresión
// groupBy **tienen** que ser puestos en el mismo bucket, lo que significa que
// podriamos obtener una distribución uniforme entre buckets. De este modo
// podemos usar el campo $title para obtener un valor más único
db.movies.aggregate([
  {
    "$bucketAuto": {
      "groupBy": "$title",
      "buckets": 4
    }
  }
])

// pruebas de granularidad

// esta es la función usada en el vídeo para generar la colección de prueba
function make_granularity_values() {
  for (let i = 0; i < 100; i++) {
    db.granularity_test.insertOne({
      "powers_of_2": Math.pow(2, Math.floor(Math.random() * 10)),
      "renard_and_e": Math.random() * 10
    })
  }
}

// probando la distribución de granularidad de $powers_of_2
db.granularity_test.aggregate([
  {
    "$bucketAuto": {
      "groupBy": "$powers_of_2",
      "buckets": 10,
      "granularity": "POWERSOF2"
    }
  }
])
