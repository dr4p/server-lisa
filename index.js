const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const http = require("http");

app.use(cors());
app.use(express.json());

http.createServer(app).listen(PORT, () => {
    console.log('Server is working on port ' + PORT);
});

app.get('/weather', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        const url = `https://api.weather.yandex.ru/v2/forecast/?lat=${lat}&lon=${lon}&lang=ru_RU`;

        const data = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-Yandex-API-Key': '248ad155-70ec-4e55-9a6f-624bbaae8de3'
            },
        });

        const jsonData = await data.json();
        console.log(jsonData);
        res.send(jsonData);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
