<!--https://www.storyblok.com/tp/how-to-auth0-vuejs-authentication-->
<!--https://dev.to/patrickodacre/learn-vue-router-navigation-guards-vuejs-24hk-->
<template>
    <div id="error">
        <aa-nav-bar></aa-nav-bar>
        <div id="page-content">
            <div class="container">
                <div class="card card-container">
                    <img id="profile-img" class="profile-img-card" src="../../assets/logo.jpg" />
                    <p id="profile-name" class="profile-name-card">You are not able to see this page. You do not have permissions for it.
                    </p>
                </div><!-- /card-container -->
            </div><!-- /container -->
        </div>
    </div>


</template>

<script>

</script>

<style scoped>
    #error {
        position: fixed;
        height: 100vh;
        width: 100vw;
        background-repeat: no-repeat;
        background-image: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));
    }

    .card-container.card {
        max-width: 350px;
        padding: 40px 40px;
        color: black;
    }

    /*
     * Card component
     */
    .card {
        background-color: #F7F7F7;
        /* just in case there no content*/
        padding: 20px 25px 30px;
        margin: 20vh auto;
        /* shadows and rounded borders */
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    }

    .profile-img-card {
        width: 130px;
        margin: 0 auto 10px;
        display: block;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 5%;
    }

    /*
     * Form styles
     */
    .profile-name-card {
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        margin: 10px 0 0;
        min-height: 1em;
    }
</style>