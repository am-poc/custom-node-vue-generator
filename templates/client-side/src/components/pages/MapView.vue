<template>
    <div id="map-view" class="page-background">
        <aa-nav-bar></aa-nav-bar>
        <div id="page-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2 border">
                        <aa-search-menu></aa-search-menu>
                    </div>
                    <div class="col-md-9 border">
                        <aa-map-view></aa-map-view>
                    </div>
                </div>
            </div>
        </div>

        <div id="search-results">
            <aa-show-data v-if="showData"></aa-show-data>
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


</style>
