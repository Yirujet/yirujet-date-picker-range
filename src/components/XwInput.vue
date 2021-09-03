<template>
    <div class="xw-input-container">
        <template v-if="!prefix">
            <input type="text" class="xw-input" :value="value" v-bind="$attrs" v-on="$listeners" @input="handleInput">
        </template>
        <template v-else>
            <div class="xw-input-with-prefix">
                <div class="prefix">{{ prefix }}</div>
                <input type="text" class="xw-input" :value="value" v-bind="$attrs" v-on="$listeners" @input="handleInput">
            </div>
        </template>
    </div>
</template>

<script>

export default {
    name: 'XwInput',

    props: {
        value: {
            type: String,
            default: ''
        },
        prefix: {
            type: String,
            default: ''
        }
    },

    data() {
        return {

        };
    },

    computed: {},

    methods: {
        handleInput(e) {
            this.$emit('input', e.target.value)
            this.$emit('change', e.target.value)
        }
    },

    created() {},
    mounted() {}
}
</script>
<style lang='less' scoped>
.xw-input-container {
    display: inline-block;
    .xw-input-with-prefix {
        display: flex;
        .prefix {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 98px;
            height: 30px;
            background: #05162a;
            border: 1px solid #394552;
            border-radius: 2px 0px 0px 2px;
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            border-right: none;
        }
        .xw-input {
            opacity: 1;
            border: 1px solid #394552;
            border-radius: 0 2px 2px 0;
        }
    }
}
.xw-input {
    -webkit-appearance: none;
    background-color: #010811;
    background-image: none;
    border-radius: 0;
    border: none;
    box-sizing: border-box;
    color: #fff;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
</style>