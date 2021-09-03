<template>
    <div class="xw-date-picker">
        <div class="operation">
            <div class="last-month" @click="handleSelectMonth(-1)">
                <i></i>
            </div>
            <div class="current-date">
                <a class="year-select" @click="handleChangeMode('Year')">{{ dateValue.getFullYear() }}</a>年
                <a class="month-select" @click="handleChangeMode('Month')">{{ monthList[dateValue.getMonth()].displayName }}</a>月
            </div>
            <div class="next-month" @click="handleSelectMonth(1)"><i></i></div>
        </div>
        <div v-show="mode === 'Year'">
            <div class="year">
                <span
                    :class="setYearCls(yearInfo)"
                    @click="setYear(yearInfo)"
                    :key="index"
                    v-for="(yearInfo, index) in yearList"
                >
                    {{ yearInfo }}
                </span>
            </div>
        </div>
        <div v-show="mode === 'Month'">
            <div class="month">
                <span
                    :class="setMonthCls(monthInfo.value)"
                    @click="setMonth(monthInfo.value)"
                    :key="index"
                    v-for="(monthInfo, index) in monthList"
                >
                    {{ monthInfo.displayName }}月
                </span>
            </div>
        </div>
        <div v-show="mode === 'Date'">
            <div class="week-title">
                <div class="title" :key="index" v-for="(title, index) in weekTitles">
                    <span>{{ title }}</span>
                </div>
            </div>
            <div class="week" :key="index" v-for="(weekInfo, index) in monthInfo">
                <div
                    class="date-container"
                    :class="setDateCls(dateInfo)"
                    :key="index"
                    v-for="(dateInfo, index) in weekInfo"
                    @click="handleSelectDt(dateInfo)"
                >
                    <div class="date">
                        <span>{{ setShowDate(dateInfo) }}</span>
                    </div>
                    <slot name="daterender">
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '../utils/mixins'

export default {
    name: 'XwDatePicker',
    componentName: 'XwDatePicker',

    mixins: [mixins],

    props: {
        value: {
            type: [String, Date],
            default: ''
        }
    },

    components: {
    },

    data() {
        return {
            weekTitles: ['一', '二', '三', '四', '五', '六', '日'],
            monthTitles: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
            monthInfo: [],
            yearList: [],
            dateValue: new Date,
            mode: 'Date'
        }
    },

    computed: {
        monthList() {
            return Array.from({ length: 12 }).map((e, i) => ({
                value: i + 1,
                // displayName: this.monthTitles[i]
                displayName: i + 1
            }))
        }
    },

    watch: {
        value(newVal) {
            this.dateValue = newVal ? new Date(newVal) : new Date
            this.getMonthInfo()
        }
    },

    methods: {
        getMonthInfo() {
            this.monthInfo = this.getWeeksInMonth(this.dateValue)
        },
        setDateCls(dt) {
            let aryCls = []
            const { year, month, date } = this.getDateInfo(dt)
            const { year: selectedYear, month: selectedMonth, date: selectedDate } = this.getDateInfo(this.dateValue)
            const { year: curYear, month: curMonth, date: curDate } = this.getDateInfo()
            if (month !== selectedMonth) {
                aryCls.push('other-month')
            }
            if (year === selectedYear && month === selectedMonth && date === selectedDate) {
                aryCls.push('selected')
            }
            if (year === curYear && month === curMonth && date === curDate) {
                aryCls.push('today')
            }
            return aryCls
        },
        setYearCls(year) {
            let aryCls = []
            const { year: selectedYear } = this.getDateInfo(this.dateValue)
            if (year === selectedYear) {
                aryCls.push('selected')
            }
            return aryCls
        },
        setMonthCls(month) {
            let aryCls = []
            const { month: selectedMonth } = this.getDateInfo(this.dateValue)
            if (month - 1 === selectedMonth) {
                aryCls.push('selected')
            }
            return aryCls
        },
        setShowDate(dt) {
            const { year, month, date } = this.getDateInfo(dt)
            const { year: curYear, month: curMonth, date: curDate } = this.getDateInfo()
            if (year === curYear && month === curMonth && date === curDate) {
                return '今'
            }
            return date
        },
        /**
         * 选择日期
         */
        handleSelectDt(dt) {
            if (dt.getMonth() !== this.dateValue.getMonth()) {
                this.dateValue = dt
                this.getMonthInfo()
            } else {
                this.dateValue = dt
            }
            this.$emit('change-date', this.dateValue)
        },
        /**
         * 选择月份
         */
        handleSelectMonth(offsetMonths) {
            this.dateValue = this.addMonth(this.dateValue, offsetMonths)
            this.getMonthInfo()
            this.mode = 'Date'
            // this.$emit('change-date', this.dateValue)
        },
        /**
         * 更新年份列表
         */
        updateYearList() {
            const { year } = this.getDateInfo(this.dateValue)
            this.yearList = [
                ...Array.from({ length: 10 }).map((e, i) => year - 10 + i),
                year,
                ...Array.from({ length: 9 }).map((e, i) => year + i + 1)
            ]
        },
        /**
         * 改变显示模式
         */
        handleChangeMode(mode) {
            this.mode = mode
            if (this.mode === 'Year') {
                this.updateYearList()
            }
        },
        /**
         * 设置年份
         * @param year
         */
        setYear(year) {
            const { year: selectedYear } = this.getDateInfo(this.dateValue)
            const offsetYears = year - selectedYear
            if (offsetYears) {
                this.dateValue = this.addYear(this.dateValue, offsetYears)
                this.getMonthInfo()
                this.$emit('change-date', this.dateValue)
            }
            this.mode = 'Date'
        },
        /**
         * 设置月份
         */
        setMonth(month) {
            const { month: selectedMonth } = this.getDateInfo(this.dateValue)
            const offsetMonths = month - 1 - selectedMonth
            if (offsetMonths) {
                this.dateValue = this.addMonth(this.dateValue, month - 1 - selectedMonth)
                this.getMonthInfo()
                this.$emit('change-date', this.dateValue)
            }
            this.mode = 'Date'
        },
        writeValue(obj) {
            this.dateValue = new Date(obj)
            this.getMonthInfo()
        }
    },

    created() {
        this.getMonthInfo()
    },

    mounted() {
    },
    destroyed() {
    }
}
</script>
<style lang='less' scoped>
@import url('../assets/index.less');
.xw-date-picker {
    .operation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .year-select, .month-select {
            cursor: pointer;
            &:hover {
                color: #1890fe;
            }
        }
        .current-date {
            color: #fff;
        }
        .last-month, .next-month {
            display: flex;
            width: 30px;
            height: 30px;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            i {
                display: block;
                width: 10px;
                height: 10px;
            }
            &:hover {
                i {
                    border-color: #1890fe;
                }
            }
        }
        .last-month i {
            border-left: 2px solid #999;
            border-bottom: 2px solid #999;
            transform: rotate(45deg);
        }
        .next-month i {
            border-right: 2px solid #999;
            border-top: 2px solid #999;
            transform: rotate(45deg);
        }
        .year-select, .month-select {
            padding: 0 5px;
        }
    }
    .week-title {
        display: grid;
        grid-template-columns: repeat(7, calc(100% / 7));
        .title {
            display: flex;
            height: 25px;
            justify-content: center;
            align-items: center;
            padding: 5px;
            font-size: 14px;
            color: #fff;
        }
    }
    .year, .month {
        display: grid;
        span {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px 0;
            cursor: pointer;
            border-radius: 3px;
            &.selected {
                background-color: #1890fe;
                color: #fff;
            }
            &:hover {
                &:not(.selected) {
                    color: #072e5c;
                    background-color: #E9E9E9;
                }
            }
        }
    }
    .year {
        grid-template-columns: repeat(5, calc(100% / 5));
    }
    .month {
        grid-template-columns: repeat(3, calc(100% / 3));
    }
    .week {
        display: grid;
        grid-template-columns: repeat(7, calc(100% / 7));
        .date-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
            cursor: pointer;
            .date {
                display: flex;
                width: 35px;
                height: 35px;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 12px;
                span {
                    display: flex;
                    width: 20px;
                    height: 20px;
                    justify-content: center;
                    align-items: center;
                    border-radius: 2px;
                }
            }
            &.other-month {
                .date {
                    color: #072e5c;
                }
            }
            &.selected {
                .date {
                    position: relative;
                    color: #fff;
                    span {
                        z-index: 2;
                    }
                    &::before {
                        content: '';
                        .absolute-circle-div(20px);
                    }
                }
            }
            &.today {
                .date {
                    position: relative;
                    span {
                        &::after {
                            content: '';
                            position: absolute;
                            width: 20px;
                            height: 20px;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                            z-index: 1;
                            border-radius: 2px;
                            border: 1px solid #1890fe;
                        }
                    }
                }

            }
            &:hover:not(.selected) {
                .date {
                    span {
                        color: #072e5c;
                        background-color: #E9E9E9;
                    }
                }
            }
        }
    }
}
</style>