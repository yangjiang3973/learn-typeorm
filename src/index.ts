import { DataSource } from 'typeorm';
import { Banker } from './entities/Banker';
import { Client } from './entities/Client';
import { Transaction } from './entities/Transaction';

const myDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'typeorm',
    password: 'pass123',
    database: 'typeorm',
    entities: [Client, Banker, Transaction],
    synchronize: true,
});

const main = async () => {
    try {
        await myDataSource.initialize();
        console.log(`connect to db successfully!`);
    } catch (error) {
        console.error(`cannot connect to db`);
        console.log(error);
    }
};

main();
