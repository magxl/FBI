console.info('worker tableList');
onmessage = (r) => {
  const { list, start, end } = r.data;
  const v = list.slice(start, end);
  postMessage(JSON.stringify(v));
  close();
};
