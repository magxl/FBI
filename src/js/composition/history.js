const setHistory = ({ history, currentHistory, name, label }) => {
  // name: 存储名称
  // label: 回显标签
  history.unshift({
    label,
    value: currentHistory,
  });
  const item = JSON.stringify(history);
  localStorage.setItem(`${name}History`, item);
};

const delHistory = ({ history, i, name }) => {
  history.splice(i, 1);
  localStorage.setItem(`${name}History`, JSON.stringify(history));
};

const getHistory = ({ name, key = 'history', state }) => {
  const history = JSON.parse(localStorage.getItem(`${name}History`));
  if (history) {
    state[key] = history;
  }
};
const useHistory = {
  getHistory,
  setHistory,
  delHistory,
};
export default useHistory;
