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
                <!--dynamic and collapsible menu items-->
                <li v-for="(x, itemIndex) in sideBar" :key="itemIndex">
                    <a @click="setActiveItemId(itemIndex)" :href="x.url">{{x.name}}</a>
                    <ul :id="x.id" class="collapse list-unstyled show">
                        <transition-group name="list">
                            <li v-for="y in (activeItemId === itemIndex  && isActive ? x.children : [])" :key="y.name">
                                <a :href="y.url" @click="setActiveChild(y.name)">
                                    <i class="fa fa-angle-right"></i>{{y.name}}</a>
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
                    	name: 'Add New Data',
                        url: '#',
                        children:[
                            {
                            	name: 'Upload GeoJSON',
                                url: '#'
                            },
                            {
                            	name: 'Add Feature Manually',
                                url: '#'
                            }
                        ]
                    },
					{
						name: 'Create Map from Scratch',
						url: '#',
						children:[
							{
								name: 'New Map',
								url: '#'
							},
							{
								name: 'New Layer',
								url: '#'
							},
							{
								name: 'Add Feature to Map/Layer',
								url: '#',
								children:[
									{
										name: 'Add Features from GeoJSON File',
										url: '#'
									},
									{
										name: 'Add Feature from DB',
										url: '#'
									}
								]
							}
						]
					},
					{
						name: 'View/Edit Existing Data',
						url: '#',
						children:[
							{
								name: 'All Maps',
								url: '#'
							},
							{
								name: 'All Features',
								url: '#'
							},
							{
								name: 'All GeoJSON Files',
								url: '#'
							}
						]
					},
					/*{
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
					},*/
					{
						name: 'Manage Users',
						url: '#',
						children: [
							{
								name: 'All Users',
								url: '#',
							},
                            {
								name: 'Add New',
								url: '#',
							}
						]
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
    .components li{margin: 1vh 0;}
    .collapse li{padding-left: 1.5vw;}
    .collapse.show {display: block;}
    .collapse {display: none;}
    i{
        margin-right: 1vw;
    }
</style>
