import { Loader } from '@garfish/loader';

const loader = new Loader({
    maxSize: 1024 * 1024 * 15, // default number is "1024 * 1024 * 15"
});






loader.load({ scope: 'appName', url: 'http://localhost:8888/chunk-vendors.7a8a96ddc5a14b07.js' }).then((result) => {
    console.log(result); // 2
});


