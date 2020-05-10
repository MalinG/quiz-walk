<script>
  import getDistance from 'geolib/es/getDistance';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  let startLat, startLong, totalDistance = 0, watchId, startButtonVisible = true

  function start(pos) {
    const crd = pos.coords;

    startLat = crd.latitude
    startLong = crd.longitude

    getDistanceFromStart()
  }

  function newPosition(pos) {
    console.log('watching position');
    const crd = pos.coords;

    const distance = getDistance(
      {latitude: crd.latitude, longitude: crd.longitude},
      {latitude: startLat, longitude: startLong}
    )

    // Reset initial position every 10 meters
    if (distance > 5) {
      navigator.geolocation.clearWatch(watchId);
      totalDistance += 5

      if(totalDistance % 10 === 0) {
        dispatch('showQuestion', {
          questionNum: totalDistance / 10
        });
      }
      setStartPosition();
    }
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  export function setStartPosition() {
    if (startButtonVisible) startButtonVisible = false;
    console.log('reset position')
    navigator.geolocation.getCurrentPosition(start, error, options);
  }

  function getDistanceFromStart() {
    console.log('get distance')
    watchId = navigator.geolocation.watchPosition(newPosition, error, options);
  }

</script>

<div>
  <div>
    <p>Total distance: {totalDistance} meter</p>
  </div>
  {#if startButtonVisible}
    <button transition:fade class="button--large button--success" on:click={setStartPosition}>
      Start
    </button>
  {/if}
</div>

<style>
  p {
    font-weight: 100;
    font-size: 18px;
    margin-bottom: 40px;
  }

  @media (min-width: 640px) {
    p {
      font-size: 24px;
    }
	}
</style>

