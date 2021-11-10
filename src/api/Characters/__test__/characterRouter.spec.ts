import { BASE_PATH } from '../../../config';
import app from '../../../app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

let chaiLib = <any> chai;
let chaiRequestLib = chaiLib.default.request;

describe('CharacterRouter', () => {
    it('should GET all Characters', async () => {
        const response = await chaiRequestLib(app).get(`${BASE_PATH}/characters`);
        expect(response.status).to.eql(200);
    });

    // ...some more tests

});
