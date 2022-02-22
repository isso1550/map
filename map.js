var map;
var circuitInfoWindow;

function setTrack(geo){
    if (geo == circuits[5].geo){
        map.setHeading(90);
    } else if (geo == circuits[1].geo){
        map.setHeading(0);
    } else if (geo == circuits[0].geo){
        map.setHeading(270);
    }
    
    map.setCenter(geo);
    map.setZoom(16);
    map.setMapTypeId("satellite");
    map.setTilt(45);
}

function createButtons(){
    const div = document.getElementById('tracks')
    for (const i in circuits) {
        track = circuits[i]
        btn = document.createElement('button');
        btn.innerHTML = track.name;
        geo = track.geo;
        btn.addEventListener("click", setTrack.bind(null, geo), false)
        div.appendChild(btn);
    } 
}
function openInfoWindow(map, marker, infowindow, string){
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
    infowindow.setContent(string);
}
function createCircuitsMarkers(){
    var marker;
    circuitInfoWindow = new google.maps.InfoWindow({
        content: "Track",
      });
    for (const i in circuits) {
        track = circuits[i]
        marker = new google.maps.Marker({
            position: track.geo,
            map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillOpacity: 0.6,
                fillColor: 'blue',
                strokeColor: 'yellow',
                strokeWeight: 10,
                strokeOpacity: 1,
                size: 10
            },
            title: track.name
        });
        marker.addListener("click", openInfoWindow.bind(null, map, marker, circuitInfoWindow, /*turn.name*/ '<p>' + track.full_name + 
        '</p><br><button onclick="circuitButtonEventHandler(\''+ track.name + '\', ' + track.geo.lat + ', '+ track.geo.lng +', ' + i + ')">Klik</button>' +
        '<button onclick="playAnimation('+ i + ')">Play animation </button>'), false);
        if (track.main_class == "GT3"){
            marker.icon.strokeColor = 'pink'
        }
        
    }
}
function circuitButtonEventHandler(name, lat, lng, i){
    setTrack({lat: lat, lng:lng})
    circuitInfoWindow.close();
    turns = circuits[i].turns;
    createTurnMarkers(turns);
    
}

function createTurnMarkers(turns){
    var marker;
    currentTrack = turns[0].geo
    const infowindow = new google.maps.InfoWindow({
        content: "Turn",
      });
    for (const id in turns){
        turn = turns[id]
        marker = new google.maps.Marker({
            position: turn.geo,
            map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillOpacity: 0.6,
                fillColor: 'blue',
                strokeColor: 'red',
                strokeWeight: 10,
                strokeOpacity: 1,
                size: 10
            },
            title: turn.number + " " + turn.name,
        });
        marker.addListener("click", openInfoWindow.bind(null, map, marker, infowindow, "<iframe width=\"400\" height=\"200\" src=\"https://www.youtube.com/embed/dBEpiM2vFZg\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"), false);
        
        //marker.addListener("click", openInfoWindow.bind(null, map, marker, infowindow, /*turn.name*/ '<video controls><source src="vid.mp4" type="video/mp4"></video>'), false);
    } 
}
function initMap() {
    const myLatlng = { lat:45.6214335792226, lng:9.288446459553903 };
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: myLatlng,
      mapTypeId: "satellite",
      gestureHandling: "greedy"
    });
    map.setTilt(45);
    map.addListener("click", (mapsMouseEvent) => {
      document.getElementById("geotags").innerHTML="Current geotags: lat:" + mapsMouseEvent.latLng.lat() + ", lng:" +mapsMouseEvent.latLng.lng();
      document.getElementById("heading").innerHTML="Current heading: " + map.getHeading();
      document.getElementById("zoom").innerHTML="Current zoom: " + map.getZoom();
      stopAnimation()
    });
    createButtons();
    createCircuitsMarkers();

    
  }





