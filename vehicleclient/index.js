var net = require('net');
var fs = require('fs');
var content = fs.readFileSync('sample.txt',{encoding:'utf8'});


var packets = [];
var packets_sent = 0;

function packetify(){
	var _packets_slug = content.match(/\*(.|[\n\r])*?#/mg); 
	if(_packets_slug!=null){
		console.log(_packets_slug.length+' packets');
		packets = _packets_slug;
	}else{
		console.log('0 packets');
	}
}

packetify();


var client = new net.Socket();

client.setKeepAlive(true);

client.connect(1337, '127.0.0.1', function() {

	console.log('Connected...');
	
	if(packets.length){
		console.log("we gonna send "+packets.length+" packets");
	}



	setInterval(function(){
		if(packets_sent<packets.length){
			client.write(packets[packets_sent]);
			packets_sent = packets_sent + 1;
		}else{
			client.destroy();
		}

	},5000);
	
});



 
client.on('data', function(data) {
	console.log('Received: ' + data);
});

client.on('error',function(err){
	console.log(err);
})
 
client.on('close', function() {
	console.log('Connection closed');
	
});


