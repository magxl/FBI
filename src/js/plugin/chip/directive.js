export default {
  install(app) {
    let timer = null;
    const drag = app.directive('drag', {
      mounted(el, binding, vnode) {
        const { value = {} } = binding;
        const { dragMode, ref, cb = () => {} } = value;
        let st,
          et,
          sep = 200;
        let dragAim = el;
        // 判断有没有指定移动的dom，通过data-move进行指定需要移动的父容器
        let checkDragArea = (child) => {
          let { localName, dataset = {} } = child;
          if (dataset.move !== undefined) {
            dragAim = child;
          } else {
            if (localName !== 'body') {
              checkDragArea(child.parentNode);
            }
          }
        };
        timer = setTimeout(() => {
          checkDragArea(el);
        });
        el.onmousedown = function (e) {
          st = new Date().getTime();
          el.setAttribute('data-moving', 'moving');
          let dcw = document.body.offsetWidth;
          let dch = document.body.offsetHeight;
          let left, top;
          let x = e.pageX - dragAim.offsetLeft;
          let y = e.pageY - dragAim.offsetTop;
          document.onmousemove = function (e) {
            if (dragMode === 'v') {
              left = dcw - dragAim.width;
              top = e.pageY - y;
            } else if (dragMode === 'h') {
              left = e.pageX - x;
              top = dch - dragAim.height;
            } else {
              left = e.pageX - x;
              top = e.pageY - y;
            }
            dragAim.style.left = left + 'px';
            dragAim.style.top = top + 'px';
            dragAim.style.right = 'auto';
            dragAim.style.bottom = 'auto';
            cb();
          };
          document.onmouseup = function () {
            et = new Date().getTime();
            if (et - st < sep) {
              el.setAttribute('data-moving', '');
            }
            document.onmousemove = document.onmouseup = null;
            clearTimeout(timer);
          };
        };
      },
      update: (el, binding) => {
        let { value, oldValue } = binding;
        if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
          drag.inserted(el, binding);
        }
      },
    });
    // 滚轴
    let wheelEvent = null;
    const mousewheel = app.directive('wheel', {
      mounted(el, binding, vnode) {
        const { value = {} } = binding;
        let { state } = value;
        wheelEvent = (e) => {
          console.info('wheel event');
          e.preventDefault();
          const { deltaX, deltaY, ctrlKey, screenX, screenY } = e;
          if (ctrlKey) {
            let tz = state.Z - deltaY / 100;
            tz = tz < 0.1 ? 0.1 : tz;
            tz = tz > 10 ? 10 : tz;
            state.Z = tz;
          } else {
            let tx = state.X - deltaX / 1000;
            tx = tx < 0 ? 0 : tx;
            tx = tx > 1 ? 1 : tx;
            state.X = tx;
            let ty = state.Y - deltaY / 1000;
            ty = ty < 0 ? 0 : ty;
            ty = ty > 1 ? 1 : ty;
            state.Y = ty;
          }
          // cb(tx, ty, tz);
          // state.origin = [screenX, screenY];
        };
        el.addEventListener('wheel', wheelEvent);
      },
      unmounted(el) {
        console.info('wheel remove');
        el.removeEventListener('wheel', wheelEvent);
      },
    });
    const checkParentDom = ({ dom, check, end }) => {
      if (dom.parentNode.className.includes(end)) {
        return false;
      }
      if (dom.parentNode.className.includes(check)) {
        return true;
      } else {
        checkParentDom(dom.parentNode);
      }
    };
    app.directive('focus', {
      mounted(el, binding, vnode) {
        const { value = 0, arg = 'time' } = binding;
        let time = 100;
        let index = 0;
        if (arg !== 'time') {
          index = value;
        }else{
          time = value;
        }
        const timer = setTimeout(() => {
          const doms = el.querySelectorAll('input');
          doms[index].focus();
          clearTimeout(timer);
        }, time);
      },
    });
  },
};
