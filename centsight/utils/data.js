export const transactionTableColumns = [
  {
    name: 'DATE',
    uid: 'date',
    sortable: 'true',
  },
  {
    name: 'AMOUNT',
    uid: 'amount',
    sortable: 'true',
  },
  {
    name: 'NOTE',
    uid: 'note',
  },
  {
    name: 'SENDING',
    uid: 'account_from_id',
  },
  {
    name: 'RECEIVING',
    uid: 'account_to_id',
  },
  {
    name: 'CATEGORY',
    uid: 'category',
  },
  {
    name: 'SUBCATEGORY',
    uid: 'subcategory',
  },

  {
    name: 'ACTIONS',
    uid: 'actions',
  },
];

export const dashboardTransactionTableColumns = [
  {
    name: 'DATE',
    uid: 'date',
    width: '14%',
  },
  {
    name: 'AMOUNT',
    uid: 'amount',
    width: '12%',
    align: 'end',
  },
  {
    name: 'NOTE',
    uid: 'note',
    width: '24%',
  },
  {
    name: 'SENDING',
    uid: 'account_from_id',
    width: '10%',
  },
  {
    name: 'RECEIVING',
    uid: 'account_to_id',
  },
  {
    name: 'CATEGORY',
    uid: 'category',
    align: 'center',
  },
  {
    name: 'SUBCATEGORY',
    uid: 'subcategory',
    align: 'center',
  },
];

export const accountsTransactionTableColumns = [
  {
    name: 'DATE',
    uid: 'date',
  },
  {
    name: 'AMOUNT',
    uid: 'amount',
  },
  {
    name: 'NOTE',
    uid: 'note',
  },
  {
    name: 'CATEGORY',
    uid: 'category',
  },
  {
    name: 'SUBCATEGORY',
    uid: 'subcategory',
  },
];
