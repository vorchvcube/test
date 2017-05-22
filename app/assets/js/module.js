;(function(){
  	    angular.module('App',[
            'ui.router',
            'Home',
            'Issues'
      ])
        .config(AppConfig)
  	    .run(AppRun)
        .controller('AppCtrl',AppCtrl)
})();

;(function(){
    angular.module('Home',['ui.router'])
        .config(HomeConfig)
        .controller('HomeCtrl', HomeCtrl)
    
})();

;(function(){
    angular.module('Issues',['ui.router'])
        .config(IssuesConfig)
        .controller('IssuesCtrl', IssuesCtrl)
})();

AppRun.$inject = ['$rootScope', '$state',];
function AppRun($rootScope, $state){
  console.log("Приложение стартовало!");
};

AppConfig.$inject = ['$urlRouterProvider','$stateProvider','$locationProvider'];
function AppConfig($urlRouterProvider,$stateProvider,$locationProvider){
  $urlRouterProvider.otherwise('/');
 /* $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix = '!';*/
};

AppCtrl.$inject = ['$scope','$http','$rootScope','$window','$state'];
function AppCtrl($scope,$http,$rootScope,$window,$state){
   
    
};

HomeCtrl.$inject = ['$scope','$http','$rootScope'];
function HomeCtrl($scope,$http,$rootScope){
    var githubApi = 'https://api.github.com';
    $scope.nameUser='';
    $scope.nameRepository='';
    $scope.countItem=30;
    $scope.selectRepos='';
    $scope.nameUser = '';
    $scope.nameRepository= 'chronic';
    $scope.error = {
        select:'',
        name:'',
        input:'',
        server:{
            status:null,
        },
        req:'',
        notUser:'',
    };
    $scope.getUser={};
    $scope.dataUserRes={};
    $scope.dataUserRes.login=[];
    $http({
        method: 'get',
        url: githubApi + '/users',
        params:{
        }
    }).then(function (response) {
        $scope.getUser=response.data;
    },function (error){
        console.log(error)
    }).finally(function () {
        for (var i=0; i<$scope.getUser.length; i++ ) {
            $scope.dataUserRes.login.push($scope.getUser[i].login)
        }
    });
    $scope.selectRepositoryUser = function () {
        if ($scope.nameUser.length == 0) {
            $scope.error.input = 'Введите имя в инпут'

        } else {
            $scope.error.input = ''
        }
        for (var j=0; j<$scope.dataUserRes.login.length; j++) {
            /*console.log($scope.dataUserRes.login[j])*/
            if ($scope.dataUserRes.login[j]==$scope.nameUser) {

                $http({
                 method: 'get',
                 url: 'https://api.github.com/users/'+ $scope.nameUser +'/repos',
                 params:{
                 }
                 }).then(function (response) {
                 $scope.dataSelect = response.data;
                 },function (error){
                    $scope.error.server=error;
                 }).finally(function () {
                    $scope.error.name='';
                });
            } else {
                $scope.dataSelect='';
                $scope.error.name='Такого имени не существует'
            }
        }
    };
    $scope.getUserRep = function () {
        if ($scope.nameUser.length == 0) {
            $scope.error.input = 'Введите имя в инпут'

        } else if ($scope.selectRepos.length == 0) {
            $scope.error.select = 'Выберите репозиторий'
        } else {
            $scope.error.input = '';
            $scope.error.select = ''
            $http({
                method: 'get',
                url: githubApi + "/repos/" + $scope.nameUser + "/" + $scope.selectRepos + '/issues',
                params:{
                    per_page:$scope.countItem
                }
            }).then(function (response) {
                $scope.issue = response.data;
                $scope.error.server.status = true;
            },function (error){
                console.log(error);
                $scope.error.server.status = false;
            }).finally(function () {
            });
        }
    }
};

HomeConfig.$inject = ['$stateProvider'];
function HomeConfig($stateProvider){
    $stateProvider
        .state('Home',{
            url: "/",
            params:{
                nameUser:'',
                selectRepos:'',
                itemNumber:''
            },
            templateUrl: "angular/modules/Home/template/index.html",
            controller:"HomeCtrl",
        });
};

IssuesConfig.$inject = ['$stateProvider'];
function IssuesConfig($stateProvider){
    $stateProvider
        .state('Issues',{
            url: "/issues/:nameUser/:selectRepos/:itemNumber",
            templateUrl: "angular/modules/Issues/template/index.html",
            controller:"IssuesCtrl",
        })
};

IssuesCtrl.$inject = ['$scope','$http','$rootScope','$stateParams','$state'];
function IssuesCtrl($scope,$http,$rootScope,$stateParams,$state){
    $scope.params=$stateParams;
    var githubApi = 'https://api.github.com';
    $http({
        method: 'get',
        url: githubApi + '/repos/'+$scope.params.nameUser+'/'+$scope.params.selectRepos+'/issues/'+$scope.params.itemNumber,
        params:{
        }
    }).then(function (response) {
        $scope.issuesSingle=response.data;
    },function (error){
        console.log(error)
    }).finally(function () {

    });

};

