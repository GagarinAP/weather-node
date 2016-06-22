var datamodule = require('./module.js');

module.exports = (function() {
	
	var getPage = function (params) {		
		return '<!DOCTYPE html><html lang="en">' + 
		getPageHead() +
		'<body><div class="container-fluid"><div class="container">' + 
		getPageHeader() + 
		getMain(params) +
		getPageFooter() + '</div></div>' +
		'<script src=\"http://localhost:3000/jquery-1.12.4.min.js\"></script>' + 
		'<script src=\"http://localhost:3000/bootstrap.min.js\"></script>' + 
		'</body></html>';
	};
	
	var getPageHead = function () {			
		return '<head>' + 
		'<meta charset=\"UTF-8\">' + 
		'<title>No way</title>' +		
		'<link href=\"http://localhost:3000/bootstrap.css\" rel=\"stylesheet\">' + 
		'</head>';
	};
	
	var getPageHeader = function () {
		return '<header><h1 class="text-center">Статистика погоди</h1><h2 class="text-center">містo: Рівне, Костопіль, Сарни, Дубно!</h2></header>';
	};
	
	var getPageFooter = function () {
		return '<footer></footer>';
	};
	
	var getMain = function (params) {		
		return '<main>' + 		
		getSearchForm() + 
		search(params) + 
		getForm() + 
		searchForm(params) +		
		'</main>';
	};
	
	var getAllKeysTable = function (params) {
		var data = getViewData(params);
		if (!data.length) {
			return 'Nothing found';
		}	
		var result = "<tr><td>Date</td><td>Вологість</td><td>Температура</td><td>Вітер</td></tr>";		
		for(var i = 0; i < data.length; ++i) {
			result += "<tr>" +
			"<td>" + data[i].position + "</td>" +
			"<td>" + data[i].datetime + "</td>" +
			"<td>" + data[i].humidity + "</td>" +
			"<td>" + data[i].temperature + "</td>" +
			"<td>" + data[i].wind + "</td>" +
			"</tr>";
		}
		return '<table class="table table-bordered">' + result + '</table>';
	};	

	var search = function(params){
	    var array = ""	  	
		  , data = getViewData(params)
		  , averageAllData = datamodule.averageArray(data)
		  , maxAndPos = datamodule.maxAndPosition(data);      
    	
	    if (!data.length) {
			return [];
		}		
	    if(params.weather > 2){        
	        array += '<table class="table table-bordered"><caption><h1>' + 
	        params.customer_name + 
	        '</h1></caption><thead><tr><th>Вітер (напрям)</th></tr></thead>';                     
	        array += '<tbody><tr><td>' + 
	        averageAllData[2] + 
	        '</td></tr></tbody><table>';           
	    } else if (params.weather == 2){
	        array += '<table class="table table-bordered"><caption><h1>' + 
	        params.customer_name + 
	        '</h1></caption><thead><tr><th>Дата</th><th>Температура (&#176;C)</th></tr></thead>';                      
	        array += '<tbody><tr><td>' +
	        maxAndPos[3] + '</td><td>' + 
	        maxAndPos[2] + '</td></tr></tbody><table>';             
	    } else {        
	        array += '<table class="table table-bordered"><caption><h1>' + 
	        params.customer_name + 
	        '</h1></caption><thead><tr><th>Дата</th><th>Вологість (%)</th></tr></thead>';                      
	        array += '<tbody><tr><td>' +
	        maxAndPos[1] + '</td><td>' + 
	        maxAndPos[0] + '</td></tr></tbody><table>';       
	    }   
	      
	    return array;
	};
	var searchForm = function(params){
		var array = ""			
			, data = datamodule.data
			, averageAllData = datamodule.averageArray(data);
			if (!data.length) {
				return [];
			}			
		    if(params.print == 1){
		    	for(var i = 0; i < data.length; i++){        
			        array += '<table class="table table-bordered"><caption><h1>' + data[i].position + '</h1></caption><thead><tr><th>#</th><th>Дата</th><th>Вологість (%)</th><th>Температура (&#176;C)</th><th>Вітер (напрям)</th></tr></thead>';
			        for(var j = 0; j < 30; j++){
			            array += '<tbody><tr><th scope="row">' + ( j + 1 ) + 
			            '</th><td>' + data[i].datetime[j] + 
			            '</td><td>' + data[i].humidity[j] + 
			            '</td><td>' + data[i].temperature[j] + 
			            '</td><td>' + data[i].wind[j] + '</td></tbody>';
			        }
			    }
			  	array += '</table>';
		    } else {
		    	array += '<br><h2>Cереднє значення</h2><br>';
			    array += '<table class="table table-bordered"><thead><tr><th>Вологість (%)</th><th>Температура (&#176;C)</th><th>Вітер (напрям)</th></tr></thead>';
			    array += '<tbody><tr><td>' + 
			    parseInt(averageAllData[0]) + '</td><td>' + 
			    parseInt(averageAllData[1]) + '</td><td>' + 
			    averageAllData[2] + '</td></tr></tbody><table>';
		    }		    
		return array;
	};
	var getSearchForm = function () {
		return '<hr><h2 class="text-center">Форма пошуку максимального значення по містах.</h2><hr>'+
		'<form method="POST"><label>Введіть місто : </label><input type="text" name="customer_name"/>'+
		'<select name="weather"><option value="1">Вологість</option><option value="2">Температура</option><option value="3">Вітер</option></select><input type="submit"/>'+
		'</form>';
	};
	var getForm = function () {
		return '<hr><form method="POST"><select name="print"><option value="1">Всі точки</option><option value="2">Середнє по всіх</option></select><input type="submit"/></form>';
	};
	
	var getViewData = function (params) {		
		if (!params) {
			return datamodule.data;
		} else if (params.customer_name) {			
			return datamodule.searchByName(params.customer_name);
		} else if (params.weather) {			
			return search(params.weather);
		} else if (params.print) {			
			return search(params.print);
		} else {
			return [];
		}	
	};		
	
	return {		
		getPage: getPage		
	};
})();