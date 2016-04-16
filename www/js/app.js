// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngStorage','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state("list",{
      "url": "/list",
      "templateUrl": "templates/list.html",
      "controller": "MainController",
      "cache": false
    })
    .state("create",{
      "url": "/create",
      "templateUrl": "templates/create.html",
      "controller": "MainController",
      "cache": false
    });
    
    $urlRouterProvider.otherwise("list");
})

.controller("MainController",function($scope,$http,$localStorage,$ionicHistory,$cordovaToast){
  
  $scope.init = function() {
    $scope.urls = $localStorage.tiny;
  }
  
  $scope.shorten = function(longUrl){
    $http({
      method: "GET",
      url: "http://tinyurl.com/api-create.php",
      params: {
        url: longUrl
      },
      headers:{
                'Access-Control-Allow-Origin': '*'
      }
    })
    .success(function(result){
      if(typeof $localStorage.tiny == "undefined"){
        $localStorage.tiny = {};
      }
      $localStorage.tiny[longUrl] = {
        longUrl: longUrl,
        shortUrl: result
      }
      $state.go("list");
    })
    .error(function(error){
      console.log(JSON.stringify(error));
    });
  }
  
  $scope.open = function(url){
    var urlCheck = new RegExp("^(http|https)://");
    if(urlCheck){
      window.open(url,"_system","location=yes");
    }
    else{
      window.open("http://"+url,"_system","location=yes");
    }
  }
  
  $scope.back = function(){
    $ionicHistory.goBack();
  }
  
  $scope.delete = function(url){
    delete $localStorage.tiny[url];
  }
  
  $scope.showToast = function(){
    $cordovaToast.show('Here is a message', 'long', 'center');
  }
  $scope.listItems = ["Item1", "Item2", "Item3", "Item4"]
})
