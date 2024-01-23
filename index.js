const express = require('express');

const axios = require('axios');
require('dotenv').config();

const app = express();

const API_KEY = process.env.API_KEY;
const port = 3013;


app.get('/', function (req, res) {
    const { address } = req.query;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&units=imperial&appid=${API_KEY}`;
    console.log(url)
    axios.get(url).then(response => {
        const data = response.data;
        const cityName = data.name;
        const temperature = data.main.temp;
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const message = `City Name: ${cityName}<br>Temperature: ${temperature}&deg;C<br>sunsetTime:${sunsetTime}`;

        res.send(`<html><body><div id='container'><h1>${message}</h1></div></body></html>`);
    })
        .catch(error => {
            //console.error(error);
            res.status(500).send({ error_message: error.message, err_msg: "error" });
        });
});

app.listen(port, function () {
    console.log(`Application running on port ${port}.`);
});