import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import defineOptions from 'unplugin-vue-define-options/vite';
import eslintPlugin from 'vite-plugin-eslint';
import CompressPlugin from 'vite-plugin-compression';
import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  lintOnSave: true,
  base: './',
  publicDir: './public',
  assetsInclude: 'src/assets',
  server: {
    port: 8100,
    open: true,
    host: '0.0.0.0',
    proxy: {
      '/ann9': {
        target: 'https://www.ann9.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/ann9/, 'https://www.ann9.com/'),
      },
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // drop_console: true,
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
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/],
      imports: ['vue', 'vue-router'],
      // resolvers: [
      //   ElementPlusResolver({
      //     importStyle: 'scss',
      //   }),
      // ],
    }),
    // eslintPlugin({
    //   include:['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
    // }),
    // Components({
    //   resolvers: [
    //     ElementPlusResolver({
    //       importStyle: 'scss',
    //     }),
    //   ],
    // }),
    defineOptions(),
    CompressPlugin({
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
      '@cps': '/src/js/composition/',
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
