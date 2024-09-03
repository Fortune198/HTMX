import express from 'express';
import xss from 'xss';

const app = express();

// Set static folder
app.use(express.static('public'));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());


//------------------------------ Users Tutorial-------------------------------------------------

// Handle GET request to fetch users
// app.get('/users', async (req, res) => {
//   // const users = [
//   //   { id: 1, name: 'John Doe' },
//   //   { id: 2, name: 'Bob Williams' },
//   //   { id: 3, name: 'Shannon Jackson' },
//   // ];

//   setTimeout(async () => {
//     const limit = +req.query.limit || 10;

//     const response = await fetch(
//       `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
//     );
//     const users = await response.json();

//     res.send(`
//     <h1 class="text-2xl font-bold my-4">Users</h1>
//     <ul>
//       ${users.map((user) => `<li>${user.name}</li>`).join('')}
//     </ul>
//   `);
//   }, 2000);
// });


//-------------------------------Temperature-------------------------------------//


// // Handle POST request for temp conversion
// app.post('/convert', (req, res) => {
//   //set delay for 2 seconds
//   setTimeout(() => {
//     const fahrenheit = parseFloat(req.body.fahrenheit);
//     const celsius = (fahrenheit - 32) * (5 / 9);//calculation of converting to degrees celcius

//     res.send(`
//       <p>
//       //print upon response
//         ${fahrenheit} degrees Farenheit is equal to ${celsius} degrees Celsius
//       </p>
//     `);
//   }, 2000);
// });

//--------------------------------Polling------------------------------//

let counter = 0; //Counter variable

// Handle GET request for polling
app.get('/poll', (req, res) => {
  counter++;//incremeting counter by one

  const data = { value: counter };

  res.json(data);
});

let currentTemperature = 20;//Default temperature

// Handle GET request for weather
app.get('/get-temperature', (req, res) => {
  currentTemperature += Math.random() * 2 - 1; // Random temp change
  res.send(currentTemperature.toFixed(1) + '°C');
});


//--------------------------------Weather---------------------------//






//Initiate server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
