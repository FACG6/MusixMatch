const inputSearch = document.getElementById('inputSearch');
const submit = document.getElementById('submit');
const showDataDiv = document.getElementById('showData');

submit.addEventListener('click', () => {
    console.log('fgdfhdfhfhs')
    logicFuc('POST', '/search', inputSearch.value, (response) => {
        if (response == 'Error, no lyrics were found') {
            let text = document.createElement('p');
            text.innerText = 'Error';
            console.log(response, 'this is the Error text')
            showDataDiv.appendChild(text);
        }
        else {
            console.log(response, 'this is the received data');
            let text = document.createElement('p');
            text.innerText = response;
            console.log(text, 'this is the text')
            showDataDiv.appendChild(text);
        }
    })
})