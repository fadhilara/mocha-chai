const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require("chai-http")


chai.use(chaiHttp);
chai.use(require('chai-json-schema'));



const api = chai.request('https://qaplay.dot.co.id/')

describe('Login Test', function() {
	// let response = {};
    let token = null;
    let user_id = null;

	it('Success Login', function (done) {
		let name = 'Dummy User', email = 'kris.caden@example.net'

		api.post('api/v1/login')
		.set('Content-Type', 'application/json')
		.send({
			email: email,
			password: "password"
		})
		.end(function (err, res) {
			// response = ress;
			expect(res.status).to.equals(200);
			expect(res.body).to.be.jsonSchema( require('./auth/schema/success_login_schema.json'));
			token = res.body.data.token;
            user_id = res.body.data.id;
			done();
		});
	})

	it('Failed Login', function (done) {
		api.post('api/v1/login')
		.set('Content-Type', 'application/json')
		.send({
			email: "",
			password: ""
		})	
		.end(function (err, res) {
			
			expect(res.status).to.equals(422);
			expect(res.body).to.be.jsonSchema(require('./auth/schema/failed_login_schema.json'));
			done();
		});
	});
	 after(function (done) {
        global.token = token;
        global.user_id = user_id;
        // console.log(global.token);
        // console.log(global.user_id);
        done();
    });
})
