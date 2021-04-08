/*asynchronous web app that uses Web API and user data 
to dynamically update the UI for a Weather-Journal App.*/
/*submitted by Karim Mohamed*/

/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&APPID=9196db5bba9552fbc38d76ae3740ea04";

//For temperature in Fahrenheit
//const unitParam = "&units=imperial";       
//For temperature in Celsius
const unitParam = "&units=metric";      

// create new date instance
let d = new Date();
let newDate = (d.getMonth()+1)+ "." + d.getDate() + "." + d.getFullYear();

const zipCodeElement = document.getElementById('zip');
const feelingsCodeElement = document.getElementById('feelings');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');


// Event listener to get data from client
document.getElementById('generate').addEventListener('click', generateData);

// Post Data To API
async function generateData() {
    
    let data = {
        zipCode: zipCodeElement.value,
        userFeelings: feelingsCodeElement.value,
        date: newDate
    };

    //Post Data To Api For Get Zip Code Information
    if(!data.zipCode){
        alert("Hi, Please enter Zip Code")
        return
    }
    getZipCodeInfo(data.zipCode)
    .then(zipInfo => {
        // console.log(zipInfo);
        if (zipInfo.cod === 200){
            data.temp = zipInfo.main.temp;    //Get Temperature
            data.name = zipInfo.name;         //Get City Name
        } else {
            //Return And Show Alert If error was Found
            return alert(zipInfo.message)
        }
        
        //Now Post Data To Server side
        postData(data);
    })

};

/** Get Zip Code Information From Api */
async function getZipCodeInfo(zipCode) {
    try{
    const url = `${baseURL}${zipCode}${apiKey}${unitParam}`;
    const response = await fetch(url);
    
    return await response.json();
    }
    catch(error){
        console.log(error);
    }
}


/** Post Data To Server side */
async function postData(data) {
    let response = await fetch('/add', {
        method: 'POST',
        credentials:"same-origin",
        headers: { "Content-Type":"application/json",
        Accept:"application/json",
     },
        body: JSON.stringify(data),
    });
    try {
      
        response.json().then(data => {
            
                updateUI();//Update UI Now
        })

    } catch (error) {
        console.log(error);
    }
}

/** Update UI */
async function updateUI() {
    let response = await fetch('/all');
    
    try {
        response.json().then(data => {
            dateElement.innerHTML = `Date is: ${data.date}`;
            tempElement.innerHTML = `${data.name} Temp is: ${data.temp}`;
            contentElement.innerHTML = `My Feelings is: ${data.userFeelings}`;
            
        })
    } catch (error) {
        console.log(error);
    }
}
