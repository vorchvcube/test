HomeCtrl.$inject = ['$scope','$http','$rootScope'];
function HomeCtrl($scope,$http,$rootScope){
    var githubApi = 'https://api.github.com';
    //Имя пользователя
    $scope.nameUser='';
    //Имя репозитория
    $scope.nameRepository='';
    //Количество оьбъектов
    $scope.countItem=30;
    //Select репозитория
    $scope.selectRepos='';
    //Ошибки
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
    //Запрос на вывод юзеров
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
    	//Пробегаем по именам юзеров и пишем в массив
        for (var i=0; i<$scope.getUser.length; i++ ) {
            $scope.dataUserRes.login.push($scope.getUser[i].login)
        }
    });
    $scope.selectRepositoryUser = function () {
    	//Функция для проверки введенных данных
        if ($scope.nameUser.length == 0) {
            $scope.error.input = 'Введите имя в инпут'

        } else {
            $scope.error.input = ''
        }
        for (var j=0; j<$scope.dataUserRes.login.length; j++) {
            /*console.log($scope.dataUserRes.login[j])*/
            //Пробегаем по именам юзеров сравниваем с инпутом если есть совпадения то выполняем запрос на репозитории и пишем в селект
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
    	//Кнопка поиск по репозиториям
        if ($scope.nameUser.length == 0) {
            $scope.error.input = 'Введите имя в инпут'

        } else if ($scope.selectRepos.length == 0) {
            $scope.error.select = 'Выберите репозиторий'
        } else {
            $scope.error.input = '';
            $scope.error.select = ''
            //Запрос на вытаскивание issues из гитхаб
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
