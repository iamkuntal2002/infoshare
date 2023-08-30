const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = new express.Router();
const Data = require("./../models/Data");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// create room =============================
router.post("/rooms", function (req, res) {
    const newData = new Data(req.body);
    newData.save().then(function (result) {
        res.send(result);
    }).catch(function (err) {
        res.send(err);
    })
})

// view private room =========================
router.get("/rooms/:roomName", (req, res) => {
    Data.find({ roomName: req.params.roomName }).then((foundRoom) => {
        if (!foundRoom) {
            res.status(404).send("Room Not found in database");
        }
        res.send(foundRoom);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

// view public room ========================
router.get("/public-room", (req, res) => {
    Data.find({ roomName: "public" }).then((foundRoom) => {
        if (!foundRoom) {
            res.status(404).send("Room Not found in database");
        }
        res.send(foundRoom);
    }).catch((error) => {
        res.status(400).send(error);
    })
})
// update public room ========================
router.patch("/public-room", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["code"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({error: "Invalid Updates!"});
    }
    try {
        const updatedRoom = await Data.find({roomName:"public"});
        if (!updatedRoom) {
            res.send("Room not found in database");
        }

        updates.forEach((update)=> updatedRoom[0][update] = req.body[update]);
        await updatedRoom[0].save();

        res.send(updatedRoom[0]);
    }
    catch (error) {
        res.status(400).send(error);
    }
})
// update private room ========================
router.patch("/rooms/:roomName", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["code"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({error: "Invalid Updates!"});
    }
    try {
        const updatedRoom = await Data.find({roomName:req.params.roomName});
        if (!updatedRoom) {
            res.send("Room not found in database");
        }

        updates.forEach((update)=> updatedRoom[0][update] = req.body[update]);
        await updatedRoom[0].save();

        res.send(updatedRoom[0]);
    }
    catch (error) {
        res.status(400).send(error);
    }
})
module.exports = router;