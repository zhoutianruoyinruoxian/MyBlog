module.exports = function(req,res){
	var data ={
		"result":"1",
		"retVal":{
			"name":"demo",
			"user":"zhoutian"
		}
	}
	res.send(data)
}