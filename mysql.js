var mysql = require('mysql');  
			
var TEST_DATABASE = 'first_form';  
var TEST_TABLE = 'userinfo';  
	
//创建连接  
var client = mysql.createConnection({  
	user: 'root',  
	password: '9468abcd',  
});  

client.connect();
client.query("use " + TEST_DATABASE);

client.query(
	'SELECT * FROM '+TEST_TABLE,  
	function selectCb(err, results, fields) {  
		if (err) {  
			throw err;  
		}
		console.log(results)
		if(results){
			for(var i = 0; i < results.length; i++){
				console.log(results[i].firstName, results[i].lastName, results[i].sex, results[i].age);
			}
		}    
		client.end();  
	}  
); 
client.query(
	"UPDATE" + TEST_TABLE + "SET"+ firstName = '砍' , lastName= '梁' + 'WHERE' + firstName='周',

	function selectCb(err, results, fields) {  
		if (err) {  
			throw err;  
		}
		if(results){
			console.log(results)
		}    
		client.end();  
	}  
); 