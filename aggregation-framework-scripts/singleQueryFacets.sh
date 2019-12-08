#!/bin/sh

# recuperar una documento de "companies"
mongo startups --eval '
db.companies.findOne()
'

# crear un índice de tipo texto
mongo startups --eval '
db.companies.createIndex({"description": "text", "overview": "text"})
'

# encontrar compañías que coincidan con el término `networking` usando una
# búsqueda de texto
mongo startups --eval '
db.companies.aggregate([
  {"$match": { "$text": {"$search": "network"}  }  }] )
'

# consultar una dimensión simple con $sortByCount para la búsqueda anterior
mongo startups --eval '
db.companies.aggregate([
  {"$match": { "$text": {"$search": "network"}  }  },
  {"$sortByCount": "$category_code"}] )
'

# extender el pipeline para una fimensión más elaborada
mongo startups --eval '
db.companies.aggregate([
  {"$match": { "$text": {"$search": "network"}  }  } ,
  {"$unwind": "$offices"},
  {"$match": { "offices.city": {"$ne": ""}  }}   ,
  {"$sortByCount": "$offices.city"}] )
'
