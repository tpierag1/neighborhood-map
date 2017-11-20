
// note: be careful with your json formatting
// i found several with the lat and lngs on the
// same level as title and not wrapped in the location object

var locations = [
  {
    title: 'Guide to Kulchur',
    location: {
      lat: 41.477217,
      lng: -81.722749
    }
  },
  {
    title: "Happy Dog",
    location: {
      lat: 41.484881,
      lng: -81.726483
    }
  },
  {
    title: "Bop Stop",
    location: {
      lat: 41.489878,
      lng: -81.711737
    }
  },
  {
    title: "Now That's Class",
    location: {
      lat: 41.482600,
      lng: -81.765594
    }
  },
  {
    title: "Mahalls",
    location: {
      lat: 41.477095,
      lng: -81.781151
    }
  },
  {
    title: "SPACES",
    location: {
      lat: 41.489854,
      lng: -81.711343
    }
  }
]

// function to initialize map
function initMap() {
  var styles = [
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e9e9e9"
        }, {
          "lightness": 17
        }
      ]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }, {
          "lightness": 20
        }
      ]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }, {
          "lightness": 17
        }
      ]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#ffffff"
        }, {
          "lightness": 29
        }, {
          "weight": 0.2
        }
      ]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }, {
          "lightness": 18
        }
      ]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }, {
          "lightness": 16
        }
      ]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }, {
          "lightness": 21
        }
      ]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dedede"
        }, {
          "lightness": 21
        }
      ]
    }, {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "on"
        }, {
          "color": "#ffffff"
        }, {
          "lightness": 16
        }
      ]
    }, {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "saturation": 36
        }, {
          "color": "#333333"
        }, {
          "lightness": 40
        }
      ]
    }, {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f2f2f2"
        }, {
          "lightness": 19
        }
      ]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#fefefe"
        }, {
          "lightness": 20
        }
      ]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#fefefe"
        }, {
          "lightness": 17
        }, {
          "weight": 1.2
        }
      ]
    }
  ]


  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 41.49932,
      lng: -81.694361,
    },
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  });
  return map;  // return the map into a variable so we can pass it into our view model
}

// call the initMap function and pass the map object into a variable called map
// this map was having issues before because the api call had a call back on the end
// to a function called initMap but wouldn't load in the same way so we couldn't access it
// in this document before. They do this so they can load the api async and more quickly
// but it was causing more problems than helping so i just stripped out the callback and
// am calling the function here instead
var map = initMap()


// VIEW MODEL
// note we're passing in the map as an arguement from the variable we defined above
// so we'll have access to it in the view model
function viewModel(map) {
  this.self = this // set this to self because of weird javasript 'this' scope issues
  self.map = map // set the map to the object off of the function argument
  self.searchItem = ko.observable('') // input data-bind
  self.locations = locations; // add the locations to the object.
  self.filteredLocations = ko.observableArray([]) // this will be an array to hold our filtered options after search
  self.titles = locations.title;
  // set the markers by passing in the locations array you want to use
  self.setMarkers = function(locations) {
    let array = []
    // I used an old-school for loop instead of forEach because forEach was giving me weird issues. this seems to work fine
    for (var i = 0; i < locations.length; i++) {
      array[i] = new google.maps.Marker({
        position: locations[i].location,
        title: locations[i].title,
        map: self.map, // this is where we needed the map object that we passed into the object
        animation: google.maps.Animation.DROP
      });
    }
    return array; // return the array to the self.markers variable so we can clear it and reset it later
  }

  // this is a simple function that checks whether or not we found a match
  // if there was a match we return the filtered array
  // if there wasn't a match we reset the map with all the locations back in place
  self.checkIfDisplay = function() {
    if (self.filteredLocations().length === 0) {
      return self.locations
    } else {
      return self.filteredLocations()
    }
  }

  // function to clear markers
  self.clearMarkers = function() {
    console.log(self.markers())
    self.markers().forEach(function(marker) {
      marker.setMap(null)
    })
  }

  // initialize the markers and set them to the self.markers variable
  self.markers = ko.observableArray(self.setMarkers(self.locations))

  // this is the function that the form submit event fires
  // it returns a filtered array if a match is found or else it returns an empty array
  self.filterLocations = function() {
    self.filteredLocations(self.locations.filter(function(item) {
        return item.title.toLowerCase() === self.searchItem().toLowerCase()
    }))
    self.clearMarkers() // clear the previous markers

    // this is where we call the tester function defined above
    // this will either return the filtered array or else it will
    // return the original locations array and pass it into the
    // displayed locations variable
    var displayedLocations = self.checkIfDisplay()

    // set the self.markers variable to the variable defined the line previous
    // and populate the map with the appropriate markers
    self.markers(self.setMarkers(displayedLocations))
  }
}

// this sets our view model defined above
// we're also passing in the map object as
// an arguement
ko.applyBindings(new viewModel(map))
