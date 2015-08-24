var Lamina = persistence.define("Lamina", {
  tipoLamina: "TEXT",
  ancho: "DECIMAL",
  alto: "DECIMAL",
  valor: "DECIMAL",
  valorCm: "DECIMAL"
});

persistence.schemaSync();


function createLamina(TipoLamina,Ancho,Alto,Valor,ValorCm){
  var lamina = new Lamina({
  tipoLamina : TipoLamina,
  ancho : Ancho,
  alto : Alto,
  valor : Valor,
  valorCm : ValorCm
  });
  
  persistence.add(lamina);
  persistence.flush();
  
  var todasTareas = Lamina.all();


  todasTareas.list(null, function (results) {
        results.forEach(function (r) {
          console.log(r);
      });
  })
  
  
} 

createLamina("UNA CARAS",250,200,350000,279.454);
