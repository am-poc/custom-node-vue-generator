<template>
<!--    <div class="container">
        <div class="large-12 medium-12 small-12 cell">
            <label>File
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </label>
            <button v-on:click="submitFile()">Submit</button>
        </div>
    </div>-->
    <div id="upload-file" class="container">
        <div class="row">
            <div class="col-md-10 offset-1 text-center">
                <h2>Upload GeoJson</h2>
                <p>The file will be automatically uploaded after being selected. Size limit 10mb.</p>
            </div>

            <div class="col-md-10 offset-1 form-group">
                <div class="progress">
                    <div id="progress-bar" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0"
                         aria-valuemin="0" aria-valuemax="100" style="width:0%">
                        <span class="sr-only">0% Complete</span>
                    </div>
                </div>
            </div>
            <div class="col-md-10 offset-1 form-group">
                <div class="row">
                    <div class="col-md-6 text-sm-left">
                        <label class="file-select">
                            <!-- We can't use a normal button element here, as it would become the target of the label.-->
                            <div class="select-button">
                                <!--Display the filename if a file has been selected.-->
                                <span id="upload-btn" class="btn btn-primary uniform-width">Select File</span><br>
                                <span v-if="file">Selected File: {{file.name}}</span>
                            </div>
                            <!--Now, the file input that we hide. -->
                            <input id="input-file" type="file" hidden accept=".geojson,.json" @change="selectFile"/>
                        </label>
                    </div>
                    <div class="col-md-6">
                        <button id="preview-btn" class="btn btn-success pull-right uniform-width" v-if="file">Preview File</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
    	data(){
    		return {
    			file: '',
                endpoint: '',
			    progressBar: null,
			    previewBtn:  null
            }
        },
        created(){
	        this.progressBar = $("#progress-bar")
            this.previewBtn =  $("#preview-btn")
        },
        methods:{
	        handleFileUpload(){
		        this.file = this.$refs.file.files[0];
	        },
	        submitFile(){
		        const uri  = this.$hostname + 'admin/upload'
                const self = this
		        let formData = new FormData()
		        formData.append('file', this.file, this.file.name)
		        $.ajax({
			        url: uri,
			        method: "POST",
			        data: formData,
			        processData: false,
			        contentType: false,
			        success: function(data) {
				        console.log(data)

				        const url = "/admin/uploads/preview/"
				        self.previewBtn.attr("href", url)
				        self.previewBtn.removeClass("hidden")
				        self.progressBar.text("Success!")
				        self.progressBar.removeClass("progress-bar-danger")
				        self.progressBar.addClass("progress-bar-success")
			        },
			        error: function(xhr, ajaxOptions, err) {
				        self.progressBar.text("Error: " + JSON.parse(xhr.responseText).message)
				        self.progressBar.removeClass("progress-bar-success")
				        self.progressBar.addClass("progress-bar-danger")
			        },
			        /*xhr: function() {
                        // create an XMLHttpRequest
                        const xhr = new XMLHttpRequest()

                        // listen to the 'progress' event
                        xhr.upload.addEventListener("progress", function(evt) {
                                if (evt.lengthComputable) {
                                    // calculate the percentage of upload completed
                                    var percentComplete = evt.loaded / evt.total
                                    percentComplete = parseInt(percentComplete * 100)

                                    // update the Bootstrap progress bar with the new percentage
                                    $progressBar.text(percentComplete + "%")
                                    $progressBar.width(percentComplete + "%")

                                    // once the upload reaches 100%, set the progress bar text to done
                                    if (percentComplete === 100) {
                                        toastr.success("GeoJson File Uploaded Successfully")
                                    }
                                }
                            },
                            false
                        )
                        return xhr
                    }*/
		        })
		        /*this.axios.post( uri, formData).then(function(){
			        console.log('SUCCESS!!')
		        })
		        .catch(function(){
			        console.log('FAILURE!!')
		        })*/
	        },
    		selectFile: function(e){
                this.file = e.target.files[0]
			    this.progressBar.text("0%")
			    this.progressBar.width("0%")

			    if (!this.file) return
                this.upload(this.file)
            },
            upload: function(file){
	            const self = this
	            const uri  = this.$hostname + 'admin/upload'
	            let formData = new FormData()
                console.log(file)

	            formData.append('file', file, file.name)
	            /*this.axios.defaults.headers.common['Authorization'] = this.$store.state.token
	            this.axios.post(uri, formData,
		            {
		            	headers: {'Content-Type': 'multipart/form-data'}
		            })
                .then( (response) => {
		            console.log(response)

                    const url = "/admin/uploads/preview/"
                    self.previewBtn.attr("href", url)
                    self.previewBtn.removeClass("hidden")
                    self.progressBar.text("Success!")
                    self.progressBar.removeClass("progress-bar-danger")
                    self.progressBar.addClass("progress-bar-success")

	            }).catch( function(xhr, ajaxOptions, err) {
		            self.progressBar.text("Error: " + JSON.parse(xhr.responseText).message)
		            self.progressBar.removeClass("progress-bar-success")
		            self.progressBar.addClass("progress-bar-danger")
	            })*/
            }
        }
    }
</script>

<style scoped>
    .hidden {display: none;}

</style>
