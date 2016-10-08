
(function() {
  'use strict';

  angular
    .module('app',[])
    .controller('appCtrl', appCtrl)
    .directive('imgPreview', imgPreview)
    .controller('imgPreviewCtrl', imgPreviewCtrl)


  function appCtrl($scope) {

    $scope.imageList = [
      {
        "id":125,
        "url":"http://oss.aliyuncs.com/weimob-com/image/29/a6/aa/20161008/20161008111827_27968.jpg"
      },
      {
        "id":111,
        "url":"http://oss.aliyuncs.com/weimob-com/image/29/a6/aa/20160927/20160927201858_30121.png"
      },
      {
        "id":94,
        "url":"http://oss.aliyuncs.com/weimob-com/image/29/a6/aa/20160928/20160928175328_44716.jpg"
      },
      {
        "id":92,
        "url":"http://oss.aliyuncs.com/weimob-com/image/29/a6/aa/20160928/20160928175316_45732.png"
      },
      {
        "id":91,
        "url":"http://oss.aliyuncs.com/weimob-com/image/29/a6/aa/20160928/20160928175307_19987.jpg"
      },
      {
        "id":89,
        "url":"http://oss.aliyuncs.com/weimob-com/image/29/a6/aa/20160928/20160928175247_73131.jpg"
      },
      {
        "id":88,
        "url":"http://oss.aliyuncs.com/weimob-com/image/29/a6/aa/20160928/20160928175241_14304.png"
      }
    ];

    //图片预览
    $scope.vm ={
      showPreview: false,
      currentImg: $scope.imageList[0]
    };

    $scope.preview = function(item) {
      console.log('111');
      $scope.vm.showPreview = true;
      $scope.vm.currentImg = item;
    };



  }

  function imgPreview() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: './tpl/preview.tpl.html',
        controller: 'imgPreviewCtrl',
        scope: {
          currentImg: '=',
          imageList: '=',
          showPreview: '='
        },
        link: function(scope, elem, attrs) {
          var img = elem.find('img');
          console.log(scope.currentImg);
          console.log(scope.imageList);
          console.log(scope.showPreview);
        }
      };
  }


  function imgPreviewCtrl($scope) {

    $scope.toggleShow = function() {
      $scope.showPreview = !$scope.showPreview;
    };

    function returnIndex() {
      var len = $scope.imageList.length;
      for (var i = 0; i < len; i++) {
        if ($scope.currentImg.id == $scope.imageList[i].id) {
          return i;
        }
      }

    }

    $scope.$watch('currentImg', function() {
      $scope.index = returnIndex();
    })

    $scope.showNext = function(event) {
      event.stopPropagation();
      if ($scope.index > -1 && $scope.index < $scope.imageList.length -1) {
        $scope.currentImg = $scope.imageList[$scope.index + 1];
      }
    };

    $scope.showPre = function(event) {
      event.stopPropagation();
      if ($scope.index < $scope.imageList.length && $scope.index > 0) {
        $scope.currentImg = $scope.imageList[$scope.index - 1];
      }
    };

    $scope.stopPropagation = function(event) {
      event.stopPropagation();
    };

    $scope.close = function(event) {
      event.stopPropagation();
      $scope.showPreview = false;
    };


  }




})();
