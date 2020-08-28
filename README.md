# Vanilla-Reel-MP
Before reading this I hope you have visited the site before to get some gist because I really struggle to write Docs ... 

This is an open source music player to stream your favourite Music on the web
This project is inspired by Discord music bot to bring add free experience to the user.
<br/>


![alt text](https://github.com/rak3n/Vanilla-Reel-MP/blob/master/assets/Screenshot%20from%202020-06-06%2019.52.55.png)


Entire app has a 'SPA' architecture, but doesn't uses any framework like React or Veu. This is because to reflect the power of HTML and CSS with vanilla javascript. Though it utilises Tailwind CSS as its front-end engine to make development time of this project kind of a fast.
Because of using only basic techniques entire codebase for the app has gone kind of a complicated but a fully relaxed mind and a cup of coffee might help to go through the lines for any other information.

<b>Components</b>
This application has 3 main components which makes the music to stream :
1. <b>Search and result generator</b>
  This is simple search input which makes the request to a api hosted over Heroku to get back results of the search query
  
2. <b>Player</b>
  This one uses Youtube IFrame API to create a youtube player to play query on the go with not every but all necessary controls.
  
3. <b>API</b>
  This is the last important component of the entire program which generates thirty results out of which list generator only     uses Ten results (.....Beacuse I think this much is enogh :} )

 
# Extra Details
If you are still here let me take you to a little bit more details about application structure.

* <b>Frontend</b>: 
So entire application has 3 basic divisions header, music management and player div in repesctive order. Entire app has a responsive design (all thanks too tailwind and some extra CSS). Music management consist of a search box which accepts input from the user as combination of alphanumeric inputs, with a 'Go' button, which initiates to make a call to an 'url' embedded by node.js server which transfers the user query request to next api url, which is managed by a custom server hosted over herokuapp to sent back 30 results as music info in the JSON format with following structure:

<code>{'videoId':VID, 'title':title, 'descpription':DESC}</code>

The results are all in form of an array.
After Fetching all the data. Entire Player operations are performed in one page only (that's why choose Single Page Architecture). 
Playing Operation are done over YouTube Iframe Player by making request to YouTube Iframe Player API via javascript code. For more information about this you can follow this link https://developers.google.com/youtube/iframe_api_reference


* <b>Backend</b>: 
Remember that I this project request about getting JSON information about query is being handled by external server. Since, I am not open sourcing the codebase of that server, I would like to share some insights about that too.
server.js script of Reel-MP is handling fetch request from within the app and send it to the custom api server, For this operation to get information about quearies, I could have used YouTube V3 data api,<b> but this project doesn't uses that !!! </b>, all because of the factual problem of limit of 100 queries request to the Google servers. That why I had to develop an other approach to fulfill unlimited query request by the user in a session.
These results are sent back as respond to the node.js script and then back to standard fetch call to javascript script.



Thank you for spending your time reading this doc.

