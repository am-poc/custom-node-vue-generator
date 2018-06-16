<template>
    <div id="map-view" class="page-background">
        <cted-nav-bar></cted-nav-bar>
        <div id="page-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2 border">
                        <cted-search-menu></cted-search-menu>
                    </div>
                    <div class="col-md-9 border">
                        <cted-map-view></cted-map-view>
                    </div>
                </div>
            </div>
        </div>

        <div id="search-results">
            <cted-show-data v-bind:class="{visible: showData}" class="hidden"></cted-show-data>
        </div>
    </div>
</template>

<script>
	import {EventBus} from '../../global/event-bus'

    export default {
    	data(){
    		return{
    			showData: false
            }
        },
	    mounted(){
		    EventBus.$on('searchResults', (data) => {
			    this.showData = data.length > 0 ? true : false
		    })
	    }
    }
</script>

<style scoped>
    .hidden{
        display: none;
    }
    .visible{
        display: block;
    }

</style>
