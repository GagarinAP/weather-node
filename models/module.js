var _ = require('lodash-node');
var fs = require('fs');

module.exports = ( function(){
	var dbFilePath = './data/data.json';
    
    var getDataFromFile = function (path) {
        try{
            var result = fs.readFileSync(path, 'utf8');
            return JSON.parse(result);
        } catch(e) {
            logger.logError("Can't read from file");
            return [];
        }            
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
	          averagewind.push(arr[i].wind[j]);         
	        }	
	        result[0] = parseInt(_.sum(arr[i].humidity) / 30);
	    	result[1] = parseInt(_.sum(arr[i].temperature) / 30);                              
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
    var maximumArray = function(arr){
		var result=[];
		for(var i = 0; i < arr.length; i++){	        
	        result[0] = _.max(arr[i].humidity);	        
	        result[1] = _.max(arr[i].temperature);	                        
	    }	    
		return result;
    };
    
    var getAll = function () {
		return data;
	};	
	
	var data = getDataFromFile(dbFilePath);

	return {
		getAll:getAll,
		maximumArray:maximumArray,
		averageArray:averageArray,
		searchByName:searchByName
	};
})();