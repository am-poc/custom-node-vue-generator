<template>
    <div id="search-menu" class="page-height">
        <!-- Sidebar Header -->
        <div class="sidebar-header">
            <h2>Search Menu</h2>
            <!--https://www.tutorialrepublic.com/twitter-bootstrap-tutorial/bootstrap-forms.php-->
            <form id="search-form" class="text-sm-left" @submit.prevent="search" enctype="multipart/form-data">

                <div class="row">
                    <div class="form-group">
                        <label for="limit">Max Results</label>
                        <input  class="form-control" id="limit" name="limit" type="number"  value="100" v-model="searchParams.limit">
                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <label for="features">Feature Type</label>
                        <select class="form-control" id="features" name="features" v-model="searchParams.featureType">
                            <option value="All">Points, Polygons, Lines</option>
                            <option value="Point">Points</option>
                            <option value="Polygon">Polygons</option>
                            <option value="Line">Lines</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <label for="deploymentId">Deployment ID</label>
                        <input class="form-control" type="text" id="deploymentId" name="deploymentId"
                               placeholder="(search all deployments)" autocomplete="off" v-model="searchParams.deploymentId">
                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <label for="userId">Username</label>
                        <input class="form-control" type="text" list="userDetails" id="userId" name="userId"
                               placeholder="(search all users)" autocomplete="off" v-model="searchParams.userId">
                        <datalist id="userDetails"></datalist>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <label for="datepicker1">Select Start Date</label>
                        <input class="form-control" id="datepicker1" name="datepicker1"
                               placeholder="(yyyy-dd-mm)" autocomplete="off" v-model="searchParams.startDate">
                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <label for="datepicker2">Select End Date</label>
                        <input class="form-control" id="datepicker2" name="datepicker2"
                               placeholder="(yyyy-dd-mm)" autocomplete="off" v-model="searchParams.endDate">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-10 text-center">
                        <button class="btn btn-sm btn-danger uniform-width" type="submit">Search</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
	import {EventBus} from '../../global/event-bus'
	export default {
		data () {
			return{
				searchParams: {
					limit: 100,
					featureType: 'All',
                    deploymentId: '',
                    userId: '',
                    startDate: '',
                    endDate: ''
                },
                data: []
			}
		},
		methods: {
            search: function(){
	            let uri = this.$hostname + 'admin/search'
	            this.axios.defaults.headers.common['Authorization'] = this.$store.state.token
	            this.axios.get(uri).then((response) => {
                    //console.log(response)
		            if(response.data && response.data.length > 0)
			            this.data = response.data
		            else
			            console.log(`No Data Received`)

		            // add data to the event bus
		            EventBus.$emit('searchResults', this.data)
	            })
            }
		}
	}
</script>

<style scoped>
    #search-menu{
        text-align: left;
        padding-left: 2vw;
    }

    #search-form{
        font-size: small;
    }
    #search-form .form-group {
        margin-bottom: 10px;
        border-bottom: 1px solid #efefef;
        position: relative;
    }
    #search-form .form-control{
        border: 0;
        box-shadow: 0 0 0;
        border-radius: 0;
        background: transparent;
        color: grey;
        height:auto;
    }
    select option {
        margin: 40px;
        background: rgba(0, 0, 0, 0.3);
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
    }

</style>