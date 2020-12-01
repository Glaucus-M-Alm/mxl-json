var parser = require('xml2json');
var fs = require("fs");
var JSZip = require("jszip");
var arq = "Abide_With_Me.mxl";
 // read a zip file
fs.readFile(arq, function(err, data) {
    if (err) throw err;
    JSZip.loadAsync(data).then(function (zip) {
      
      zip.file("score.xml").async("string").then(function (data) {
        //console.log("input -> %s", data)
       
        // xml to json
        var json = parser.toJson(data);
        //console.log("to json -> %s", json);
        var outputFilename = './Georgia.json';

fs.writeFile(outputFilename, JSON.stringify(json, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
}); 
       /*fs.writeFile('test.json', json, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });*/
        // json to xml
       /* var xml = parser.toXml(json);
        console.log("back to xml -> %s", xml)*/
      });
      
    });
});
