const request = require('request')

// const geocode = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       latitude: 0,
//       longtitude: 0,
//     };
//     callback(data);
//   }, 2000);
// };
// geocode("Philadelphia", (data) => {
//   console.log(data);
// });

const add = (num, num1, callback) => {
setTimeout(() => {
callback(num + num1)
}, 2000)
}


add(1, 4, (sum) => {
    console.log(sum)
})
