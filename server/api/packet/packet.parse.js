

'use strict';

var async = require('async');

var controller = require('./packet.controller');

function validateTimestamp(packet){

	var _timestamp_slug = packet.match(/\*GS16,[0-9]+,[0-9]{12}/g)

	if(_timestamp_slug!==null){
		_timestamp_slug = _timestamp_slug.join("").split(",");

		if(_timestamp_slug!==null){

			var timestamp = parseInt(_timestamp_slug.pop());
			
			return timestamp;

		}else{
			console.log("**invalid timestamp**");
		};
		
	}else{
		console.log("**invalid timestamp**");
	};
};

function validateLocation(packet){
	
	var _location_slug = packet.match(/GPS.*(N|S)[0-9.]*;(E|W)[0-9.]*;/g);

	if(_location_slug!==null){
		
		_location_slug = _location_slug.join("").split(";");

		var lat = parseFloat(_location_slug[2].replace(/(N|S)/g,""));
		var lng = parseFloat(_location_slug[3].replace(/(E|W)/g,""));
		
		var location = {lat:lat,lng:lng};

		return location;
	}else{
		console.log("**invalid location**");
	};
	


}

function validateSpeed(packet){

	var _speed_slug = packet.match(/OBD.*410D../g);

	if(_speed_slug!==null){
		_speed_slug = _speed_slug.join("").split("410D").pop();
		var speed = parseInt(_speed_slug,16);
		return speed;
	}	
}


module.exports = function(data){
	

	console.log("********************************");
	console.log("Parsing  \n"+data+"\nLength "+data.length);

	


	if(data!==null){
		
		var _packet_slug = data.match(/\*(.|[\n\r])*#/mg);

			

		if(_packet_slug!==null){
			
			var packet = _packet_slug.toString().replace(/\n/mg,"");
			

			
			if(packet.length>0){

				console.log("**valid packet**");

				async.parallel({
					timestamp : function (callback) {
						callback(null,validateTimestamp(packet));
					},
					location : function (callback) {
						callback(null,validateLocation(packet));
					},
					speed : function (callback) {
						callback(null,validateSpeed(packet));
					},
					body : function (callback){
						callback(null,packet);
					},	
				},function(err,results){
					console.log(results);
					controller.createNative(results,function(err,data){
						console.log(data);
					})
				});



			}else{
				console.log("**invalid packet**");
			}
		}else{
			console.log("**invalid slug**");
		}
	}
	else{
		console.log("data is null");
	}
};