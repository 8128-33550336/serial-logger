import request from "supertest";
import { createServer } from '../src/server';
import { Readable } from "node:stream";



describe('server test', () => {
    const frcMock = jest.fn();
    const app = createServer(frcMock);

    test('index', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .end(done);
    });
    describe('csv test', () => {
        const fileContent = `Time,Temperature,Humidity,CO2
0,1,2,3
4,5,6,7
8,9,10,11`;
        beforeAll(() => {
            jest.mock('fs', () => {

                const mock = jest.fn();

                let readed = false;
                const readable = new Readable({
                    read() {
                        if (!readed) {
                            this.push(fileContent);
                        }
                        readed = true;
                    }
                });
                mock.mockReturnValue(readable);
                return {
                    createReadStream: mock
                };
            });
        });
        test('get csv', (done) => {
            /*const res = */request(app)
                .get('/all.csv')
                .expect(200)
                .expect('Content-Type', /csv/)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.text).toBe(fileContent);
                    done();
                });

        });

        afterAll(() => {
            jest.unmock('fs');
        });

    });
});
