// const dbTest = () => {
//     for(let i = 0; i<10000000; i++){
//     const user =  User.create({
//               name: "mamun",
//               email: "mamun@gmail.com",
//               phone: 01745676445
//           });

//         //   console.log(user);
//     }


//     console.log('User created!!')

// };

// dbTest();

// const express = require('express');
// const faker = require('faker');
// const _ = require('lodash');

// const app = express();

// app.get('/address', (req, res) => {
//     const count = req.query.count;
//     console.log(count);
//     if (!count) {
//         return res
//             .status(400)
//             .send({ errorMsg: 'count query parameter is missing.' });
//     }
//     res.send(
//         _.times(count, () => {
//             const address = faker.address;
//             return {
//                 country: address.country(),
//                 city: address.city(),
//                 state: address.state(),
//                 zipCode: address.zipCode(),
//                 latitude: address.latitude(),
//                 longitude: address.longitude()
//             };
//         })
//     );
// });

// app.listen(3030, () => {
//     console.log('server started on port 3030');
// });


