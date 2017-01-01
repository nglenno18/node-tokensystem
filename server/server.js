const path = require('path');
const express = require('express');
// console.log(__dirname + '/../public');
// path we want to provide to the public express middleware
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
var app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(port, function(){
  console.log(`Server up and running on port: ${port}`);
});
