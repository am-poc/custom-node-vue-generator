<template>
    <div id="admin" class="page-background">
        <cted-nav-bar></cted-nav-bar>

        <div id="page-content">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 border">
                        <cted-left-menu v-on:change="catchValues"></cted-left-menu>
                    </div>

                    <div class="col-md-8 border">
                        <h1>Welcome to the Admin console</h1>

                        <cted-add-user  v-if="itemId==1 & itemName=='User'"></cted-add-user>

                        <cted-get-data v-if="itemId==0 & itemName=='Users'"
                                        :src=itemName :url=urlPrefix></cted-get-data>

                        <cted-get-data v-if="itemId==0 & itemName=='Sessions'"
                                        :src=itemName :url=urlPrefix></cted-get-data>

                        <!--to instantiate same component several times: https://css-tricks.com/intro-to-vue-2-components-props-slots/->
                        <!--data sharing with components: https://www.youtube.com/watch?v=PPmg7ntQjzc-->
                        <!--moving on-->
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
				//console.log(values)
				this.itemId = values[0]
				this.itemName = values[1]
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
