var mainModule = require('./module.js');
var _ = require('lodash-node');
module.exports = (function(){
	var getPage = function(params){
		var index = getHead() + 
					getHeader() + 
					getMain(params) + 
					getFooter();
		return index;
	};
	var getHead = function(){
		var bootstrap = "<link href=\"http://localhost:3000/bootstrap.min.css\" rel=\"stylesheet\">";
		return '<!DOCTYPE html>' +
			   '<html>' +
			   '<head>' +
			   '<title>WEATHER in Node.js</title>' +
			   '<meta charset="utf-8">' +
			   bootstrap +
			   '</head>' +
			   '<body>';
	};
	var getHeader = function(){
		return '<div class="container-fluid"><div class="container"><h1 class="text-center bg-danger">Модуль статистики погоди!</h1><h2 class="text-center bg-danger">По містах: Рівне, Дубно, Костопіль, Сарни.</h2><br>';
	};
	var getMain = function(params){
		return '<div class="row"><div class="col-md-6 text-center">' + getForm() + '</div><div class=".col-md-5 .col-md-offset-2 text-center">' + getFormPrint() + '</div></div>' +
		       searchForm(params) + 
		       searchByParams(params);
	};
	var getFooter = function(){
		var jquery = "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js\"></script>"
		  , bootstrap = "<script src=\"http://localhost:3000/bootstrap.js\"></script>";
		return '<footer></footer>' + jquery + bootstrap + '</div></div></body></html>';
	};
	var getAlltable = function (params) {
		var data = getViewData(params);
		if (!data.length) {
			return [];
		}	
		var result = "";     
	    for(var i = 0; i < data.length; i++){        
	        result += '<caption><h1>' + data[i].position + '</h1></caption><thead><tr><th>#</th><th>Дата</th><th>Вологість (%)</th><th>Температура (&#176;C)</th><th>Вітер (напрям)</th></tr></thead>';
	        for(var j = 0; j < 30; j++){
	          result += '<tbody><tr><th scope="row">' + (j + 1) + 
	          '</th><td>' + data[i].datetime[j] + 
	          '</td><td>' + data[i].humidity[j] + 
	          '</td><td>' + data[i].temperature[j] + 
	          '</td><td>' + data[i].wind[j] + 
	          '</td></tbody>';
	        }
	    }	  	
	  	return '<table border="1">' + result + '</table>';
	};
	var getForm = function () {		
		return '<form method="POST" class="form-inline">' +			   
			   '<label>Місто:</label>' +
			   '<input type="text" class="form-control" name="nameFromForm"/>' +
			   '<label>Параметр:</label>' +
			   '<select name="paramWeather" class="form-control">' +
			   '<option value="0">Вологість</option>' +
			   '<option value="1">Температура</option>' +
			   '<option value="2">Вітер</option></select>' +
			   '<input class="btn btn-default" type="submit" value="Пошук">' +
			   '</form>';
	};
	var getFormPrint = function () {
		return '<form method="POST" class="form-inline">' +
			   '<label>Статистика:</label>' +
			   '<select name="print" class="form-control">' +
			   '<option value="0">------</option>' +
			   '<option value="1">Всі точки</option>' +
			   '<option value="2">Середнє по всіх</option>' +
			   '</select><input class="btn btn-default" type="submit" value="Показати">' +
			   '</form>';
	};
	var searchByParams = function(params){
	    var result = ""	  	
		  , data = getViewData(params)
		  , averageAllData = mainModule.averageArray(data)
		  , maxAndPos = mainModule.maxAndPosition(data);      
    	
	    if (!data.length) {
			return [];
		}	
		if (!params) {
			return "";
		}	
	    if(params.paramWeather == 2){        
	        result = '<hr><h2 class="text-center bg-info">Максимальне значення вітру по місту ' + params.nameFromForm + ' - ' + averageAllData[2] + '</h2>';         
	    } else if (params.paramWeather == 1){
	        result = '<hr><h2 class="text-center bg-info">Максимальне значення температури по місту ' + params.nameFromForm + ' було ' + maxAndPos[3] + ' : ' + maxAndPos[2] + '&deg;С</h2>';             
	    } else if (params.paramWeather == 0){        
	        result = '<hr><h2 class="text-center bg-info">Максимальне значення вологості по місту ' + params.nameFromForm + ' було ' + maxAndPos[1] + ' : ' + maxAndPos[0] + '%</h2>';      
	    }   
	      
	    return result;
	};
	var searchForm = function(params){
		var result = ""			
			, data = mainModule.getAll()
			, averageAllData = mainModule.averageArray(data);
			if (!data.length) {
				return [];
			}	
			if (!params) {
				return "";
			}			
		    if( params.print == 1 ){
		    	result += '<br><h2 class="text-center bg-primary">Всі значення погоди</h2><br>';
		    	for(var i = 0; i < data.length; i++){        
			        result += '<table class="table table-bordered"><caption><h2 class="text-center">м.' + data[i].position + '</h2></caption><thead><tr><th>#</th><th>Дата</th><th>Вологість (%)</th><th>Температура (&#176;C)</th><th>Вітер (напрям)</th></tr></thead>';
			        for(var j = 0; j < 30; j++){
			            result += '<tbody><tr><th scope="row">' + ( j + 1 ) + 
			            '</th><td>' + data[i].datetime[j] + 
			            '</td><td>' + data[i].humidity[j] + 
			            '</td><td>' + data[i].temperature[j] + 
			            '</td><td>' + data[i].wind[j] + '</td></tbody>';
			        }
			    }
			  	result += '</table>';
		    } else if ( params.print == 2 ){
		    	result += '<br><h2 class="text-center bg-primary">Cереднє значення</h2><br>';
			    result += '<table class="table table-bordered"><thead><tr><th>Вологість (%)</th><th>Температура (&#176;C)</th><th>Вітер (напрям)</th></tr></thead>';
			    result += '<tbody><tr><td>' + 
			    _.round(averageAllData[0],2) + '</td><td>' + 
			    _.round(averageAllData[1],2) + '</td><td>' + 
			    averageAllData[2] + '</td></tr></tbody><table>';
		    } else{
		    	return "";
		    }	    
		return result;
	};
	var getViewData = function (params) {		
		if (!params) {
			return mainModule.getAll();
		} else if (params.nameFromForm) {
			return mainModule.searchByName(params.nameFromForm);
		} else if (params.paramWeather) {
			return searchByParams(params.paramWeather);
		} else if (params.print) {			
			return searchByParams(params.print);
		} else {
			return [];
		}
	};
	return{
		getPage:getPage
	};
})();