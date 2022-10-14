import { defineComponent, h } from 'vue';

/**
 * table列自动显示隐藏控制组件
 **/
export default defineComponent({
  props: {
    effect: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      /** 列数组映射的控制数组 */
      columns_option: {
        filterable: true,
        visible: true,
        label: '',
        props: '',
      },
    };
  },
  methods: {
    /** 自动处理所有列插槽内容 */
    initColumns() {
      if (!this.$slots.default) {
        throw new Error('[x-table-column-filter] need a default slot');
      }
      console.info(this.$slots.default()[0]);
      this.columns_option = this.$slots.default()[0].children.map((it) => {
        return {
          filterable: it?.name === 'ElTableColumn',
          visible: true,
          label: it.props?.label,
          props: it.props,
        };
      });
    },
    /** 获取列数组映射的控制数组 */
    getColumnOptions() {
      const unfilter = ['id'];
      const options = [];
      this.columns_option.forEach((it) => {
        if (unfilter.indexOf(it.props.prop) === -1 && it.props.prop) {
          options.push(it);
        }
      });
      return options;
    },
  },
  expose: ['getColumnOptions', 'initColumns'],
  render() {
    if (!this.$slots.default) {
      throw new Error('[x-table-column-filter] need a default slot');
    }
    let slots = this.$slots.default();
    this.initColumns();
    return h(() => {
      if (!this.effect) {
        return slots;
      }
      // 根据映射的控制数组实现对列的过滤
      let result = [];
      this.columns_option?.forEach((it, index) => {
        if (it.visible && slots[index]) result.push(slots[index]);
      });
      return result;
    });
  },
});
