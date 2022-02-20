const t = document.getElementById('temp');        //getting updated data of temperature
const c = document.getElementById('content');     //getting updated data of feeling input
const dd = document.getElementById("date");       //getting updated data of new date
const zip = document.getElementById('zip');            //getting the zip code was entered by the user
const feeling = document.getElementById('feelings');  //getting the feeling was entered by the user
const generate = document.getElementById('generate');  //getting the button

let d = new Date();   // Create a new date
let month = d.getMonth() + 1     //month correction
let newDate = month +'.'+ d.getDate()+'.'+ d.getFullYear();

//  External API Url
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='

//credential of External API
const apiKey = '&appid=0cb2908b500b15dcc33edef5b4168a02&units=metric';

// Event listener to activate the functionality of the button
generate.addEventListener('click', async()=> {
      
  const zipValue = zip.value; // getting the value of "zip code"  
  const feelingValue = feeling.value; // get the value of "content"
 
  try{
  const res = await fetch(apiUrl+zipValue+apiKey);    //retrieve data from External API
  const impData = await res.json();           // the data was retrieved in json format        
  
  const tempValue = impData.main.temp;       // extract value of tempreture from retrieved data
  
  await fetch('/post', {                  //execute data which be entered in project endpoint
  method: 'POST', 
  credentials: 'same-origin',
  headers: { 'Content-Type': 'application/json',},
  body: JSON.stringify({                    //stringify all data from json object
    temp : tempValue,
    content : feelingValue,
    date : newDate,
  })
})
console.log(impData);    // print retrieved data in console "testing"

const retData = await fetch('/info', {        //fetch the data from the app endpoint
  method: 'GET', 
  credentials: 'same-origin', 
})
const DataCome = await retData.json()        // retrieve all data to the UI
console.log(DataCome);
t.innerHTML  = ` Temperature: ${(DataCome.temp)}`+ ' °C';
c.innerHTML  = ` Your Feeling: ${DataCome.content}`;
dd.innerHTML = ` Date: ${DataCome.date}`;

}catch(error) {
    console.log("there is an error", error);       // catch error
  }  
})

