<template>
    <div id="map-edit" class="page-background">
        <cted-nav-bar></cted-nav-bar>
        <div id="page-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2 border">
                        <cted-map-edit v-on:change="catchValues"/>
                    </div>
                    <div class="col-md-9 border">

                        <div class="row boundary">
                            <div v-if="itemId===0" id="map" class="col-md-10 offset-1 scrollable">

                                <div class="card bg-info no-padding">
                                    <div class="card-body text-center indent">
                                        <div id="map-mode" >
                                            <h2>Map Mode</h2>
                                            <div class="text-sm-left">
                                                <input v-model="map.mode" @change="editMap()" type="radio" name="mode" value="cluster"> Show Marker Clusters for Points<br>
                                                <input v-model="map.mode" @change="editMap()" type="radio" name="mode" value="tooltips"> Show Labels for Points<br>
                                                <input v-model="map.mode" @change="editMap()" type="radio" name="mode" value="none"> Show Neither Labels nor Clusters<br>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card bg-info no-padding">
                                    <div class="card-body text-center indent">
                                        <div id="map-general" >
                                            <h2>Map Static Data</h2>
                                            <form id="map-new" class="text-sm-left register-form">
                                                <div class="row form-group">
                                                    <div class="col-md-6">
                                                        <label for="name-new">Name *</label>
                                                        <input type="text" id="name-new" v-model="map.name" required class="form-control">
                                                    </div>

                                                    <div class="col-md-6">
                                                        <label for="tags">Tags (comma separated)</label>
                                                        <input id="tags" type="text" class="form-control">
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="description">Description</label>
                                                    <textarea id="description" type="text" v-model="map.description" class="form-control"></textarea>
                                                </div>
                                                <input type="submit" value="Save" class="btn btn-primary uniform-width">
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div class="card bg-info no-padding">
                                    <div class="card-body text-center indent">
                                        <div id="map-style" >
                                            <h2>Map Style</h2>
                                            <cted-style-selector/>
                                            <div class="text-sm-left register-form">
                                                <input type="submit" value="Update Style" class="btn btn-primary uniform-width">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div v-if="itemId===1" id="layers" class="col-md-10 offset-1 scrollable">
                                <cted-edit-layer :layers=map.layers :maps="mapList" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
	export default {
		props:['slug', 'mapList'],
		data(){
			return {
				endpoint: 'admin/map/edit',
				itemId:'',
				itemName:'',
				map: {
					mode: '',
					name: '',
					slug: '',
					description: '',
					tags:[],
					features: [],
					layers: []
				},
			}
		},
		created(){
			this.getMapData()
		},
		methods:{
			getMapData: function(){
				let uri = this.$hostname + this.endpoint + '/' + this.slug
				console.log(this.$store.state.token)
				this.axios.defaults.headers.common['Authorization'] = this.$store.state.token
				this.axios.get(uri).then((response) => {
					//console.log(response)
					this.map = response.data
				})
			},
			editMap: function(){},
			deleteMap: function(){},
			catchValues(values){
				this.itemId = values[0]
				this.itemName = values[1]
				//console.log([this.itemId, this.itemName])
			}
		},
		watch: {
			slug: function(newVal, oldVal){
				this.slug = newVal
				this.getMapData()
			},
			mapList: function(newVal, oldVal){
				this.mapList = newVal
			}
		}
	}
</script>

<style scoped>
    .boundary{margin-top: 3vh;}
    #map div{margin-top: 1vh; }
    .scrollable{
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 78vh;
    }
    .indent{
        font-size: smaller;
        width: 80%;
        margin: 0 auto;
        padding-top: 0;
    }

</style>
