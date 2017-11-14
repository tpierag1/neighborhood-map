//global variables
var map;
var infowindow;
var bounds;


//Data for model//

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
        lat: 41.489878,
        lng: -81.711737
    },
    {
        title: "Now That's Class",
        lat: 41.482600,
        lng: -81.765594
    },
    {
        title: "Mahalls",
        lat: 41.477095,
        lng: -81.781151
    },
    {
        title: "SPACES",
        lat: 41.489854,
        lng: -81.711343
    }]



//initialize map
function initMap(){

//style theme
    var styles = [
{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#e9e9e9"
        },
        {
            "lightness": 17
        }
    ]
},
{
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#f5f5f5"
        },
        {
            "lightness": 20
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#ffffff"
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
            "color": "#ffffff"
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
            "color": "#ffffff"
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
            "color": "#ffffff"
        },
        {
            "lightness": 16
        }
    ]
},
{
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#f5f5f5"
        },
        {
            "lightness": 21
        }
    ]
},
{
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#dedede"
        },
        {
            "lightness": 21
        }
    ]
},
{
    "elementType": "labels.text.stroke",
    "stylers": [
        {
            "visibility": "on"
        },
        {
            "color": "#ffffff"
        },
        {
            "lightness": 16
        }
    ]
},
{
    "elementType": "labels.text.fill",
    "stylers": [
        {
            "saturation": 36
        },
        {
            "color": "#333333"
        },
        {
            "lightness": 40
        }
    ]
},
{
    "elementType": "labels.icon",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#f2f2f2"
        },
        {
            "lightness": 19
        }
    ]
},
{
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#fefefe"
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
            "color": "#fefefe"
        },
        {
            "lightness": 17
        },
        {
            "weight": 1.2
        }
    ]
}
]
    map = new google.maps.Map(document.getElementById('map'),{
        center: {lat: 41.49932, lng: -81.694361},
        zoom:13,
        styles: styles,
        mapTypeControl: false
    });

    infowindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();

    //function for handling Google Maps errors
    function mapsErrors() {
        window.alert('There was an error with Google Maps! Please reload page.')
    };

    //Model for locations//
    var marker = function(locations) {

        console.log(this)

        var self = this;

        var title = locations.title;
        var position = locations.location;
        var address = '';
        var city = '';
        var phone = '';

        var displayed = ko.observable(true);

        //fancy marker icons
        //default marker
        var defaultIcon = makeMarkerIcon('0091ff');
        //highlighted marker
        var highlightedIcon = makeMarkerIcon('FFFF24');

        //FourSquare Functionality
        var foursquareID = 'CUAPYCU4HKYAAV1UHUM2KI0TZQFQP1G5KXQI1G10BEADD5T5';
        var foursquareSecret = 'BXO0SZS3XU2BT5EFUONTNGGYAIXHDLSYJ1XFSAK2BBD0DX1G';

        //make FourSquare request
        var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll=' +
        locations.position.lat + ',' + locations.position.lng + '&client_id=' + foursquareID +
        '&client_secret=' + foursquareSecret + '&v=20170101&query=' + locastions.title;

        $.getJSON(foursquareURL).done(function(data) {
            var results = data.response.venues[0];
            results.address = results.location.formattedAddress[0];
            results.city = results.location.formattedAddress[1];
            results.phone = results.location.formattedPhone[0];
        }).fail(function() {
            window.alert('Error in FourSquare API call! Please Reload')
        });
        //Generate marker for each location
        this.marker = new google.maps.Marker({
            position: this.position,
            title: this.title,
            icon: defaultIcon,
            animation: google.maps.Animation.DROP
        });

        self.filterMarkers = ko.computed(function() {
            if(self.visible() === true) {
                self.marker.setMap(map);
                bounds.extend(self.marker.position);
                map.fitBounds(bounds);
            } else {
                self.marker.setMap(null);
            }
        });
        //Adding infowindow to marker
        marker.addListener('click', function() {
            populateInfoWindow(this, self.address, self.city, self.phone,infowindow);
        });
        //Highlighting the marker on mouseover
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        //Resetting to default on mouseout
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
        //Funstion to show item info when clicked
        this.show = function(location) {
            google.maps.event.trigger(self.marker, 'click');
        };
    };

    marker(locations);

    //View

    var ViewModel = function() {
        var self = this;

        this.searchItem = ko.observable('');
        this.mapList = ko.observableArray([]);

        //location markers for each location
        locations.forEach(function(location) {
            self.mapList.push(new LocationMarker(location));
        });
        //filter for locations
        this.listOfLocations = ko.computed(function() {
            var searchFilter = self.searchItem().toLowerCase();
            if (searchFilter) {
                return ko.utils.arrayFilter(self.mapList(), function(location){
                    var string = location.title.toLowerCase();
                    var result = string.includes(searchFilter);
                    location.visible(result);
                    return result;
                });
            }
        self.mapList().forEach(function(location) {
            location.visible(true);
        });
        return self.mapList();
        }, self);

    };
    function populateInfoWindow(marker, address, city, phone, infowindow) {
        if(infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;
            infowindow.addListener('closeclick', function(){
                infowindow.marker = null;
            });
            var streetViewService = new google.maps.StreetViewService();
            var radius = 50;
            function getStreetView(data, status) {
                if (status == google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(
                        nearStreetViewLocation, marker.position
                    );
                    infowindow.setContent('<div>' + marker.title +
                    '<p>' + address + '<br>' + city + '<br>' + phone +
                     '</div><div id="pano"></div>');
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: heading,
                            pitch: 30
                        }
                    };
                    var panorama = new google.maps.StreetViewPanorama(
                        document.getElementById('pano'), panoramaOptions);
                }else {
                    infowindow.setContent('<div>' + marker.title +  '</div>' +
                '<div>No Street View Found</div>');
                }
            }
            streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
            infowindow.open(map, marker);
        }
    };
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34));
        return markerImage;

    }
}
