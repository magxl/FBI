const files = import.meta.glob('./area/*.js', { eager: true });

export default Object.keys(files)
  .map((it) => {
    const name = it.match(/area\/(\S*).js/)[1];
    return {name,...files[it].default};
  })
  .sort((a, b) => a.sort - b.sort);
