var parser = require('xml2json');
var fs = require("fs");
var JSZip = require("jszip");
 // read a zip file
fs.readFile("Bella_ciao.mxl", function(err, data) {
    if (err) throw err;
    JSZip.loadAsync(data).then(function (zip) {
      
      // Read the contents of the 'Hello.txt' file
      zip.file("score.xml").async("string").then(function (data) {
        // data is "Hello World!"
        console.log("input -> %s", data)
       
        // xml to json
        var json = parser.toJson(data);
        console.log("to json -> %s", json);
        fs.writeFile('test.json', json, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
        // json to xml
       /* var xml = parser.toXml(json);
        console.log("back to xml -> %s", xml)*/
      });
      
    });
});
