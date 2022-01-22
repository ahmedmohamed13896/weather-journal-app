
/* Global Variables */
const apiKey = "&appid=e40ec5b5fc95bf868de529f2f3ced8f3&units=imperial";
const baseUrl =
  "http://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (+d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear();


const generate = document.getElementById("generate");
/* Function called by event listener */
generate.addEventListener("click", generateApi);

/* Function called by event listener */
async function generateApi (){
  const zipCodeValue = document.getElementById('zip').value;
  const feelingsValue = document.getElementById("feelings").value;

  await getWeatherData(baseUrl, zipCodeValue, apiKey).then((data) => {
    console.log(data);
    postData("/add", {
      temp: data.main.temp,
      date: newDate,
      feelings: feelingsValue,
    })
  }).then(() => {
      updateUI();
    });
}



/* Function to POST data */
const postData = async (url='',data={})=>{
    console.log(data);
    const response = await fetch(url,{
        method: 'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
    });

    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error){
        console.log('error',error);
    }
}


/* Function to GET Web API Data*/
const getWeatherData = async (url = "", zipCode = "524901", apiKey = "") => {
  let response = await fetch(url+zipCode+apiKey);

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};


const updateUI = async  () => {
  
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("temp").innerHTML = "Temprature: " + allData.temp;
    document.getElementById("date").innerHTML = "Date: " + allData.date;
    document.getElementById("content").innerHTML =
      "Feelings: " + allData.feelings;
  } catch (error) {
    console.log("error => ", error);
  }
};

