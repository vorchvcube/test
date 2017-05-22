AppConfig.$inject = ['$urlRouterProvider','$stateProvider','$locationProvider'];
function AppConfig($urlRouterProvider,$stateProvider,$locationProvider){
  $urlRouterProvider.otherwise('/');
 /* $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix = '!';*/
};
