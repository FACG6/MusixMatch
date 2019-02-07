require('dotenv').config();
const path = require('path');
const fs = require('fs');
const req = require('request');


const handleHomePage = (request, response) => {
    if (request.url === '/') {
        fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (error, file) => {
            if (error) {
                response.writeHead(500, {
                    'Content-Type': 'text/html',
                });
                response.end('<h1>Server Error</h1>');
            } else {
                response.writeHead(200, {
                    'Content-Type': 'text/html',
                });
                response.end(file);
            }
        });
    }
}


const handleSongTitle = (request, response) => {
    if (request.url === '/search') {
        let allData = '';
        request.on('data', (chunk) => {
            allData += chunk;
        });
        request.on('end', () => {
            const API_KEY = process.env.apiKey;
            let q_track = allData.split(' ').join('%20');
            let track_method = 'matcher.lyrics.get';
            const options = {
                url: `https://api.musixmatch.com/ws/1.1/${track_method}?format=json&callback=callback&q_track=${q_track}&apikey=${API_KEY}`,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8',
                }
            };

            req(options, (err, res, body) => {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/html',
                    });
                    response.end('<h1>Server Error</h1>');
                } else {
                    const parsedBody = JSON.parse(body);
                    if (parsedBody.message.body.lyrics) {
                        response.writeHead(200, {
                            'Content-Type': 'application/json',
                        });
                        const dataToBeSent = JSON.stringify((parsedBody.message.body.lyrics.lyrics_body).split('\n').join(' '));
                        response.end(dataToBeSent);
                    }
                    else {
                        response.writeHead(200, {
                            'Content-Type': 'text/html',
                        });
                        response.end('Error, no lyrics were found');
                    }
                }
            });
        });
    }
}


const handleKeywords = (request, response) => {
        let allData = '';
        request.on('data', (chunk) => {
            allData += chunk;
        });
        request.on('end', () => {
            const API_KEY = process.env.apiKey;
            let f_has_lyrics = allData.split(' ').join('%20');
            let track_method = 'chart.tracks.get';
            const options = {
                url: `https://api.musixmatch.com/ws/1.1/${track_method}?format=json&callback=callback&country=us&q_track=${f_has_lyrics}&apikey=${API_KEY}`,
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Accept-Charset': 'utf-8',
                }
            };

            req(options, (err, res, body) => {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/html',
                    });
                    response.end('<h1>Server Error</h1>');
                }
                 else {
                    const parsedBody = JSON.parse(body);
                    if (parsedBody.message.body.track_list) {
                        response.writeHead(200, {
                            'Content-Type': 'application/json',
                        });
                        const dataToBeSent = (JSON.stringify(parsedBody.message.body.track_list)).split('\n').join(' ');
                        response.end(dataToBeSent);
                    }
                    else {
                        response.writeHead(200, {
                             'Content-Type': 'text/html',
                        });
                        response.end('Error, no songs were found');
                    }
                }
            });
        });
    }



const handleStatics = (request, response) => {
    const filePath = request.url.split('/');
    const fileDir = path.join(__dirname, '..', ...filePath);
    const extension = path.extname(request.url);
    const contentType = {
        html: 'text/html',
        js: 'text/javascript',
        css: 'text/css',
        json: 'application/json',
        jpg: 'image/jpg',
        ico: 'image/x-icon',
        png: 'image/png'
    }


    fs.readFile(fileDir, (err, file) => {
        if (err) {
            response.writeHead(500, { 'content-type': 'text/html' });
            response.end('<h1>Server Error</h1>');
        }
        else {
            response.writeHead(200, contentType[extension]);
            response.end(file);
        }
    })
}

const handleError = (request, response) => {
    response.writeHead(404, { 'content-type': 'text/html' });
    response.end('<h1>Server Error</h1>')
}

module.exports = { handleHomePage, handleSongTitle, handleKeywords , handleStatics, handleError }