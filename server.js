const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.statis(__dirname));

require('./routes/routes.js')(app);

app.listen(PORT, function() {
    console.log('App listening on PORT: ' + PORT);
});