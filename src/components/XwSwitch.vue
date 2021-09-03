<template>
    <div class="xw-switch" v-bind="$attrs" v-on="$listeners">
        <div class="xw-switch-container" @click="handleClick">
            <div class="xw-switch-scroll" :class="{active: value}">
                <div class="open">
                    <i class="opened icon iconfont icon-kaiguankaiqi_icon_v5"></i>
                </div>
                <div class="close">
                    <i class="closed icon iconfont icon-shurukuangshanchu_icon_v5"></i>
                </div>
                <i class="circle"></i>
            </div>
        </div>
        <span @click="handleClick">{{ displayName }}</span>
    </div>
</template>

<script>

export default {
    name: 'XwSwitch',

    props: {
        label: {
            type: String,
            default: ''
        },
        value: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            displayName: this.label
        }
    },

    computed: {},

    watch: {
        label(val) {
            this.displayName = val
        }
    },

    methods: {
        handleClick() {
            this.$emit('input', !this.value)
            this.$emit('change', !this.value)
        }
    },

    created() {
    },
    mounted() {}
}
</script>
<style lang='less' scoped>
.xw-switch {
    display: flex;
    &-container {
        position: relative;
        border: 1px solid #394552;
        border-radius: 999px;
        width: 44px;
        height: 20px;
        margin-right: 10px;
        overflow: hidden;
        cursor: pointer;
        .xw-switch-scroll {
            position: absolute;
            width: 88px;
            height: 100%;
            left: -34px;
            top: 0;
            transition: all .3s;
            &.active {
                left: -10px;
            }
            .open {
                position: absolute;
                left: 0;
                top: 0;
                width: 44px;
                height: 100%;
                background-color: #1890ff;
                .opened {
                    position: absolute;
                    font-size: 14px;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }
            .close {
                position: absolute;
                left: 50%;
                top: 0;
                width: 44px;
                height: 100%;
                background-color: #010811;
                .closed {
                    position: absolute;
                    font-size: 14px;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }
            .circle {
                display: block;
                position: absolute;
                width: 20px;
                height: 20px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                background-color: #fff;
            }
        }
    }
    span {
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
        user-select: none;
    }
}
</style>