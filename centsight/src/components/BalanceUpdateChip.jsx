import { Chip } from "@heroui/react";
const BalanceUpdateChip = (props) => {
  let style;
  switch (props.case) {
    case 'income':
      style = { prefix: '+$', color: 'success' };
      break;
    case 'transfer':
      style = { prefix: '$', color: 'warning' };
      break;
    case 'expense':
      style = { prefix: '-$', color: 'danger' };
      break;
    case 'zero':
      style = { prefix: '$', color: 'default' };
      break;
  }
  return (
    <Chip color={style.color} variant="flat">
      {style.prefix +
        props.amount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
    </Chip>
  );
};

export default BalanceUpdateChip;
