<template>
    <li class="xw-option" @click="handleClick">{{ label }}</li>
</template>

<script>

export default {
    name: 'XwOption',

    props: {
        label: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        }
    },

    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {
        handleClick() {
            this.$parent.handleSelect(this.value)
        }
    },
    created() {},
    mounted() {}
}
</script>
<style lang='less' scoped>
.xw-option {
    height: 20px;
    padding: 6px 9px;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    user-select: none;
    &:hover {
        background-color: #072e5c;
    }
}
</style>