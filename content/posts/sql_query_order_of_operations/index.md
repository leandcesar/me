---
title: Ordem de execução da consulta SQL
description: Compreenda a ordem das consultas SQL para otimizar suas queries
date: 2022-08-15
draft: false
slug: /pills/sql-query-order-of-operations
tags:
  - SQL
---

![Cat playing with dices](./cover.png)

## Conteúdo

Entender a ordem de consulta SQL pode ajudá-lo a diagnosticar por que uma consulta não será executada e ajudará a otimizar suas consultas, para criar consultas eficientes e eficazes.

1. `FROM` / `JOIN`: o banco de dados examina as tabelas especificadas por essas cláusulas e, em seguida, mescla esses dados.

   > Limite ou pré-agregue tabelas **antes de junções** grandes.

2. `WHERE`: o filtro dos dados unidos pelos valores das colunas. Um equívoco comum é tentar usar a instrução `WHERE` para filtrar agregações. A instrução `GROUP BY` é executada depois, e por isso, para agregações, é usada a cláusula `HAVING`.

3. `GROUP BY`: reduz os campos do conjunto de resultados em seus valores distintos agrupando-os em _buckets_.

4. `HAVING`: se a consulta tiver uma cláusula `GROUP BY`, as restrições serão aplicadas aos _buckets_, descartando aqueles que não atenderem à restrição.

   > A cláusula `WHERE` é semelhante à cláusula `HAVING`, mas o primeiro é para filtrar linhas, enquanto o segundo é para filtrar _buckets_.

5. `SELECT`: quaisquer expressões são computadas para selecionar os dados desejados.

6. `DISTINCT`: das linhas restantes, as com valores duplicados na coluna marcada com essa cláusula serão descartadas.

7. `ORDER BY`: as linhas são classificadas pelos dados especificados nessa cláusula em ordem crescente ou decrescente.

8. `LIMIT` / `OFFSET`: por último, as linhas que estão fora do intervalo especificado são descartadas, deixando o conjunto final de linhas a ser retornado da consulta.

## Exemplo

Em vez de executar:

```sql
select count(*)
from first_names
join last_names on first_names.id = last_names.id
where first_names.name ilike '%a%' or last_names.name ilike '%a%'
```

Utilize, para aumentar a velocidade da consulta:

```sql
with limited_first_names as (
  select *
  from first_names
  where name ilike '%a%'
), limited_last_names as (
  select *
  from last_names
  where name ilike '%a%'
)
select count(*)
from limited_first_names
join limited_last_names on limited_last_names.id = limited_first_names.id
```

## Referências

- <https://sisense.com/blog/sql-query-order-of-operations/>
- <https://sqlbolt.com/lesson/select_queries_order_of_execution/>
