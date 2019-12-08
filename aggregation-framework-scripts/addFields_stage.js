/*****************************

    Etapa: $addFields

******************************/

// reemplazar el valor del campo ``gravity``
db.solarSystem.aggregate([{"$project": { "gravity": "$gravity.value" } }]);

// añadir ``name`` y elimina ``_id`` de la proyección
db.solarSystem.aggregate([{"$project": { "_id": 0, "name": 1, "gravity": "$gravity.value" } }])''

// añadir más cambios al documento proyectado
db.solarSystem.aggregate([
{"$project":{
    "_id": 0,
    "name": 1,
    "gravity": "$gravity.value",
    "meanTemperature": 1,
    "density": 1,
    "mass": "$mass.value",
    "radius": "$radius.value",
    "sma": "$sma.value" }
}]);

// usar ``$addFields`` para generar nuevos campos
db.solarSystem.aggregate([
{"$addFields":{
    "gravity": "$gravity.value",
    "mass": "$mass.value",
    "radius": "$radius.value",
    "sma": "$sma.value"}
}]);

// combinar ``$project`` con ``$addFields``
db.solarSystem.aggregate([
{"$project": {
    "_id": 0,
    "name": 1,
    "gravity": 1,
    "mass": 1,
    "radius": 1,
    "sma": 1}
},
{"$addFields": {
    "gravity": "$gravity.value",
    "mass": "$mass.value",
    "radius": "$radius.value",
    "sma": "$sma.value"
}}]);
