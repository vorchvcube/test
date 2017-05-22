IssuesConfig.$inject = ['$stateProvider'];
function IssuesConfig($stateProvider){
    $stateProvider
        .state('Issues',{
            url: "/issues/:nameUser/:selectRepos/:itemNumber",
            templateUrl: "angular/modules/Issues/template/index.html",
            controller:"IssuesCtrl",
        })
};
