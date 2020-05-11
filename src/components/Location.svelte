<script>
  import getDistance from 'geolib/es/getDistance';
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();
  const nosleep = new NoSleep();

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  let startLat, startLong, totalDistance = 0, watchId, startButtonVisible = true

  function startPosition(pos) {
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
    if (distance > 10) {
      navigator.geolocation.clearWatch(watchId);
      totalDistance += 10

      if(totalDistance % 300 === 0) {
        dispatch('showQuestion', {});
      }
      setStartPosition();
    }
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  export function setStartPosition() {
    console.log('reset position')
    navigator.geolocation.getCurrentPosition(startPosition, error, options);
  }

  function getDistanceFromStart() {
    console.log('get distance')
    watchId = navigator.geolocation.watchPosition(newPosition, error, options);
  }

  function start() {
    nosleep.enable();
    startButtonVisible = false;
    setStartPosition()
  }

  function stop() {
    nosleep.enable();
    navigator.geolocation.clearWatch(watchId);
    totalDistance = 0
    startButtonVisible = true;
  }

  onDestroy(() => stop());
</script>

<div>
  <div>
    <p>Total distance: {totalDistance} meters</p>
  </div>
  {#if startButtonVisible}
    <button transition:fade class="button--large button--success" on:click={start}>
      Start
    </button>
  {/if}
  {#if !startButtonVisible}
    <button transition:fade class="button--large button--error" on:click={stop}>
      Stop
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

