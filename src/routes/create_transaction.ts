import express, { json } from 'express';
import { Transaction, TransactionType } from '../entities/Transaction';
import { Client } from '../entities/Client';

const router = express.Router();

router.post('/api/client/:clientId/transaction', async (req, res) => {
    const { clientId } = req.params;
    const { type, amount } = req.body;

    // find the client by id
    const client = await Client.findOne({
        where: {
            id: parseInt(clientId),
        },
    });

    if (!client) {
        return res.json({
            msg: 'client not found',
        });
    }

    // create transaction
    const transaction = Transaction.create({
        amount,
        type,
        client,
    });
    await transaction.save();

    if (type === TransactionType.DEPOSIT) {
        client.balance = client.balance + amount;
    } else if (type === TransactionType.WITHDRAW) {
        client.balance = client.balance - amount;
    }

    await client.save();

    return res.json({
        msg: 'client',
        client: client,
    });
});

export { router as createTransactionRouter };
