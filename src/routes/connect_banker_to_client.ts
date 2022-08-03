import express from 'express';
import { Client } from '../entities/Client';
import { Banker } from '../entities/Banker';

const router = express.Router();

router.put('/api/banker/:bankerId/client/:clientId', async (req, res) => {
    const { bankerId, clientId } = req.params;

    const client = await Client.findOne({
        where: {
            id: parseInt(clientId),
        },
    });

    const banker = await Banker.findOne({
        where: {
            id: parseInt(bankerId),
        },
        relations: ['clients'], // need to add the relation of clients, otherwise cannot add a new client
    });

    if (banker && client) {
        banker.clients.push(client);
        await banker.save();
        return res.json({
            msg: 'banker connected to client',
        });
    } else {
        return res.json({
            msg: 'banker or client not found',
        });
    }
});

export { router as connectBankerToClientRouter };
