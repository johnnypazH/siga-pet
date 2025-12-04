import {https} from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";

// Inicialize o Firebase Admin SDK para ter acesso ao Firestore.
admin.initializeApp();

const app = express();
// Permite que nosso app Angular (em outro domínio) acesse a API.
app.use(cors({origin: true}));

// Instância do Firestore
const db = admin.firestore();

// Função genérica para criar endpoints para uma coleção
const createCollectionEndpoints = (collectionName: string) => {
  // eslint-disable-next-line new-cap
  const router = express.Router();

  // GET /<collectionName>
  router.get("/", async (req, res) => {
    const expandFields: string[] = [];
    const queryParams: {[key: string]: string} = {};

    // Separa os parâmetros de '_expand' dos outros filtros
    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        const value = req.query[key] as string | string[];
        if (key === "_expand") {
          if (Array.isArray(value)) {
            expandFields.push(...value);
          } else {
            expandFields.push(value);
          }
        } else {
          queryParams[key] = Array.isArray(value) ? value[0] : value;
        }
      }
    }

    try {
      // Simplificamos a busca, pois a filtragem é feita no frontend.
      const query = db.collection(collectionName);
      const snapshot = await query.get();
      const items = await Promise.all(snapshot.docs.map(async (doc) => {
        // Definimos o tipo de 'item' para permitir propriedades dinâmicas.
        const item: {[key: string]: any} = {id: doc.id, ...doc.data()};

        // Lógica para o _expand
        for (const field of expandFields) {
          const relatedId = item[field + "Id"]; // ex: petId
          if (relatedId && typeof relatedId === "string") {
            const pluralMap: {[key: string]: string} = {
              "pet": "pets",
              "servico": "servicos",
              "tutor": "tutores",
              "fornecedor": "fornecedores",
            };
            const relatedCollectionName = pluralMap[field] || `${field}s`;

            const relatedDoc = await db.collection(relatedCollectionName)
              .doc(relatedId)
              .get();
            if (relatedDoc.exists) {
              const relatedData = relatedDoc.data();
              if (relatedData) {
                item[field] = {id: relatedDoc.id, ...relatedData};
              }
            }
          }
        }
        return item;
      }));

      res.status(200).json(items);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // GET /<collectionName>/:id
  router.get("/:id", async (req, res) => {
    try {
      const docId = req.params.id;
      if (!docId) {
        return res.status(400).send("Document ID is required");
      }
      const doc = await db.collection(collectionName).doc(docId).get();
      if (!doc.exists) {
        return res.status(404).send("Document not found");
      }
      const data = doc.data();
      if (!data) {
        return res.status(404).send("Document has no data");
      }
      return res.status(200).json({id: doc.id, ...data});
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  // POST /<collectionName>
  router.post("/", async (req, res) => {
    try {
      const newItem = req.body;
      const docRef = await db.collection(collectionName).add(newItem);
      res.status(201).json({id: docRef.id, ...newItem});
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // PUT /<collectionName>/:id
  router.put("/:id", async (req, res) => {
    try {
      const docId = req.params.id;
      if (!docId) {
        return res.status(400).send("Document ID is required");
      }
      const updatedItem = req.body;
      // Remove o id do corpo se ele existir, para não ser salvo no documento
      delete updatedItem.id;
      await db.collection(collectionName)
        .doc(docId)
        .set(updatedItem, {merge: true});
      res.status(200).json({id: docId, ...updatedItem});
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // DELETE /<collectionName>/:id
  router.delete("/:id", async (req, res) => {
    try {
      const docId = req.params.id;
      if (!docId) {
        return res.status(400).send("Document ID is required");
      }
      await db.collection(collectionName).doc(docId).delete();
      res.status(204).send(); // 204 No Content
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};

// Criando as rotas para cada coleção do seu db.json
app.use("/tutores", createCollectionEndpoints("tutores"));
app.use("/pets", createCollectionEndpoints("pets"));
app.use("/produtos", createCollectionEndpoints("produtos"));
app.use("/servicos", createCollectionEndpoints("servicos"));
app.use("/agendamentos", createCollectionEndpoints("agendamentos"));
app.use("/fornecedores", createCollectionEndpoints("fornecedores"));
app.use("/funcionarios", createCollectionEndpoints("funcionarios"));

// Exporta a API do Express como uma Firebase Function.
// Toda requisição para https://.../api/* será gerenciada pelo 'app' do Express.
export const api = https.onRequest(app);
