import { DataSource } from 'typeorm';
import express from 'express';
import { Banker } from './entities/Banker';
import { Client } from './entities/Client';
import { Transaction } from './entities/Transaction';
import { createClientRouter } from './routes/create_client';
import { createBankerRouter } from './routes/create_banker';
import { createTransactionRouter } from './routes/create_transaction';
import { connectBankerToClientRouter } from './routes/connect_banker_to_client';
import { deleteClientRouter } from './routes/delete_client';
import { fetchClientsRouter } from './routes/fetch_clients';

const app = express();

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

        app.use(express.json());

        app.use(createClientRouter);
        app.use(createBankerRouter);
        app.use(createTransactionRouter);
        app.use(connectBankerToClientRouter);
        app.use(deleteClientRouter);
        app.use(fetchClientsRouter);

        app.listen(8080, () => {
            console.log('Now listening on port 8080!');
        });
    } catch (error) {
        console.error(`cannot connect to db`);
        console.log(error);
    }
};

main();
