### Description

* Simple Node.js application to display the current weather status on a webpage, using the [OpenWeatherMaps](https://openweathermap.org/) API. Use of the API requires an [account](https://home.openweathermap.org/users/sign_up) and corresponding [API keys](https://home.openweathermap.org/api_keys)

* Individual `svg` files for the different types of (main) weather conditions listed on the [OpenWeatherMap](https://openweathermap.org/weather-conditions) site, are stored in `/public/svg/`


### Installation

* Clone directory to your workstation
* 
* Before launching the application add your **API key** to `server.js` (at line 10)
* Launch the application with `node server.js` and open [http://localhost:3000](http://localhost:3000) to access the landing page.




### Dependencies

The application has been tested with Node.js `v6.11.4`

* The **[Yargs](https://www.npmjs.com/package/yargs)** library allows to specify a city to query the API against 
* Usage: `node server.js -c Antwerp`. 
* If no arguments are passed using `-c` the API query defaults to **Brussels** 


[Express](https://www.npmjs.com/package/express), [ejs](https://www.npmjs.com/package/ejs) are [Semantic UI](https://semantic-ui.com/) are used to generate the landing page