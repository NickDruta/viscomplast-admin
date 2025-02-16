import { useEffect, useState } from "react";
import { AddHandle } from "features/AddHandle";
import { getHandlesData } from "entities/HandlesData";
import { HandleItem } from "entities/HandleItem";
import { HandleType } from "shared/schema";
import { LoadingWrapper } from "shared/ui";

import { options } from "../config/options.ts";

import { AdminNavBar } from "admin-bundle/widgets/AdminNavBar";
import { AdminHeader } from "admin-bundle/entities/AdminHeader";
import { Option } from "admin-bundle/shared/types";
import { AdminAddItem, AdminWrapper } from "admin-bundle/shared/ui";

import cls from "./admin-handles.module.scss";

const AdminHandles = () => {
  const [selected, setSelected] = useState<Option>(options[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<HandleType[]>([]);

  const [addOpen, setAddOpen] = useState(false);
  const [edit, setEdit] = useState<HandleType>(null);

  const fetchData = async () => {
    setIsLoading(true);
    const result = await getHandlesData(selected.value);

    setData(result[0].types);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selected]);

  return (
    <AdminWrapper>
      <div className={cls.wrapper}>
        <AdminNavBar />
        <div className={cls.adminContent}>
          <AdminHeader
            title="Manere"
            sorting={selected}
            options={options}
            handleSortingChange={(value) => setSelected(value)}
          />
          <LoadingWrapper loading={isLoading} className={cls.dataWrapper}>
            {data.map((handle, index) => (
              <HandleItem
                key={index}
                parent={selected.value}
                handle={handle}
                onEdit={(data) => setEdit(data)}
              />
            ))}
            <AdminAddItem onClick={() => setAddOpen(true)} />
          </LoadingWrapper>
        </div>
        {addOpen || edit ? (
          <AddHandle
            parent={selected.value}
            onClose={() => {
              setAddOpen(false);
              setEdit(null);
            }}
            data={edit}
          />
        ) : null}
      </div>
    </AdminWrapper>
  );
};

export default AdminHandles;
