app.factory('SincronizarCtrl',function($http){

	var vm = this;
	vm.name = 'App Kloset';
	vm.total = 0;

	var sincronizar = {
		getSincronizar: function(){			
			$http.get('http://apps.tucompualdia.net/appkloset/catalogo')
			.success(function(response){
			//vm.catalogo = response;
			if(online){
				DeleteAllLaminas();
			}else{
				ons.notification.alert({
					title: 'Error de conectividad',
					message: 'Revisa tu conexión a internet'
				});
			}
			
			setTimeout(function() {
				for(i=0; i<response.length; i++){
					var tipoLamina = response[i]["tipoLamina"];
					var ancho = response[i]["ancho"];
					var alto = response[i]["alto"];
					var valor = response[i]["valor"];	
					var valorCm = response[i]["valorCm"];	

					createLamina(tipoLamina,ancho,alto,valor,valorCm);
				}
			}, 2000);		 
			  ons.notification.alert({
			          title: 'Sincronización',
			          messageHTML: 'Se ha sincronizado la base de datos<br/> Correctamente'
			  });
			}).error(function(response){
				ons.notification.alert({
					title: 'Mensaje App kloset',
					messageHTML: 'Ha habido un error <br /> al sincronizar la base de datos'
				});


			});
		}
	}
	return sincronizar;
});

