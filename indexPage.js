var mainModule = require('./module.js');

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
		return '<div class="container-fluid"><div class="container"><h1>Модуль статистики погоди!</h1>';
	};
	var getMain = function(params){
		return getForm() + 
		       getFormPrint() + 
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
		return '<hr><form method="POST" class="form-inline">' +
			   '<div class="col-xs-3"><select name="print" class="form-control">' +
			   '<option value="0">Виберіть значення</option>' +
			   '<option value="1">Всі точки</option>' +
			   '<option value="2">Середнє по всіх</option>' +
			   '</select></div><input class="btn btn-default" type="submit" value="Показати">' +
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
	    if(params.paramWeather > 1){        
	        result += '<table class="table table-bordered"><caption><h1>' + 
	        params.nameFromForm + 
	        '</h1></caption><thead><tr><th>Вітер (напрям)</th></tr></thead>';                     
	        result += '<tbody><tr><td>' + 
	        averageAllData[2] + 
	        '</td></tr></tbody><table>';           
	    } else if (params.paramWeather == 1){
	        result += '<table class="table table-bordered"><caption><h1>' + 
	        params.nameFromForm + 
	        '</h1></caption><thead><tr><th>Дата</th><th>Температура (&#176;C)</th></tr></thead>';                      
	        result += '<tbody><tr><td>' +
	        maxAndPos[3] + '</td><td>' + 
	        maxAndPos[2] + '</td></tr></tbody><table>';             
	    } else {        
	        result += '<table class="table table-bordered"><caption><h1>' + 
	        params.nameFromForm + 
	        '</h1></caption><thead><tr><th>Дата</th><th>Вологість (%)</th></tr></thead>';                      
	        result += '<tbody><tr><td>' +
	        maxAndPos[1] + '</td><td>' + 
	        maxAndPos[0] + '</td></tr></tbody><table>';       
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
		    	result += '<br><h2>Всі значення погоди</h2><br>';
		    	for(var i = 0; i < data.length; i++){        
			        result += '<table class="table table-bordered"><caption><h1>' + data[i].position + '</h1></caption><thead><tr><th>#</th><th>Дата</th><th>Вологість (%)</th><th>Температура (&#176;C)</th><th>Вітер (напрям)</th></tr></thead>';
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
		    	result += '<br><h2>Cереднє значення</h2><br>';
			    result += '<table class="table table-bordered"><thead><tr><th>Вологість (%)</th><th>Температура (&#176;C)</th><th>Вітер (напрям)</th></tr></thead>';
			    result += '<tbody><tr><td>' + 
			    parseInt(averageAllData[0]) + '</td><td>' + 
			    parseInt(averageAllData[1]) + '</td><td>' + 
			    averageAllData[2] + '</td></tr></tbody><table>';
		    } else{
		    	return "";
		    }	    
		return result;
	};
	var getViewData = function (params) {		
		if (!params) {
			return mainModule.getAll();
		} 
		if (params.nameFromForm) {
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