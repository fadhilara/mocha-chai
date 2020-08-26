const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require("chai-http")


chai.use(chaiHttp);


const api = chai.request('https://qaplay.dot.co.id/')

describe('User Test', function() {

	it('Success Get Profile', function (done) {

		api.get('api/v1/users/1')
		.end(function (err, res) {
			expect(res.status).to.equals(200);
			done();
		});
	});

	it('Failed Get Profile', function (done) {
		api.get('api/v1/users/100')
		.end(function (err, res) {
			expect(res.status).to.equals(422);
			done();
		});
	});
})
