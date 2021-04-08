/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const appID = "9196db5bba9552fbc38d76ae3740ea04";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();

//Event listener
document.getElementById("generate").addEventListener("click", generateEntry);

//Function
async function generateEntry(event){
    const zipCode = document.getElementById("zip").value;
    const userResponse = document.getElementById("feelings").value;

    const weatherData = await getWeatherData(baseURL, zipCode, appID);
try{
    const postResponse = await postData("/add", {
        temperature: weatherData.main.temp,
        date: newDate,
        userResponse: userResponse,
        zoneName: weatherData.name,
    });
        
    if(postResponse.status===200){
        updateUI("/all");
    }
  }catch(error){
    console.log("error", error);
}

}

//Get Function
const getWeatherData = async (baseURL, zipCode, appID) => {
    const openWeatherApiUrl = baseURL+zipCode+"&APPID="+appID+"&units=imperial";
    const response = await fetch(openWeatherApiUrl);
    return await response.json();
};

//Post Function
const postData = async (url="", data={})=> {
    const response = await fetch(url,{
        method:"POST",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
        },
        body:JSON.stringify(data),
    });
    try{
    return await response.json();
   }catch(error){
    console.log("error", error);
   }
};


const updateUI = async (url = "") => {
    const response = await fetch(url);
    try{
    const allData = await response.json();
    
    document.getElementById("date").innerHTML = "Date:" + allData.date;
    document.getElementById("temp").innerHTML = allData.zoneName +" Temp: " + allData.temperature+"&deg;F";
    document.getElementById("content").innerHTML = "Feelings:" + allData.userResponse;
  }catch(error){
      console.log("error", error);
  }
};