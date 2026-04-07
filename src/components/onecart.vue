<!-- 视频日期组件 -->
 <template>
  <div class="calendar">
    <slot></slot>
  </div>
 </template>
 <!-- Calendar.vue - 日历组件 -->
<template>
  <div class="calendar">
    <!-- 1. 头部区域：年月切换 -->
    <div class="calendar-header">
      <slot name="header" :year="currentYear" :month="currentMonth" :prevMonth="prevMonth" :nextMonth="nextMonth">
        <!-- 默认头部 -->
        <button @click="prevMonth">◀</button>
        <span>{{ currentYear }}年 {{ currentMonth }}月</span>
        <button @click="nextMonth">▶</button>
      </slot>
    </div>

    <!-- 2. 星期标题：周一到周日 -->
    <div class="calendar-weekdays">
      <slot name="weekdays" :weekdays="weekdays">
        <div v-for="day in weekdays" :key="day" class="weekday">
          {{ day }}
        </div>
      </slot>
    </div>

    <!-- 3. 日期网格 -->
    <div class="calendar-days">
      <div 
        v-for="(day, index) in days" 
        :key="index"
        class="calendar-day"
        :class="{
          'other-month': day.isOtherMonth,
          'today': day.isToday,
          'selected': day.isSelected
        }"
      >
        <!-- 作用域插槽：传递每一天的数据 -->
        <slot 
          name="day" 
          :day="day" 
          :date="day.date"
          :isOtherMonth="day.isOtherMonth"
          :isToday="day.isToday"
          :isSelected="day.isSelected"
        >
          <!-- 默认显示日期数字 -->
          <span class="day-number">{{ day.day }}</span>
        </slot>
      </div>
    </div>

    <!-- 4. 底部区域：额外信息 -->
    <div class="calendar-footer">
      <slot name="footer" :selectedDate="selectedDate">
        <div class="default-footer">
          已选择：{{ selectedDate || '未选择' }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Date, default: null }  // 选中的日期
})

const emit = defineEmits(['update:modelValue', 'select'])

// 当前显示的年份和月份
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)

// 星期标题
const weekdays = ['一', '二', '三', '四', '五', '六', '日']

// 选中的日期
const selectedDate = ref(props.modelValue)

// 生成日历数据
const days = computed(() => {
  // 计算当月第一天是周几
  const firstDay = new Date(currentYear.value, currentMonth.value - 1, 1)
  const firstDayWeek = firstDay.getDay() || 7  // 周一为1，周日为7
  
  // 计算上月需要显示的天数
  const prevMonthDays = firstDayWeek - 1
  
  // 获取当月天数
  const currentMonthDays = new Date(currentYear.value, currentMonth.value, 0).getDate()
  
  // 计算下月需要显示的天数（42格 - 已用格数）
  const totalCells = 42  // 6行 x 7列
  const nextMonthDays = totalCells - prevMonthDays - currentMonthDays
  
  const daysArray = []
  const today = new Date()
  
  // 添加上月日期
  const prevMonthDate = new Date(currentYear.value, currentMonth.value - 1, 0)
  const prevMonthDaysCount = prevMonthDate.getDate()
  for (let i = prevMonthDays; i > 0; i--) {
    const date = new Date(currentYear.value, currentMonth.value - 2, prevMonthDaysCount - i + 1)
    daysArray.push({
      day: prevMonthDaysCount - i + 1,
      date: date,
      isOtherMonth: true,
      isToday: false,
      isSelected: false
    })
  }
  
  // 添加当月日期
  for (let i = 1; i <= currentMonthDays; i++) {
    const date = new Date(currentYear.value, currentMonth.value - 1, i)
    daysArray.push({
      day: i,
      date: date,
      isOtherMonth: false,
      isToday: today.toDateString() === date.toDateString(),
      isSelected: selectedDate.value && selectedDate.value.toDateString() === date.toDateString()
    })
  }
  
  // 添加下月日期
  for (let i = 1; i <= nextMonthDays; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)
    daysArray.push({
      day: i,
      date: date,
      isOtherMonth: true,
      isToday: false,
      isSelected: false
    })
  }
  
  return daysArray
})

// 切换月份
const prevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

// 选择日期
const selectDate = (date) => {
  selectedDate.value = date
  emit('update:modelValue', date)
  emit('select', date)
}
</script>

<style scoped>
.calendar {
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
}

.weekday {
  padding: 10px;
  background: #f5f5f5;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  aspect-ratio: 1;
  padding: 8px;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}

.calendar-day:hover {
  background: #f0f0f0;
}

.other-month {
  color: #ccc;
}

.today {
  background: #e3f2fd;
  font-weight: bold;
}

.selected {
  background: #42b983;
  color: white;
}

.day-number {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
}

.calendar-footer {
  margin-top: 20px;
  padding: 10px;
  border-top: 1px solid #eee;
  text-align: center;
}
</style>