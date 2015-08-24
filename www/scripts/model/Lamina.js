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
}

function DeleteAllLaminas(){
  Lamina.all().filter('id','<>', '').destroyAll(function(){
        persistence.flush();
  });
}