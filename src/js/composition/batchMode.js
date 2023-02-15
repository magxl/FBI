import { ref, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus';

export function batchMode({ run, selection, list, cb }) {
  // 开关
  const useRun = ref(run);
  const batch = reactive({
    index: -1,
    status: 'stop',
    fail: 0,
    failList: [],
    success: 0,
    successList: [],
    repeat: 0,
    repeatList: [],
    selection,
  });
  const initBatch = async () => {
    // 初始化
    batch.status = 'start';
    batch.fail = 0;
    batch.failList = [];
    batch.success = 0;
    batch.successList = [];
    batch.repeat = 0;
    batch.repeatList = [];
    batch.selection = selection;
    // 排队，等待处理
    list = list.map((it) => {
      it.submitStatus = 'Waiting';
      return it;
    });
    // 开始处理
    batchRun();
  };
  const batchRun = async () => {
    batch.index++;
    console.info('batch run ', batch.index);
    const row = selection[batch.index];

    // list内index
    let i = null;
    try {
      state.list.forEach((ft, f) => {
        if (ft.key === row.key) {
          i = f;
          throw new Error();
        }
      });
    } catch (r) {}
    // 预制 提交状态
    proxy.$refs.table.editRow({ i, row: { submitStatus: 'Submiting...' } });

    await cb({ row, batch, i });
    if (batch.index === batch.selection.length - 1) {
      console.info('Stop');
      batchStop();
    } else {
      batchRun();
    }
    return {
      status: batch.status,
      fail: batch.fail,
      failList: batch.failList,
      success: batch.success,
      successList: batch.successList,
      repeat: batch.repeat,
      repeatList: batch.repeatList,
    };
  };
  const batchStop = () => {
    batch.status = 'stop';
    ElMessage.success('Batch Completed')
  };

  watch(
    () => useRun.value,
    (n) => {
      if (n) {
        initBatch();
      } else {
        batchStop();
      }
    },
    {
      immediate: true,
    },
  );
}
