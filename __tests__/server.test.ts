import request from "supertest";
import { app } from '../src/server';

describe('server test', () => {
    test('index', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .end(done);
    });
});
