<template>
    <div id="style">
        <table class="table table-bordered text-sm-left">
            <tr>
                <td>
                    <label for="fillColor">Fill Color:</label>
                    <input class="pull-right field-width" type="color"  id="fillColor"
                           v-model="style.fillColor">
                </td>

                <td>
                    <label for="lineColor">Border Color:</label>
                    <input class="pull-right field-width" type="color"  id="lineColor"
                           v-model="style.lineColor">
                </td>
            </tr>

            <tr>
                <td>
                    <label for="fillOpacity">Fill Opacity:</label>
                    <input class="pull-right field-width" type="number" id="fillOpacity"
                           v-model="style.fillOpacity" step="0.1" min="0" max="1">
                </td>

                <td>
                    <label for="lineOpacity">Border Opacity:</label>
                    <input class="pull-right field-width" type="number" id="lineOpacity"
                           v-model="style.opacity" step="0.1" min="0" max="1" >
                </td>
            </tr>

            <tr>
                <td>
                    <label for="pointRadius">Point Radius:</label>
                    <input class="pull-right field-width" type="number" id="pointRadius"
                           v-model="style.radius" step="1" min="0" max="20">
                </td>

                <td>
                    <label for="lineThickness">Border Thickness:</label>
                    <input class="pull-right field-width" type="number" id="lineThickness"
                           v-model="style.lineThickness" step="1" min="0" max="5">
                </td>
            </tr>

        </table>
    </div>
</template>

<script>
	export default {
		name: 'add-user',
		data(){
			return{

				style: {
					fillColor: '#777abc',
					lineColor: '#abc777',
					lineThickness: 2,
					fillOpacity: 0.5,
					opacity: 0.5,
					radius: 2
				}
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
    .table{border-collapse: collapse;}
    .table td{padding: 5px;}
    .field-width{
        width: 4vw;
        height: 2.5vh;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
    }

</style>
