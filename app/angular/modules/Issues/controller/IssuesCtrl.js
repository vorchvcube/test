IssuesCtrl.$inject = ['$scope','$http','$rootScope','$stateParams','$state'];
function IssuesCtrl($scope,$http,$rootScope,$stateParams,$state){
    //Передаем параметры из state HOME
    $scope.params=$stateParams;
    //Выполняем запрос на подробную инфу одного issues
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

