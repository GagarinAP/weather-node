module.exports = ( function(){
	var data = __constr();

	function __constr(){
		var result = [];
		for(var i = 0; i < 4; i++){
	        result.push({
	            position: getCity(i),
	            datetime: setDatetime(),
	            humidity: setRandom(40, 90),
	            temperature: setRandom(15, 25),
	 			wind: setWind()
	        });
        }
        return result;
	};

	function Randomizer(min,max){
		return parseInt(Math.random() * (max - min + 1) + min);
	};

	function setRandom(min, max){
        var result = [];
        for (var i = 0; i < 30; i++){
            result.push(Randomizer(min, max));
        }
        return result;
    };

    function getCity(position) {
        var cities =['Рівне', 'Дубно', 'Сарни', 'Костопіль'];
        return cities[position];
    };

    function setDatetime(){
    	var result = [];
    	for(var j = 0; j < 30; j++){
			var d = new Date(2015, 5, j+1);
			var options = {				  
				day: 'numeric',
				month: 'numeric',
				year: 'numeric'				  
		    };
		    result.push(d.toLocaleString("ru", options));
		}
		return result;
    };

    function setWind(){
    	var result = [];
    	for(var j = 0; j < 30; j++){
			var windname = ["N","NE","E","SE","S","SW","W","NW"];
			var vector = parseInt(Randomizer(0,7));				
			result.push(windname[vector]);			
		}
		return result;
    };
	
	var searchByName = function(Position){		
		var result = [];		
		for(var i = 0; i < data.length; i++){
			if(data[i].position == Position){				
				result.push(data[i]);
			}
		}		
		return result;
	};
	//Функція підрахунку вітрів, повертає обєкт {NE:17, S:12, SE:11 ...}
	function counter(arr){
	    var result = {};
	        arr.forEach( function(elem,i,arr){            
	            if( elem in this) 
	                return;
	            var count = arr.filter( function( elemA ){
	                return elem === elemA;
	            });
	            this[elem] = count.length;              
	        }, result);
	    return result;
	}
	var averageArray = function(arr){
		var result=[]
		  , averagehumidity = 0
      	  , averagetemperature = 0
      	  , averagewind=[]
      	  , max = 0
      	  , position;      	

		for(var i = 0; i < arr.length; i++){        
	        for(var j = 0; j < 30; j++){
	          averagehumidity += arr[i].humidity[j];
	          averagetemperature += arr[i].temperature[j];
	          averagewind.push(arr[i].wind[j]);         
	        }	 
	        result[0] = averagehumidity /= (arr[i].humidity).length;
	    	result[1] = averagetemperature /= (arr[i].temperature).length;              
	    }
	    //Массив вираховує напрям вітру який частіше за інші дув
	    var maximumWind = counter(averagewind);
	    for(key in maximumWind){
	        if(maximumWind[key] > max){
	            max = maximumWind[key];
	            position = key;            
	        }             
	    }

	    result[2] = position;
	    
		return result;
    };
    var maxAndPosition = function(arr){
		var result=[]		      	  
      	  , MaxByHumidity = 0
      	  , MaxByTemperature = 0
      	  , PositionByHumidity
      	  , PositionByTemperature;      	

		for(var i = 0; i < arr.length; i++){        
	        for(var j = 0; j < 30; j++){
	        	if(arr[i].humidity[j] > MaxByHumidity){
	        		MaxByHumidity = arr[i].humidity[j];
	        		PositionByHumidity = arr[i].datetime[j];
	        	}
	        	if(arr[i].temperature[j] > MaxByTemperature){
	        		MaxByTemperature = arr[i].temperature[j];
	        		PositionByTemperature = arr[i].datetime[j];
	        	}	          	                   
	        }	                     
	    }
	    result[0] = MaxByHumidity;
	    result[1] = PositionByHumidity;  
	    result[2] = MaxByTemperature;
	    result[3] = PositionByTemperature;
	    
		return result;
    };
    var getAll = function () {
		return data;
	};
	return {
		getAll:getAll,
		maxAndPosition:maxAndPosition,
		averageArray:averageArray,
		searchByName:searchByName
	};
})();