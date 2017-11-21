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
    //build map object
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 41.49932,
          lng: -81.70
        },
        zoom: 13,
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
    var defaultIcon = makeMarkerIcon('0091ff');
    //highlighted marker icon
    var highlightedIcon = makeMarkerIcon('FFFF24');
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
        console.log(self.venueList())
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
         var address = data.response.venue.location.formattedAddress;
         var phone = data.response.venue.contact.formattedPhone;

         marker.setIcon(highlightedIcon);
         infowindow.setContent('<div">' + marker.title + '</div><br><div>'
         + address+ '<br>' + phone + '</div>');
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
