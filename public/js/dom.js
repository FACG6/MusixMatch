const idSearchForm = document.getElementById('idSearchForm');
const idSearchButton = document.getElementById('idSearchButton');
const keywordSearchForm = document.getElementById('keywordSearchForm');
const keywordSearchButton = document.getElementById('keywordSearchButton');
const showDataDiv = document.getElementById('showData');
const language = document.getElementById('language');

idSearchButton.addEventListener('click', () => {
    showDataDiv.innerHTML = '';
    keywordSearchForm.value='';
    language.value = '';
    logicFuc('POST', '/search', idSearchForm.value, (response) => {
        if (response == 'Error, no lyrics were found') {
            const text = document.createElement('p');
            text.innerText = response;
            showDataDiv.appendChild(text);
        }
        else if (response == 'Internal server Error') {
            const text = document.createElement('p');
            text.innerText = response;
            showDataDiv.appendChild(text);
        }
        else {
            const text = document.createElement('p');
            const result = JSON.parse(response).message.body.lyrics.lyrics_body;
            text.innerText = result;
            showDataDiv.appendChild(text);
        }
    });
});


keywordSearchButton.addEventListener('click', () => {
    showDataDiv.innerHTML = '';
    idSearchForm.value = '';
    const dataArray = [keywordSearchForm.value, language.value];
    logicFuc('POST', '/keywordsearch', JSON.stringify(dataArray), (response) => {
        if (response == 'Error, no lyrics were found') {
            const text = document.createElement('p');
            text.innerText = 'Error';
            showDataDiv.appendChild(text);
        } else if (response == 'Internal server Error') {
            const text = document.createElement('p');
            text.innerText = response;
            showDataDiv.appendChild(text);
        } else {
            console.log(response);
            const ul = document.createElement('ul');
            const parsedRes = JSON.parse(response);

            for (let i = 0; i < parsedRes.length; i++) {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(`${parsedRes[i].track.track_name},    track id  ` + `  ${parsedRes[i].track.track_id}`));
                ul.appendChild(li);
            }
            const header = document.createElement('h2');
            const header1 = document.createTextNode('Matched tracks');
            header.appendChild(header1);
            showDataDiv.appendChild(header);
            showDataDiv.appendChild(ul);
        }
    });
});
