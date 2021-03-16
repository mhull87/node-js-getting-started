const apiURL = 'https://www.omdbapi.com/?apikey=5a713c14&s=';

const fetchData = async () => {
  try {
    var search = document.getElementById('search').value;
    console.log(search);
    const response = await fetch(`${apiURL}${search}`)
    const movies = await response.json()
    display(movies)
  } catch (err) {
    console.log(err)
  }
}

function display(movies) {
  document.getElementById("output").innerHTML = "";
  document.getElementById("imageID").src = "";      
  for (var i = 0; i < movies.Search.length; i++) {
    var movie = movies.Search[i];
    var li = document.createElement("li");
    li.innerHTML = `${movie.Title}<button onclick='details(${JSON.stringify(movie)})'>Details</button>`;
    output.appendChild(li);
  }
}

function details(myData) {
  document.getElementById("output").innerHTML = "";
  var movie = document.getElementById("output");
  var p1 = document.createElement("p");
  var p2 = document.createElement("p");
  var p3 = document.createElement("p");
  p1.innerHTML = myData.Title;
  p2.innerHTML = myData.Year;
  p3.innerHTML = "ID: " + myData.imdbID;
  movie.appendChild(p1);
  movie.appendChild(p2);
  movie.appendChild(p3);
  document.getElementById("imageID").src = myData.Poster;
}