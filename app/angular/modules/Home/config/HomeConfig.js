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
