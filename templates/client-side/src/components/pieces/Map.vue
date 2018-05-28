<template>
    <div id="map">
        <div id="instaMap" tabindex="0"></div>
    </div>
</template>

<script>
	import 'leaflet'
	//import 'leaflet.markercluster'
	const L = window.L;

	export default {
		data(){
			return {
				globalData:[],
                marker:[],
                markersLayer:{},
                myMap: {}
			}
		},
        mounted(){
			this.initMap()
        },
		methods: {
			initMap: function() {
				const initialOrigin = [7.9509256, -3.2752095]
				const initialZoom = 7
				const satellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
					maxZoom: 18,
					subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
				})
				const streets = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					maxZoom: 19,
					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				})
				const baseMaps = {
					"Satellite": satellite,
					"Streets": streets
				}

				// draw map
				this.myMap = L.map('instaMap').setView(initialOrigin, initialZoom)
				this.markersLayer = new L.featureGroup()

				// Add default baselayer
				this.myMap.addLayer(streets)

				// Add controls
				L.control.layers(baseMaps).addTo(this.myMap)

				// Add custom buttons
				/*L.easyButton('<span class="glyphicon glyphicon-globe" title="Reset Map"></span>', (btn, map) => {
					// reset view to default, and zoom to bounds if there are markers
					map.setView(initialOrigin, initialZoom)
					map.fitBounds(this.markersLayer.getBounds())
				}).addTo(this.myMap)*/
			}
		}
	}
</script>
<style scoped>
    .background-accent{background: grey;}
    #map{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    #instaMap{
        position: relative;
        z-index: 100;
        left: -15px;
        height: inherit;
        width: inherit;
    }
</style>