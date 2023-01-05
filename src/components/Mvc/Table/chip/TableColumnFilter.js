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
  },
  expose: ['getColumn', 'getColumns', 'setColumn', 'getOptionsName'],
  render(ctx) {
    const columnName = ctx.tableName + '_Column';
    let defaultSlots = [];
    if (this.deep) {
      if (this.$slots.default()[0].children[0]) {
        defaultSlots = this.$slots.default()[0].children[0].children;
      }
    } else {
      defaultSlots = this.$slots.default()[0].children;
    }
    // 获取本地缓存的options
    const localOptions = JSON.parse(localStorage.getItem(columnName));
    let slots = [];
    let options = [];
    // 存在本地缓存
    if (localOptions?.length && defaultSlots?.length) {
      // 比对缓存
      defaultSlots.forEach((it, i) => {
        const has = localOptions.filter((ft) => ft.label === it.props.label)[0];
        if (has) {
          it.props.sort = has.sort;
          it.props.fixed = has.fixed;

          // 存在column缓存
          if (has.visible) {
            it.props.visible = true;
            slots.push(it);
          } else {
            it.props.visible = false;
          }
        } else {
          it.props.visible = true;
          slots.push(it);
        }
        options.push(it.props);
      });
      slots = slots.sort((a, b) => a.props.sort - b.props.sort);
    } else {
      // 不存在缓存，则设立全部缓存
      defaultSlots.forEach((it, i) => {
        const props = {
          visible: true,
          sort: i,
          ...it.props,
        };
        options.push(props);
        it.props = props;
        slots.push(it);
      });
      if (this.tableName) {
        localStorage.setItem(columnName, JSON.stringify(options));
      }
    }
    this.options = options.sort((a, b) => a.sort - b.sort);
    slots = slots.sort((a, b) => a.props.sort - b.props.sort);
    return slots;
  },
});
