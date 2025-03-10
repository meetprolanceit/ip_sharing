const express = require('express');
const find = require('local-devices');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// { address: '192.168.21.0/24' }

app.get('/', async (req, res) => {
    try {
        find({ address: '192.168.21.0/24' }).then((devices) => {
            console.log(`🚀 ~ find ~ devices:`, devices, devices.length);
            return res.render('initialPage', { devices });
        });
    } catch (error) {
        console.log(`🚀 ~ app.get ~ error:`, error);
    }
});

const net = require('net');
const fs = require('fs');
const path = require('path');

const serverHost = '192.168.21.17';
const port = 3000;

app.post('/send', async (req, res) => {
    try {
        const a = req.body;
        console.log(`🚀 ~ app.post ~ a:`, a);

        res.json(a);
    } catch (error) {
        console.log(`🚀 ~ app.post ~ error:`, error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});
