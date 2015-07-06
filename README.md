# xenontest

<p>Make sure that you have <b>Node js</b> , <b>npm</b> and <b>bower</b> installed</p>

<p>You can refer to <a href="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server">https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server</a>
in order to install Node and npm.</p>

<p>To install bower</p>

<pre>$ npm install -g bower</pre>

<h3>Clone the repository and install dependencies</h3>


<pre>$ git clone git@github.com:pranavkumar/xenontest.git
$ cd xenontest
$ sudo npm install
$ bower install
</pre>

<h3>Start Server</h3>
<p>While in xenontest dir</p>
<pre>
$ grunt serve  
</pre>

<p>App runs on port 9000.
<b>tcp</b> sever is available on 127.0.0.1:1337 
</p>

<h3>Start Vehicleclient</h3>
<p>While in xenontest dir</p>
<pre>
$ cd vehicleclient
$ node index
</pre>
<p>Expected output</p>
<pre>
11 packets
Connected...
we gonna send 11 packets
Received: XenonTCP

Received: ACK1
Received: ACK1
Received: ACK1
Received: ACK1
Received: ACK1
Received: ACK1
Received: ACK1
Received: ACK1
Received: ACK1
Received: ACK1
Received: ACK1
Connection closed
</pre>




