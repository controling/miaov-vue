// 存取localStorage数据

var store = {
    save(key, value){
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    fetch(key){
        return JSON.parse(window.localStorage.getItem(key)) || []
    }
}

var list = store.fetch('todoList')

/* var list = [
    {
        'title': '标题1',
        isChecked: false // 为true时, 任务完成
    },
    {
        'title': '标题2',
        isChecked: true
    }
] */

// 筛选数据有三种情况all, finished, unfinished
var filter = {
    all: function(list){
        return list
    },
    finished: function(list){
        return list.filter(function(item){
            return item.isChecked
        })
    },
    unfinished: function(list){
        return list.filter(function(item){
            return !item.isChecked
        })
    }
}

 var vm = new Vue({
    el: '.main',
    data: {
        list: list,
        todo: '',
        editFlag: '', // 记录当前正在编辑的todo
        beforeTitle: '', // 记录当前正在编辑的title
        visibility: 'all' // 通过这个属性值的变化对数据进行筛选
    },
    watch: {
        // 监控list属性, 当list属性对应的值发生变化是就会执行函数
        /* list(){
            store.save('todoList', this.list)
        } */

        // 深度监控
        list: {
            handler(){
                store.save('todoList', this.list)                
            },
            deep: true
        }
    },
    computed:{
        noCheckedLen(){
            return this.list.filter(item => {
                return !item.isChecked
            }).length
        },
        filteredList: function(){
            return filter[this.visibility] ? filter[this.visibility](list) : list
        }
    },
    methods: {
        addTodo(ev){
            // 添加任务
            // 向list中添加任务项
            /* {
                title: input的内容
            } */
            
            // 事件处理函数中的this指向的是, 当前根实例
            this.list.push({
                title: this.todo,
                isChecked: false
            })
            this.todo = ''
        },
        deleteTodo(todo){
            // 删除任务
            var index = this.list.indexOf(todo)
            this.list.splice(index, 1)
        },
        editTodo(todo){
            // 编辑任务
            this.beforeTitle = todo.title
            this.editFlag = todo
        },
        editComplete(){
            // 编辑完成
            this.editFlag = ''
        },
        cancelEdit(todo){
            // 取消编辑
            todo.title = this.beforeTitle
            this.editFlag = ''
        }
    },
    directives:{
        'focus': {
            update(el, binding){
                if(binding.value){
                    el.focus()
                }
            }
        }
    }
})

function watchHashChange(){
    var hash = window.location.hash.slice(1)
    vm.visibility = hash
}

watchHashChange()

window.addEventListener('hashchange', watchHashChange)