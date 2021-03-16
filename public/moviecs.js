const apiURL = 'https://www.omdbapi.com/?apikey=5a713c14&s=';

const fetchData = async () => {
  try {
    var search = document.getElementById('search').value;

    const response = await fetch(`${apiURL}${search}`)
    const movies = await response.json()
    display(movies)
  }
  catch (err) {
    console.log(err)
  }
}

function display(movies) {
  for (var i = 0; i < movies.Search.length; i ++) {
    var output = document.getElementById('output');
output.innerHtml = "";
    var movie = movies.Search[i];
    var li = document.createElement("li");
    var text = document.createTextNode(movie.Title);
var button = document.createElement("button");
button.addEventListener('click', details(movie));
    li.appendChild(text);
li.appendChild(button);
    output.appendChild(li);

  } 
}
function details(movie) {
var output = document.getElementById("output").innerHtml = "";
var title = document.createElement('li');
title.createTextNode(movie.Title);
}
