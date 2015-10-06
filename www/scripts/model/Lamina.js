var Lamina = persistence.define("Lamina", {
  tipoLamina: "TEXT",
  descripcion: "TEXT",
  ancho: "DECIMAL",
  alto: "DECIMAL",
  valor: "DECIMAL",
  valorCm: "DECIMAL"
});

persistence.schemaSync();


function createLamina(TipoLamina,Descripcion,Ancho,Alto,Valor,ValorCm){
  var lamina = new Lamina({
  tipoLamina : TipoLamina,
  descripcion: Descripcion,
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