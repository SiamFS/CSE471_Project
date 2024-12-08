const express = require('express');
const app = express();
const port= 1526;
const cors = require('cors');

//configuration for frontend and backend communication
app.use(cors());
app.use(express.json());

//MongoDB configuration
const { MongoClient, ServerApiVersion } = require('mongodb');
const e = require('express');
const uri = "mongodb+srv://coverbook:fHZUDi0wOvuFjmLd@cluster0.1sfia34.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const books_collection = client.db("coverbook").collection("books");
    //inserting book data in the cloud db
    app.post('/upload-book', async (req, res) => {
        const data = req.body;
        const result = await books_collection.insertOne(data);
        res.send(result);
    });
    //for getting all books data
    app.get("/allbooks/", async (req, res) => {
      try {
        let query = {};
        if (req.query?.category) {
          query = { category: req.query.category };
        }
    
        let sortOptions = {};
        if (req.query?.sort) {
          sortOptions[req.query.sort] = req.query.order === 'desc' ? -1 : 1;
        } else {
          // Default sort by createdAt in descending order
          sortOptions = { createdAt: -1 };
        }
    
        const limit = parseInt(req.query?.limit) || 0;
    
        const result = await books_collection.find(query)
          .sort(sortOptions)
          .limit(limit)
          .toArray();
    
        res.send(result);
      } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send({ error: 'An error occurred while fetching books' });
      }
    });


    app.get("/search/:title", async (req, res) => {
      const title = req.params.title;
      const query = { bookTitle: { $regex: title, $options: 'i' } };
      const result = await books_collection.find(query).toArray();
      res.send(result);
    });

    app.delete('/delete-book/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await books_collection.deleteOne(query);
      res.send(result);
    });

    app.patch("/updatebook/:id", async (req, res) => {
      const id = req.params.id;
      const updatedBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...updatedBookData
        }
      };
      const result = await books_collection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
    
    const blog_collection = client.db("coverbook").collection("blogs");
    app.post('/posts/create', async (req, res) => {
        const newPost = req.body;
        const result = await blog_collection.insertOne(newPost);
        if (result.insertedId) {
          const insertedPost = await blog_collection.findOne({ _id: result.insertedId });
          res.status(201).send(insertedPost);
        } else {
          res.status(500).send({ error: 'Failed to create post' });
        }
      });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });

  