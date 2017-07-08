const express = require('express')
const app = express()

const fs = require('fs')

// TODO: Change this to npm (remove local) before launch
const Compile = require('../udmdcompiler');
const comp = new Compile();

// Run the markdown compiler

// TODO: make the two argurments a setting for users in a config file
comp.process('./md', './public');

// App routing set here



//GETs

app.get('/', function (req, res) {
  res.send('Hello World!')
})

//POSTs



return;

/**
 * Listener
 * @return {test} test
 */
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
