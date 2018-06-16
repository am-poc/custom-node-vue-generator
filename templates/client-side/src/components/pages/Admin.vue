<template>
    <div id="admin" class="page-background">
        <cted-nav-bar></cted-nav-bar>

        <div id="page-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2 border">
                        <cted-left-menu v-on:change="catchValues"></cted-left-menu>
                    </div>

                    <div class="col-md-9 border">
                        <h1>Welcome to the Admin console</h1>

                        <cted-upload-file v-if="itemId==0 & itemName=='Upload GeoJSON'"/>
                        <cted-add-feature v-if="itemId==0 & itemName=='Add Feature Manually'"/>

                        <cted-new-map     v-if="itemId==1 & itemName=='New Map'"/>
                        <cted-new-layer   v-if="itemId==1 & itemName=='New Layer'"/>

                        <cted-get-maps    v-if="itemId==2 & itemName=='All Maps'" :src=itemName :url=urlPrefix />
                        <cted-get-data    v-if="itemId==2 & itemName=='All Features'" :src=itemName :url=urlPrefix />
                        <cted-get-files   v-if="itemId==2 & itemName=='All GeoJSON Files'" :src=itemName :url=urlPrefix />


                        <cted-get-data    v-if="itemId==3 & itemName=='All Users'" :src=itemName :url=urlPrefix />
                        <cted-add-user    v-if="itemId==3 & itemName=='Add New'"/>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		data(){
			return{
				itemId:'',
				itemName:'',
				urlPrefix: 'admin/view/',
			}
		},
		methods:{
			catchValues(values){
				this.itemId = values[0]
				this.itemName = values[1]
                console.log([this.itemId, this.itemName])
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
