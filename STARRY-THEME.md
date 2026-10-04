# 星夜主题

星空草野背景、半透明深蓝磨砂卡片、柔和文字和缓慢星光动画，适用于 CF-Server-Monitor。支持手机布局、明暗切换、暂停背景动画，以及原有条形、环形、列表、地图和服务器详情。

## 安装

1. 打开监控站点的 `/admin#admin` 并登录后台。
2. 进入「主题商店」，在「自定义主题 URL」填入：

   ```text
   https://github.com/a863577822/CF-Server-Monitor/tree/starry-theme/themes/starry
   ```

3. 点击「应用自定义」。看到「主题切换成功」后刷新首页。
4. 如需默认夜色，在「设置 → 外观 1 → 默认外观」选择「深色」，点击底部「保存配置」。若浏览器已有明暗偏好，可在首页切换到深色。

无需重新部署 Worker，无需填写主题选项 JSON。后台仍使用项目内置页面。

## 源码和构建

本分支同时保存主题源码和 `themes/starry/` 下可直接安装的构建产物。主题目录仅包含 `index.html` 与 `assets/`。

```sh
npm ci
npm run build:starry-theme
```

构建输出到 `dist-pulse/`。将输出的 `index.html` 和 `assets/` 放到 `themes/starry/` 即可更新主题；目录名 `dist-pulse` 保留自第一版开发。

主要文件：

- `src/frontend/components/NightBackdrop.vue`：星光、流星和暂停控制。
- `src/frontend/components/PulseHero.vue`：标题和实时状态。
- `src/frontend/styles/pulse.css`：主题样式与响应式布局。
- `src/frontend/assets/`：本地打包的背景图片与标题字体。
- `scripts/build-pulse-theme.js`：独立主题构建。

将主题作为源码内置皮肤使用时，可在主题选项中设置 `{"starry":true}`；安装上方独立主题时不需要该设置。

## 更新与资源

同一主题 URL 的 Worker 缓存最长可能保留一小时。更新后若需立即切换，可把安装链接中的 `starry-theme` 替换为完整提交 SHA，再点「应用自定义」。

背景和字体随主题打包；旗帜与系统图标继续使用原 Worker 的 `/flags/` 与 `/os-icons/`。主题通过当前监控站点的公开 API 和 WebSocket 读取真实数据。独立跨域托管时仍需按项目文档配置 API 地址和 CORS。

## 验证

独立主题构建通过；已检查 1440px 桌面、390px 手机布局、四种视图、服务器详情、模拟实时更新、动画暂停及明暗切换。
