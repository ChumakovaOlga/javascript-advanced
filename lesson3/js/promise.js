//
// let getRequest = (url,cb)=> {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true)
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('Error');
//
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

let getRequest = (url,data) => {
    return new Promise ((resolve,reject) => {
        if (data) {         //если параметр есть
            resolve(data);
        } else {            //если параметра нет
            reject('Error');
        }
    });
};

getRequest ().then((data) => {
    console.log(data);    //параметра нет, поэтому выводится Error
})

    .catch((error) =>{
        console.log(error);
    });