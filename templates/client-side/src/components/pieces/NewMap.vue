<template>
    <div id="input-form" class="container">
        <div class="row">
            <div class="col-md-10 offset-1">
                <br>
                <h2 id="register-name" class="register-name-card">Create New Map</h2>
                <div id="flash-message" >
                    <span v-cloak v-if="registered" class="alert alert-success flash-message" role="alert">{{ server_response }}</span>
                    <span v-cloak v-else class="alert alert-warning flash-message" role="alert">{{ server_response }}</span>
                </div>

                <form id="map-new" class="text-sm-left register-form">
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="name-new">Name *</label>
                            <input id="name-new" type="text" name="name" required class="form-control">
                        </div>

                        <div class="col-md-6">
                            <label for="tags">Tags (comma separated)</label>
                            <input id="tags" type="text" name="tags" class="form-control">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" type="text" name="description" class="form-control"></textarea>
                    </div>

                    <input type="checkbox" name="ownership" value="private"> Make this Map Private to me
                    <br><br>
                    <input type="submit" value="Save" class="btn btn-primary uniform-width">
                </form>

                <hr/>
                <p style="background-color: grey;color:white;font-size: 30px; text-align: center">OR</p>
                <h2>Duplicate an Existing Map</h2>

                <form id="map-duplicate" class="text-sm-left register-form">
                    <div class="form-group"><label for="name-existing">Name *</label>
                        <input id="name-existing" type="text" name="name" required class="form-control">
                    </div>
                    <div id="scrollableFeatureList">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th class="medium"></th>
                                <th class="wider">Name</th>
                                <th class="wider">Description</th>
                                <th class="wider">slug</th>
                            </tr>
                            </thead>
                            <tbody style="height: 25vh;">

                            <tr>
                                <td class="medium">
                                    <input required  id="copyFromSlug" type="radio" name="copyFromSlug" value=<%= map.slug %>>
                                </td>
                                <td class="wider">map.name</td>
                                <td class="wider">map.description</td>
                                <td class="wider">map.slug</td>

                            </tr>

                            </tbody>
                        </table>
                    </div>
                    <input type="submit" value="Select" class="btn btn-primary uniform-width">

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

