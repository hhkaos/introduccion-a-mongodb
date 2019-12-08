/*****************************

    Etapa: $match

******************************/

// coincide con todos los documentos cuyo tipo no sea igual a "Star"
db.solarSystem.aggregate([{
  "$match": { "type": { "$ne": "Star" } }
}]).pretty()

// equialente al anterior pero usando el comando db.collection.find()
db.solarSystem.find({ "type": { "$ne": "Star" } }).pretty();

// contar el número de documentos
db.solarSystem.count();

// usando $count
db.solarSystem.aggregate([{
  "$match": { "type": { "$ne": "Star"} }
}, {
  "$count": "planets"
}]);
