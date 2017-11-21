//declare locations
  var locations = [
    {
      title: 'Guide to Kulchur',
      id:'51b36777498ecbc1c980d47e',
      category:'Venue',
      location: {
        lat: 41.477217,
        lng: -81.722749
      }
    },
    {
      title: "Happy Dog",
      id:'4ad4bff0f964a5203be920e3',
      category: 'Bar',
      location: {
        lat: 41.484881,
        lng: -81.726483
      }
    },
    {
      title: "Bop Stop",
      id:'4af62260f964a520920122e3',
      category: 'Venue',
      location: {
        lat: 41.489878,
        lng: -81.711737
      }
    },
    {
      title: "Now That's Class",
      id:'4ad4bff0f964a5203ce920e3',
      category: 'Bar',
      location: {
        lat: 41.482600,
        lng: -81.765594
      }
    },
    {
      title: "Mahalls",
      id:'4b0888e5f964a520e70d23e3',
      category: 'Bar',
      location: {
        lat: 41.477095,
        lng: -81.781151
      }
    },
    {
      title: "SPACES",
      id:'5772f705498eff7896a172a6',
      category: 'Gallery',
      location: {
        lat: 41.489854,
        lng: -81.711343
      }
    }
  ]
//Using Knockout to build Venues list and objects
var Venues = function(info) {
    this.title = info.title;
    this.location = info.location;
    this.category = info.category;
    this.marker = info.marker;
};
//Instantiate map as variable
var map;
//Initialize map
function initMap() {
    //Styles for map
      var styles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": "-100"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "gamma": "0.00"
            },
            {
                "lightness": "74"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "3"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    }
]
    //build map object
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 41.49932,
          lng: -81.70
        },
        zoom: 12,
        styles: styles,
        mapTypeControl: false
      });
    infowindow = new google.maps.InfoWindow();

    ko.applyBindings(new ViewModel())
    }
//Define ViewModel based on Google Maps course material and FourSquare API documentation
var ViewModel = function() {
    var self = this;
    //create venueList
    this.venueList = ko.observableArray([]);
    //instatiate infowindow
    var infowindow = new google.maps.InfoWindow();
    //default marker icon
    var defaultIcon = makeMarkerIcon('00ff00');
    //highlighted marker icon
    var highlightedIcon = makeMarkerIcon('e6ffe6');
    //Create marker for each location
    locations.forEach(function(venue) {
        var marker = new google.maps.Marker({
          position: venue.location,
          title: venue.title,
          id: venue.id,
          map: map,
          icon: defaultIcon,
          animation: google.maps.Animation.DROP
        });
        venue.marker = marker;
        venue.marker.addListener('click', function() {
            setDefaultMarker();
            populateInfoWindow(this, infowindow);
        });
        self.venueList.push(new Venues(venue));
    });
    //create currentLocation, inspired by currentCat
    this.currentLocation = ko.observable(this.venueList()[0]);

 // starts the process of category filtering
    self.categorySelected = ko.observableArray(['All', 'Bar', 'Gallery', 'Venue']);

    self.filteredLocations = ko.computed(function() {

        var categoriesSelected = self.categorySelected();

   // Determines what happens whan category selected
    return ko.utils.arrayFilter(self.venueList(), function(venue) {

       var match = false;
       if (categoriesSelected.indexOf('All') !== -1 ){
         match = true;
       } else {
          categoriesSelected.forEach(function(cat) {
            if (cat === venue.category ) {
              match = true;
            }
          })
       }
       venue.marker.setVisible(match)
        return match;
    });
 });


 //Create the Markers
 function makeMarkerIcon(markerColor) {
   var markerImage = new google.maps.MarkerImage(
       'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
       '|40|_|%E2%80%A2',
       new google.maps.Size(21, 34),
       new google.maps.Point(0, 0),
       new google.maps.Point(10, 34),
       new google.maps.Size(21,34));
       return markerImage;
   }

 function setDefaultMarker() {
     self.venueList().forEach(function(venue) {
         venue.marker.setIcon(defaultIcon);
     });
    }

//Create infowindow content
 function populateInfoWindow(marker, infowindow) {

   //Grabs fourSquare content; based on FourSquare API documentation
   var foursquareID = 'CUAPYCU4HKYAAV1UHUM2KI0TZQFQP1G5KXQI1G10BEADD5T5';
   var foursquareSecret = 'BXO0SZS3XU2BT5EFUONTNGGYAIXHDLSYJ1XFSAK2BBD0DX1G';
   var venueID = marker.id;
   var foursquareURL = 'https://api.foursquare.com/v2/venues/' + venueID + '?client_id=' + foursquareID + '&client_secret=' + foursquareSecret + '&v=20170101';

   $.getJSON(foursquareURL).done(function (data) {
         var address = data.response.venue.location.address;
         var city = data.response.venue.location.city;
         var state = data.response.venue.location.state;
         var phone = data.response.venue.contact.formattedPhone;
         var url = data.response.venue.canonicalUrl;

         marker.setIcon(highlightedIcon);
         infowindow.setContent('<div"><strong><a href="' + url + '">' + marker.title
         +'</a></strong></div><br><div><br><br>' + address + '<br>' + city + ', ' +
         state + '<br>' + phone + '</div>');
         infowindow.open(map, marker);

        }).fail(function () {
            window.alert('Error in FourSquare API call! Please Reload')
        });
    }

 // Connects the selected location from the list to its marker.
 this.currentLocation = function(venue) {
   google.maps.event.trigger(this.marker, 'click');
 };

};
