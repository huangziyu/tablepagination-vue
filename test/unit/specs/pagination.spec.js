import Vue from 'vue'
import pagination from '@/components/pagination'

describe('pagination.vue', () => {
    const defaultPropsData = {
        totalPage: 20,
        currentPage: 5,
        pageSize: 7,
        changeCallback: function(page){
            return page;
        }
    };
    function getRenderedVm (Component,propsData){
        const Ctor = Vue.extend(Component);
        const vm = new Ctor({propsData}).$mount();
        return vm;
    };


    it('初始化了正确的data', () => {
        expect(pagination.data).to.be.a('function');
        const defaultData = pagination.data();
        expect(defaultData.inputPage).to.be.equal('1');
    });

    it('methods.turnToPage正确的处理了异常输入',() =>{
        expect(pagination.methods.turnToPage(-1)).to.not.be.ok;
        expect(pagination.methods.turnToPage('a')).to.not.be.ok;
    })
    it('输入框只能输入小于等于总页数的数字,即methods.formatPageNum实现了其功能',() =>{
        expect(pagination.methods.formatPageNum(-1,20)).to.be.equal(20);
        expect(pagination.methods.formatPageNum(30,15)).to.be.equal(15);
    })
    it('点击页码时能够翻页',() =>{
        var pagin = getRenderedVm(pagination,defaultPropsData);
        var btns = pagin.$el.getElementsByClassName('paginBtn');
        btns[0].click();
        // 点击页码5时翻页到5；
        expect(pagin.$props.currentPage).to.be.equal(5);
    })
    it('输入框能够翻页',() =>{
        var pagin = getRenderedVm(pagination,defaultPropsData);
        expect(pagin.inputPage).to.be.equal('1');
        pagin.inputPage='5';
        var btns = pagin.$el.getElementsByClassName('input-group-addon');
        btns[0].click();
        expect(pagin.$props.currentPage).to.be.equal(5);
    })
    it('页码过多时省略,即设置pageSize能够正确的渲染',() =>{
        var pagin = getRenderedVm(pagination,defaultPropsData);
        var paginBtns = pagin.$el.getElementsByClassName('paginBtn');
        expect(paginBtns.length).to.be.equal(7);
        expect(paginBtns[0].innerText).to.be.equal('2');
    })
})
