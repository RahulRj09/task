const express = require('express');
const app = express();
const path = require("path");
app.use(express.urlencoded())
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})
app.post("/validate", (req, res) => {
    let data = req.body.strings
    if (data.length % 2 == 0) {
        let counts = {
            "curlyBracesOpen": 0, "curlyBracesClose": 0,
            "parenthesesOpen": 0, "parenthesesClose": 0,
            "squareBracketsOpen": 0, "squareBracketsClose": 0

        }
        result = [];

        for (let i = 0; i < data.length; i++) {
            if (data[i] == "{") {
                counts.curlyBracesOpen += 1;
            }
            if (data[i] == "}") {
                counts.curlyBracesClose += 1;
            }
            if (data[i] == "(") {
                counts.parenthesesOpen += 1;
            }
            if (data[i] == ")") {
                counts.parenthesesClose += 1;
            }
            if (data[i] == "[") {
                counts.squareBracketsOpen += 1;
            }
            if (data[i] == "]") {
                counts.squareBracketsClose += 1;
            }
        }
        if (counts.curlyBracesClose == counts.curlyBracesOpen) {
            result.push(true);
        } else {
            result.push(false);
        }
        if (counts.parenthesesOpen == counts.parenthesesClose) {
            result.push(true);
        } else {
            result.push(false);
        }
        if (counts.squareBracketsClose == counts.squareBracketsOpen) {
            result.push(true);
        }
        else {
            result.push(false);
        }
        for (let k = 0; k < result.length; k++) {
            if (!result[k]) {
                res.send(false);
            }
        }
        res.send(true);
    }
    res.send(false);
})
app.listen(3000);