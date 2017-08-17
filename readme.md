# MoviePass ZipCode Search

This application was developed to give users a simple way to check the MoviePass service for whether or not their zip code has supported theaters. All of the data is consumed directly from MoviePass

## Tech stuff

The application is really quite simple. The data it exposes is publicly available at `https://www.moviepass.com/theaters/zip/{zip}`. The only thing this application does is takes a zip code input by a user and displays the already-available information in a user-friendly format. 

The tech stack is a little bit of jQuery on the front end with NodeJS-Express-Redis on the backend. An express server is set up to accept api requests from the front end, which acts as a proxy to the url mentioned above. Redis is used to cache theaters for zip codes already requested once and currently has no expiration (they expire when the server restarts). The webserver is hosted on a DigitalOcean VPS and is running nginx on Ubuntu 16.x.

TL;DR

 * jQuery
 * NodeJS
 * ExpressJS
 * Redis
 * DigitalOcean
 * nginx
 * Ubuntu 16.x

---

The route `/api/theaters/zip/:zip` returns an array of `theaters`. jQuery then parses the response into JSON to be able to render a string of markup for each theater that is returned. 

If there are any errors, an error message is displayed instead of the list of theaters.

The NodeJS server is needed because of CORS which means that cross-domain requests from a browser cannot be made to servers that do not allow them -- MoviePass's server(s) is one of them. NodeJS lives on the same domain as the client-side logic which allows it to make a request out to MoviePass's API.

