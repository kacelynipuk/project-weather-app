function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let minute = now.getMinutes(); // 0,1,2, 12
  let hour = now.getHours(); //1, 2, 3, 4
  let day = days[now.getDay()]; //1, 2, 3, 4
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${date} ${month} ${year} (${day}) ${hour}:${minute}`;
}

function displayTemperature(response) {


  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000); //to call function for calculating time

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${(response.data.condition.icon)}.png`) //search change attribute of an element
  iconElement.setAttribute("alt",response.data.condition.description);// no need `` nor

}
let apiKey = "2f63a97f4at8dac8o3e80889b0365010";
let city = "london"; 
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
