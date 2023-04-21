const useNormalColumn = ({
  currency,
  cpm = false,
  download = false,
  lat = false,
  empty = false,
}) => {
  const columns = [
    {
      label: 'Spend',
      prop: 'spend',
      width: 120,
      sortable: true,
      align: 'right',
      formatter: (r) => `${currency}${r.spendFormat || ''}`,
    },
    {
      label: 'AVG CPA',
      prop: 'avgCpa',
      width: 120,
      sortable: true,
      align: 'right',
      formatter: (r) => `${currency}${r.avgCpaFormat || ''}`,
    },
    {
      label: 'AVG CPT',
      prop: 'avgCpt',
      width: 120,
      sortable: true,
      align: 'right',
      formatter: (r) => `${currency}${r.avgCptFormat || ''}`,
    },
    {
      label: 'AVG CPM',
      prop: 'avgCpm',
      width: 120,
      sortable: true,
      align: 'right',
      visible: cpm,
      formatter: (r) => `${currency}${r.avgCpmFormat || ''}`,
    },
    {
      label: 'Impression',
      prop: 'impression',
      width: 120,
      sortable: true,
      align: 'right',
      formatter: (r) => r.impressionFormat,
    },
    {
      label: 'Tap',
      prop: 'tap',
      width: 120,
      sortable: true,
      align: 'right',
      formatter: (r) => r.tapFormat,
    },
    {
      label: 'Install',
      prop: 'install',
      width: 120,
      sortable: true,
      align: 'right',
      formatter: (r) => r.installFormat,
    },

    {
      label: 'TTR',
      prop: 'ttr',
      width: 120,
      sortable: true,
      align: 'right',
      formatter: (r) => `${r.ttr || ''}%`,
    },
    {
      label: 'CR',
      prop: 'cr',
      width: 120,
      sortable: true,
      align: 'right',
      formatter: (r) => `${r.cr || ''}%`,
    },

    {
      label: 'New Download',
      prop: 'newDownload',
      width: 136,
      sortable: true,
      align: 'right',
      visible: download,
      formatter: (r) => r.newDownloadFormat,
    },
    {
      label: 'Redownload',
      prop: 'redownload',
      width: 120,
      sortable: true,
      align: 'right',
      visible: download,
      formatter: (r) => r.redownloadFormat,
    },

    {
      label: 'LAT ON',
      prop: 'latOn',
      width: 120,
      sortable: true,
      align: 'right',
      visible: lat,
      formatter: (r) => r.latOnFormat,
    },
    {
      label: 'LAT OFF',
      prop: 'latOff',
      width: 120,
      sortable: true,
      align: 'right',
      visible: lat,
      formatter: (r) => r.latOffFormat,
    },
  ];
  if (empty) {
    columns.push(useEmptyColumn());
  }
  return columns;
};

const useEmptyColumn = () => {
  return {
    label: '-',
  };
};

export { useNormalColumn, useEmptyColumn };
