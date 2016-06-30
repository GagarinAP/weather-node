var keysModule = require('./../models/module.js');

module.exports = (function () {
    var test1 = function () {
        console.log("Test 1");
        var actualResult = keysModule.searchByName('Рівне');
        if (actualResult.length === 1) {
            console.log("[Passed]");
            return true;            
        } else {
            console.log("[Failed] :keysModule.searchByName should return list with 1 element");
            return false;
        }
    };
    
    var test2 = function () {
        console.log("Test 2");
        var actualResult = keysModule.searchByName('keys testZ');
        if (actualResult.length === 0) {
            console.log("[Passed]");
            return true;            
        } else {
            console.log("[Failed] :keysModule.searchByName should return empty list");
            return false;
        }
    };
    
    var test3 = function () {
        console.log("Test 3");
        var actualResult = keysModule.getAll();
        if (actualResult.length === 4) {
            console.log("[Passed]");
            return true;            
        } else {
            console.log("[Failed] :keysModule.getAll should return list with 4 elements");
            return false;
        }
    };
    
    var test4 = function () {
        console.log("Test 4");
        var getAll = keysModule.getAll();
        var actualResult = keysModule.maximumArray(getAll);
        if (actualResult.length === 2) {
            console.log("[Passed]");
            return true;            
        } else {
            console.log("[Failed] :keysModule.maximumArray should return list with 2 elements");
            return false;
        }
    };   
    var test5 = function () {
        console.log("Test 5");
        var getAll = keysModule.getAll();
        var actualResult = keysModule.averageArray(getAll);
        if (actualResult.length === 3) {
            console.log("[Passed]");
            return true;            
        } else {
            console.log("[Failed] :keysModule.averageArray should return list with 3 elements");
            return false;
        }
    }; 
    return {
      test1: test1,
      test2: test2,
      test3: test3,
      test4: test4,
      test5: test5     
    };
})();

