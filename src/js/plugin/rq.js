import axios from 'axios';
import { store } from '@js/pinia/index.js';
import { ElMessage } from 'element-plus';
const baseURL = import.meta.env.BASEURL;
const service = axios.create({
  baseURL,
  timeout: 10 * 1000,
});
let pending = []; // 请求栈
const CancelToken = axios.CancelToken;
const abortPending = (config) => {
  // 多次请求阻断
  const trq = config.url + '_' + config.method + '_' + config.ex;
  const samerq = [];
  if (pending.length) {
    for (let k in pending) {
      if (pending[k].v === trq) {
        samerq.push(k);
      }
    }
  }
  if (samerq.length > 0) {
    pending[samerq[0]].cb();
    pending.splice(samerq[0], 1);
    console.info('abortPending');
  }
};
const delPending = (config) => {
  // 请求删除
  if (config?.url) {
    // 主动终止拦截
    const trq = config.url + '_' + config.method + '_' + config.ex;
    for (let k in pending) {
      if (pending[k].v === trq) {
        pending.splice(k, 1);
        break;
      }
    }
  }
};
service.interceptors.request.use(
  (config) => {
    // 请求配置
    const { login } = store.launch();
    const { token = '' } = login;
    const Authorization = token ? `Bearer ${token}` : undefined;
    config.headers = config.headers || {};
    config.headers = {
      ...config.headers,
      Authorization,
    };
    abortPending(config);
    config.cancelToken = new CancelToken((cb) => {
      pending.push({
        v: config.url + '_' + config.method + '_' + config.ex,
        cb,
      });
    });
    return config;
  },
  (err) => {
    console.info('请求错误', err);
    Promise.reject(err);
  },
);
service.interceptors.response.use(
  ({ data, config }) => {
    // 响应配置
    let { code, message: msg } = data;
    msg = msg || '未知错误';
    if (code === 200) {
      if (config.showMsg) {
        ElMessage.success(msg);
      }
      // 完成请求即删除监听
      delPending(config);
    } else {
      // 令牌过期，特殊拦截
      // dom获取多个提示拦截
      // const relogin = document.getElementsByClassName('relogin');
      // if (!relogin.length || relogin[0].parentNode.style.display === 'none') {
      //   ElMessageBox.confirm('令牌已过期，是否重新登录？', {
      //     customClass: 'relogin',
      //     confirmButtonText: '登录',
      //     cancelButtonText: '取消',
      //     type: 'warning',
      //   }).then(() => {
      //     location.reload();
      //   });
      // }
      if (config.showMsg) {
        ElMessage.error(msg);
      }
    }

    return data;
  },
  (error) => {
    // 错误请求抛出监听
    console.info('响应错误', error);
    delPending(error.config);
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = '400-请求错误';
          break;
        case 401:
          error.message = '401-未授权';
          break;
        case 403:
          error.message = '403-禁止访问';
          break;
        case 404:
          error.message = '404-无资源';
          break;
        case 405:
          error.message = '405-不允许请求';
          break;
        case 406:
          error.message = '406-不接受请求';
          break;
        case 407:
          error.message = '407-需要代理身份';
          break;
        case 408:
          error.message = '408-请求超时';
          break;
        case 409:
          error.message = '409-指令冲突';
          break;
        case 413:
          error.message = '413-请求数据过大';
          break;
        case 414:
          error.message = '414-请求URL过长';
          break;
        case 500:
          error.message = '500-服务器端出错';
          break;
        case 501:
          error.message = '501-未实现';
          break;
        case 502:
          error.message = '502-网关错误';
          break;
        case 503:
          error.message = '503-服务不可用';
          break;
        case 504:
          error.message = '504-网关超时';
          break;
        case 505:
          error.message = '505-http版本不支持';
          break;
        default:
          error.message = `连接错误-${error.response.status}`;
      }
    } else {
      // 超时处理
      if (error.message?.includes('timeout')) {
        error.message = '服务器响应超时，请刷新当前页';
      } else {
        error.message = '连接服务器失败';
      }
      return Promise.reject();
    }
    ElMessage.error(error.message);
    // store.commit('launch/hideLoading')
    return Promise.resolve(error.response);
  },
);
const get = function (config) {
  config.method = 'get';
  config.data ? (config.params = config.data) : null;
  return service(config);
};
const post = function (config) {
  config.method = 'post';
  return service(config);
};
const bdrq = function ({ url, data }) {
  return new Promise((resolve) => {
    axios
      .post(url, data, {
        headers: {
          Token: store.state.launch.login.token,
        },
      })
      .then((r) => {
        resolve(r.data);
      });
  });
};
const form = function ({ data, url }) {
  let param = new FormData(); // 创建form对象
  // 通过append向form对象添加数据
  for (let k in data) {
    param.append(k, data[k]);
  }
  return new Promise((resolve) => {
    axios
      .post(baseURL + url, param, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        resolve(res.data);
      });
  });
};
const put = function (config) {
  config.method = 'put';
  config.data ? (config.params = config.data) : null;
  return service(config);
};
const del = function (config) {
  config.method = 'delete';
  config.data ? (config.params = config.data) : null;
  return service(config);
};
const update = function (config) {
  config.method = 'update';
  config.data ? (config.params = config.data) : null;
  return service(config);
};
export default { get, post, put, del, bdrq, update, form };
