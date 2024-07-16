
BBDD neo4j explicacion

() - nodo
[] -  relacion

MERGE (${entityCamelcase})-[r:${relation}]-(${entityCamelcase})

RETURN - devuelve directamente el dato
WITH - sirve para encadenar consultas

MATCH (n) RETURN - devuelve todos los nodos de la bbdd
la n es alias 

MATCH (cositas:CommercialAgent) RETURN cositas - busca una etiqueta llamad commerciaalgen, le pone el as: cositas y lo devuelve

MATCH (n) RETURN n
lo que une customer con sale,es una relacion llamada purchase
MATCH (c:Customer)-[:PURCHASE]->(s:Sale) RETURN c - deuvelve los clientes que tengan relacion con sale,

si quiero devolver las ventas
MATCH (c:Customer)-[:PURCHASE]->(s:Sale) RETURN c,s

si quiero traer la info de la relacion
MATCH (c:Customer)-[r:PURCHASE]->(s:Sale) RETURN c,r,s


Este cliente a traves de esta relacion esta asociado a esta venta y producto
MATCH (c:Customer)-[r:PURCHASE]->(s:Sale)-[:CONTAINS]->(p:product) RETURN c,r,s,p

Cliente 2 ha comprado este producto, el cliente tal ha comprado este producto
MATCH (c:Customer)-[r:PURCHASE]->(s:Sale)-[:CONTAINS]->(p:product) RETURN c,p

Intentar evitarlo, usa mucha 
MATCH (c:Customer)-[*]->(s:Sale)-[*]->(p:product) RETURN c,p

Te devuelve un array de objetos con titulo y campo cada uno
MATCH (c:Customer {id:2})-[:PURCHASED]->(s:Sale)-[CONTAINS]->(p:product) 
RETURN p AS productsBoughtByvustomer

Este devuelve un array de objetos por el collect con un titulo y un campo (este mejor)
MATCH (c:Customer {id:2})-[:PURCHASED]->(s:Sale)-[CONTAINS]->(p:product) 
WITH c, COLLECT(p) AS productsBoughtByvustomer
le pasas a la siguiente consulta los datos c, y p

MATCH (other: Customer)-[:PURCHASED]->(s:Sale)-[CONTAINS]->(p:product) 
WHERE other <> c AND p IN productsBoughtByvustomer
WITH other, productsBoughtByvustomer


consulta entera
MATCH (c:Customer {id: 2})-[:PURCHASED]->(:Sale)-[:CONTAINS]->(p:Product)
WITH c, COLLECT(p) AS productsBoughtByCustomer

MATCH (other:Customer)-[:PURCHASED]->(:Sale)-[:CONTAINS]->(p:Product)
WHERE other <> c AND p IN productsBoughtByCustomer
WITH other, productsBoughtByCustomer

MATCH (other)-[:PURCHASED]->(:Sale)-[contains:CONTAINS]->(recommendedProduct:Product)
WHERE NOT recommendedProduct IN productsBoughtByCustomer
WITH recommendedProduct, SUM(contains.quantity) AS totalQuantity
RETURN recommendedProduct, totalQuantity AS occurrences
ORDER BY occurrences DESC
LIMIT 5



arhivo js, node.js



