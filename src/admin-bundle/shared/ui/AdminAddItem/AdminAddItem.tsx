import { AdminAddButton } from "admin-bundle/shared/ui";
import cls from "./AdminAddItem.module.scss";
import clsx from "clsx";

interface Props {
  onClick: VoidFunction;
  className?: string;
}

const AdminAddItem = ({ onClick, className }: Props) => {
  return (
    <div className={clsx(cls.wrapper, className)} onClick={onClick}>
      <AdminAddButton />
    </div>
  );
};

export default AdminAddItem;
