/*****************************

    Etapa: $project

******************************/

// proyectar ``name`` y eliminar ``_id``
db.solarSystem.aggregate([{ "$project": { "_id": 0, "name": 1 } }]);

// proyectar campos ``name`` y ``gravity``, incluyendo por defecto ``_id``
db.solarSystem.aggregate([{ "$project": { "name": 1, "gravity": 1 } }]);

// proyectando un atributo de un documento usando la notación "propiedad.campo"
db.solarSystem.aggregate([{ "$project": { "_id": 0, "name": 1, "gravity.value": 1 } }]);

// reasignando el campos ``gravity``con el valor ``gravity.value`` embebido en el documento
db.solarSystem.aggregate([{"$project": { "_id": 0, "name": 1, "gravity": "$gravity.value" }}]);

// creando un nuevo campo en el documento llamado ``surfaceGravity``
db.solarSystem.aggregate([{"$project": { "_id": 0, "name": 1, "surfaceGravity": "$gravity.value" }}]);

// creando un nuevo campos ``myWeight`` uusando una empresión
db.solarSystem.aggregate([{"$project": { "_id": 0, "name": 1, "myWeight": { "$multiply": [ { "$divide": [ "$gravity.value", 9.8 ] }, 86 ] } }}]);
