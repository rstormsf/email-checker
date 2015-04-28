var express = require('express');
var app = express();

app.get('/:email', function (req, res) {
	var email = req.params.email;
	var util  = require('util'),
    	spawn = require('child_process').spawn,
    	ls    = spawn('expect', ['expect.sh', email]); // the second arg is the command 
                                          // options
	var output = [];
	ls.stdout.on('data', function (data) {    // register one or more handlers
	output.push(data);
	});
	ls.on('close', function(code){

	var out = Buffer.concat(output).toString('utf8');
	var result = out.indexOf("550");
	var resBool = null;	
	if(result > -1) {
		resBool = true;
	} else {
		resBool = false;
	}
	res.json({data: out, code: result, available: resBool});
	});
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
