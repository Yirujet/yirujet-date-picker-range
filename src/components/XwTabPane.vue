<template>
    <div class="xw-tab-pane" v-bind="$attrs">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'XwTabPane',

    components: {},

    props: {
        label: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {

        }
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    mounted() {}
}
</script>
<style lang='less' scoped>
    .xw-tab-pane {
        // width: 100%;
        padding: 15px;
    }
</style>