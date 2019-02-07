const titleSearchForm = document.getElementById('titleSearchForm');
const titleSearchButton = document.getElementById('titleSearchButton');
const keywordSearchForm = document.getElementById('keywordSearchForm');
const keywordSearchButton = document.getElementById('keywordSearchButton');
const showDataDiv = document.getElementById('showData');

titleSearchButton.addEventListener('click', () => {
    showDataDiv.innerHTML = '';
    logicFuc('POST', '/search', titleSearchForm.value, (response) => {
        if (response == 'Error, no lyrics were found') {
            let text = document.createElement('p');
            text.innerText = 'Error';
            showDataDiv.appendChild(text);
        }
        else {
            let text = document.createElement('p');
            const result = JSON.parse(response).message.body.lyrics.lyrics_body;
            text.innerText = result;
            showDataDiv.appendChild(text);
        }
    })
})


keywordSearchButton.addEventListener('click', () => {
    showDataDiv.innerHTML = '';
    logicFuc('POST', '/keywordsearch', keywordSearchForm.value, (response) => {
        if (response == 'Error, no lyrics were found') {
            let text = document.createElement('p');
            text.innerText = 'Error';
            showDataDiv.appendChild(text);
        }
        else {
            const ul = document.createElement('ul')
            const parsedRes = JSON.parse(response);
            
            for(let i =0; i< parsedRes.length;i++){
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(parsedRes[i].track.track_name + ",    track id  " +'  '+ parsedRes[i].track.track_id));
                ul.appendChild(li);
            }
            const header = document.createElement('h2')
            const header1 = document.createTextNode('Matched tracks');
            header.appendChild(header1);
            showDataDiv.appendChild(header);
            showDataDiv.appendChild(ul);
        }
    })
}) 