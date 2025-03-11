const express = require('express');
const nmap = require('node-nmap');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', async (req, res) => {
    try {
        const scan = new nmap.NmapScan('192.168.21.0/24', '-sn');

        scan.on('complete', function (data) {
            console.log('Devices found:', data);
            res.render('initialPage.ejs', { devices: data });
        });

        scan.on('error', function (error) {
            console.error('Scan error:', error);
            res.status(500).send('Error occurred during the scan');
        });
        scan.startScan();
    } catch (error) {
        // Catch any errors in the try block
        console.error('Error occurred:', error);
        res.status(500).send('Error occurred while finding devices');
    }
});

app.post('/send', (req, res) => {
    const { ip, file: fileName } = req.body;
    if (req.socket.remoteAddress !== `192.168.21.17`) {
        console.log('req.socket.remoteAddress', req.socket.remoteAddress);
    }
});

// Handle receiving the file
app.get('/upload', (req, res) => {
    console.log(`🚀 ~ app.get ~ req:`, req.socket.remoteAddress);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
