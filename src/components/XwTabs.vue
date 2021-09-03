<script>
import XwTabPane from './XwTabPane.vue'

export default {
    name: 'XwTabs',

    props: {
        value: {
            type: String,
            default: ''
        }
    },

    components: {
        XwTabPane
    },

    data() {
        return {
            list: [],
            currentIndex: 0
        }
    },
    computed: {
    },
    watch: {
        value(val) {
            this.currentIndex = this.$slots.default.findIndex(({ componentOptions: { propsData: { name } } }) => name === val)
        }
    },
    methods: {
        handleClickTab(index) {
            const { componentOptions: { propsData: { name } } } = this.$slots.default[index]
            this.currentIndex = index
            this.$emit('input', name)
        }
    },
    created() {
        this.list = [...this.$slots.default].map(({ componentOptions: { propsData: { label, name } } }) => ({ label, name }))
    },
    mounted() {
    },
    render(h) {
        return h('div', {
            class: 'xw-tabs',
            on: {
                ...this.$attrs
            }
        }, [
            h('div', {
                class: 'xw-tabs-list'
            }, this.list.map((item, tabIndex) => {
                return h('div', {
                    class: `xw-tabs-list-item ${ this.value === item.name ? 'active' : '' }`,
                    on: {
                        click: () => this.handleClickTab(tabIndex)
                    }
                }, [
                    h('span', item.label)
                ])
            })),
            h('div', {
                class: 'xw-tabs-pane-mask'
            }, [
                h('div', {
                    class: 'xw-tabs-pane-list',
                    style: {
                        width: `${ this.$slots.default.length * 100 }%`,
                        transform: `translateX(-${ this.currentIndex * 100 / this.$slots.default.length }%)`
                    }
                }, [...this.$slots.default].map(({ componentOptions: { propsData: { label, name }, children } }, i) => {
                    return h('xw-tab-pane', {
                        style: {
                            width: `${ 100 / this.$slots.default.length }%`
                        },
                        props: {
                            label,
                            name,
                            index: i
                        }
                    }, [children])
                }))
            ])
        ])
    }
}
</script>
<style lang='less' scoped>
.xw-tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &-list {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #05162a;
        &-item {
            position: relative;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-size: 14px;
            &.active {
                font-size: 14px;
                font-weight: 600;
                color: #1890ff;
                &::after {
                    content: '';
                    position: absolute;
                    display: block;
                    bottom: 0%;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background-color: #1890ff;
                }
            }
        }
    }
    &-pane-mask {
        width: 100%;
        overflow: hidden;
    }
    &-pane-list {
        position: relative;
        display: flex;
        transition: all .3s;
    }
}
</style>