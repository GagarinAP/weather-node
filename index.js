var datamodule = require('./module.js');

module.exports = (function() {
	
	var getPage = function (params) {
		return '<!DOCTYPE html><html lang="en">' + 
		getPageHead() +
		'<body>' + 
		getPageHeader() + 
		getMain(params) +
		getPageFooter() +
		'</body></html>';
	};
	
	var getPageHead = function () {
		var utf = "<meta charset=\"UTF-8\">";		
		return '<head>' + utf + '<title>No way</title></head>';
	};
	
	var getPageHeader = function () {
		return '<header></header>';
	};
	
	var getPageFooter = function () {
		return '<footer></footer>';
	};
	
	var getMain = function (params) {		
		return '<main><h1>Статистика погоди</h1><h3>містo: Рівне, Костопіль, Сарни, Дубно!</h3>' + 
		getSearchForm() + Search(params) + AverageAll() +
		ShowAll() +	
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
		return '<table border="1">' + result + '</table>';
	};

	var ShowAll = function(params){
	  var data = getViewData(params);        
	  var array = "";     
	      for(var i = 0; i <data.length; i++){        
	        array += '<table border="1"><caption><h1>' + data[i].position + '</h1></caption><thead><tr><th>#</th><th>Дата</th><th>Вологість (%)</th><th>Температура (&#176;C)</th><th>Вітер (напрям)</th></tr></thead>';
	        for(var j = 0; j < 30; j++){
	          array += '<tbody><tr><th scope="row">' + (j + 1) + 
	          '</th><td>' + data[i].datetime[j] + 
	          '</td><td>' + data[i].humidity[j] + 
	          '</td><td>' + data[i].temperature[j] + 
	          '</td><td>' + data[i].wind[j] + '</td></tbody>';
	        }
	      }
	  array += '</table>';
	  return array;
	}
	var AverageAll = function(params){
		var array = ""
		  , data = getViewData()
		  , AverageAllData = datamodule.AverageArray(data);
	      
	      array += '<br><h2>Cереднє значення</h2><br>';
	      array += '<table border="1"><thead><tr><th>Вологість (%)</th><th>Температура (&#176;C)</th><th>Вітер (напрям)</th></tr></thead>';
	      array += '<tbody><tr><td>' + 
	      parseInt(AverageAllData[0]) + '</td><td>' + 
	      parseInt(AverageAllData[1]) + '</td><td>' + 
	      AverageAllData[2] + '</td></tr></tbody><table>';      
	      return array;
	}

	var Search = function(params){
		//console.log(customer_name);
		//console.log(weather);
	  var array = ""	  	
	  	, data = getViewData(params)
	  	, AverageAllData = datamodule.AverageArray(data)
	  	, MaxAndPos = datamodule.MaxAndPosition(data);      
    	
      if(params > 2){        
        array += '<table border="1"><caption><h1>' + 
        customer_name + 
        '</h1></caption><thead><tr><th>Вітер (напрям)</th></tr></thead>';                     
        array += '<tbody><tr><td>' + 
        AverageAllData[2] + 
        '</td></tr></tbody><table>';           
      } else if (params == 2){
        array += '<table border="1"><caption><h1>' + 
        customer_name + 
        '</h1></caption><thead><tr><th>Дата</th><th>Температура (&#176;C)</th></tr></thead>';                      
        array += '<tbody><tr><td>' +
        MaxAndPos[3] + '</td><td>' + 
        MaxAndPos[2] + '</td></tr></tbody><table>';             
      } else {        
        array += '<table border="1"><caption><h1>' + 
        params + 
        '</h1></caption><thead><tr><th>Дата</th><th>Вологість (%)</th></tr></thead>';                      
        array += '<tbody><tr><td>' +
        MaxAndPos[1] + '</td><td>' + 
        MaxAndPos[0] + '</td></tr></tbody><table>';       
      }   
      
      return array;
	}

	var getSearchForm = function () {
		return '<form method="POST"><label>Enter town :</label><input type="text" name="customer_name"/><select name="weather"><option value="1">Вологість</option><option value="2">Температура</option><option value="3">Вітер</option></select><input type="submit"/></form>';
	};
	
	var getViewData = function (params) {		
		if (!params) {
			return datamodule.data;
		} 
		if (params.custom_name) {			
			return datamodule.searchByName(params.custom_name);
		}else if(params.weather){
			return Search(params.weather);
		}			
	};		
	
	return {
		getPage: getPage
	};
})();