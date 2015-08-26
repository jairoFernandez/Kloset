persistence.store.websql.config(persistence, 'AppKloset','base de datos de appkloset', 5 * 1024 * 1024);
var online = navigator.onLine;

var app =  angular.module('app', ['onsen']);

app.controller('InicioCtrl',function($http,SincronizarCtrl){
	
	var vm = this;
	
	Lamina.all().count(function(registros){
		if(registros > 0){
			console.log("Hay un total de "+registros+" en la tabla Laminas...");
		}else{
			SincronizarCtrl.getSincronizar();
		}
	});
});

app.controller('ConfiguracionesCtrl',function(SincronizarCtrl){
	var vm = this;
	vm.funciones = {
		sincronizar: function(){
			SincronizarCtrl.getSincronizar();
		}
	}
});

app.controller('CalculadoraCtrl',function($scope){
	var vm = this;

	vm.datos = Lamina.all().list(null,function(results){
		 	$scope.data = {
		    singleSelect: [{ id: '0', name: 'Seleccione...' }],
		    availableOptions: results,
		   };
	    $scope.$apply();
	});

	$('#btnCalculadora').click(function(){
		alert('Ancho:' + $('#txtAncho').val() + 'x' + $('#txtAlto').val());
	});

});

app.controller('Actions',['$http','$scope',iniciar]);

function iniciar($http,$scope){
	var vm = this;
	
	vm.name = 'App Kloset';
	
	vm.datos = Lamina.all().list(null,function(results){
		vm.catalogo = results;
	    $scope.$apply();
	});
    
}

function alerta(){
        ons.notification.alert({
            title: 'Demo jairo',
            messageHTML: '<input type="number" class="text-input" placeholder="cantidad"/>'
        });
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

/*function checkConnection() {
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
}*/

//checkConnection();