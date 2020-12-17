var parser = require('xml2json');
var fs = require("fs");
var JSZip = require("jszip");
var arq = "./Jingle_Bells.mxl/";
function jsonParser(stringValue) {

    var string = JSON.stringify(stringValue);
    var objectValue = JSON.parse(string);
    return objectValue["note"];
 }
 function convert(arqu){
     //lê o arquivo mxl(se fosse um zip também funcionaria)arq TEM que ser o caminho do arquivo
fs.readFile(arqu, function(err, data) {
    if (err) throw err;
    //pega dentro dos conteúdos do mxl o score.xml(partitura) e o transforma em uma string
    JSZip.loadAsync(data).then(function (zip) {
      zip.file("score.xml").async("string").then(function (data) {
        //console.log("input -> %s", data)

        // xml to json(pega a string e a formata no padrão JSON)
        var json = parser.toJson(data);
        [json].map((elt) => {
          var length=elt["score-partwise"]["part"]["measure"].length;
          console.log(length);
         for(var i=0;i<length;i++){
          console.log(elt["score-partwise"]["part"]["measure"][i]["note"]);
          fs.appendFile("filee.json",JSON.stringify(elt["score-partwise"]["part"]["measure"][i]["note"], null, 4),function(err){
            if(err) throw err;
            console.log('IS WRITTEN')
            });
          }
        });
        //var juson=[json]["score-partwise"]["part"]["measure"][0]["note"];
        //console.log(juson);
        //caminho do arquivo desejado
        var outputFilename = './test/Scoreee.json/';
//cria o arquivo com o nome desejado JSON.stringfy torna o JSON bonitinho e uma string e "joga" ele no arquivo
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