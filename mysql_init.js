const UserModel = require('./model/user.js');
const user = new UserModel();
Promise.all([user.createTable()]).then(data => {
	console.log('mysql init success!')
}).catch(err => {
	console.log(`mysql init error: ${err}`)
});

