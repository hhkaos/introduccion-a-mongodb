/*****************************

    Etapa: $redact

******************************/

var userAccess = "Management"

// comparamos si el valor en la variable userAccess está en el array al que
// apunta el campo $acl
db.employees
  .aggregate([
    {
      "$redact": {
        "$cond": [{ "$in": [userAccess, "$acl"] }, "$$DESCEND", "$$PRUNE"]
      }
    }
  ])
  .pretty()
