persistence.store.websql.config(persistence, 'AppKloset','base de datos de appkloset', 5 * 1024 * 1024);

var app =  angular.module('app', ['onsen']);

app.controller('InicioCtrl',function($http,SincronizarCtrl){
	var vm = this;

	vm.sincroniza = SincronizarCtrl.getSincronizar();
});

app.controller('ConfiguracionesCtrl',function(SincronizarCtrl){
	var vm = this;
	vm.funciones = {
		sincronizar: function(){
			SincronizarCtrl.getSincronizar();
		}
	}
});

app.controller('Actions',['$http',iniciar]);

function iniciar($http){
	var vm = this;
	
	vm.name = 'App Kloset';
	vm.catalogo = [];
	vm.laminas = [];
	

	$http.get('http://apps.tucompualdia.net/appkloset/catalogo')
			.success(function(response){
			vm.catalogo = response;
			
			for(i=0; i<response.length; i++){
				var tipoLamina = response[i]["tipoLamina"];
				var ancho = response[i]["ancho"];
				var alto = response[i]["alto"];
				var valor = response[i]["valor"];	
				var valorCm = response[i]["valorCm"];	


				//GuardarLamina(tipoLamina,ancho,alto,valor,valorCm);

			}


			}).error(function(response){
				ons.notification.alert({
					title: 'Mensaje App kloset',
					message: 'Ha habido un error'
				});
			});
}
function GuardarLamina(tipoLamina,ancho,alto,valor,valorCm){
	
}

function querySuccess(tx,results){
	console.log('consultando '+ results.rows.length);

}

function alerta(){
        ons.notification.alert({
            title: 'Demo jairo',
            messageHTML: '<input type="number" class="text-input" placeholder="cantidad"/>'
        });
}

// function CrearCatalogo(){
// 	db.transaction(function(tx) {
// 		tx.executeSql('DROP TABLE IF EXISTS Lamina');
// 		tx.executeSql('CREATE TABLE IF NOT EXISTS Lamina(idLocal INTEGER PRIMARY KEY AUTOINCREMENT, tipoLamina TEXT, ancho DECIMAL, alto DECIMAL, valor DECIMAL, valorCm DECIMAL)');
// 	}, errorCB, successCB);
// }

/// Creamos la Tabla Lamina
//CrearCatalogo();

function llenarCatalogo(response){
		for(i=0; i<response.length; i++){
			var tipoLamina = response[i]["tipoLamina"];
			var ancho = response[i]["ancho"];
			var alto = response[i]["alto"];
			var valor = response[i]["valor"];	
			var valorCm = response[i]["valorCm"];	

			insertarLaminas(tipoLamina,ancho,alto,valor,valorCm);
		}
}

function insertarLaminas(tipoLamina,ancho,alto,valor,valorCm){
	db.transaction(function(tx) {
		tx.executeSql('INSERT INTO Lamina(tipoLamina, ancho, alto, valor, valorCm) VALUES (?,?,?,?,?)', 
					[tipoLamina,ancho,alto,valor,valorCm]);
	});	
}

function ListarLaminas(tx){
	tx.executeSql('SELECT * FROM Laminas',[],querySuccess,errorCB);
}



// Transaction error callback
//
function errorCB(tx, err) {
    console.log("Error processing SQL: "+err.toString());
}

// Transaction success callback
//
function successCB() {
    console.log("success!");
}


// function plas(){
// 	llenarCatalogo(response);
				
// 				db.transaction(function(tx){
// 					tx.executeSql('SELECT * FROM Lamina',[],function(tx,results){
// 						var len = results.rows.length;
// 						console.log('Total filas en Lamina: '+ len);

// 						// creamos el objeto
// 						for(i = 0; i < results.rows.length; i++){
// 							console.log(results.rows.item(i).tipoLamina);
							
// 							//console.log(agregada.valorCm);
// 							//laminas.push(agregada);
// 							 vm.laminas.push({
// 							 	tipoLamina: results.rows.item(i).tipoLamina,
// 							 	ancho: results.rows.item(i).ancho,
// 							 	alto: results.rows.item(i).alto,
// 							 	valor: results.rows.item(i).valor,
// 							 	valorCm: results.rows.item(i).valorCm
// 							 });
							 
// 						}
											
// 					},errorCB);
// 				});
// 				vm.catalogo = vm.laminas;	
				
// 			}).error(function(response){
// 				ons.notification.alert({
// 					title: 'Mensaje App kloset',
// 					message: 'Ha habido un error'
// 				});
// }

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}

checkConnection();