# yirujet-date-picker-range
Vue仿kibana的日期选择组件

# 使用说明
1. 入口文件中引入组件定义  
import 'yirujet-date-picker-range'  
import 'yirujet-date-picker-range/dist/xw-date-picker.css'

2. 模板中使用
<xw-date v-model="dt" @change="test"></xw-date>

# 组件参数及接口
| 参数名称 | 参数类型 |
| :------:   | :------: |
| value | v-model | Array |
| change | function([startDt, endDt]) | 