<template>
    <div id="edit-layers">
        <div v-for="(layer, index) in layers" class="card-deck">
            <div v-if="!layer.editMode" class="card bg-warning no-padding">
                <div class="card-body text-center">
                    <div id="header" class="row">
                        <div class="col-md-10 text-left">
                            <h3><strong>Name: </strong> {{ layer.name }}</h3>
                        </div>
                        <div class="col-sm-2 actions">
                            <span @click.prevent="deleteLayer(layer._id,index)" title="Delete Layer" class="fa fa-remove"></span>
                            <span @click.prevent="editLayer(index)" title="Edit Layer" class="fa fa-edit"></span>
                        </div>
                    </div>

                    <div id="static-data" class="row">
                        <table class="col-md-10 text-left indent">
                            <tr><td>Layer ID:</td><td>{{ layer._id }}</td></tr>
                            <tr v-if="layer.priority"><td>Priority:</td><td>{{ layer.priority }}</td></tr>
                            <tr v-else><td>Priority:</td><td>0</td></tr>
                            <tr><td>Visibility:</td><td>{{ layer.visibility }}</td></tr>
                            <!--<tr>
                                <td>Features:</td>
                                <td><div style="max-height: 200px; overflow:auto">
                                    <ul>
                                        <li v-for="(feature,fIndex) in layer.features">
                                            <p>{{ feature }} <a href="" @click.prevent="deleteFeature(layer._id,feature,index,fIndex)">[Delete feature]</a></p>
                                        </li>
                                    </ul>
                                </div></td>
                            </tr>-->
                        </table>
                    </div>
                </div>
            </div>
            <div v-else class="card bg-info no-padding">
                <div class="card-body container text-center">
                    <div class="row">
                        <div class="col-md-10 text-left">
                            <h3><strong>Name: </strong> {{ layer.name }}</h3>
                        </div>
                        <div class="col-md-2 actions">
                            <span @click.prevent="saveLayer(index)" title="Save Layer" class="fa fa-save"></span>
                            <span @click.prevent="exitEdit(index)" title="Cancel Edit" class="fa fa-trash"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div id="edit-data" class="col-md-12 text-left register-form indent">
                            <div class="row"><h4>Edit Static Data</h4></div>
                            <div class="row">
                                <div class="col-md-4 form-group">
                                    <label for="priority">Priority</label>
                                    <input v-model="layer.priority" id="priority" class="form-control" type="number">
                                </div>
                                <div class="col-md-4 form-group">
                                    <label for="visibility">Visibility:</label>
                                    <select v-model="layer.visibility" id="visibility" class="form-control">
                                        <option value="true">Visible</option>
                                        <option value="false">Invisible</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div id="edit-style" class="col-md-12 text-left register-form indent">
                            <div class="row"><h4>Edit Style</h4></div>
                            <div class="row">
                                <div class="col-md-8 form-group">
                                    <cted-style-selector/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div id="copy-layer" class="col-md-12 text-left register-form indent">
                            <div class="row"><h4>Copy Layer</h4></div>
                            <div class="row">
                                <div class="col-md-8 form-group">
                                    <input type="checkbox" @click.prevent="showMapList(index)">
                                    Copy Layer to Another Map
                                    <br>
                                    <div v-if="layer.toggleMapList" id="map-list" class="indent">
                                        <h5>Choose the Map(s) to copy this Layer to:</h5>
                                        <ul class="checkbox-grid list-unstyled" v-for="map in maps">
                                            <li><input type="checkbox" v-model="toMaps" :value="map.slug"> {{map.name}}</li>
                                        </ul>
                                    </div>
                                </div>
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
		props: ['layers', 'maps'],
		data(){
			return{
				toMaps: [],
				style: {
					fillColor: '#777abc',
					lineColor: '#abc777',
					lineThickness: 2,
					fillOpacity: 0.5,
					radius: 2,
					opacity: 0.5
				}
			}
		},
		created(){
			//console.log(this.maps)
			//console.log(this.layers)
		},
        watch: {
		    layers: function(newVal, oldVal){
		    	this.layers = newVal
            },
	        maps: function(newVal, oldVal){
		        this.maps = newVal
	        }
        },
		methods: {
			editLayer: function(index){
				console.log(`editing layer ${index}`)
				const layer = this.layers[index]
				this.$set(layer, 'editMode', true) // needed because editMode key is being created afterwards
				this.$set(layer, 'toggleMapList', false)
			},
            exitEdit: function(index){
	            const layer = this.layers[index]
	            layer.editMode = false
            },
			deleteLayer: function(id, index){
                this.layers.splice(index, 1)
			},
			saveLayer: function(index){
				console.log('exiting edit mode')
				const layer = this.layers[index]
				layer.editMode = false
			},
			showMapList: function(index){
				const layer = this.layers[index]
				this.$set(layer, 'toggleMapList', !layer.toggleMapList)
			},
			copyLayerToMaps: function(id, name){}
		}
	}

</script>

<style>
    .card-deck{margin-bottom: 1vh;}
    .bg-warning{color: grey;}
    .bg-info{color: white;}
    .actions span{
        margin-left: 1vw;
        cursor: pointer;
        float: right;
    }
    .indent{
        font-size: smaller;
        margin-left: 2vw;
    }
    #map-list{
        max-height: 8vh;
        overflow-y: auto;
    }
</style>
