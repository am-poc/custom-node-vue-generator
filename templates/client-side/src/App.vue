<template>
    <div id="app">
        <router-view></router-view>

        <footer class="footer is-primary">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <p>Copyright © 2015 - 2018 CTED, NYU Abu Dhabi, UAE. All rights reserved. </p>
                    </div>
                    <div class="column has-text-right">
                        <a class="icon" href="#"><i class="fa fa-facebook"></i></a>
                        <a class="icon" href="#"><i class="fa fa-twitter"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
	export default {
		name: 'AppName',
        data(){
			return{

            }
        }
	}
</script>

<style>
    #app {
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: lighter;
        text-align: center;
        color: #2c3e50;
        width: 100vw;
        left: 0;
    }

    h1,h2,h3,h4,h5 {letter-spacing: 0.2em;}
    h1,h2 {
        margin-bottom: 20px;
        font-size: larger;
    }
    h3,h4,h5{font-size: small;}
    .uniform-width{ width: 10vw; }

    /*agile slideshow
    (doesnt make sense to me for it to be here. it should be in the home.vue but then it doesnt work!)*/
    .slide {
        top: 0;
        position: fixed;
        height: 100vh;
    }

    .page-background{
        position: fixed;
        width: 100vw;
        left: 0;
        top: 0;
        height: 100vh;
        background: darkgrey;
    }

    /*for the page-content on all pages*/
    #page-content{
        position: fixed;
        width: 100vw;
        top: 5vh;
        height: 90vh;
        padding: 3vh 0;

        /*border: 1px solid red;*/
        background:rgba(0, 0, 0, 0.5);
        color:#f1f1f1;
    }
    .page-height{min-height: 80vh;}
    .border{
        border: 1px solid;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        margin: 0 auto;
    }
    /*footer*/
    .footer{
        position: fixed;
        top: 95vh;
        width: 100vw;

        color: white;
        padding-top: 10px;
        /*background: blue;
        border: 1px solid;*/
    }

</style>
