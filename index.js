const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://username:password123!@cluster0.terwq.mongodb.net/?retryWrites=true&w=majority";
const app = express();

app.listen(5000, function () {
  console.log("App running on Port 5000...");
});

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connection to database successful...");
    const db = client.db("users");
    const userCollection = db.collection("userDetails");

    app.get("/findUsers", (req, res) => {
      const findUsers = userCollection
        .find()
        .toArray()
        .then((result) => {
          return res.send(result);
        })
        .catch((error) => {
          return res.send(error.message);
        });
    });

    app.get("/findUser/:id", (req, res) => {
      const findUser = userCollection
        .findOne({ _id: req.params.id })
        .then((result) => {
          if (result != null) return res.send(result);

          return res.send(
            "Oops the entered user id is not available. Please check again..."
          );
        })
        .catch((error) => {
          return res.send(error.message);
        });
    });

    app.delete("/deleteUser/:id", (req, res) => {
      const deleteUser = userCollection
        .deleteOne({ _id: req.params.id })
        .then((result) => {
          if (result.deletedCount === 0)
            return res.send(
              "No user id matches the entered id. Please check again to delete..."
            );

          return res.send("User deleted successfully...");
        })
        .catch((error) => {
          return res.send(error.message);
        });
    });

    app.post("/createNewUser", (req, res) => {
      let body = "";
      let BodyJson = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        BodyJson = JSON.parse(body);

        const createUser = userCollection
          .insertOne(BodyJson)
          .then((result) => {
            return res.send("New user created successfully...");
          })
          .catch((error) => {
            return res.send(error.message);
          });
      });
    });

    app.put("/updateUser", (req, res) => {
      let body = "";
      let BodyJson = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        BodyJson = JSON.parse(body);

        const updateUser = userCollection
          .findOneAndUpdate(
            { _id: BodyJson._id },
            {
              $set: {
                name: BodyJson.name,
                dob: BodyJson.dob,
                address: BodyJson.address,
                description: BodyJson.description,
                createdAt: BodyJson.createdAt,
              },
            }
          )
          .then((result) => {
            if (result.value == null)
              return res.send(
                "Cannot update a user that is not available in collection. Please check the user id again..."
              );

            return res.send("User updated successfully...");
          })
          .catch((error) => {
            return res.send(error.message);
          });
      });
    });
  })
  .catch((error) => console.error(error));
