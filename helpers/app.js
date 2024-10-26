const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({message: 'fuck yeah baby'});
});


app.post('/students', function(req, res) {

    const student = req.body

    res.json(student)
})
app.listen(5000);
