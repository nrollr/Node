
## Description

* Simple Node.js application to display the current weather status on a webpage, using the [OpenWeatherMaps](https://openweathermap.org/) API. Use of the API requires an [account](https://home.openweathermap.org/users/sign_up) and corresponding [API keys](https://home.openweathermap.org/api_keys)

* Individual `svg` files for the different types of (main) weather conditions listed on the [OpenWeatherMap](https://openweathermap.org/weather-conditions) site, are stored in `/public/svg/`


### Installation

* Copy the contents to your workstation
* In the directory containing `server.js`, install all dependencies via `npm install`
* Add your **API key** to `server.js` (ref. line 10)
* Launch the application with `node server.js` and open [http://localhost:3000](http://localhost:3000) to access the landing page.




### Dependencies

The application has been tested with Node.js `v6.11.4`

* The [yargs](https://www.npmjs.com/package/yargs) library allows to specify a city to query the API against 
* Usage: `node server.js -c Antwerp,be`. 
* If no arguments are passed using `-c` the API query defaults to **Brussels** 


[express](https://www.npmjs.com/package/express), [ejs](https://www.npmjs.com/package/ejs) are [Semantic UI](https://semantic-ui.com/) are used to generate the landing page

## Result
A screenshot of the results, once the application is started:
![image](https://raw.githubusercontent.com/nrollr/Node/master/WeatherAPI/Screenshot.png)