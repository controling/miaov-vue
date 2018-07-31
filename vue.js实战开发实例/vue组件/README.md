Vue组件
    vue中的组件是一个自定义标签, Vue.js为它添加特殊的功能
    vue也可以扩展原生的html元素, 封装可重用代码

    组件的基本组成
        样式结构
        行为逻辑
        数据

注册组件
    全局注册
        可以再任何模板中使用, 使用之前先要注册
        语法
            Vue.component(组件名, 选项对象)
            组件名约定
                驼峰(camelCase), 烤串(kebab-case)
            在html中使用组件
                使用烤串(kebab-case)命名法

        例如: 注册 Vue.component('my-component', {})
            使用 <my-component></my-component>

    局部注册
        在组价实例中通过选项对象注册, 只在注册的作用域中使用
        {
            components: {
                组件名: 选项对象
            }
        }

组件件通信
    父组件要给子组件传递数据, 子组件需要将它内部发生的事情告诉父组件
    父组件 -> 子组件
        组件实例的作用域是独立的, 不能在子组件直接使用父组件的数据
        可以在组件上使用自定义属性绑定数据, 在组件中需要显式的用props(数组,驼峰)声明自定义属性名
    子组件 -> 父组件
        需要用到自定义事件, 父组件用$on监听自定义事件, $emit触发父组件所关心的自定义事件

组件中的data必须是函数
    每个组价都是相互独立的, 如果它们公用一个对象, 在更改一个组件的数据时, 会影响到其他组件的数据, 如果是函数的的话, 每个组件都有自己独立的数据, 相互之间不会有影响

受限制的元素
    DOM模板解析
        Vue是在浏览器解析和标准化html后才能获取模板内容, 所以有些元素限制了能被它包裹的元素
        例如: ul只能放li, select只能放option
        某些元素放入自定义元素, 不符合W3C标准, 最终会解析错误
        变通的方法是使用特殊属性is来扩展html标签功能
        例如: <table><tr is="custom-select"></tr></table>

单向数据流
    数据从父组件流向(传递)给子组件, 只能单向绑定
    在子组件内部不应该修改父组件传递过来的数据

    使用父级传过来的值(props)
        1.作为data中局部数据的初始值使用
        2.作为子组件中的computed属性

props验证
    组件可以为props指定验证要求, 验证类型为 Number, String, Function, Object, Array, Boolean
    props: {
        propA: Number,   // 指定类型
        propB: [Number, String], // 指定多种类型
        propC: {
            type: String,
            required: true
        }, // 必填并且为字符串
        propD: {
            type: Number,
            default: 0
        }, // 设置默认值 default 可以为函数
        propE: {
            validator: function(value){
                value 为propE的值
            }
        } // 自定义验证规则
    }

slot分发内容
    使用一种方式混合父组件的内容与子组件的模板, 这种方式叫'内容分发'
    在子组件中使用特殊元素<slot>作为内容的插槽
    这样会使组件的扩展性更强
    单个slot
        在子组件中有slot标签, 被视为备用内容, 在父组件不提供内容的情况下使用.
        如果父组件提供内容, 则把整个内容片段插入到slot所在的DOM位置, 并替换掉slot标签本身
        <custom><div>父组件提供内容</div></custom>
        template: `<slot>子组件的slot标签</slot>`

    具名slot
        <slot>元素可以用一个特殊的属性name来配置如何分发内容
        可以使用一个匿名的slot处理那些没有对应slot的内容
    
    编译作用域
        父组件模板的内容在父组件作用域内编译
        子组件模板的内容在子组件作用域内编译        