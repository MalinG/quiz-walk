<script>
  import getDistance from 'geolib/es/getDistance';

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  let startLat, startLong, distance

  function success(pos) {
    const crd = pos.coords;

    startLat = crd.latitude
    startLong = crd.longitude

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function newPosition(pos) {
    const crd = pos.coords;

    distance = getDistance({latitude: crd.latitude, longitude: crd.longitude}, {
                latitude: startLat,
                longitude: startLong,
            })
    console.log(
            'You are ',
            getDistance({latitude: crd.latitude, longitude: crd.longitude}, {
                latitude: startLat,
                longitude: startLong,
            }),
            'meters away from startposition'
        );
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function setStartPosition() {
    console.log('start!!!')
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  function getDistanceFromStart() {
    console.log('get distance')
    navigator.geolocation.getCurrentPosition(newPosition, error, options);
  }


  // On press start, set start position
  // On press get distance - print distance from startposition
</script>

<div>
  <button on:click={setStartPosition}>
    Starta
  </button>
  <div>
    <p>Start latitude: {startLat || 'not set'}</p>
    <p>Start longitude: {startLong || 'not set'}</p>
  </div>

  <button on:click={getDistanceFromStart}>
    Visa avstånd
  </button>
  <div>
    <p>Avstånd från start: {distance || 0} meter</p>
  </div>
</div>
