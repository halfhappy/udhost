const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

const Compile = require('udmdcompiler');
const comp = new Compile();

// Run the markdown compiler
comp.process('./md', './public');

// App routing set here

/**
 * Class for setup of the routing for the application
 * @type {Handlers}
 * @example
 * const Handler = new Handlers();
 * Handler.generateYaml('./public', './md');
 */
class Handlers {

  /**
   * Gets the recursive folder/file structure of the filedest to pass to writeYaml
   * @param  {string} filedest location of the files to generate the app.yaml
   * @param  {string} src      source files built from e.g. md files
   * @example
   *  generateYaml(filedest, src){
   *   var yamlfiles = comp.getrecursivestructure(filedest);
   *   var destfiles = [];
   *   for (var i = 0; i < yamlfiles.length; i++) {
   *     if (yamlfiles[i].endsWith('.html')) {
   *       destfiles.push(yamlfiles[i]);
   *     }
   *   }
   *   this.writeYaml( destfiles );
   *  }
   */
  generateYaml(filedest, src){

    var yamlfiles = comp.getrecursivestructure(filedest);
    var destfiles = [];
    for (var i = 0; i < yamlfiles.length; i++) {
      if (yamlfiles[i].endsWith('.html')) {
        destfiles.push(yamlfiles[i]);
      }
    }

    this.writeYaml( destfiles );

  }

  /**
   * Writes the app.yaml file, using an array of line items and the appyamlcontents array
   * @param  {array} appyamlcontents array of valid files for adding to the routing app.yaml file
   * @return {file} app.yaml in the root directory
   * @example
   * writeYaml(appyamlcontents){
   *
   *  var handlerstructure = [];
   *
   *  handlerstructure.push('runtime: nodejs');
   *  handlerstructure.push('env: flex');
   *  handlerstructure.push('\nhandlers:');
   *  handlerstructure.push( appyamlcontents.join('\n') );
   *
   *  fs.writeFile('app.yaml', handlerstructure.join('\n'), (err) => {
   *    if (err) throw err;
   *    console.log('The file has been saved!');
   *   });
   *
   * }
   */
  writeYaml(appyamlcontents){

    var handlerstructure = [];
    handlerstructure.push('runtime: nodejs');
    handlerstructure.push('env: flex');
    handlerstructure.push('\nhandlers:');
    handlerstructure.push( appyamlcontents.join('\n') );

    fs.writeFile('app.yaml', handlerstructure.join('\n'), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }

}

const Handler = new Handlers();
Handler.generateYaml('./public', './md');

// Internal handling is not required, this is running on google app engine, handling via app.yaml
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// });
//
// app.get('/another.html', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'another.html'));
// });

/**
 * app listener on port 3000
 * @example
 *  app.listen(3000, function () {
 *    console.log('udhost app listening on port 3000!');
 *  });
 */
app.listen(3000, function () {
  console.log('udhost app listening on port 3000!');
});
