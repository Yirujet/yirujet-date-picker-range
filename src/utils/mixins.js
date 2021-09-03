export default {
    methods: {
        getElPosition(el) {
            const { left, top } = el.getBoundingClientRect()
            return { left, top }
        },
        /**
         * 获取日期详细信息
         */
        getDateInfo(dt = new Date()) {
            dt = new Date(dt)
            return {
                year: dt.getFullYear(),
                month: dt.getMonth(),
                date: dt.getDate(),
                hours: dt.getHours(),
                minutes: dt.getMinutes(),
                seconds: dt.getSeconds()
            }
        },
        /**
         * 计算日期
         * @param dt
         * @param offsetYears
         * @param offsetMonths
         * @param offsetDates
         * @param offsetHours
         * @param offsetMinutes
         * @param offsetSeconds
         * @returns
         */
        calcDt(dt, offsetYears, offsetMonths, offsetDates, offsetHours, offsetMinutes, offsetSeconds) {
            dt = new Date(dt)
            const year = dt.getFullYear()
            const month = dt.getMonth()
            const date = dt.getDate()
            const hour = dt.getHours()
            const minutes = dt.getMinutes()
            const seconds = dt.getSeconds()
            return new Date(
                year + offsetYears,
                month + offsetMonths,
                date + offsetDates,
                hour + offsetHours,
                minutes + offsetMinutes,
                seconds + offsetSeconds
            )
        },
        /**
         * 计算日期 - 年
         * @param dt
         * @param offsetYears
         * @returns
         */
        addYear(dt, offsetYears) {
            return this.calcDt(dt, offsetYears, 0, 0, 0, 0, 0)
        },
        /**
         * 计算日期 - 月
         * @param dt
         * @returns
         */
        addMonth(dt, offsetMonths) {
            return this.calcDt(dt, 0, offsetMonths, 0, 0, 0, 0)
        },
        /**
         * 计算日期 - 日
         * @param dt
         * @returns
         */
        addDate(dt, offsetDates) {
            return this.calcDt(dt, 0, 0, offsetDates, 0, 0, 0)
        },
        /**
         * 计算日期 - 时
         * @param dt
         * @returns
         */
        addHour(dt, offsetHours) {
            return this.calcDt(dt, 0, 0, 0, offsetHours, 0, 0)
        },
        /**
         * 计算日期 - 分
         * @param dt
         * @returns
         */
        addMinute(dt, offsetMinutes) {
            return this.calcDt(dt, 0, 0, 0, 0, offsetMinutes, 0)
        },
        /**
         * 计算日期 - 秒
         * @param dt
         * @returns
         */
        addSecond(dt, offsetSeconds) {
            return this.calcDt(dt, 0, 0, 0, 0, 0, offsetSeconds)
        },
        /**
         * 获取传入日期所在月份第一天日期
         * @param dt
         * @returns
         */
        getFirstDtInMonth(dt = new Date()) {
            dt = new Date(dt)
            const year = dt.getFullYear()
            const month = dt.getMonth()
            return new Date(year, month, 1)
        },
        /**
         * 获取传入日期所在月份最后一天日期
         * @param dt
         * @returns
         */
        getLastDtInMonth(dt = new Date()) {
            dt = new Date(dt)
            const year = dt.getFullYear()
            const month = dt.getMonth()
            return new Date(year, month + 1, 0)
        },
        /**
         * 获取传入日期所在月份的天数
         * @param dt
         */
        getDaysCountInMonth(dt = new Date()) {
            dt = new Date(dt)
            const firstDtInMonth = this.getFirstDtInMonth(dt)
            const firstDtInNextMonth = this.addMonth(firstDtInMonth, 1)
            return (firstDtInNextMonth.getTime() - firstDtInMonth.getTime()) / (24 * 60 * 60 * 1000)
        },
        /**
         * 获取传入日期所在周的所有日期
         * @param dt
         */
        getDatesInWeek(dt = new Date()) {
            dt = new Date(dt)
            const week = dt.getDay()
            const offsetDt = week === 0 ? -6 : 1 - week
            const year = dt.getFullYear()
            const month = dt.getMonth()
            const date = dt.getDate()
            return Array.from({ length: 7 }).map((e, i) => new Date(year, month, date + offsetDt + i))
        },
        /**
         * 获取传入日期所在月份的所有周
         * @param dt
         */
        getWeeksInMonth(dt = new Date()) {
            dt = new Date(dt)
            const firstDtInMonth = this.getFirstDtInMonth(dt)
            const lastDtInMonth = this.getLastDtInMonth(dt)
            let weeksInMonth = [this.getDatesInWeek(firstDtInMonth)]
            let firstDtInWeek
            while ((firstDtInWeek = this.addDate(weeksInMonth.slice(-1)[0][0], 7)) <= lastDtInMonth) {
                weeksInMonth = [...weeksInMonth, this.getDatesInWeek(firstDtInWeek)]
            }
            return weeksInMonth
        },
        /**
         * 格式化日期
         */
        formatDt(dt = new Date()) {
            dt = new Date(dt)
            const { year, month, date, hours, minutes, seconds } = this.getDateInfo(dt)
            const padStart = str => String(str).padStart(2, '0')
            return `${ year }-${ padStart(month + 1) }-${ padStart(date) } ${ padStart(hours) }:${ padStart(minutes) }:${ padStart(seconds) }`
        },
        /**
         * 设置日期
         */
        setDt(dt = new Date(), year, month, date, hours, minutes, seconds) {
            dt = new Date(dt)
            dt.setFullYear(year)
            dt.setMonth(month)
            dt.setDate(date)
            dt.setHours(hours)
            dt.setMinutes(minutes)
            dt.setSeconds(seconds)
            return dt
        }
    },
}