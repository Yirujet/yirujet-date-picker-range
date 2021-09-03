<template>
    <div class="xw-date">
        <div class="input-container" ref="xwPickerInput">
            <div class="input">
                <xw-input v-model="startVal.formatDt" style="font-size: 14px;" ref="xwPickerInputStartTime" readonly placeholder="请输入开始时间" @focus="handleFocus(0)"></xw-input>
                <div class="line" :class="{'active': visible && focusIndex === 0}"></div>
            </div>
            <i class="icon iconfont icon-rilijiantou_icon_v5"></i>
            <div class="input">
                <xw-input v-model="endVal.formatDt" style="font-size: 14px;" ref="xwPickerInputEndTime" readonly placeholder="请输入结束时间" @focus="handleFocus(1)"></xw-input>
                <div class="line" :class="{'active': visible && focusIndex === 1}"></div>
            </div>
            <i class="icon iconfont icon-shijian_icon_v5"></i>
        </div>
        <div class="xw-date-picker-popover" ref="xwPickerPopover">
            <xw-tabs style="color: #fff;width: 400px;" v-model="$val.model">
                <xw-tab-pane label="绝对时间" name="absolute">
                    <div class="content">
                        <div class="left-part">
                            <xw-date-picker v-model="$val.dt" @change-date="handleChangeDate"></xw-date-picker>
                        </div>
                        <div class="right-part">
                            <div class="time">
                                <ul class="time-list">
                                    <li class="time-item" :class="{ active: $val.time === item.value }" :key="index" v-for="(item, index) in timeList" @click="handleSetHms(item)">{{ item.name }}</li> 
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="show-time" style="margin-top: 20px;">
                        <xw-input v-model="showTime" :prefix="`${ focusIndex === 0 ? '开始' : '结束' }时间`" style="width: 372px;height: 32px;"></xw-input>
                    </div>
                </xw-tab-pane>
                <xw-tab-pane label="相对时间" name="relative">
                    <div class="relative-container">
                        <xw-input v-model="relativeVal" type="number" style="width: 180px;height: 32px;border: 1px solid #394552;margin-right: 8px;"></xw-input>
                        <xw-select v-model="$val.relativeType" @change="handleChangeRelativeType" style="width: 180px;height: 32px;border: 1px solid #394552;">
                            <xw-option :key="index" :label="item.displayName" :value="item.value" v-for="(item, index) in relativeTypeList"></xw-option>
                        </xw-select>
                    </div>
                    <xw-switch v-model="$val.openRound" @change="handleChangeOpenRound" :label="switchName" style="margin-top: 20px;"></xw-switch>
                    <div class="show-time" style="margin-top: 20px;">
                        <xw-input v-model="showTime" :prefix="`${ focusIndex === 0 ? '开始' : '结束' }时间`" style="width: 372px;height: 32px;"></xw-input>
                    </div>
                </xw-tab-pane>
                <xw-tab-pane label="当前时间" name="now">
                    <span class="now-tab-desc">将时间设置为“当前时间”意味着每次刷新时，此时间将设置为刷新时间</span>
                    <div class="btn-set-now" style="margin-top: 15px;" @click="handleSetNow">设置{{ `${ focusIndex === 0 ? '开始' : '结束' }` }}时间为当前时间</div>
                </xw-tab-pane>
            </xw-tabs>
        </div>
    </div>
</template>

<script>
import XwDatePicker from './XwDatePicker.vue'
import XwInput from './XwInput.vue'
import XwTabs from './XwTabs.vue'
import XwTabPane from './XwTabPane.vue'
import XwSelect from './XwSelect.vue'
import XwOption from './XwOption.vue'
import XwSwitch from './XwSwitch.vue'
import mixins from '../utils/mixins'

export default {
    name: 'XwDate',
    componentName: 'XwDate',

    props: {
        value: {
            type: Array,
            default: () => []
        }
    },

    mixins: [mixins],

    components: {
        XwInput,
        XwTabs,
        XwTabPane,
        XwSelect,
        XwOption,
        XwSwitch,
        XwDatePicker
    },

    data() {
        return {
            visible: false,
            focusIndex: null,
            model: 'absolute',
            relativeTypeList: [
                { displayName: '秒之前', value: 'SecondsAgo', name: '秒' },
                { displayName: '分钟之前', value: 'MinutesAgo', name: '分钟' },
                { displayName: '小时之前', value: 'HoursAgo', name: '小时' },
                { displayName: '天前', value: 'DaysAgo', name: '天' },
                { displayName: '月前', value: 'MonthsAgo', name: '月' },
                { displayName: '年前', value: 'YearsAgo', name: '年' },
                { displayName: '秒之后', value: 'SecondsFromNow', name: '秒' },
                { displayName: '分钟之后', value: 'MinutesFromNow', name: '分钟' },
                { displayName: '小时之后', value: 'HoursFromNow', name: '小时' },
                { displayName: '天后', value: 'DaysFromNow', name: '天' },
                { displayName: '月后', value: 'MonthsFromNow', name: '月' },
                { displayName: '年后', value: 'YearsFromNow', name: '年' }
            ],
            relativeType: '',
            type: null,
            openRound: false,
            startVal: {
                model: 'absolute',
                dt: '',
                cacheDt: '',
                time: '',
                formatDt: '',
                relativeVal: '',
                relativeType: 'SecondsAgo',
                openRound: false
            },
            endVal: {
                model: 'absolute',
                dt: '',
                cacheDt: '',
                time: '',
                formatDt: '',
                relativeVal: '',
                relativeType: 'SecondsAgo',
                openRound: false
            },
            $val: null
        }
    },

    computed: {
        timeList() {
            return Array.from({ length: 48 }).map((e, i) => {
                let a = i / 2
                let strRtn = a
                let aryNum = String(a).split('.')
                if (a < 13) {
                    if (a < 1) {
                        strRtn = `${ String(~~aryNum[0] + 12).padStart(2, '0') }:${ aryNum.length < 2 ? '00' : '30' } AM`
                    } else {
                        strRtn = `${ String(aryNum[0]).padStart(2, '0') }:${ aryNum.length < 2 ? '00' : '30' } AM`
                    }
                } else {
                    strRtn = `${ String(aryNum[0] - 12).padStart(2, '0') }:${ aryNum.length < 2 ? '00' : '30' } PM`
                }
                return {
                    name: strRtn,
                    value: a
                }
            })
        },
        switchName() {
            return `精确到${ this.type.name }`
        },
        showTime: {
            set(val) {
                if (typeof val === 'string') {
                    if (this.focusIndex === 0) {
                        this.startVal.formatDt = val
                    } else {
                        this.endVal.formatDt = val
                    }
                }
            },
            get() {
                return this.focusIndex === 0 ? this.startVal.formatDt : this.endVal.formatDt
            }
        },
        relativeVal: {
            set(val) {
                if (typeof val === 'string') {
                    if (this.focusIndex === 0) {
                        this.startVal.relativeVal = val
                    } else {
                        this.endVal.relativeVal = val
                    }
                    this.$val.relativeVal = val
                }
            },
            get() {
                if (this.focusIndex === 0) {
                    return this.startVal.relativeVal
                } else {
                    return this.endVal.relativeVal
                }
            }
        },
        formatStartVal() {
            return this.startVal.dt ? this.formatDt(this.startVal.dt) : ''
        },
        formatEndVal() {
            return this.endVal.dt ? this.formatDt(this.endVal.dt) : ''
        }
    },

    watch: {
        relativeVal() {
            this.handleCalcDt()
        },
        value(newVal) {
            if (Array.isArray(newVal) && newVal.length > 0) {
                this.startVal.dt = new Date(newVal[0])
                this.endVal.dt = new Date(newVal[1])
            }
        }
    },

    methods: {
        handleFocus(index) {
            if (Array.isArray(this.value) && this.value.length > 0) {
                this.startVal.dt = new Date(this.value[0])
                this.endVal.dt = new Date(this.value[1])
            }
            this.focusIndex = index
            this.$val = index === 0 ? this.startVal : this.endVal
            const hasExist = [...document.body.children].includes(this.$refs.xwPickerPopover)
            this.$refs.xwPickerPopover.style.display = 'flex'
            const { left, top } = this.getElPosition(this.$refs.xwPickerInput)
            this.$refs.xwPickerPopover.style.left = `${left}px`
            this.$refs.xwPickerPopover.style.top = `${top + this.$refs.xwPickerInput.offsetHeight}px`
            if (!hasExist) {
                document.body.appendChild(this.$refs.xwPickerPopover)
            }
        },
        clickOutside(e) {
            const clickInside = this.$refs.xwPickerInputStartTime.$el.contains(e.target) || 
                this.$refs.xwPickerInputEndTime.$el.contains(e.target) || 
                this.$refs.xwPickerPopover.contains(e.target)
            if (clickInside) {
                this.visible = true
                this.$refs.xwPickerPopover.style.display = 'flex'
            } else {
                this.visible = false
                this.$refs.xwPickerPopover.style.display = 'none'
            }
        },
        handleChangeRelativeType(type) {
            this.type = this.relativeTypeList.find(({ value }) => value === type)
            this.handleCalcDt()
        },
        handleChangeOpenRound() {
            this.handleCalcRoundDt()
        },
        handleChangeDate(dt) {
            this.changeShowTime(dt)
            if (this.$val.time) {
                this.handleSetHms({ value: this.$val.time })
            }
        },
        changeShowTime(dt) {
            const formatDt = this.formatDt(dt)
            if (this.focusIndex === 0) {
                this.startVal.dt = dt
                this.startVal.cacheDt = dt
                this.startVal.formatDt = formatDt
            } else {
                this.endVal.dt = dt
                this.endVal.cacheDt = dt
                this.endVal.formatDt = formatDt
            }
            this.$emit('input', [this.startVal.dt, this.endVal.dt])
            this.$emit('change', [this.startVal.dt, this.endVal.dt])
        },
        handleSetNow() {
            this.changeShowTime(new Date)
        },
        handleSetHms({ value }) {
            let dt = new Date
            if (this.focusIndex === 0) {
                this.startVal.dt && (dt = new Date(this.startVal.dt))
                this.startVal.time = value
            } else {
                this.endVal.dt && (dt = new Date(this.endVal.dt))
                this.endVal.time = value
            }
            const [h, m] = String(value).split('.')
            dt.setHours(~~h)
            dt.setMinutes(~~((m || 0) * 6))
            this.changeShowTime(dt)
        },
        getTranslateY() {
            const baseH = 30
            let translateY = 0
            if (this.$val && this.$val.time) {
                translateY = this.timeList.findIndex(item => item.value === this.$val.time) * baseH
            }
            return `translateY(-${ translateY }px)`
        },
        handleCalcDt() {
            if (this.$val.relativeVal) {
                switch (this.$val.relativeType) {
                    case 'SecondsAgo':
                        if (this.focusIndex === 0) {
                            this.startVal.dt = this.addSecond(new Date, 0 - this.$val.relativeVal)
                            this.startVal.cacheDt = JSON.parse(JSON.stringify(this.startVal.dt))
                            this.startVal.formatDt = this.formatDt(this.startVal.dt)
                            this.$val = this.startVal
                        } else {
                            this.endVal.dt = this.addSecond(new Date, 0 - this.$val.relativeVal)
                            this.endVal.cacheDt = JSON.parse(JSON.stringify(this.endVal.dt))
                            this.endVal.formatDt = this.formatDt(this.endVal.dt)
                            this.$val = this.endVal
                        }
                        break
                    case 'MinutesAgo':
                        if (this.focusIndex === 0) {
                            this.startVal.dt = this.addMinute(new Date, 0 - this.$val.relativeVal)
                            this.startVal.cacheDt = JSON.parse(JSON.stringify(this.startVal.dt))
                            this.startVal.formatDt = this.formatDt(this.startVal.dt)
                            this.$val = this.startVal
                        } else {
                            this.endVal.dt = this.addMinute(new Date, 0 - this.$val.relativeVal)
                            this.endVal.cacheDt = JSON.parse(JSON.stringify(this.endVal.dt))
                            this.endVal.formatDt = this.formatDt(this.endVal.dt)
                            this.$val = this.endVal
                        }
                        break
                    case 'HoursAgo':
                        if (this.focusIndex === 0) {
                            this.startVal.dt = this.addHour(new Date, 0 - this.$val.relativeVal)
                            this.startVal.cacheDt = JSON.parse(JSON.stringify(this.startVal.dt))
                            this.startVal.formatDt = this.formatDt(this.startVal.dt)
                            this.$val = this.startVal
                        } else {
                            this.endVal.dt = this.addHour(new Date, 0 - this.$val.relativeVal)
                            this.endVal.cacheDt = JSON.parse(JSON.stringify(this.endVal.dt))
                            this.endVal.formatDt = this.formatDt(this.endVal.dt)
                            this.$val = this.endVal
                        }
                        break
                    case 'DaysAgo':
                        if (this.focusIndex === 0) {
                            this.startVal.dt = this.addDate(new Date, 0 - this.$val.relativeVal)
                            this.startVal.cacheDt = JSON.parse(JSON.stringify(this.startVal.dt))
                            this.startVal.formatDt = this.formatDt(this.startVal.dt)
                            this.$val = this.startVal
                        } else {
                            this.endVal.dt = this.addDate(new Date, 0 - this.$val.relativeVal)
                            this.endVal.cacheDt = JSON.parse(JSON.stringify(this.endVal.dt))
                            this.endVal.formatDt = this.formatDt(this.endVal.dt)
                            this.$val = this.endVal
                        }
                        break
                    case 'MonthsAgo':
                        if (this.focusIndex === 0) {
                            this.startVal.dt = this.addMonth(new Date, 0 - this.$val.relativeVal)
                            this.startVal.cacheDt = JSON.parse(JSON.stringify(this.startVal.dt))
                            this.startVal.formatDt = this.formatDt(this.startVal.dt)
                            this.$val = this.startVal
                        } else {
                            this.endVal.dt = this.addMonth(new Date, 0 - this.$val.relativeVal)
                            this.endVal.cacheDt = JSON.parse(JSON.stringify(this.endVal.dt))
                            this.endVal.formatDt = this.formatDt(this.endVal.dt)
                            this.$val = this.endVal
                        }
                        break
                    case 'YearsAgo':
                        if (this.focusIndex === 0) {
                            this.startVal.dt = this.addYear(new Date, 0 - this.$val.relativeVal)
                            this.startVal.cacheDt = JSON.parse(JSON.stringify(this.startVal.dt))
                            this.startVal.formatDt = this.formatDt(this.startVal.dt)
                            this.$val = this.startVal
                        } else {
                            this.endVal.dt = this.addYear(new Date, 0 - this.$val.relativeVal)
                            this.endVal.cacheDt = JSON.parse(JSON.stringify(this.endVal.dt))
                            this.endVal.formatDt = this.formatDt(this.endVal.dt)
                            this.$val = this.endVal
                        }
                        break
                    case 'SecondsFromNow':
                        if (this.focusIndex === 0) {
                            this.startVal.dt = this.addSecond(new Date, parseFloat(this.$val.relativeVal))
                            this.startVal.cacheDt = JSON.parse(JSON.stringify(this.startVal.dt))
                            this.startVal.formatDt = this.formatDt(this.startVal.dt)
                            this.$val = this.startVal
                        } else {
                            this.endVal.dt = this.addSecond(new Date, parseFloat(this.$val.relativeVal))
                            this.endVal.cacheDt = JSON.parse(JSON.stringify(this.endVal.dt))
                            this.endVal.formatDt = this.formatDt(this.endVal.dt)
                            this.$val = this.endVal
                        }
                        break
                    case 'MinutesFromNow':
                        if (this.focusIndex === 0) {
                            this.startVal.dt = this.addMinute(new Date, parseFloat(this.$val.relativeVal))
                            this.startVal.cacheDt = JSON.parse(JSON.stringify(this.startVal.dt)) 
                            this.startVal.formatDt = this.formatDt(this.startVal.dt)
                            this.$val = this.startVal
                        } else {
                            this.endVal.dt = this.addMinute(new Date, parseFloat(this.$val.relativeVal))
                            this.endVal.cacheDt = JSON.parse(JSON.stringify(this.endVal.dt)) 
                            this.endVal.formatDt = this.formatDt(this.endVal.dt)
                            this.$val = this.endVal
                        }
                        break
                    case 'HoursFromNow':
                        if (this.focusIndex === 0) {
                            this.startVal.dt = this.addHour(new Date, parseFloat(this.$val.relativeVal))
                            this.startVal.cacheDt = JSON.parse(JSON.stringify(this.startVal.dt)) 
                            this.startVal.formatDt = this.formatDt(this.startVal.dt)
                            this.$val = this.startVal
                        } else {
                            this.endVal.dt = this.addHour(new Date, parseFloat(this.$val.relativeVal))
                            this.endVal.cacheDt = JSON.parse(JSON.stringify(this.endVal.dt)) 
                            this.endVal.formatDt = this.formatDt(this.endVal.dt)
                            this.$val = this.endVal
                        }
                        break
                    case 'DaysFromNow':
                        if (this.focusIndex === 0) {
                            this.startVal.dt = this.addDate(new Date, parseFloat(this.$val.relativeVal))
                            this.startVal.cacheDt = JSON.parse(JSON.stringify(this.startVal.dt)) 
                            this.startVal.formatDt = this.formatDt(this.startVal.dt)
                            this.$val = this.startVal
                        } else {
                            this.endVal.dt = this.addDate(new Date, parseFloat(this.$val.relativeVal))
                            this.endVal.cacheDt = JSON.parse(JSON.stringify(this.endVal.dt)) 
                            this.endVal.formatDt = this.formatDt(this.endVal.dt)
                            this.$val = this.endVal
                        }
                        break
                    case 'MonthsFromNow':
                        if (this.focusIndex === 0) {
                            this.startVal.dt = this.addMonth(new Date, parseFloat(this.$val.relativeVal))
                            this.startVal.cacheDt = JSON.parse(JSON.stringify(this.startVal.dt)) 
                            this.startVal.formatDt = this.formatDt(this.startVal.dt)
                            this.$val = this.startVal
                        } else {
                            this.endVal.dt = this.addMonth(new Date, parseFloat(this.$val.relativeVal))
                            this.endVal.cacheDt = JSON.parse(JSON.stringify(this.endVal.dt)) 
                            this.endVal.formatDt = this.formatDt(this.endVal.dt)
                            this.$val = this.endVal
                        }
                        break
                    case 'YearsFromNow':
                        if (this.focusIndex === 0) {
                            this.startVal.dt = this.addYear(new Date, parseFloat(this.$val.relativeVal))
                            this.startVal.cacheDt = JSON.parse(JSON.stringify(this.startVal.dt)) 
                            this.startVal.formatDt = this.formatDt(this.startVal.dt)
                            this.$val = this.startVal
                        } else {
                            this.endVal.dt = this.addYear(new Date, parseFloat(this.$val.relativeVal))
                            this.endVal.cacheDt = JSON.parse(JSON.stringify(this.endVal.dt)) 
                            this.endVal.formatDt = this.formatDt(this.endVal.dt)
                            this.$val = this.endVal
                        }
                        break
                }
                this.$emit('input', [this.startVal.dt, this.endVal.dt])
                this.$emit('change', [this.startVal.dt, this.endVal.dt])
            }
        },
        handleCalcRoundDt() {
            let dateInfo
            switch (this.$val.relativeType) {
                case 'SecondsAgo':
                case 'SecondsFromNow':
                    break
                case 'MinutesAgo':
                case 'MinutesFromNow':
                    if (this.focusIndex === 0) {
                        dateInfo = this.getDateInfo(this.startVal.dt || new Date)
                        if (this.$val.openRound) {
                            this.startVal.dt = this.setDt(new Date, dateInfo.year, dateInfo.month, dateInfo.date, dateInfo.hours, dateInfo.minutes, 0)
                        } else {
                            this.startVal.dt = this.startVal.cacheDt
                        }
                        this.startVal.formatDt = this.formatDt(this.startVal.dt)
                        this.$val = this.startVal
                    } else {
                        dateInfo = this.getDateInfo(this.endVal.dt || new Date)
                        if (this.$val.openRound) {
                            this.endVal.dt = this.setDt(new Date, dateInfo.year, dateInfo.month, dateInfo.date, dateInfo.hours, dateInfo.minutes, 0)
                        } else {
                            this.endVal.dt = this.endVal.cacheDt
                        }
                        this.endVal.formatDt = this.formatDt(this.endVal.dt)
                        this.$val = this.endVal
                    }
                    break
                case 'HoursAgo':
                case 'HoursFromNow':
                    if (this.focusIndex === 0) {
                        dateInfo = this.getDateInfo(this.startVal.dt || new Date)
                        if (this.$val.openRound) {
                            this.startVal.dt = this.setDt(new Date(), dateInfo.year, dateInfo.month, dateInfo.date, dateInfo.hours, 0, 0)
                        } else {
                            this.startVal.dt = this.startVal.cacheDt
                        }
                        this.startVal.formatDt = this.formatDt(this.startVal.dt)
                        this.$val = this.startVal
                    } else {
                        dateInfo = this.getDateInfo(this.endVal.dt || new Date)
                        if (this.$val.openRound) {
                            this.endVal.dt = this.setDt(new Date(), dateInfo.year, dateInfo.month, dateInfo.date, dateInfo.hours, 0, 0)
                        } else {
                            this.endVal.dt = this.endVal.cacheDt
                        }
                        this.endVal.formatDt = this.formatDt(this.endVal.dt)
                        this.$val = this.endVal
                    }
                    break
                case 'DaysAgo':
                case 'DaysFromNow':
                    if (this.focusIndex === 0) {
                        dateInfo = this.getDateInfo(this.startVal.dt || new Date)
                        if (this.$val.openRound) {
                            this.startVal.dt = this.setDt(new Date, dateInfo.year, dateInfo.month, dateInfo.date, 0, 0, 0)
                        } else {
                            this.startVal.dt = this.startVal.cacheDt
                        }
                        this.startVal.formatDt = this.formatDt(this.startVal.dt)
                        this.$val = this.startVal
                    } else {
                        dateInfo = this.getDateInfo(this.endVal.dt || new Date)
                        if (this.$val.openRound) {
                            this.endVal.dt = this.setDt(new Date, dateInfo.year, dateInfo.month, dateInfo.date, 0, 0, 0)
                        } else {
                            this.endVal.dt = this.endVal.cacheDt
                        }
                        this.endVal.formatDt = this.formatDt(this.endVal.dt)
                        this.$val = this.endVal
                    }
                    break
                case 'MonthsAgo':
                case 'MonthsFromNow':
                    if (this.focusIndex === 0) {
                        dateInfo = this.getDateInfo(this.startVal.dt || new Date)
                        if (this.$val.openRound) {
                            this.startVal.dt = this.setDt(new Date, dateInfo.year, dateInfo.month, 1, 0, 0, 0)
                        } else {
                            this.startVal.dt = this.startVal.cacheDt
                        }
                        this.startVal.formatDt = this.formatDt(this.startVal.dt)
                        this.$val = this.startVal
                    } else {
                        dateInfo = this.getDateInfo(this.endVal.dt || new Date)
                        if (this.$val.openRound) {
                            this.endVal.dt = this.setDt(new Date, dateInfo.year, dateInfo.month, 1, 0, 0, 0)
                        } else {
                            this.endVal.dt = this.endVal.cacheDt
                        }
                        this.endVal.formatDt = this.formatDt(this.endVal.dt)
                        this.$val = this.endVal
                    }
                    break
                case 'YearsAgo':
                case 'YearsFromNow':
                    if (this.focusIndex === 0) {
                        dateInfo = this.getDateInfo(this.startVal.dt || new Date)
                        if (this.$val.openRound) {
                            this.startVal.dt = this.setDt(new Date, dateInfo.year, 0, 1, 0, 0, 0)
                        } else {
                            this.startVal.dt = this.startVal.cacheDt
                        }
                        this.startVal.formatDt = this.formatDt(this.startVal.dt)
                        this.$val = this.startVal
                    } else {
                        dateInfo = this.getDateInfo(this.endVal.dt || new Date)
                        if (this.$val.openRound) {
                            this.endVal.dt = this.setDt(new Date, dateInfo.year, 0, 1, 0, 0, 0)
                        } else {
                            this.endVal.dt = this.endVal.cacheDt
                        }
                        this.endVal.formatDt = this.formatDt(this.endVal.dt)
                        this.$val = this.endVal
                    }
                    break
            }
            this.$emit('input', [this.startVal.dt, this.endVal.dt])
            this.$emit('change', [this.startVal.dt, this.endVal.dt])
        }
    },

    created() {
        this.$val = this.startVal
        this.type = this.relativeTypeList[0]
        this.relativeType = this.type.value
        this.$forceUpdate()
    },

    mounted() {
        window.addEventListener('click', this.clickOutside)
    },
    destroyed() {
        window.removeEventListener('click', this.clickOutside)
    }
}
</script>
<style lang='less' scoped>
@import url('../assets/index.less');

.xw-date {
    width: 400px;
    display: flex;
    flex-direction: column;
    padding-left: 200px;
    .input-container {
        display: flex;
        background: #010811;
        border: 1px solid #00529e;
        .input {
            position: relative;
            width: 185px;
            cursor: pointer;
            .line {
                display: block;
                position: absolute;
                width: 0;
                height: 3px;
                background-color: #1890ff;
                left: 0;
                bottom: -1px;
                transition: all .3s;
                &.active {
                    width: 100%;
                }
            }
        }
        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 15px;
            color: #1890ff;
            padding: 0 10px;
        }
    }
}
.now-tab-desc {
    opacity: 0.6;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
}
.btn-set-now {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 370px;
    height: 32px;
    opacity: 1;
    background: linear-gradient(90deg,#3baeff, #359bff 51%, #2e87ff);
    border-radius: 2px;
    cursor: pointer;
}
</style>