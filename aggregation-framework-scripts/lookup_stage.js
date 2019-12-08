/*****************************

    Etapa: $lookup

******************************/

// familiarizarse con el esquema de air_alliances
db.air_alliances.findOne()

// realizar una búsqueda uniendo air_alliances con air_airlines y reemplazando
// la información de las aerolíneas actuales con los nuevos valores
db.air_alliances
  .aggregate([
    {
      "$lookup": {
        "from": "air_airlines",
        "localField": "airlines",
        "foreignField": "name",
        "as": "airlines"
      }
    }
  ])
  .pretty()
