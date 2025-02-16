import { Option } from "admin-bundle/shared/types";
import { AdminAddButton, AdminSelect, AdminTabs } from "admin-bundle/shared/ui";

import cls from "./AdminHeader.module.scss";

interface Props {
  title: string;
  handleAddOpenModal?: () => void;
  tabs?: string[];
  sorting?: Option;
  options?: Option[];
  handleSortingChange?: (value: Option) => void;
}

const AdminHeader = ({
  title,
  handleAddOpenModal,
  tabs,
  sorting,
  options,
  handleSortingChange,
}: Props) => {
  return (
    <div className={cls.headerWrapper}>
      <div className={cls.titleWrapper}>
        <p className={cls.title}>{title}</p>
        {handleAddOpenModal ? (
          <AdminAddButton onClick={handleAddOpenModal} />
        ) : null}
        {tabs ? <AdminTabs tabs={tabs} /> : null}
      </div>
      {options && sorting ? (
        <AdminSelect
          className={cls.sorting}
          placeholder=""
          options={options}
          onChange={handleSortingChange}
          defaultValue={sorting.value}
        />
      ) : null}
    </div>
  );
};

export default AdminHeader;
