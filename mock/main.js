var _port = 3300
var _hostname = window.location.hostname || "localhost"
var serverAddres = "http://" + _hostname + ":" + _port

var createDivice = () => {

	let data = {}
	$("#deviceForm").serializeArray().map((x) => {
		data[x.name] = x.value
	})

	console.log(data)

	$.ajax({
		type: "POST",
		url: `${serverAddres}/api/devices/init`,
		data: data,
		success: (data) => {
			console.log("ok")
		}
	})
}

var changeColor = () => {

	let data = {}
	$("#colorForm").serializeArray().map((x) => {
		data[x.name] = x.value
	})

	console.log(data)

	$.ajax({
		type: "POST",
		url: `${serverAddres}/api/devices/${data.id}/lights`,
		data: data,
		success: (data) => {
			console.log("ok")
		}
	})
}

var deviceOn = (status) => {
	
	let data = {}
	let devId = 1 * $('#onOffDevId').val()

	data.enable = false
	if(status)
		data.enable = true

	$.ajax({
		type: "POST",
		url: `${serverAddres}/api/devices/shiftregister/${devId}`,
		data: data,
		success: (data) => {
			console.log("ok")
		}
	})		
}

var runMotor = () => {
	let data = {}
	let devId = 1 * $('#onOffDevId').val()
	let direction = $('#motorDirection').val()

	data.direction = 'r'
	if(direction == 'l')
		data.direction = 'l'

	$.ajax({
		type: "POST",
		url: `${serverAddres}/api/devices/motor/${devId}`,
		data: data,
		success: (data) => {
			console.log("ok")
		}
	})	
}

var getStatus = () => {

	let devId = 1 * $('#onOffDevId').val()

	$.ajax({
		type: "GET",
		url: `${serverAddres}/api/devices/getStatus/${devId}`,
		success: (data) => {
			console.log("ok")
		}
	})		
}
