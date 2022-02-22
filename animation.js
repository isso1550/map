var animationIsPlaying = false;
const animationZoom = 15
const animationSteps = 600
var onboardMarker;
var onboardVideo;

function stopAnimation(){
    if (animationIsPlaying){
        clearInterval(myAnimation);
        animationIsPlaying = false;
    }
}

function playAnimation(id){
    onboardVideo= new google.maps.InfoWindow({
        content: "",
      });
    onboardMarker = new google.maps.Marker({
        position: {lat:45.61717686364929, lng:9.280975161163783},
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
    });
    onboardMarker.addListener("click", openInfoWindow(map, onboardMarker, onboardVideo, "<iframe width=\"200\" height=\"100\" src=\"https://www.youtube.com/embed/dBEpiM2vFZg?autoplay=true\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"), false);
    animation = circuits[id].animation
    animationIsPlaying = true;
    n = animation.length;
    n -= 1;
    map.setZoom(animationZoom);
    singleAnimation(animation, 0, n);
}
    

function singleAnimation(animation, currentAnimationNumber, maxAnimationNumber){
    steps = animationSteps
    if (currentAnimationNumber < maxAnimationNumber){
        var geo1= Object.create(animation[currentAnimationNumber].geo)
        var geo2 = Object.create(animation[currentAnimationNumber+1].geo)
        interval = animation[currentAnimationNumber].time/steps
        dlat = (geo1.lat - geo2.lat)/steps
        dlng = (geo1.lng - geo2.lng)/steps
        var currentCenter = geo1;
        var i = 1;
        myAnimation = setInterval(function(){
            if(i == steps){
                clearInterval(myAnimation)
                singleAnimation(animation, currentAnimationNumber+1, maxAnimationNumber);
            }
            currentCenter.lat = currentCenter.lat - dlat
            currentCenter.lng = currentCenter.lng - dlng
            console.log("switch to: " + currentCenter)
            //map.setCenter(currentCenter)
            onboardMarker.setPosition(currentCenter)
            i++;
        }, interval)
    } else {
        animationIsPlaying = false;
        onboardVideo.close();
        onboardMarker.setMap(null);
    }
}

document.getElementById("testButton").addEventListener('click', function(){
    playAnimation(circuits[5].animation);
})

document.getElementById("testButton2").addEventListener('click', function(){
    stopAnimation();
    
})

document.getElementById("testButton3").addEventListener('click', function(){
    console.log(onboardMarker.getPosition())
    onboardMarker.setPosition( {lat:45.62900235368499, lng:9.283129708059636})
})