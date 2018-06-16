<template>
    <!--https://www.raymondcamden.com/2018/02/08/building-table-sorting-and-pagination-in-vuejs/-->
    <div id="show-data" class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="style" v-bind:class="{floating: isMinimized == false, minimized: isMinimized, closed: isHidden}">
                    <div v-if="isMinimized" id="contents-minimized">
                        <div class="row text-center" title="Show Results" v-on:click="maximizeDialog" >
                            <div class="col-md-6">Maximize </div>
                            <div class="col-md-6 float-right"><span class="fa fa-expand"></span></div>
                        </div>
                    </div>
                    <div v-else id="contents-floating">
                        <div id="dialog-buttons" class="float-right btn-actions">
                            <span class="fa fa-minus" title="Minimize Results" v-on:click="minimizeDialog"></span>
                            <span class="fa fa-close" title="Close Results" v-on:click="closeDialog" ></span>
                        </div>
                        <br>
                        <h2>{{dataset}}</h2>
                        <h5><span id="queryStatus"></span></h5>
                        <br>
                        <div id="table">
                            <table class="table table-striped">
                                <thead>
                                <tr><th v-for="(value, key) in data[0]"
                                        @click="sort(key)"
                                        scope="col" class="text-capitalize">
                                    <a href="#">{{ key}} <span class="fa fa-sort"></span></a></th></tr>
                                </thead>
                                <tbody>
                                <tr v-for="row in sortedData">
                                    <td v-for="value in row">{{ value }}</td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                        <div id="footer">
                            <p class="small">Fetching data from endpoint '{{ endpoint }}'</p>
                            <div id="pagination">
                                <span @click="prevPage" class="fa fa-angle-double-left" title="previous page"></span>
                                <span @click="nextPage" class="fa fa-angle-double-right" title="next page"></span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import {EventBus} from '../../global/event-bus'

	export default {
		data(){
			return {
				dataset: 'Search Results',
				endpoint: 'admin/search',
				pageSize:3,
				currentSort:'name',
				currentSortDir:'asc',
				currentPage:1,
				data:[],
				isMinimized: false,
                isHidden: false
			}
		},
		methods:{
			minimizeDialog: function(){
				console.log('minimizing the dialog')
				this.isMinimized = true
			},
			maximizeDialog: function(){
				console.log('maximizing the dialog')
				this.isMinimized = false
			},
            closeDialog: function(){
	            console.log('closing the dialog')
				this.isHidden = true
            },
			sort:function(s) {
				//if s == current sort, reverse
				if(s === this.currentSort) {
					this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
				}
				this.currentSort = s
			},
			nextPage:function() {
				if((this.currentPage*this.pageSize) < this.data.length) this.currentPage++;
			},
			prevPage:function() {
				if(this.currentPage > 1) this.currentPage--;
			}
		},
        mounted(){
	        EventBus.$on('searchResults', (dataToDisplay) => {
		        this.data = dataToDisplay
                this.isHidden = false
	        })
        },
		computed:{
			sortedData: function(){
				let self = this
				let modifier = 1
				return this.data.sort(function(a, b) {
					if(self.currentSortDir === 'desc') modifier = -1
					if(a[self.currentSort] < b[self.currentSort]) return -1 * modifier
					if(a[self.currentSort] > b[self.currentSort]) return  1 * modifier
					return 0
				}).filter((row, index) => {
					let start = (self.currentPage-1)*self.pageSize;
					let end = self.currentPage*self.pageSize;
					if(index >= start && index < end) return true;
				})
			}
		}
	}
</script>

<style scoped>
    #pagination{
        text-align: right;
        border: 1px dotted;
    }
    #pagination span{
        margin-right: 2vw;
    }
    #queryStatus{
        float: left;
        text-align: left;
    }
    .float-right{
        float: right;
        text-align: right;
    }
    .btn-actions{font-size: 16px;}
    #dialog-buttons span{
        margin-left: 1.5vw;
    }
    .style{
        position: relative;
        display: block;
        border: 1px solid;
        margin: 0 auto;
        padding: 1vh 2vw;
        color: red;
        background: whitesmoke;
        font-size: smaller;
    }
    .floating{
        top: 20vh;
        height: auto;
        width: 60vw;
        min-width: 30vw;
        min-height: 40vh;
    }
    .minimized {
        top: 90vh;
        height: 40px;
        width: 13vw;
        opacity: .5;
        border-radius: 5px;
        cursor: pointer;
        /*transition: top 0.5s 0s cubic-bezier(0.1, 1.2, 0.3, 1),
                    width 0.5s 0.5s cubic-bezier(0.1, 1.2, 0.3, 1),
                    opacity 0.3s,
                    -webkit-transform 0.5s 0s cubic-bezier(0.1, 1.2, 0.3, 1);*/

        transition: top 0.5s 0s cubic-bezier(0.1, 1.2, 0.3, 1),
                    transform 0.5s 0s cubic-bezier(0.1, 1.2, 0.3, 1),
                    width 0.5s 0.5s cubic-bezier(0.1, 1.2, 0.3, 1),
                    opacity 0.3s,
                    -webkit-transform 0.5s 0s cubic-bezier(0.1, 1.2, 0.3, 1);

    }
    .closed{
        display: none !important;
    }

</style>