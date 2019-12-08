#!/bin/sh

# crear buckets manualmente usando $bucket
mongo startups --eval '
db.companies.aggregate( [
  { "$match": {"founded_year": {"$gt": 1980}, "number_of_employees": {"$ne": null}}  },
  {"$bucket": {
     "groupBy": "$number_of_employees",
     "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ]}
}] )
'

# reproducir un mensaje de error con documentos que no encajan en ningún bucket
mongo startups --eval '
db.coll.insert({ x: "a" });
db.coll.aggregate([{ $bucket: {groupBy: "$x", boundaries: [0, 50, 100]}}])
'

# establecer la opción `default` para recopilar los documentos que no encajan en buckets
mongo startups --eval '
db.companies.aggregate( [
  { "$match": {"founded_year": {"$gt": 1980}}},
  { "$bucket": {
    "groupBy": "$number_of_employees",
    "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ],
    "default": "Other" }
}] )
'

# reproducir un mensaje de error para fronteras que establecen límites con
# distintos tipos de datos
mongo startups --eval '
db.coll.aggregate([{ $bucket: {groupBy: "$x", boundaries: ["a", "b", 100]}}])
'

# establecer la opción `output` para la etapa $bucket
mongo startups --eval '
db.companies.aggregate([
  { "$match":
    {"founded_year": {"$gt": 1980}}
  },
  { "$bucket": {
      "groupBy": "$number_of_employees",
      "boundaries": [ 0, 20, 50, 100, 500, 1000, Infinity  ],
      "default": "Other",
      "output": {
        "total": {"$sum":1},
        "average": {"$avg": "$number_of_employees" },
        "categories": {"$addToSet": "$category_code"}
      }
    }
  }
]
)
'
