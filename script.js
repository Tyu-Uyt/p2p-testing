let p2pPeer = new Peer();
let p2pConn; 

function connectTo(value, intCode) {
	// on open will be launch when you successfully connect to PeerServer
	
	if (intCode == 0){
		p2pConn = p2pPeer.connect(value);
		p2pConn.on('open', function(){
			let lblPeer = document.createElement('label');
			lblIDNum.appendChild(document.createTextNode('\nConnected to: ' + p2pConn.peer));
			document.body.appendChild(lblIDNum);
			console.log('Connected to: ' + p2pConn.peer);
			p2pConn.send([intCode, 'Connected from: ' + p2pPeer._id]);
		});
	}
	else if (intCode == 1){
		p2pConn.send([intCode, value]);
	}	
}

function connectFrom(conn, data) {
	
	if (data[0] == 0){
		let lblPeer = document.createElement('label');
		lblIDNum.appendChild(document.createTextNode('\nConnected from: ' + conn.peer));
		document.body.appendChild(lblIDNum);
		p2pConn = p2pPeer.connect(conn.peer);
	}
	else if (data[0] == 1){
		alert(data[1]);
	}
}

window.addEventListener('load', function(){
	// For whatever reason, it needs a little more time before the ID can be used
	setTimeout(function() {
		let lblIDNum = document.createElement('label');
		lblIDNum.appendChild(document.createTextNode(p2pPeer._id));
		lblIDNum.setAttribute('id', 'lblIDNum');
		document.body.appendChild(lblIDNum);
	}, 1000);
	
	btnConnect.onclick = function() {
		connectTo(boxInput.value, 0);
	};
	
	btnSend.onclick = function() {
		connectTo(tbxText.value, 1);
	}
	
	p2pPeer.on('connection', function(conn) {
		conn.on('data', function(data){
			connectFrom(conn, data);
		});
	});
});