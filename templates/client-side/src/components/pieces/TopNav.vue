<template>


   <!-- <div id="navigation">
        <nav class="navbar navbar-expand-lg navbar-light bg-light nav has-shadow">
            <div class="navbar-brand nav-left">
                <span class="nav-item"><h1>CTED Webmaps App</h1></span>
            </div>

            <div id="toggle-button">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

            <div id="navbarNavDropdown" class="navbar-collapse collapse">
                <ul class="navbar-nav nav-right">
                    <li><router-link to="/home" class="nav-item r-item">
                        <span class="fa fa-home"></span> Home</router-link>
                    </li>
                    <li><router-link to="/admin" class="nav-item r-item">
                        <span class="fa fa-user-circle"></span> Admin</router-link>
                    </li>
                    <li><router-link to="/map-view" class="nav-item r-item">
                        <span class="fa fa-eye"></span> Map View</router-link>
                    </li>
                    <li>
                        <router-link to="#" class="nav-item r-item dropdown-toggle" data-toggle="dropdown">
                            <span class="fa fa-cog"></span> Settings
                        </router-link>

                        <ul class="dropdown-menu">
                            <li><a class="nav-link" href="#" onclick="fetchAllData()"><i class="service-icon fa fa-download"></i> Download All Data As CSV</a>
                            </li>
                            <li>
                                <a id="light" class="nav-link" onclick="switch_style('light')" href='#'>
                                    <i class="service-icon fa fa-sun-o"></i> Light Theme
                                </a>
                            </li>
                            <li>
                                <a id="dark"  class="nav-link" onclick="switch_style('dark')" href='#'>
                                    <i class="service-icon fa fa-moon-o"></i> Dark Theme
                                </a>
                            </li>
                            <li @click="logout"><a class="nav-link" href="#"><i class="service-icon fa fa-sign-out"></i> Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </div>-->
    <div class="nav has-shadow">
        <div class="container">
            <div class="nav-left">
                <span class="nav-item"><h1>CTED Webmaps App</h1></span>
            </div>

            <span class="nav-toggle" v-on:click="toggleNav" v-bind:class="{ 'is-active': isActive }">
                <span></span>
                <span></span>
                <span></span>
            </span>

            <div class="nav-right nav-menu" v-bind:class="{ 'is-active': isActive }">
                <ul class="nav">
                    <li><router-link to="/home" class="nav-item r-item">
                        <span class="fa fa-home"></span> Home</router-link>
                    </li>
                    <li><router-link to="/admin" class="nav-item r-item">
                        <span class="fa fa-user-circle"></span> Admin</router-link>
                    </li>
                    <li><router-link to="/map-view" class="nav-item r-item">
                        <span class="fa fa-eye"></span> Map View</router-link>
                    </li>
                    <li>
                        <router-link to="#" class="nav-item r-item dropdown-toggle" data-toggle="dropdown">
                            <span class="fa fa-cog"></span> Settings
                        </router-link>

                        <ul class="dropdown-menu">
                            <li><a class="nav-link" href="#" onclick="fetchAllData()"><i class="service-icon fa fa-download"></i> Download All Data As CSV</a>
                            </li>
                            <li>
                                <a id="light" class="nav-link" onclick="switch_style('light')" href='#'>
                                    <i class="service-icon fa fa-sun-o"></i> Light Theme
                                </a>
                            </li>
                            <li>
                                <a id="dark"  class="nav-link" onclick="switch_style('dark')" href='#'>
                                    <i class="service-icon fa fa-moon-o"></i> Dark Theme
                                </a>
                            </li>
                            <li @click="logout"><a class="nav-link" href="#"><i class="service-icon fa fa-sign-out"></i> Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		data: function(){
			return{
				isActive: false
			}
		},
		methods: {
			toggleNav: function(){
				this.isActive = !this.isActive
			},
			logout: function() {
				console.log('logout')
				// todo: do i need to remove from store too?
				sessionStorage.removeItem('user')
				this.$router.push({
					name: 'Login'
				})
			}
		}
	}
</script>

<style scoped>
    .nav{
        position: fixed;
        top: 0;
        padding-top: 1vh;
        width: 100vw;
        height: 5vh;
        z-index: 1000;
        /*border: 1px solid;*/
    }
    .nav a:hover{
        color:grey;
    }
    .nav-left span{
        color: purple;
        font-weight: bold;
        font-size: 25px;
        float: left;
        left: 1vw;
        position: fixed;
    }
    /*.nav-left{
        font-weight: bold;
        font-size: 25px;
        padding-top: 20px !important;
        color: purple;

    }*/
    .nav-right{
        position: fixed;
        float: right;
        left: 70vw;
        /*border: 1px solid;*/
    }
    .nav-right .r-item{
        /*float: right; // changes the order of the items */
        padding-left: 3vw;
    }
    .dropdown-menu{
        font-size: smaller;
    }

    @media only screen and (max-width: 740px) {

    }
    /*Device = Tablets, Ipads (portrait)*/
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
        .nav{
            padding-top: 1.5vh;
        }
        .nav-right{
            left: 52vw;
            font-size: smaller;
        }
    }

    /*Device = Tablets, Ipads (landscape)*/
    @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
        .nav-right{
            left: 61vw;
        }
    }
    /*Device = iPad Pro/laptop (1024 x 1366) (portrait) */
    @media only screen and (min-width: 1024px) and (max-width: 1400px) {
        .nav-right{
            left: 61vw;
            font-size: smaller;
        }
    }

    /*Device = iPad Pro/laptop (1024 x 1366) (landscape) */
    @media only screen and (min-width: 1025px)  and (max-width: 1400px) and (orientation: landscape){
        .nav-right{
            left: 68vw;
        }
    }
</style>