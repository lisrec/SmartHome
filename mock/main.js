function createDivice(){
	var data = {};
	$("#deviceForm").serializeArray().map(function(x){data[x.name] = x.value;})

	console.log(data);

    $.ajax({
       type: "POST",
       url: "http://192.168.0.105:3300/api/devices/",
       data: data, // serializes the form's elements.
       success: function(data)
       {
          console.log("ok");
       }
     });
};

function changeColor(){
	var data = {};
	$("#colorForm").serializeArray().map(function(x){data[x.name] = x.value;})

	console.log(data);

	    $.ajax({
       type: "POST",
       url: "http://192.168.0.105:3300/api/devices/" + data.id + "/lights",
       data: data, // serializes the form's elements.
       success: function(data)
       {
          console.log("ok");
       }
     });
};
function b2(){
	console.log("some");
};
function b3(){
	console.log("some");
};
function b4(){
	console.log("some");
};
function b5(){
	console.log("some");
};
function b6(){
	console.log("some");
};
