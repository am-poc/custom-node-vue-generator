<!--https://www.storyblok.com/tp/how-to-auth0-vuejs-authentication-->
<!--https://dev.to/patrickodacre/learn-vue-router-navigation-guards-vuejs-24hk-->
<!--https://medium.com/@manojkumar_88220/role-based-authentication-using-vue-js-2-f54e18498019-->
<template>

    <!--TODO: update the sql for insert user, password should be secret-->
    <div id="login">
        <div class="container">
            <div class="card outer-card">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card card-container img-background">
                            <img id="profile-img" class="profile-img-card" src="../../assets/logo.jpg" />
                            <h5 class="msg-color">Welcome to CTED App</h5>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div id="login-user" class="card card-container">
                            <p id="profile-name" class="profile-name-card">Login Existing User</p>
                            <form class="form-sign-in">
                                <input type="text" id="username" class="form-control" placeholder="(username)" required autofocus v-model="existingUser.username">
                                <input type="password" id="password" class="form-control" placeholder="(password)" required v-model="existingUser.password">
                                <div id="remember" class="checkbox">
                                    <label><input type="checkbox" value="remember-me"> Remember me</label>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <button class="btn btn-primary btn-sign-in uniform-width" @click.prevent="login"
                                        title="Login using your Username and Password">
                                            Log in
                                        </button>
                                    </div>
                                    <div class="col-md-4">
                                        <button class="btn btn-primary uniform-width" title="Login using Facebook">
                                            <span class="fa fa-facebook"></span>
                                        </button>
                                    </div>
                                    <div class="col-md-4">
                                        <button class="btn btn-warning uniform-width" title="Login using OAuth">
                                            <span class="fa fa-google"></span>
                                        </button>
                                    </div>
                                </div>
                                <a href="#" class="forgot-password">Forgot the password?</a>
                            </form><!-- /form -->
                        </div><!-- /card-container -->
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div id="register-user" class="card card-container">
                            <cted-add-user></cted-add-user>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- /container -->
    </div>
</template>

<script>
	export default {
		data(){
			return{
				existingUser: {
					username: '',
					password: ''
				}
			}
		},
		methods:{
			login: function(){
				//console.log(this.existingUser)
				let uri = this.$hostname + `login`
				this.axios.post(uri, this.existingUser).then((response) =>{
					//console.log(response)
					if (response.data.authenticated && response.data.authenticated == true){
						// global the user access variables globally
						let user = response.data.authenticatedUser
						user.isAuthenticated = response.data.authenticated
						this.$store.commit('setUser', user)
						sessionStorage.setItem('user', JSON.stringify(user))

						// navigate to the home page
						this.$router.push('home')
					}else{
						//console.log("could not log in")
						this.$router.push('login-error')
					}
				})
			}
		}
	}
</script>

<style scoped>
    #login {
        position: fixed;
        height: 100vh;
        width: 100vw;
        background-repeat: no-repeat;
        background-image: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));
    }
    .outer-card{
        margin: 10vh auto;
        max-width: 50vw;
        height: 78vh;
    }
    .img-background{
        background-image: linear-gradient(rgb(104, 145, 162), rgb(120, 97, 33));
    }
    .msg-color{color: white;}
    .btn {
        font-weight: 700;
        height: 36px;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        cursor: default;
    }

    /*
     * Form styles
     */

    #register-user,
    #login-user {
        font-size: small;
    }

    .form-sign-in input[type=email],
    .form-sign-in input[type=password],
    .form-sign-in input[type=text],
    .form-sign-in button {
        width: 100%;
        display: block;
        margin-bottom: 10px;
        position: relative;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .form-sign-in .form-control:focus {
        border-color: rgb(104, 145, 162);
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
    }

    .btn.btn-sign-in {
        padding: 0px;
        font-weight: 700;
        font-size: 14px;
        /*height: 36px;*/
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        border: none;
        -o-transition: all 0.218s;
        -moz-transition: all 0.218s;
        -webkit-transition: all 0.218s;
        transition: all 0.218s;
    }
    .btn.btn-sign-in {background-color: rgb(104, 145, 162);}
    .btn.btn-sign-in:hover,
    .btn.btn-sign-in:active,
    .btn.btn-sign-in:focus {background-color: rgb(12, 97, 33);}

    .forgot-password {color: rgb(104, 145, 162);}
    .forgot-password:hover,
    .forgot-password:active,
    .forgot-password:focus{color: rgb(12, 97, 33);}
</style>
