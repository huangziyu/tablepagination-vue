
<template>
  <div class="pagination-wrap" v-cloak v-if="totalPage!=0">
      <ul class="pagination">
        <li :class="currentPage==1?'disabled':''"><a @click="turnToPage(currentPage-1)">上一页</a></li>
        <li v-for="page in pageSize"  class="paginBtn" :class="{active:page==Math.ceil(pageSize/2)}"><a @click="turnToPage(currentPage+(page-Math.ceil(pageSize/2)))" v-text="currentPage+(page-Math.ceil(pageSize/2))" v-if="currentPage+(page-Math.ceil(pageSize/2))>0&&currentPage+(page-Math.ceil(pageSize/2))<totalPage"></a></li>
        <li :class="currentPage==totalPage?'disabled':''"><a href="javascript:;" @click="turnToPage(currentPage+1)" >下一页</a></li>
       </ul>
    <small class="small nowrap"> 当前第 <span class="text-primary" v-text="currentPage"></span> 页，共有 <span class="text-primary" v-text="totalPage"></span> 页</small>
    <div class="go">
      <div class="input-group">
        <input class="form-control" type="number" v-model="inputPage" @input="formatPageNum(inputPage,totalPage)"><a class="input-group-addon" @click="turnToPage(inputPage)">Go</a>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
	props: {
		totalPage: {
            //传入总页数，默认17
			type: Number,
      		default: 17,
      		required: true,
		    validator(value) {
		        return value >= 0
		    }
		},
		currentPage: {
            //传入当前页，默认1
			type: Number,
      		default: 1,
		    validator(value) {
		        return value >= 0
		    }
		},
        pageSize: {
            //传入一次要显示的页码数目，默认为5
            type: Number,
            default: 5,
            validator(value){
                return value >= 0
            }
        },
		changeCallback: {
            //传入页面改变时的回调函数，用于更新数据
	    	type: Function,
	    	default(cPage) {
				console.log("默认回调，显示页码：" + cPage);
	        }
	     }
	},
	data(){
		return {
            //在输入框中输入的页码数
            inputPage : '1',
		}
	},
	methods:{
		//turnToPage为跳转到某页
		//传入参数pageNum为要跳转的页数
		turnToPage( pageNum ){
			var ts = this;
			var pageNum = parseInt(pageNum);
			//页数不合法则退出
			if (!pageNum || pageNum > ts.totalPage || pageNum < 1) {
				console.log('页码输入有误！');
				return false;
			}
			//页数变化时的回调
			ts.changeCallback(pageNum);
            return true;
		},
        //格式化输入的数据，使其小于总页数并且大于零
        formatPageNum(pagenum,totalPage){
            var formatPagenum = pagenum;
            formatPagenum = ( Number(pagenum ) < totalPage && Number(pagenum ) > 0) ? Number(pagenum ) : totalPage;
            this.inputPage = formatPagenum;
            return formatPagenum;
        }
	}

}
</script>

<style type="text/css">
.pagination-wrap{
	margin: 0 auto;
	text-align: center;
}
.pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
}
.pagination-inline {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
}
.small {
    margin: 0 10px;
    position: relative;
    top: -32px;
}
.nowrap {
    white-space: nowrap;
}
.input-group {
    position: relative;
    display: table;
    border-collapse: separate;
}
.input-group-addon {
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 0 4px 4px 0;
}

.input-group-addon, .input-group-btn {
    width: 1%;
    white-space: nowrap;
    vertical-align: middle;
}
.input-group-addon, .input-group-btn, .input-group .form-control {
	box-sizing: border-box;
    display: table-cell;
}
.input-group .form-control:first-child, .input-group-addon:first-child, .input-group-btn:first-child>.btn, .input-group-btn:first-child>.btn-group>.btn, .input-group-btn:first-child>.dropdown-toggle, .input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle), .input-group-btn:last-child>.btn-group:not(:last-child)>.btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.input-group-addon, .input-group-btn, .input-group .form-control {
    display: table-cell;
}
.input-group .form-control {
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
    margin-bottom: 0;
}
.go .error .form-control{
    border: 1px solid #d95656;
}
.form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.text-primary {
    color: #428bca;
}
.pagination>li:first-child>a, .pagination>li:first-child>span {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
.go {
    display: inline-block;
    max-width: 140px;
    top: -21px;
    position: relative;
}
.input-group-addon:last-child {
	display: table-cell;
	text-decoration: none;
    border-left: 0;
}
.pagination>.disabled>span, .pagination>.disabled>span:hover, .pagination>.disabled>span:focus, .pagination>.disabled>a, .pagination>.disabled>a:hover, .pagination>.disabled>a:focus {
    color: #777;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
}
.pagination>li:last-child>a, .pagination>li:last-child>span {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
.pagination>.active>a, .pagination>.active>span, .pagination>.active>a:hover, .pagination>.active>span:hover, .pagination>.active>a:focus, .pagination>.active>span:focus {
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: #428bca;
    border-color: #428bca;
}
.pagination>li>a, .pagination>li>span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #428bca;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
}
.pagination>li {
    display: inline;
}
</style>
