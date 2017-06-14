<template>
    <div class = 'itable'>
     	<table cellspacing="0" cellpadding="0">
     		<thead>
     			<tr><td v-for="head in t_head">{{head}}</td></tr>
     		</thead>
     		<tbody>
     			<tr v-for="(item,index) in test_data">
     				<td v-for="data in item">{{data}}</td>
    			</tr>
     		</tbody>
     	</table>
    </div>
</template>

<script type="text/javascript">
	export default{
		props:{
            data:{
                //传入用于渲染的表格数据，默认为空
                type: Object,
                default: {}
            },
            size:{
                //传入用于渲染的表格大小，默认10
                type: Number,
                default: 10
            }
        },
		computed:{
			test_data:function(){
				return this.data ? this.data.test_data :[];
			},
			t_head:function(){
				return this.data ? this.data.t_head: [];
			}
		}
	}
</script>

<style type="text/css">
	table{
		height:80%;
		border-top:1px solid #ccc;
		border-left:1px solid #ccc;
		width: 100%;
		border-collapse: separate;
		background-color:#fff;
		margin-bottom: 10px;
	}
	td{
		border-right:1px solid #ccc;
		border-bottom:1px solid #ccc;
		vertical-align: middle;
	}
</style>
