'use strict';

angular.module('xenontestApp')
  .controller('MainCtrl', function ($scope, $http, socket, uiGmapGoogleMapApi) {
    $scope.packets = [];
    $scope.maps = [];
    $scope.polylines = [];


    //default location
    $scope.map = { center: { latitude: 12.9667, longitude: 77.5667 }, zoom: 8 ,meta:{speed: 50, timestamp: 'xxxxxxxxxxxx'}};

    //map to polyline
    $scope.polify = function(last_map,current_map){

      var attrs = {visible: true,
                    editable: false,
                    geodesic: true,
                    draggable: false,
                    path: [last_map.center,current_map.center],
                    stroke:{weight:3,
                            color:'#6060fb'}
                    };
      //speed color code
      var speed = current_map.meta.speed;

      if(speed>=0 && speed<=30){
        attrs.stroke.color = 'green';
      }else if (speed>30 && speed<=60){
        attrs.stroke.color = 'red';
      }else if (speed>60){
        attrs.stroke.color = 'blue';
      }else{
        console.log("speed color code fail");
      }              


      $scope.polylines.push(attrs);

      console.log($scope.polylines); 

    }

    //packet to map
    $scope.mapify = function(packet){
      if(packet!=undefined && packet!=null){
      var map = {};
      map.center = {latitude: packet.location.lat
                    ,longitude: packet.location.lng};
      map.zoom = 8 ;
      map.meta = {timestamp: packet.timestamp,
            speed: packet.speed}
      }

      

      $scope.maps.push(map);



      if($scope.maps.length<=1){
        console.log("first map");
      }else{
        console.log("not first map");
        //create polyline here
        var last_map = $scope.maps[$scope.maps.length-2];
        var current_map = map;
        $scope.polify(last_map,current_map);

      }
      
      

                    
    }

    $scope.$watchCollection('packets',function(oldval,newval){
      console.log($scope.packets.length);
      if($scope.packets.length>0){
      console.log($scope.packets[$scope.packets.length-1]);
      $scope.mapify($scope.packets[$scope.packets.length-1]);
      }
    });  
    
    

    uiGmapGoogleMapApi.then(function(maps) {

    });

    
    console.log($scope.maps.length);
    

    $http.get('/api/packets').success(function(packets) {
      $scope.packets = packets;
      socket.syncUpdates('packet', $scope.packets);
    });

    /*$scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });*/

  });
