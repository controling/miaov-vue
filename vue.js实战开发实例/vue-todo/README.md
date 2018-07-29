v-for 指令
    根据一组数组的选项列表进行渲染
    语法
        value, key in items
        value, key of items

变异方法
    vue提供一组方法, 对数组进行操作是, 会触发视图更新
    push() pop() shift() unshift() sort() splic() reverse()

事件处理器
    v-on指令
        用来监听DOM事件触发代码
        语法
            v-on: eventName = 'eventHandle'
        简写 @
        事件处理函数
            统一写在methods中管理
        事件对象
            在事件处理函数中获取
            内联事件处理函数执行, 传入事件对象 $event (@keyup.enter = "addTodo(123, $event)")
        事件修饰符
            事件处理函数中只有纯粹的逻辑判断, 不处理DOM事件的细节
            例如 阻止冒泡, 取消默认行为, 判断按键

            修饰符的位置
                v-on:eventName.修饰符
            修饰符
                .stop(阻止冒泡) .prevent(取消默认行为) .capture .self .once
            按键修饰符
                .enter .tab .delete .esc .space .up .down .left .right .ctrl .alt .shift .meta .键值

条件渲染
    v-show指令
        根据表达式的值, 用来显示/隐藏元素
        语法
            v-show = '表达式'
        元素会渲染在页面中, 只是切换display样式

动态绑定class
    class也为元素的属性, 可以使用 v-bind: class
    语法
        :class = '{className: 表达式}' 表达式为true 添加className
        :class = '[className, className]' [?]

自定义指令
    除了vue的内置指令, 可以自定义指令
    选项对象中的directives
        {
            directives: {
                '指令名': {
                    钩子函数
                }
            }
        }
        元素绑定自定义指令
        <input v-指令名='表达式'>
    钩子函数
        update 绑定的元素所在的模板更新是调用
        update参数 
            el: 指令所绑定的元素, 可用来直接操作DOM
            binding: 一个对象
                value: 指令的绑定值

计算属性
    模板是为了描述视图的结构, 模板中放入太多的逻辑, 导致模板过重且难以维护
    在计算一个计算属性是, vue更新它的依赖列表并缓存结果, 只有当其中的一个依赖发生变化, 缓存的结果才无效
    语法
        在选项对象
        {
            computed: {}
        }