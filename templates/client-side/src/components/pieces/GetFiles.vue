<template>
    <!--https://www.raymondcamden.com/2018/02/08/building-table-sorting-and-pagination-in-vuejs/-->
    <div id="view-data" class="container">
        <div class="row">
            <div class="col-md-10 offset-1">
                <br>
                <h2>{{dataset}}</h2>
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
        </div>

        <div class="row">
            <div class="col-md-10 offset-1">
                <p class="small">Fetching data from endpoint '{{ endpoint }}'</p>
                <div id="pagination">
                    <span @click="prevPage" class="fa fa-angle-double-left" title="previous page"></span>
                    <span @click="nextPage" class="fa fa-angle-double-right" title="next page"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import slugify from 'slugify'
    import moments from 'moment'

    export default {
        props:['src', 'url'],
        data(){
    		return {
    			dataset: this.src,          //this is set by the parent
			    endpoint: '',               //this is set by the parent
                pageSize:3,                 //only this needs to be edited
			    currentSort:'name',
			    currentSortDir:'asc',
			    currentPage:1,
    			data:[]
            }
        },
        created() {
    		this.getData()

        },
        methods:{
    		getData: function(){
			    this.endpoint = this.url + slugify(this.src.toLowerCase())
                let uri = this.$hostname + this.endpoint
			    this.axios.defaults.headers.common['Authorization'] = this.$store.state.token
                this.axios.get(uri).then((response) => {
                    //console.log(response)
                	if(response.data.length > 0){
                        this.data = this.postProcessData(response.data)
                    } else
                    	console.log(`No Data Received`)
			    })
            },
            postProcessData: function(data){
    		    data.forEach(function(row){
    		    	//console.log(row)
    		    	row.features = row.features.length
                    row.uploadDate = moments(row.uploadDate).format('MMM Do YYYY, h:mm:ss a')

                })
                return data
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
	    watch: {
    		// function name matches the 'props' name
		    src: function(newVal, oldVal) { // watch it
			    //console.log(`Prop 'src' was changed: is ${newVal} was: ${oldVal}`)
                this.dataset  = newVal
                this.endpoint = this.url + this.dataset.toLowerCase()
                this.getData()
		    }
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
</style>
