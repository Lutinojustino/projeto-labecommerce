// import { createPurchase, createUser, creatProduct, getAllProducts, getAllPurchasesFromUserId, getAllUsers, produto, purchase, queryProductsByName, usuario } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import knex from "knex";
// import { Product, Purchase, User } from "./type";

///funçao do servidor express ex:1
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});
//crie um endpoint de teste
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

// //ex:2
// app.get("/users", (req: Request, res: Response) => {
//     res.status(200).send(usuario);
//   });

// app.get("/products", (req: Request, res: Response) => {
//   res.status(200).send(produto);
// });

// app.get('/product/search', (req: Request, res: Response) => {
//   const q = req.query.q as string // forçamos a tipagem aqui*
//   const result: Product[] = produto.filter(
//   (product) => product.name.toLowerCase().includes(q.toLowerCase()))
//   res.status(200).send(result)
//   })

//     //compra realizada com sucesso

// app.post('/user', (req: Request, res: Response) => {
//     const{id, email, password}=req.body
//     const newUser:User={
//       id,
//       email,
//       password
//     }
//    usuario.push(newUser)
//    res.status(201).send("Curso registrado com sucesso")
//   })

//   //Produto cadastrado com sucesso"
// app.post('/product', (req: Request, res: Response) => {
//     const{ id, name,price, category}=req.body
//     const newProduct:Product={
//       id,
//       name,
//       price,
//       category
//     }
//   produto.push(newProduct)
//    res.status(201).send("Curso registrado com sucesso")
//   })

//   // "Compra realizada com sucesso"
// app.post('/purchases',(req: Request, res: Response)=>{
//     const userId = req.body.userId as string
//     const productId = req.body.productId as string
//     const quantity = req.body.quantity as number
//     const totalPrice = req.body.totalPrice as number
//     const newPurchase: Purchase = {
//         userId,
//         productId,
//         quantity,
//         totalPrice
//     }
//     purchase.push(newPurchase)
//     res.status(201).send("Compra realizada com sucesso")
//     })

//verificando

// //verificar

// app.get("/purchase", (req: Request, res: Response) => {
//   res.status(200).send(purchase);
// });

// // 4º Exercicio - aprofundamento-express-exercicios

// app.get ('/product/:id', (req: Request, res: Response) => {
//   const{id}=req.params
//   // console.log(id);
//   const result = produto.filter((produto)=>{
//     return produto.id === id
//   })
//   res.status(200).send({recebido: result})
// })

//    //Get User Purchases by User id
// app.get("/product/:id/purchase", (req: Request, res: Response)=>{
//   const id:string = req.params.id
//   const result: Product = produto.find((item)=> item.id === id)
//   res.status(200).send(result)
//   })

////////////////////////////////////////////////////////////////////////////////////
//introdução ao Knex

//Configure seu servidor Express para que ele se comunique com seu banco de dados
// via knex e refatore (ou recrie) os seguintes endpoints:
//Get All Users
//method HTTP (GET)
//path ("/users")
//response
//status 200
//array de users do arquivo .db
//Criando endpoints conexao KNEX

//Get All Users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.raw("SELECT * FROM users;");
    res.status(200).send({ result });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

//Get All Products
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.raw("SELECT * FROM products;");
    res.status(200).send({ result });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

//Get All Products by name
app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q;
    const sql = "SELECT * FROM products WHERE name LIKE ?;";
    console.log(sql, ["%${q}%"]);
    const result = await db.raw(sql, ["%${q}%"]);
    console.log(result);
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

// ex 2 do knex

//Recriando endpoints(users, products, purchases) endpoints
// criando users

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password, createdAt } = req.body;

    if (!id || typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser do tipo 'string'");
    }

    if (!email || typeof email !== "string") {
      res.status(400);
      throw new Error("'email' deve ser do tipo 'string'");
    }

    if (!password || typeof password !== "string") {
      res.status(400);
      throw new Error("'password' deve ser do tipo 'string'");
    }

    const idExist = await db.raw(`SELECT * FROM users WHERE id = ?`, [id]);
    if (idExist.length > 0) {
      res.status(400);
      throw new Error("Já existe uma conta com esse id");
    }

    const newUser = await db.raw(
      `INSERT INTO users (id, name, email, password, createdAt) VALUES (?, ?, ?, ?, ?)`,
      [id, name, email, password, createdAt]
    );
    res.status(200).send({ message: "Cadastro realizado com sucesso!" });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

//  ex 2 criando products

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;

    if (!id || typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser do tipo 'string'");
    }

    if (!name || typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser do tipo 'string'");
    }

    if (!price || typeof price !== "number") {
      res.status(400);
      throw new Error("'price' deve ser do tipo 'number'");
    }

    if (!description || typeof description !== "string") {
      res.status(400);
      throw new Error("'descripition' deve ser do tipo 'string'");
    }

    const idExist = await db.raw(`SELECT * FROM products WHERE id = ?`, [id]);
    if (idExist.length > 0) {
      res.status(400);
      throw new Error("Já existe um produto com esse id");
    }

    const newProduct = await db.raw(
      `INSERT INTO products (id, name, price, description, imageUrl) VALUES (?, ?, ?, ?, ?)`,
      [id, name, price, description, imageUrl]
    );
    res.status(200).send({ message: "Cadastro realizado com sucesso!" });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

// ex 2 criando purchase

app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const { id, buyer, totalPrice, createdAt, paid } = req.body;
    console.log(id, buyer, totalPrice, paid);
    if (!id || typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser do tipo 'string'");
    }
    if (isNaN(totalPrice)) {
      res.status(400);
      throw new Error("'o preço deve ser no formato de numeros'");
    }
    const idExist = await db.raw(`
    SELECT * FROM purchases WHERE id = "${id}";
  `);
    if (idExist.length) {
      res.status(400);
      throw new Error("Já existe um um produto com esse id");
    }
    const newPuchases = await db.raw(`
  INSERT INTO purchases(id, buyer, totalPrice, paid)
  VALUES ("${id}", "${buyer}", "${totalPrice}", "${paid}");`);
    res.status(201).send({ message: "Compra cadastrada com sucesso" });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});
//exercicio 2 mesmo fluxo do ex 1

//Get User Purchases by User id
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const purchases = await db("purchases").select("*").where({ user_id: id });
    res.status(200).send(purchases);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar as compras do usuário" });
  }
});

//////////////////

// aprofundamentos Knex
//Refatore pelo menos 3 endpoints que você fez em raw para query builder.

// ex 1 refatorando de raw para query builder
//Get All Users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.select("*").from("users");
    res.status(200).send({ result });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

//Get All Products
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.select("").from("products");
    res.status(200).send({ result });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});
//Get All Products by name
app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.name;
    const result = await db
      .select("*")
      .from("products")
      .where("name", "LIKE", `%${q}%`);
    res.status(200).send({ result });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

// ex 2 Crie o seguinte endpoint com query builder:

// //Get Purchase by id

// app.get("/purchases/:id", async(req:Request, res:Response)=>{
//     try {
//         const id = req.params.id
//         const purchase = await db("purchases").where({id}).first();
//         const buyer = await db("users").where({id : purchase.buyer}).first();
//         const infoPurchaseUser = {
//         purchaseId: purchase.id,
//         totalPrice: purchase.totalPrice,
//         createdAt: purchase.createdAt,
//         paid: purchase.paid,
//         buyerId:buyer.id,
//         emailBuyer:buyer.email,
//         nameBuyer: buyer.name
//     }
//         res.status(200).send(infoPurchaseUser);
//     } catch (error: any) {
//         res.status(400).send(error.message)
//     }
// });

//Refatore o endpoint criado no exercício anterior para que o resultado bem sucedido também
//retorne a lista de produtos que tem relação com a compra pesquisada.

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // Busca a compra pelo ID
    const purchase = await db("purchases").where({ id }).first();
    if (!purchase) {
      return res.status(404).send("Compra não encontrada");
    }
    // Busca o comprador pelo ID da compra
    const buyer = await db("users").where({ id: purchase.buyer }).first();
    if (!buyer) {
      return res.status(404).send("Comprador não encontrado");
    }
    // Busca os produtos da compra
    const products = await db("products")
      .join(
        "purchases_products",
        "purchases_products.product_id",
        "products.id"
      )
      .where("purchases_products.purchase_id", id);
    // Cria o objeto com as informações da compra e do comprador
    const infoPurchaseUser = {
      purchaseId: purchase.id,
      totalPrice: purchase.totalPrice,
      createdAt: purchase.createdAt,
      paid: purchase.paid,
      buyerId: buyer.id,
      emailBuyer: buyer.email,
      nameBuyer: buyer.name,
      products: products,
    };
    res.status(200).send(infoPurchaseUser);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});
