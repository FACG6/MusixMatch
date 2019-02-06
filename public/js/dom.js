const inputSearch = document.getElementById('inputSearch');
const submit = document.getElementById('submit');
const showDataDiv = document.getElementById('showData');

submit.addEventListener('click', () => {
    logicFuc('POST', '/search', inputSearch.value, (response) => {
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