const logicFuc = (url, method, data, cb) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const response = xhr.responseText;
                cb(response);
            }
            else{
                cb('Error');
            }
        }
        
    }
    xhr.open(url, method);
    xhr.send(data)
}