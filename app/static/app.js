(function(){
  
    var app = angular.module("eggs", []);
    
    app.directive('basket', function(){
        return {
            restrict:'E',
            templateUrl:"basket.html"
        };
    });
    
    app.directive('products', function(){
        return {
            restrict:'E',
            templateUrl:"products.html"
        };
    });
    
    app.controller('eggsCtrl', function($http, $scope) {
        
        // get data and order it by Price low to high
        $scope.store = [];
        $http.get('data.json').success(function(data){
            $scope.store.products = data;
        });
        $scope.orderProp = 'Price';
        
        // set global variables, create empty basket with empty items array
        $scope.total_price = 0;
        $scope.number_of_items_in_basket = 0;
        $scope.basket = {"items":[]};
        
        // method adds an item to the basket
        $scope.add_item_to_basket = function(product){
            
            index = $scope.basket.items.indexOf(product);
            if (index >= 0){
                $scope.basket.items[index].BasketQty += 1;
            } else {
                product.BasketQty = 1;
                $scope.basket.items.push(product);
            }
            
            // update global variables
            $scope.number_of_items_in_basket += 1;
            $scope.total_price += product.Price;
        };
        
        // method removes an item from the basket
        $scope.remove_item_from_basket = function(product){
            
            index = $scope.basket.items.indexOf(product);
            $scope.basket.items.splice(index, 1);
            
            // update global variables
            $scope.number_of_items_in_basket = $scope.number_of_items_in_basket - product.BasketQty;
            $scope.total_price = $scope.total_price - (product.BasketQty * product.Price);
        };
        
    });
    
})();
