<template>
    <div class="xw-select" ref="xwSelect" v-bind="$attrs" v-on="$listeners">
        <xw-input @focus="handleFocus" v-model="name" readonly style="height: 30px;" ref="xwSelectInput"></xw-input>
        <i class="icon iconfont icon-jiantou-xiangxia_icon_v5" :class="{active: visible}"></i>
        <div class="xw-select-popover" ref="xwSelectPopover" @click="handleClick">
            <ul class="xw-option-list">
                <slot></slot>
            </ul>
        </div>
    </div>
</template>

<script>
import XwInput from './XwInput.vue'
import mixins from '../utils/mixins'

export default {
    name: 'XwSelect',

    props: {
        value: {
            type: String,
            default: ''
        }
    },

    mixins: [mixins],

    components: {
        XwInput
    },

    data() {
        return {
            visible: false
        }
    },

    computed: {
        name() {
            return [...this.$slots.default].find(({ componentOptions: { propsData: { value } } }) => value === this.value)?.componentOptions?.propsData?.label || ''
        }
    },

    methods: {
        handleFocus() {
            const hasExist = [...document.body.children].includes(this.$refs.xwSelectPopover)
            this.$refs.xwSelectPopover.style.display = 'flex'
            const { left, top } = this.getElPosition(this.$refs.xwSelect)
            this.$refs.xwSelectPopover.style.left = `${left}px`
            this.$refs.xwSelectPopover.style.top = `${top + this.$refs.xwSelectInput.$el.offsetHeight + 1}px`
            if (!hasExist) {
                document.body.appendChild(this.$refs.xwSelectPopover)
            }
        },
        clickOutside(e) {
            const clickInside = this.$refs.xwSelectInput.$el.contains(e.target) || 
                this.$refs.xwSelectPopover.contains(e.target)
            if (clickInside) {
                this.visible = true
                this.$refs.xwSelectPopover.style.display = 'flex'
            } else {
                this.visible = false
                this.$refs.xwSelectPopover.style.display = 'none'
            }
        },
        handleClick(e) {
            e.stopPropagation()
        },
        handleSelect(value) {
            this.$emit('input', value)
            this.$emit('change', value)
            this.visible = false
            this.$refs.xwSelectPopover.style.display = 'none'
        }
    },

    created() {
    },
    mounted() {
        window.addEventListener('click', this.clickOutside)
        this.$refs.xwSelectPopover.style.width = this.$refs.xwSelect.style.width
    },
    destroyed() {
        window.removeEventListener('click', this.clickOutside)
    }
}
</script>
<style lang='less' scoped>
@import url('../assets/index.less');
.xw-select {
    position: relative;
    display: inline-block;
    .icon {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        transition: all .3s;
        &.active {
            transform: translateY(-50%) rotateZ(-180deg);
        }
    }
}
</style>