import { useEffect, useState } from "react";

import { ProfilesSection } from "widgets/ProfilesSection";
import { HardwareSection } from "widgets/HardwareSection";
import { getPageData } from "entities/PagesData";
import { LoadingWrapper } from "shared/ui";

import { pages } from "../config/options";

import { AdminNavBar } from "admin-bundle/widgets/AdminNavBar";
import { AdminHeader } from "admin-bundle/entities/AdminHeader";
import { Option } from "admin-bundle/shared/types";
import { AdminWrapper } from "admin-bundle/shared/ui";

import cls from "./admin-pages.module.scss";

const AdminPages = () => {
  const [selectedPage, setSelectedPage] = useState<Option>(pages[0]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const result = await getPageData(selectedPage.value);

    setData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedPage]);

  return (
    <AdminWrapper>
      <div className={cls.wrapper}>
        <AdminNavBar />
        <div className={cls.adminContent}>
          <AdminHeader
            title="Pagini"
            options={pages}
            sorting={selectedPage}
            handleSortingChange={(value) => setSelectedPage(value)}
          />
          <LoadingWrapper loading={isLoading} className={cls.dataWrapper}>
            <>
              <ProfilesSection
                parent={selectedPage.value}
                profilesSection={data.find(
                  (item) => item.id === "profilesSection",
                )}
              />
              <HardwareSection
                parent={selectedPage.value}
                hardware={data.find((item) => item.id === "hardwareSection")}
              />
            </>
          </LoadingWrapper>
        </div>
      </div>
    </AdminWrapper>
  );
};

export default AdminPages;
