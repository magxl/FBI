import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import defineOptions from 'unplugin-vue-define-options/vite';
// import eslintPlugin from 'vite-plugin-eslint';
import compressPlugin from 'vite-plugin-compression';
import autoImport from 'unplugin-auto-import/vite';
export default defineConfig({
  lintOnSave: true,
  server: {
    port: 8100,
    open: true,
    host: '0.0.0.0',
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:9099/',
    //     changeOrigin: true,
    //     // rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: false,
      },
    },
    rollupOptions: {
      output: {
        //对静态文件进行打包处理（文件分类）
        //此处图片路径报错
        // chunkFileNames: 'assets/js/[name]-[hash].js',
        // entryFileNames: 'assets/js/[name]-[hash].js',
        // assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    autoImport({
      include:[/\.vue$/,/\.vue\?vue/],
      imports: [
        'vue',
        'vue-router'
      ]
    }),
    defineOptions(),
    // ElementPlus({
    // }),
    compressPlugin({
      //gzip
      verbose: true,
      disable: false,
      deleteOriginFile: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  resolve: {
    alias: {
      '@': '/src/',
      '@cpt': '/src/components/',
      '@views': '/src/views/',
      '@js': '/src/js/',
      '@img': '/src/assets/img/',
    },
    dedupe: ['vue'],
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/assets/css/var.scss";',
      },
    },
  },
});
