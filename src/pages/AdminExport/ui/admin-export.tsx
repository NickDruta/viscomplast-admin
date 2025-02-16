import { useEffect, useState } from "react";

import { ProfilesSection } from "widgets/ProfilesSection";
import { HardwareSection } from "widgets/HardwareSection";
import { SlidingSystemsSection } from "widgets/SlidingSystemsSection";
import { getPageData } from "entities/PagesData";
import { LoadingWrapper } from "shared/ui";

import { options } from "../config/options";

import { AdminNavBar } from "admin-bundle/widgets/AdminNavBar";
import { AdminHeader } from "admin-bundle/entities/AdminHeader";
import { AdminWrapper } from "admin-bundle/shared/ui";

import cls from "./admin-export.module.scss";

const AdminExport = () => {
  const [selected, setSelected] = useState(options[0]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const result = await getPageData(selected.value);

    setData(result);
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
            title="Export"
            options={options}
            sorting={selected}
            handleSortingChange={(value) => setSelected(value)}
          />
          <LoadingWrapper loading={isLoading} className={cls.dataWrapper}>
            <>
              <ProfilesSection
                parent={selected.value}
                profilesSection={data.find(
                  (item) => item.id === "profilesSection",
                )}
              />
              <HardwareSection
                parent={selected.value}
                hardware={data.find((item) => item.id === "hardwareSection")}
              />
              <SlidingSystemsSection
                parent={selected.value}
                sliding={data.find(
                  (item) => item.id === "slidingSystemsSection",
                )}
              />
            </>
          </LoadingWrapper>
        </div>
      </div>
    </AdminWrapper>
  );
};

export default AdminExport;
