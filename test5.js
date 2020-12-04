var parser = require('xml2json');
var fs = require("fs");
var JSZip = require("jszip");
var arq = "./test/Abide_With_Me.mxl/";
 function convert(arq){
     //lê o arquivo mxl
fs.readFile(arq, function(err, data) {
    if (err) throw err;
    //pega dentro dos conteúdos do mxl o score.xml(partitura) e o transforma em uma string
    JSZip.loadAsync(data).then(function (zip) {
      zip.file("score.xml").async("string").then(function (data) {
        //console.log("input -> %s", data)
       
        // xml to json(pega a string e a formata no padrão JSON)
        var json = parser.toJson(data);
        //console.log("to json -> %s", json);
        //Nome do arquivo desejado
        var outputFilename = './test/Score.json/';
//cria o arquivo com o nome desejado JSON.stringfy torna o JSON bonitinho
fs.writeFile(outputFilename, JSON.stringify(json, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
}); 
      });
      
    });
});
return 0;
 };
convert(arq);