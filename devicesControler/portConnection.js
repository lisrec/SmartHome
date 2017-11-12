
const initArduino = function ( SerialPort  ) {
	SerialPort.list(function (err, ports) {
		if(!err) {
			console.log(ports)
			ports.forEach((device) => {
				if(device.manufacturer && device.manufacturer.toLowerCase().indexOf("arduino") !== -1) {
					port = new SerialPort(device.comName, {
						parser: SerialPort.parsers.readline('\n')
					})
					port.on('data', function (data) {
						console.log('Data: ' + data)
					})
				}
			})
		} else {
			console.log("Cannot load SerialPort.")
		}
	})
}


module.exports = {
	initArduino: initArduino
}