console.log("Made it in");

var express = require("express");
var cors = require("cors");
var app = express();
//var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "final319";
const client = new MongoClient(url);
const db = client.db(dbName);
app.listen(port, () => {


  console.log("App listening at http://%s:%s", host, port);
  app.get("/listWords", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
      .collection("words")
      .find(query)
      .limit(100)
      .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
  });


  app.post("/addWord", async (req, res) => {
    try{
      await client.connect();
      console.log("Node connected successfully to POST MongoDB");
      console.log(req.body);
      const values = Object.values(req.body);
      const newDocument = {
        "id": values[0],
        "word": values[1],
        "hint": values[2]
      };
      console.log(newDocument);
      const results = await db
        .collection("words")
        .insertOne(newDocument);
      res.status(200);
      res.send(results);
    } catch(error){
      console.error("Error on POST request:", error);
      res.status(500).send({error: "Internal server error."});
    }
  });
  

  app.put("/updateWord/:id", async (req, res) => {
    try{
      const id = Number(req.params.id);
      const values = Object.values(req.body);
      await client.connect();
      console.log("Node connected successfully to PUT MongoDB at ID " + id);
      console.log(req.body);
      await db
        .collection("words")
        .updateOne({id: id}, {$set: {word: values[0], hint: values[1]}})
    } catch(error){
      console.error("Error on PUT request:", error);
      res.status(500).send({error: "Internal server error."});
    }
  });

  app.delete("/deleteWord/:id", async (req, res) => {
    try{
      const id = Number(req.params.id);
      await client.connect();
      console.log("Node connected successfully to DELETE MongoDB at ID " + id);
      console.log(req.body);
      await db
        .collection("words")
        .deleteOne({id: id});
      console.log("Deleted");
    } catch(error){
      console.error("Error on DELETE request:", error);
      res.status(500).send({error: "Internal server error."});
    }
  });

  console.log("App listening at http://%s:%s", host, port);
  app.get("/listReportedWords", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
      .collection("reported-words")
      .find(query)
      .limit(100)
      .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
  });
  

  app.post("/reportWord", async (req, res) => {
    try{
      await client.connect();
      console.log("Node connected successfully to POST MongoDB");
      console.log(req.body);
      const values = Object.values(req.body);
      const newDocument = {
        "id": values[0],
        "word_id" : values[1],
        "word": values[2],
        "hint": values[3]
      };
      console.log(newDocument);
      const results = await db
        .collection("reported-words")
        .insertOne(newDocument);
      res.status(200);
      res.send(results);
    } catch(error){
      console.error("Error on POST request:", error);
      res.status(500).send({error: "Internal server error."});
    }
  });

});