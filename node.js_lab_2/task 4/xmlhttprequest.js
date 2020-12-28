function message(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET','localhost:5000/api/name',true);
    xhr.responseType = "text";
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log('xhr.readyState: ' + xhr.readyState);
                console.log('xhr.status: ' + xhr.status);
                xhr.responseText = 'Istomin Ilya Olegovich';
            }
        }
        xhr.onerror = (e) => {
            console.log('XMLHTTPREQUEST ERROR: ', e);
        }
    }
    xhr.send();
    return xhr.responseText;
}