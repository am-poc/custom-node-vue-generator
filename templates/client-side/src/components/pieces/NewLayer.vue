<template>
    <div id="input-form" class="container">
        <div class="row">
            <div class="col-md-10 offset-1">
                <br>
                <h2 id="register-name" class="register-name-card">Create New Layer</h2>
                <div id="flash-message" >
                    <span v-cloak v-if="registered" class="alert alert-success flash-message" role="alert">{{ server_response }}</span>
                    <span v-cloak v-else class="alert alert-warning flash-message" role="alert">{{ server_response }}</span>
                </div>

                <form id="map-new" class="text-sm-left register-form">
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="name">Name *</label>
                            <input id="name" type="text" name="name" required class="form-control">
                        </div>

                        <div class="col-md-6">
                            <label for="track-select">Select which map to add to</label>
                            <select name="sessionId" id="track-select" class="form-control">
                                <option value=""> session.name</option>
                            </select>
                        </div>
                    </div>

                    <br><br>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <h4>Style the Layer (all features in this layer will get the same style)</h4>
                            <cted-style-selector/>
                        </div>
                    </div>

                    <input v-on:click="createLayer" value="Save" class="btn btn-primary uniform-width">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'add-user',
		data(){
			return{
				newFeature: {
					name: '',
					type: '',
					location: '',
					coordinates: '',
					description: '',
					additional_data: {}
				},
				style: {
					fillColor: '#777abc',
					lineColor: '#abc777',
					lineThickness: 2,
					fillOpacity: 0.5,
					opacity: 0.5,
					radius: 2
				},
				server_response: '',
				registered: false
			}
		},
		methods: {
			createLayer: function(){
				//console.log("Register new user")
				let uri = this.$hostname + 'register'
				this.axios.post(uri, this.newFeature).then( (response) => {
					console.log(response)
					if (response.data.registered){
						this.registered = true
						this.server_response = `Feature '${this.newFeature.username}' is Successfully added to the database`
					}else{
						this.registered = false
						this.server_response = `Feature '${this.newFeature.username}' was not Registered`
                    }
				})
			},
		}
	}
</script>

<style scoped>

</style>

