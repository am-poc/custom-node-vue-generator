<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>

        <footer class="footer is-primary">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">Copyright © 2015 - 2018 CTED, NYU Abu Dhabi, UAE. All rights reserved. </div>
                </div>
                <!--<div class="row">
                    <div class="col-md-12">
                        <a class="icon" href="#"><i class="fa fa-facebook"></i></a>
                        <a class="icon" href="#"><i class="fa fa-twitter"></i></a>
                    </div>
                </div>-->
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
    .no-padding{padding: 0 !important;}

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
        background:rgba(0, 0, 0, 0.5);
        color:#f1f1f1;
    }
    .page-height{min-height: 82.5vh;}
    .border{
        border: 1px solid;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        margin: 0 auto;
    }

    /*
     * Card component
     */
    .card {
        background-color: #F7F7F7;
        /* just in case there no content*/
        padding: 20px 25px 30px;
        /*margin: 20vh auto;*/
        /* shadows and rounded borders */
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    }
    .card-container.card {
        padding: 10px 20px;
        min-height: 29vh;
        margin-top: 2vh;
    }
    .profile-img-card {
        width: 140px;
        margin: 3vh auto;
        display: block;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 5%;
    }
    .register-name-card,
    .profile-name-card {
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        margin: 10px 0 10px;
        min-height: 1em;
    }

    /*Forms*/
    .flash-message {
        margin-bottom: 10px;
    }
    .flash-message,
    .register-form input,
    .register-form select {
        max-height: 3vh;
        padding: 5px;
        font-size: smaller;
        line-height: 1.5; /* If Placeholder of the input is moved up, rem/modify this. */
        border-radius: 3px;

        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .register-form textarea{
        padding: 5px;
        font-size: smaller;
        line-height: 1.5; /* If Placeholder of the input is moved up, rem/modify this. */
        border-radius: 3px;

        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    /*end of Forms*/

    /*Custom scrollbar styling for webkit browsers (Chrome, Opera)*/
    ::-webkit-scrollbar {
        width: 3px;
        height: 3px;
        background-color: #F5F5F5;
    }

    ::-webkit-scrollbar-track {background-color: #F5F5F5;}
    ::-webkit-scrollbar-thumb {background-color: rgba(191,191,191,1);}
    ::-webkit-scrollbar-thumb:hover {background-color: rgba(191,191,191,1);}


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
