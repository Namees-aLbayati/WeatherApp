
const key = "b2902c55cc45f6200c35f8ea75685867";
var input = $("#input")
var submit = document.querySelector('#submit');
var result = document.querySelector('#result');
submit.addEventListener('click', getWeather);
function getWeather() {
    var myinput = input.val();


    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + myinput + '&appid=b2902c55cc45f6200c35f8ea75685867')
        .then(response => response.json())
        .then(data => {
            document.querySelector('#card').classList.add('myborder');

            console.log(data['main']['humidity']);

            // display temp val
            var temvalue = data['main']['temp'];
            const fToCel = (temvalue - 32) * 5 / 9;
            console.log('try dgree', Math.round(fToCel));


            document.querySelector('#temp').textContent = 'Temperature F°:' + temvalue + '°';
            document.querySelector('#tempc').textContent = 'Temperature C° :' + Math.round(fToCel) + '°';
            // display icon   
            var iconn = data['weather'][0]['icon'];

            var iconurl = "http://openweathermap.org/img/wn/" + iconn + "@2x.png";
            $('#img').attr('src', iconurl)



            // country name   
            var countryname = data['name'];
            document.querySelector('#header').textContent = 'Weather Information :' + countryname;

            // weather  status 
            var weatherdes = JSON.stringify(data['weather'][0]['main']);

            document.querySelector('#hi').textContent = 'Wheather Status :' + weatherdes;

            // wind speed
            var wind = JSON.stringify(data['wind']['speed']);
            document.querySelector('#wind').textContent = 'Wind Speed:' + wind;
            //   humidity status
            var humidity = JSON.stringify(data['main']['humidity']);
            document.querySelector('#humidity').textContent = 'humidity degree:' + humidity + '%';
            var fetch1 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=b2902c55cc45f6200c35f8ea75685867"
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=b2902c55cc45f6200c35f8ea75685867")
                .then(response => response.json())
                .then(data => {
                    const uvi = data['daily'][0]['uvi'];
                    if (uvi >= 2) {
                        var text = 'You can safely enjoy being outside!';
                    } else if (uvi >= 7) {
                        var text = 'Seek shade during midday hours! Slip on a shirt, slop on sunscreen and slap on hat!';
                    } else {
                        var text = 'Avoid being outside during midday hours! Make sure you seek shade! Shirt, sunscreen and hat are a must!';
                    }
                    console.log('new data uvi', uvi);


                    document.querySelector('#uv').textContent = 'UVI index: ' + data['daily'][0]['uvi'] + '  Hint:' + text;
                    console.log('data new:', data.daily[0]['dt'])
                    var millisec = data.daily[0].dt * 1000;
                    document.querySelector('#mydate').textContent = 'Date:' + new Date(millisec).toLocaleDateString();

                    console.log(new Date(millisec).toLocaleDateString())
                    for (var i = 1; i <= 5; i++) {
                        //    display forcast next 5 days
                        console.log(data)
                        var trypbj = [];
                        var mytry = {
                            date: data.daily[i]['dt'],
                            temp: data.daily[i]['temp']['day'],
                            wind: data.daily[i]['wind_speed'],
                            humidity: data.daily[i]['humidity'],
                            feelslike: data.daily[i]['feels_like']['day'],
                            rain: data.daily[i]['weather'][0]['main'],
                            icon: data.daily[i]['weather'][0]['icon']
                        }
                        console.log(data.daily[i]['weather'][0]['icon'])
                        var container = document.getElementById('fiveresults');
                        container.setAttribute("class", "try")
                        console.log('trydate', new Date(mytry.date * 1000).toLocaleDateString())
                        var card = document.createElement('div');
                        card.setAttribute("class", "trycard")

                        var cardbody = document.createElement('div');
                        cardbody.setAttribute("class", "myborder")
                        var datee = document.createElement('p');
                        datee.setAttribute("class", "try2");
                        datee.innerText = 'Date:' + new Date(mytry.date * 1000).toLocaleDateString();
                    
                        var temp = document.createElement('p');
                        temp.textContent = 'Temperature Degree:' + mytry.temp + '°F  ';
                        var wind = document.createElement('p');
                        wind.className = 'card-text,bg-danger';
                        wind.innerHTML = 'wind-speed:' + mytry.wind + 'MPH';
                        var humidityEl = document.createElement('p');
                        humidityEl.textContent = 'Humidity ' + mytry.humidity + '%';

                        var feelslike = document.createElement('p');
                        feelslike.setAttribute("class", "padd")
                        feelslike.textContent = 'Feels Like:' + JSON.stringify(mytry.feelslike) + '°';
                        var mainrain = document.createElement('p');
                        mainrain.setAttribute("class", "padd")
                        mainrain.textContent = 'General Status:' + mytry.rain;
                        var iconEl = document.createElement('img');
                        const iconurl2 = "http://openweathermap.org/img/wn/" + mytry.icon + "@2x.png";
                        iconEl.setAttribute('src', iconurl2)
                        cardbody.append(datee, temp, feelslike, wind, humidityEl, mainrain, iconEl)

                        container.append(card, cardbody,);


                    }


                    var localtry = localStorage.setItem("userinput", myinput);
                    getlocal(localtry);
                    clearstaff(myinput)
                })

                .catch(err => {
                    console.log("Error Reading data " + err);
                })
        })
}
function getlocal(localtry) {
    var get = localStorage.getItem("userinput");
    $("#recent").text(localStorage.getItem("userinput"))

}
function clearstaff(myinput) {

    var test = $("#input").val("");
    console.log('test', test)
}
