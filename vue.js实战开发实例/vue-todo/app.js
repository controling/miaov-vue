// 存取localStorage数据

var store = {
    save(key, value){
        localStorage.setItem(key, JSON.stringify(value))
    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key)) || []
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

new Vue({
    el: '.main',
    data: {
        list: list,
        todo: '',
        editFlag: '', // 记录当前正在编辑的todo
        beforeTitle: '' // 记录当前正在编辑的title
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