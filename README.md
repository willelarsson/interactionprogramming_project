Project Readme, authors: William Larsson, Paul Listi, Petter Kullander
=================================================

The only things you have to do to launch the service is to:
1. module add node
2. cd [path to drinkplanner]
3. npm install
4. npm start
5. go to localhost:8000 in your web browser

DISCLAIMER:
The API used in this service is sometimes slow, and will sometimes return a "-1" error message. This is connected to a CORS error caused by our use of proxies. This is fixed by refreshing the page.
The API was also very restricted regarding information, so we've added stuff like images and description-placeholders to show how we would've designed the page if those kinds of data existed. 
