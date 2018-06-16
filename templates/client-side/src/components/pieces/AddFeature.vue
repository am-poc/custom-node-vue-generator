<template>
    <div id="input-form" class="container">
        <div class="row">
            <div class="col-md-10 offset-1">
                <br>
                <h2 id="register-name" class="register-name-card">Add New Feature</h2>
                <div id="flash-message" >
                    <span v-cloak v-if="registered" class="alert alert-success flash-message" role="alert">{{ server_response }}</span>
                    <span v-cloak v-else class="alert alert-warning flash-message" role="alert">{{ server_response }}</span>
                </div>

                <form class="text-sm-left register-form" @submit.prevent="addFeature" enctype="multipart/form-data">

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="name" >Name *</label>
                            <input id="name" type="text" class="form-control" required>
                        </div>

                        <div class="col-md-6">
                            <label for="feature-type">Feature type</label>
                            <select id="feature-type" class="form-control">
                                <option value="point">Point</option>
                                <option value="line">Line</option>
                                <option value="poly">Polygon</option>
                            </select>
                        </div>
                    </div>


                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="town">Location</label>
                            <input id="town" type="text" class="form-control">
                        </div>

                        <div id="lat-long-group" class="col-md-6">
                            <label for="lat-long">Coordinates (lat,long) *</label>
                            <input id="lat-long" type="text" placeholder="6.16542,-1.5687" class="form-control">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" type="text" class="form-control"></textarea>
                    </div>

                    <div  class="row form-group">
                        <div  class="col-md-4">
                            <label for="extra-key">Additional fields</label>
                            <select id="extra-key" class="form-control">
                                <option value="phone">Phone Number</option>
                                <option value= "website">Website</option>
                            </select>
                        </div>
                        <div class="col-md-8">
                            <label for="extra-value">Value</label>
                            <input id="extra-value" type="text" class="form-control">

                        </div>

                    </div>

                    <div class="form-group">
                        <label for="track-select">Select which Map to add to</label>
                        <select name="sessionId" id="track-select" class="form-control">
                            <% sessions.forEach(function(session) { %>
                            <option value="<%= session._id %>"> <%= session.name %></option>
                            <% }); %>
                        </select>
                    </div>

                    <input type="submit" value="Save" class="btn btn-primary uniform-width">
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
				server_response: '',
				registered: false
			}
		},
		methods: {
			addFeature: function(){
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

