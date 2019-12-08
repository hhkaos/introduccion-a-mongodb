/*****************************

    Etapa: $sample

******************************/

// creando una muestra de 200 documentos de la colección ``nycFacilities``
db.nycFacilities.aggregate([{"$sample": { "size": 200 }}]).pretty();
