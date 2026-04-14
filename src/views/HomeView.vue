<template>
  <div class="home-wrapper">
    <!-- 主页内容 -->
    <div class="home-content">
      <h1>🐁 小白鼠监测管理系统</h1>
      <p class="subtitle">登录成功 | 欢迎使用系统</p>

      <div class="card-group">
        <div class="card">
          <h3>📊 实时数据监测</h3>
          <p>查看小白鼠状态、环境指标、实时曲线</p>
        </div>

        <div class="card">
          <h3>📈 历史数据记录</h3>
          <p>查询历史数据、导出报表、趋势分析</p>
        </div>

        <div class="card">
          <h3>⚙️ 设备管理</h3>
          <p>设备状态控制、参数配置</p>
        </div>

        <div class="card">
          <h3>👤 个人中心</h3>
          <p>账号管理、安全设置</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 不需要任何组件！纯页面，100%不报错
</script>

<style scoped>
.home-wrapper {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #4158d0 0%, #6a11cb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-content {
  text-align: center;
  color: #fff;
  width: 90%;
  max-width: 1000px;
}

.home-content h1 {
  font-size: 46px;
  margin-bottom: 12px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.subtitle {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 50px;
}

.card-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: left;
  border: 1px solid rgba(255,255,255,0.2);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.18);
}

.card h3 {
  font-size: 22px;
  margin: 0 0 10px 0;
}

.card p {
  opacity: 0.85;
  margin: 0;
  font-size: 15px;
}
</style>
