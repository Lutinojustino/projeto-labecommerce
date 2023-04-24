-- Active: 1682348847228@@127.0.0.1@3306
-- CREATE TABLE users (
--     id TEXT PRIMARY KEY NOT NULL UNIQUE,
--     email TEXT NOT NULL UNIQUE,
--     password TEXT NOT NULL 


-- );

-- SELECT *FROM users;

-- INSERT INTO users (id,email,password)
-- VALUES
-- (11,"123user@email.com","123vv"),
-- (12,"456user@email.com","456vv"),
-- (13,"789user@email.com","789vv");

-- CREATE TABLE product (
--     id TEXT PRIMARY KEY NOT NULL UNIQUE,
--     name TEXT NOT NULL,
--     price REAL NOT NULL,
--     category TEXT NOT NULL


-- );

-- SELECT*FROM product;

-- INSERT INTO product (id,name,price,category)
-- VALUES
-- (1,"s21",32,"ELECTRONICS"),
-- (2,"ps5",33,"ELECTRONICS"),
-- (3,"s22",34,"ELECTRONICS"),
-- (4,"xbox",35,"ELECTRONICS"),
-- (5,"iphone",36,"ELECTRONICS");

-- INSERT INTO product 
-- VALUES
-- (5,"nintendo",37,"ELECTRONICS"),
-- (6,"notebook",38,"ELECTRONICS");

-- /*aprofundamento SQL*/
-- --retornar todos os usuarios
-- SELECT *FROM users;

-- --retornar todos os usuarios
-- SELECT *FROM product;

-- -- crie um novo usuário
-- -- insere o item mockado na tabela users
-- INSERT INTO users
-- VALUES
-- (14,"987user@email.com","987vv");

-- --crie um novo produto
-- --insere o item mockado na tabela products
-- INSERT INTO product
-- VALUES
-- (7,"mouse",39,"ELECTRONICS");


-- --crie um termo de busca, por exemplo "monitor"
-- --retorna o resultado baseado no termo de busca
-- SELECT*FROM product
-- WHERE name LIKE "%mouse";

-- /*busca d produtos por id */

-- SELECT * FROM product
-- WHERE id LIKE "6";
-- --apagar produto
-- DELETE FROM product
-- WHERE id=7;
-- --apaga user
-- DELETE from users
-- WHERE id=13;

-- --edita id user
-- UPDATE users
-- SET
-- password = "122"
-- WHERE id="15";


-- --edita user produto
-- UPDATE product
-- SET
-- name="megadriver"
-- WHERE id="6";






-- -- ex 3

-- SELECT *FROM users
-- ORDER BY email ASC;






-- /* EXERCICIO 3 DO 2*/
-- SELECT *FROM product
-- ORDER  BY price ASC
-- LIMIT 20;


-- SELECT * FROM product
-- WHERE price BETWEEN 33 AND 35
-- ORDER BY price ASC;


-- -- relaçoes sql 1

-- CREATE TABLE purchases (
--     id TEXT PRIMARY KEY NOT NULL UNIQUE,
--     total_price REAL NOT NULL,
--     paid INTEGER NOT NULL,
--     created_at TEXT ,
--     buyer_id TEXT NOT NULL, Foreign Key (buyer_id) REFERENCES users (id)
-- );

-- SELECT *FROM purchases;
-- --nao usar 0 por que nao presta, nao funciona vcs nao avisaram eu fiquei aqui 4 horas!!!!!



-- --do 21 ao 24 e um id de compras.
-- INSERT INTO purchases(id,total_price,paid,created_at, buyer_id)
-- VALUES
-- ( 21,32,1,0,"12"),
-- ( 22,33,1,0,"13"),
-- ( 23,34,1,0,"11"),
-- ( 24,35,1,0,"12");

-- UPDATE purchases
-- SET created_at = datetime("now","localtime"),
--  paid =1
-- WHERE id = "23";
 
-- SELECT *FROM purchases;


-- SELECT * FROM purchases
-- INNER JOIN users
-- ON purchases.buyer_id = users.id;


-- --relações em SQL 2,CRIAR TABELA
CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id)
    REFERENCES purchases (id),
    FOREIGN KEY (product_id) 
    REFERENCES product (id)
);
--   SELECT *FROM purchases_products;

--   INSERT INTO purchases_products (purchase_id, product_id, quantity)
--   VALUES
--     ('p003', 'prod001', 1),
--     ('p003', 'prod003', 2),
--     ('p003', 'prod004', 2);
    

-- --     SELECT *
-- -- FROM purchases_products
-- -- INNER JOIN purchases ON purchases_products.purchase_id = purchases.purchase_id
-- -- INNER JOIN products ON purchases_products.product_id = products.product_id;

-- --tem que colocar o * para referenciar a tabela , nao esqueça
-- -- SELECT purchases_products.*, purchases.*, product.*
-- -- FROM purchases_products
-- -- LEFT JOIN purchases ON purchases_products.purchase_id = purchases.id
-- -- LEFT JOIN products ON purchases_products.product_id = product.id;





--exercicio 2 knex , apagar tudo que fizemos 


CREATE Table users(
id TEXT PRIMARY KEY  NOT NULL UNIQUE,
name TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
password TEXT NOT NULL,
createdAt TEXT,
DATE DEFAULT(DATETIME('now','localtime'))
);

--Recriando a tabela de Products
CREATE Table products(
id TEXT PRIMARY KEY NOT NULL UNIQUE,
name TEXT NOT NULL UNIQUE,
price REAL NOT NULL,
description TEXT NOT NULL,
imageUrl TEXT NOT NULL
);

--Recriando a tabela Purchases
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    totalPrice REAL NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT (datetime('now', 'localtime')),
    paid INTEGER NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
);
--conferindo

SELECT * FROM users;


SELECT * FROM products;


SELECT *FROM purchases;
