const mysql = require('./db/util.js');
	
	// mysql.creatDatabase('myfirst');	
	mysql.use('user');	
	// mysql.creatTable('user_tb', `
	// 	name CHAR(10),
	// 	age INT(100),
	// 	sex CHAR(1)
	// `);	
	mysql.select('user_tb');
	mysql.insert({
		"name":"周天",
		"age":26,
		"sex":1
	})
