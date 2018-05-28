<template>
    <div id="left-menu" class="page-height">
        <!--https://bootstrapious.com/p/bootstrap-sidebar-->
        <nav id="sidebar">
            <!-- Sidebar Header -->
            <div class="sidebar-header">
                <h2>Admin Menu</h2>
            </div>

            <!-- Sidebar Links -->
            <ul class="list-unstyled components">
                <!--example of static menu item-->
                <li><a href="#/home"><i class="ti-home"></i>Home</a></li>

                <!--example of dynamic and collapsible menu items-->
                <li v-for="(x, itemIndex) in sideBar" :key="itemIndex">
                    <a @click="setActiveItemId(itemIndex)" :href="x.url">
                        <i class="fa" :class="x.icon"></i>{{x.name}}
                    </a>
                    <ul :id="x.id" class="collapse list-unstyled show">
                        <transition-group name="list">
                            <li v-for="y in (activeItemId === itemIndex  && isActive ? x.children : [])" :key="y.name">
                                <a :href="y.url" @click="setActiveChild(y.name)">{{y.name}}</a>
                            </li>
                        </transition-group>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
	export default {
		data () {
			return {
				msg: 'Welcome to the Admin Console',
				activeItemId: '',
				child: '',
				sideBar:[
					{
						name: 'View Existing',
						url: '#',
						children:[
							{
								name: 'Users',
								url: '#'
							},
							{
								name: 'Sessions',
								url: '#'
							}
						]
					},
					{
						name: 'Add New',
						url: '#',
						children: [
							{
								name: 'User',
								url: '#',
							},
							{
								name: 'Session',
								url: '#'
							}
						]
					},
					{
						name: 'Other Actions',
						url: '#/other'
					}
				]
			}
		},
		methods: {
			setActiveItemId: function(itemIndex){
				if (itemIndex === this.activeItemId){
					this.activeItemId = ''
					return
				}
				this.activeItemId = itemIndex
			},
			setActiveChild: function(itemName){
				this.child = itemName
                // fires an event 'change' on the component in parent
				this.$emit('change', [this.activeItemId, this.child])
			}
		},
		computed: {
			isActive: function() {
				return this.activeItemId !== ''
			}
		}
	}
</script>

<style scoped>
    #left-menu{
        text-align: left;
        padding-left: 2vw;
    }
    nav#sidebar ul a:hover {
        background: orange;
        width: 100%;
        color: #fff !important;
    }
    .collapse li{padding-left: 1.5vw;}
    .collapse.show {display: block;}
    .collapse {display: none;}
</style>