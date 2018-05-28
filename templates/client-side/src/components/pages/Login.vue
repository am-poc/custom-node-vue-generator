<!--https://www.storyblok.com/tp/how-to-auth0-vuejs-authentication-->
<!--https://dev.to/patrickodacre/learn-vue-router-navigation-guards-vuejs-24hk-->
<!--https://medium.com/@manojkumar_88220/role-based-authentication-using-vue-js-2-f54e18498019-->
<template>
    <div id="login">
        <div class="container">
            <div class="card outer-card">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card card-container img-background">
                            <img id="profile-img" class="profile-img-card" src="../../assets/logo.jpg" />
                            <h5 class="msg-color">Welcome to My Web App</h5>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div id="login-user" class="card card-container">
                            <p id="profile-name" class="profile-name-card">Login Existing User</p>
                            <form class="form-sign-in">
                                <span id="reauth-email" class="reauth-email">whats this?</span>
                                <input type="email" id="username" class="form-control" placeholder="(username)" required autofocus v-model="existingUser.username">
                                <input type="password" id="password" class="form-control" placeholder="(password)" required v-model="existingUser.password">
                                <div id="remember" class="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me"> Remember me
                                    </label>
                                </div>
                                <button class="btn btn-primary btn-sign-in" @click="login">Log in</button>
                            </form><!-- /form -->
                            <a href="#" class="forgot-password">
                                Forgot the password?
                            </a>
                        </div><!-- /card-container -->
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div id="register-user" class="card card-container">
                            <aa-add-user></aa-add-user>
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
				//console.log([this.username, this.password])
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
    .card-container.card {
        padding: 10px 20px;
        min-height: 32vh;
        margin-top: 2vh;
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
    .profile-img-card {
        /*vertical align*/
        /*position: relative;
        top: 50%;
        transform: translateY(-50%);*/
        /*end vertical align*/

        width: 140px;
        margin: 3vh auto;
        display: block;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 5%;
    }

    /*
     * Form styles
     */
    .register-name-card,
    .profile-name-card {
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        margin: 10px 0 10px;
        min-height: 1em;
    }

    .reauth-email {
        display: block;
        color: #404040;
        line-height: 2;
        margin-bottom: 10px;
        /*font-size: 14px;*/
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    #register-user,
    #login-user {
        font-size: small;
    }
    .form-sign-in #username,
    .form-sign-in #password {
        direction: ltr;
        height: 44px;
        font-size: 16px;
    }

    .form-sign-in input[type=email],
    .form-sign-in input[type=password],
    .form-sign-in input[type=text],
    .form-sign-in button {
        width: 100%;
        display: block;
        margin-bottom: 10px;
        z-index: 1;
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
        height: 36px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        border: none;
        -o-transition: all 0.218s;
        -moz-transition: all 0.218s;
        -webkit-transition: all 0.218s;
        transition: all 0.218s;
    }
    .btn.btn-sign-in {
        background-color: rgb(104, 145, 162);
    }
    .btn.btn-sign-in:hover,
    .btn.btn-sign-in:active,
    .btn.btn-sign-in:focus {
        background-color: rgb(12, 97, 33);
    }

    .forgot-password {
        color: rgb(104, 145, 162);
    }

    .forgot-password:hover,
    .forgot-password:active,
    .forgot-password:focus{
        color: rgb(12, 97, 33);
    }
</style>