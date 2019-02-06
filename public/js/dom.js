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
            const result = JSON.parse(response);
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
            const parsedResponse = JSON.parse(response);
            const ul = document.createElement('ul')
            Object.keys(parsedResponse).forEach((item) => {
                const li = document.createElement('li');
                li.style.listStyle = 'none';
                li.appendChild(document.createTextNode(parsedResponse[item].track.track_name))
                ul.appendChild(li);
            });
            const header = document.createElement('h2')
            const header1 = document.createTextNode('Matched tracks');
            header.appendChild(header1);
            showDataDiv.appendChild(header);
            showDataDiv.appendChild(ul);
        }
    })
}) 