
/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?id=";
const apiKey = "&appid=157ad402011b2f29d3a4f9a6dbcb1694";

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
    postData("/add", {temp:data.list[0].main.temp ,date:newDate,content:feelingsValue} );
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
    document.getElementById("temp").innerHTML = "Temprature: " + allData[0].temp;
    document.getElementById("date").innerHTML = "Date: " + allData[0].date;
    document.getElementById("content").innerHTML =
      "Content: " + allData[0].content;
  } catch (error) {
    console.log("error => ", error);
  }
};

