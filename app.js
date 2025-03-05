const express = require('express');
const find = require('local-devices');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        find({ address: '192.168.21.0/24' }).then((devices) => {
            console.log(`🚀 ~ find ~ devices:`, devices);
            return res.render('initialPage', { devices });
            return devices; // Return devices if needed
        });
    } catch (error) {}
});

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});
