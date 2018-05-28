<template>
    <div id="home">
        <aa-nav-bar></aa-nav-bar>
        <!--https://github.com/lukaszflorczak/vue-agile-->
        <agile :arrows="false" :speed="750" :dots="false"
               :timing="'linear'" :fade="true"
               :autoplay="true" :pauseOnHover="false">
            <div class="slide">
                <img src='../../assets/home-page/mapmenu_background_9.jpg'>
            </div>
            <div class="slide">
                <img src='../../assets/home-page/mapmenu_background_7.jpg'>
            </div>
            <div class="slide">
                <img src='../../assets/home-page/mapmenu_background_9.jpg'>
            </div>
            <div class="slide">
                <img src='../../assets/home-page/mapmenu_background_19.jpg'>
            </div>
        </agile>

        <div id="page-content">
            <div class="logo text-center">
                <img class="img-rounded" alt="Company Logo" src="../../assets/logo.jpg"/>
                <h1>My App Name</h1>
                <h3><em>{{msg}}</em></h3><br>
            </div>

            <!-- Maps -->
            <div class="container">
                <div class="row">
                    <div class="col-md-6 offset-3">
                        <h2>Featured Maps</h2>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="map-item">
                            <a href="/api/map/" >
                                <img class="img-rounded" style="width: 170px" alt="map thumbnail"
                                     src="../../assets/featuredmap-1.png"/>
                            </a>
                            <h2>Map Name</h2>
                            <h4>Description of the Map</h4>
                            <h5>Number of Items: 10</h5>
                            <a class="btn btn-top" href="/api/map/<%= map.slug %>">View Map</a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="map-item">
                            <a href="/api/map/" >
                                <img class="img-rounded" style="width: 170px" alt="map thumbnail"
                                     src="../../assets/featuredmap-1.png"/>
                            </a>
                            <h2>Map Name</h2>
                            <h4> Description of the Map</h4>
                            <h5>Number of Items: 10</h5>
                            <a class="btn btn-top" href="/api/map/<%= map.slug %>">View Map</a>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="map-item">
                            <a href="/api/map/" >
                                <img class="img-rounded" style="width: 170px" alt="map thumbnail"
                                     src="../../assets/featuredmap-1.png"/>
                            </a>
                            <h2>Map Name</h2>
                            <h4> Description of the Map</h4>
                            <h5>Number of Items: 10</h5>
                            <a class="btn btn-top" href="/api/map/<%= map.slug %>">View Map</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Maps -->

        </div>
    </div>

</template>

<script>
	import Vue from 'vue'
	import VueAgile from 'vue-agile'
	Vue.use(VueAgile)

	export default {
		data () {
			return {
				msg: 'Welcome to the home page'
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn-top {
        color:#42b983;
        background:none repeat scroll 0 0 rgba(0, 0, 0, 0.57);
        border-color:#cccccc;
    }
    .btn-top:hover,
    .btn-top:focus,
    .btn-top:active,
    .btn-top.active {
        color: #333333;
        background-color: #ebebeb;
        border-color: #adadad;
    }
    .img-rounded {
        border-radius: 6px;
        margin-bottom: 4vh;
    }
    .logo{
        width: 30vw;
        margin: 0 auto;
    }
    hr{
        border-color:#f1f1f1;
    }
    .map-item {
        margin-bottom: 15px;
        background:#333333;
        padding:10px;
        border:1px solid #D1D1D1 !important;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#fff2f2f2', GradientType=0);
        *zoom: 1;
        -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
        -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
    }

</style>
