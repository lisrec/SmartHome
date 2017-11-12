const  Promise = require('bluebird')

const initArduino = function ( SerialPort  ) {
	return new Promise( (resolve, reject) => {
		SerialPort.list( (err, ports) => {
			if(!err) {
				ports.forEach((device) => {
					if(device.manufacturer && device.manufacturer.toLowerCase().indexOf("arduino") !== -1) {
						port = new SerialPort(device.comName, {
							parser: SerialPort.parsers.readline('\n')
						})
							resolve(port)
					}
				})
			} else {
				reject("Cannot load SerialPort.")
			}
		})
	})
}

const deinitArduino = function( port ) => {
	port.close(() => {
		callback(true)
	})
}


module.exports = {
	initArduino: initArduino
}