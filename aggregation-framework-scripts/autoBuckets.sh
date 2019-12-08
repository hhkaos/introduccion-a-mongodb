#!/bin/sh

# generar buckets automaticamente con la etapa $bucketAuto
mongo startups --eval 'db.companies.aggregate([
  { "$match": {"offices.city": "New York" }},
  {"$bucketAuto": {
    "groupBy": "$founded_year",
    "buckets": 5
}}])
'

# usar la opción `output` de $bucketAuto
mongo startups --eval 'db.companies.aggregate([
  { "$match": {"offices.city": "New York" }},
  {"$bucketAuto": {
    "groupBy": "$founded_year",
    "buckets": 5,
    "output": {
        "total": {"$sum":1},
        "average": {"$avg": "$number_of_employees" }  }}}
])
'

# comportamiento por defecto de $buckeAuto
mongo startups --eval '
for(i=1; i <= 1000; i++) {  db.series.insert( {_id: i}  ) };
db.series.aggregate(
  {$bucketAuto:
    {groupBy: "$_id", buckets: 5 }
})
'

# generar buckets automáticamente usando la serie numérica R20
mongo startups --eval 'db.series.aggregate(
  {$bucketAuto:
    {groupBy: "$_id", buckets: 5 , granularity: "R20"}
  })
'
