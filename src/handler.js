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
            let track_method = 'track.lyrics.get';
            const options = {
                url: `https://api.musixmatch.com/ws/1.1/${track_method}?format=json&callback=callback&track_id=${q_track}&apikey=${API_KEY}`,
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
                    if (parsedBody.message) {
                        response.writeHead(200, {
                            'Content-Type': 'application/json',
                        });
                        response.end(JSON.stringify(parsedBody));
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
            let f_has_lyrics = allData;
            let track_method = 'track.search';
            const options = {
                url: `https://api.musixmatch.com/ws/1.1/${track_method}?format=json&callback=callback&q_lyrics=${f_has_lyrics}&f_lyrics_language=en&quorum_factor=1&apikey=${API_KEY}`,
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
                    if (JSON.parse(body).message.body.track_list){
                        response.writeHead(200, {
                            'Content-Type': 'application/json',
                        });
                        response.end(JSON.stringify(JSON.parse(body).message.body.track_list));
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
if(module){
module.exports = { handleHomePage, handleSongTitle, handleKeywords , handleStatics, handleError }
}