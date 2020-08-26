const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require("chai-http")
const fs = require('fs')

chai.use(chaiHttp);


const api = chai.request('https://qaplay.dot.co.id/')

describe('Stores Test', function() {
	before((done) => {
        if(typeof(global.user_id) === 'undefined' || typeof(global.token) === 'undefined'){
            console.error('Global user id and token are undefined');
            done();
        }else{
            done();
        }
    });

	it('Success Create User Stores', function (done) {
		// let name = 'Fadhila', address = 'Tangerang Selatan', description = 'QA 2020', status='active'

		api.post('api/v1/users/'+ global.user_id + '/stores')
		.set('Authorization', 'Bearer' + global.token)
		.set('Content-Type', 'multipart/form-data')
		.field('name', 'Fadhila')
        .field('address', 'Tangerang Selatan')
        .field('description', 'QA 2020')
		.attach('cover_image', fs.readFileSync('asset/image/images.jpg'), 'images.jpg')
		.field('status', 'active')
		.end(function (err, res) {
			expect(res.status).to.equals(200);
			expect(res.body).to.be.jsonSchema( require('./auth/schema/success_create_store_schema.json'));
			store_id = res.body.data.id;
			if(err){
                throw err;
            }
			done();
		});
	})

	it('Failed Create User Stores', function (done) {
		let name = '', address = 'Panglima Sudirman 17', description = 'John Doe Store Panglima Sudirman 17', status='active'

		api.post('api/v1/users/'+ global.user_id + '/stores')
		.set('Authorization', 'Bearer' + global.token)
		.set('Content-Type', 'application/json')
		.send({
			name: name,
			address: address,
			description: description,
			status: status
		})	
		.end(function (err, res) {
			expect(res.status).to.equals(500);
			if(err){
                    throw err;
                }
			done();
		});
	});

	it('Success Get User Stores', function (done) {
		api.get('api/v1/users/'+ global.user_id + '/stores')
		.set('Authorization', 'Bearer' + global.token)
		.end(function (err, res) {
			expect(res.status).to.equals(200);
			expect(res.body).to.be.jsonSchema( require('./auth/schema/success_get_stores_schema.json'));
			if(err){
                    throw err;
                }
			done();
		});
	})
	it('Success Delete User Stores', function (done) {
		api.del('api/v1/users/'+ global.user_id + '/stores/' + global.store_id)
		.set('Authorization', 'Bearer' + global.token)
		.end(function (err, res) {
			expect(res.status).to.equals(200);
			expect(res.body).to.be.jsonSchema( require('./auth/schema/success_delete_store_schema.json'));
			if(err){
                throw err;
            }
			done();
		});
	})

	after(function (done) {
        global.store_id = store_id;;
        // console.log(global.store_id);
        done();
    });
})
