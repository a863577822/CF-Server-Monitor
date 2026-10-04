import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises'

// A third-party theme contains only index.html and assets/. The Worker serves OS/flag icons.
await build({
  configFile: false,
  plugins: [vue()],
  base: './',
  publicDir: false,
  define: { 'import.meta.env.VITE_PULSE_THEME': JSON.stringify('true') },
  build: { outDir: 'dist-pulse', assetsDir: 'assets', emptyOutDir: true }
})
await mkdir('dist-pulse/assets/files', { recursive: true })
for (const file of ['leaflet.js', 'leaflet.css', 'world.zh.json']) {
  await copyFile(`public/files/${file}`, `dist-pulse/assets/files/${file}`)
}
let html = await readFile('dist-pulse/index.html', 'utf8')
html = html.replace(/\s*<link rel="icon"[^>]*>/, '')
await writeFile('dist-pulse/index.html', html)
