const { createConnection } = require("typeorm")

let DbCon;
beforeAll(() => {
    require("./src/config")
})

beforeEach(async (done) => {
    try {
        DbCon = await createConnection({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            dropSchema: true,
            migrations: ['/src/db/migrations/*.ts'],
            entities: [__dirname + '/api/**/*Model.js'],
        });
        done()
    } catch (err) {
        console.log(err);
        throw new Error(('Unable to connect to the database:' + err));
    }

});

afterEach(() => {
    return DbCon.close()
})