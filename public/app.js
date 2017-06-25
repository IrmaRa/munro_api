var initialize = function() {

  var container = document.querySelector('#main-map');
  var coords = {lat: 51.50, lng: -0.127};
  var zoom = 10;
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}

  var app = function(){
    var url = 'https://munroapi.herokuapp.com/api/munros';
    var request = new XMLHttpRequest();
    request.open("GET", url);

    request.addEventListener('load', function(){
      var jsonString = request.responseText;
      localStorage.setItem('Munros', jsonString);
      var munros = JSON.parse(jsonString);

      populateList(munros);

      munrosList = munros;
      console.log(munrosList);

    });

    request.send();

  }

  var handleChange = function(event){

  var li = document.querySelector('#munro-info');


  var selectedIndex = event.target.value;
  var munro = munrosList[selectedIndex];

  li.innerText = "Name: " + munro.name + "\n" + "Meaning: " + munro.meaning + "\n" + "Height: " + munro.height + " metres";
  
  save(munro);
}


var save = function(newMunro){
  localStorage.setItem('munro', JSON.stringify(newMunro));
}


var populateList = function(munros){
  var select = document.querySelector('select');


  munros.forEach(function(munro, index){
    var option = document.createElement('option');
    option.innerText = munro.name;

    option.value = index;
    
    select.appendChild(option);
  });

  select.addEventListener("change", handleChange);
  select.addEventListener('change', showMunro);
}


var showMunro = function(event){
  var selectedIndex = event.target.value;
  var munro = munrosList[selectedIndex];
  var coords = {lat: munro.latlng_lat, lng: munro.latlng_lng};

  this.googleMap.setCenter({

    lat : munro.latlng_lat,
    lng : munro.latlng_lng

  });

  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
}.bind(this);


window.addEventListener('load', app);
window.addEventListener('load', initialize);
