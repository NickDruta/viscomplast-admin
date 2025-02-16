import cls from "./AdminCheckbox.module.scss";
import { CheckboxIcon } from "admin-bundle/shared/assets";

interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const AdminCheckbox = ({ label, selected, onClick }: Props) => {
  return (
    <div className={cls.checkboxWrapper} onClick={onClick}>
      <div className={cls.checkbox}>
        <CheckboxIcon selected={selected} />
      </div>
      <label className={cls.label}>{label}</label>
    </div>
  );
};

export default AdminCheckbox;
