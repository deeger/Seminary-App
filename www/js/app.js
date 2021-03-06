// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })


    .state('app.attendance', {
      url: "/attendance?periodId",
      views: {
        'menuContent' :{
          templateUrl: "templates/attendance.html",
          controller: 'attendanceCtrl'
        }
      }
    })


    .state('app.gradeBook', {
      url: "/gradeBook?periodId",
      views: {
        'menuContent' :{
          templateUrl: "templates/gradeBook.html",
          controller: 'gradeBookCtrl'
        }
      }
    })

     .state('app.messaging', {
          url: "/messaging?periodId",
          views: {
              'menuContent' :{
                  templateUrl: "templates/messaging.html",
                  controller: 'messagingCtrl'
              }
          }
      })

      .state('app.student', {
          url: "/student/:studentId",
          views: {
              'menuContent' :{
                  templateUrl: "templates/student.html",
                  controller: 'studentCtrl'
              }
          }
      })

     .state('app.language', {
          url: "/language",
          views: {
              'menuContent' :{
                  templateUrl: "templates/language.html",
                  controller: 'languageCtrl'
              }
          }
      });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/attendance');
});

var app = angular.module('app');