const supertest = require('supertest')
const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require("chai-http")
const faker = require('faker');


chai.use(chaiHttp);
chai.use(require('chai-json-schema'));


const api = chai.request('https://qaplay.dot.co.id/');

describe('User Test', function() {

	before((done) => {
        if(typeof(global.user_id) === 'undefined' || typeof(global.token) === 'undefined'){
            console.error('Global user id and token are undefined');
            done();
        }else{
            done();
        }
    });

	it('Success Get User', function (done) {
		var email = faker.internet.email();
		var name = faker.name.findName();
		api.get('api/v1/users/' + global.user_id)
		.set('Authorization', 'Bearer' + global.token)
		.end(function (err, res) {
			expect(res.status).to.equals(200);
			expect(res.body).to.be.jsonSchema( require('./auth/schema/success_get_user_schema.json'));
			if(err){
                throw err;
            }
			done();
		});
	});
});
