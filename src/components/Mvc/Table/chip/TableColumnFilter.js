import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TableColumnFilter',
  props: {
    tableName: {
      type: String,
      default: '',
    },
    deep: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      options: [],
    };
  },
  computed: {
    columnName() {
      return this.tableName + '_Column';
    },
  },
  methods: {
    getColumn() {
      const options = this.options;
      const fixed = {
        left: [],
        center: [],
        right: [],
      };
      options.forEach((it) => {
        if (it.fixed) {
          fixed[it.fixed].push(it);
        } else {
          fixed.center.push(it);
        }
      });
      return fixed;
    },
    getColumns() {
      return this.options;
    },
    getOptionsName() {
      return this.tableName;
    },
    setColumn() {
      this.$forceUpdate();
    },
    sortSlots(slots) {
      return slots.sort((a, b) => a.props.sort - b.props.sort);
    },
    initSlots(slots) {
      const options = [];
      const visibleSlots = [];
      slots = slots.sort((a, b) => a.props.sort - b.props.sort);
      slots.forEach((it) => {
        options.push(it.props);
        if (it.props.visible !== false) {
          it.props.visible = true;
          visibleSlots.push(it);
        }
      });
      this.options = options;
      this.setStorage();

      return visibleSlots;
    },
    setStorage() {
      const { columnName } = this;
      if (this.tableName) {
        localStorage.setItem(columnName, JSON.stringify(this.options));
      }
    },
  },
  expose: ['getColumn', 'getColumns', 'setColumn', 'getOptionsName'],
  render(ctx) {
    // console.info('render', ctx.tableName);
    const columnName = ctx.tableName + '_Column';
    let defaultSlots = [];
    if (this.deep) {
      if (this.$slots.default()[0].children[0]) {
        defaultSlots = this.$slots.default()[0].children[0].children;
      }
    } else {
      defaultSlots = this.$slots.default()[0].children;
      let trueSlots = [];
      defaultSlots.forEach((it) => {
        const type = window.$getType(it.type);
        if (type === 'Symbol') {
          trueSlots = trueSlots.concat(it.children);
        } else if (it.type.name === 'ElTableColumn') {
          trueSlots.push(it);
        }
      });
      defaultSlots = trueSlots;
    }
    // 获取本地缓存的options
    const localOptions = JSON.parse(localStorage.getItem(columnName));
    const slots = [];
    // 存在本地缓存
    if (localOptions?.length && defaultSlots?.length) {
      // 比对缓存
      defaultSlots.forEach((it, i) => {
        it.props.sort = i;
        // 初始化多语言表头
        if (it.props.label) {
          it.props.olabel = it.props.label;
          it.props.label = window.$l(it.props.label);
        }
        const has = localOptions.filter1((ft) => {
          return ft.olabel === it.props.label;
        }).data;
        if (has) {
          // 存在column缓存, 使用缓存配置
          it.props = {
            ...it.props,
            ...has,
          };
        }
        slots.push(it);
      });
    } else {
      // 不存在缓存，则设立全部缓存
      defaultSlots.forEach((it, i) => {
        const props = {
          visible: true,
          sort: i,
          ...it.props,
        };
        // type: selection, index
        if (it.props.label) {
          props.olabel = it.props.label;
          props.label = window.$l(it.props.label);
        }
        it.props = props;
        slots.push(it);
      });
    }
    const r = this.initSlots(slots);
    return r;
  },
});
