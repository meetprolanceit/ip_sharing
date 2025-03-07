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
    } catch (error) {}
});

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});
