"use strict";

(function(){
  angular
  .module("candidates", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    Router
  ])
  .factory("Candidate", [
    "$resource",
    candidateFactoryFunction
  ])
  .controller("candidateIndexCtrl", [
    "Candidate",
    candidateIndexCtrl
  ]);

  function Router ($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/app-welcome.html"
    })
    .state("index", {
      url: "/index",
      templateUrl: "/assets/html/candidates-index.html",
      controller: "candidateIndexCtrl",
      controllerAs: "indexVM"
    });
  }

  function candidateFactoryFunction($resource){
    var Candidate = $resource("/api/candidates/:name", {}, {
      update: {method: "PUT"}
    });
    Candidate.all = Candidate.query();
    return Candidate;
  }

  function candidateIndexCtrl(Candidate){
    var vm = this;
    vm.candidates = Candidate.all;
  }


})();
