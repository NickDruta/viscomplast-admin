import { useMemo } from "react";
import clsx from "clsx";
import cls from "./AdminTabs.module.scss";

interface Props {
  tabs: string[];
}

const AdminTabs = ({ tabs }: Props) => {
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  // Determines the currently active tab from the URL query parameter or defaults to the first tab
  const activeTab = searchParams.get("tab") || tabs[0].toLowerCase();

  /**
   * Handles tab change event by updating the active tab and URL query parameter.
   *
   * @param {string} tab - The selected tab name.
   */
  const handleTabChange = (tab: string) => {
    searchParams.set("tab", tab.toLowerCase());

    // navigate({ search: searchParams.toString() });
  };

  return (
    <div className={cls.adminTabsWrapper}>
      {tabs?.map((tab, index) => (
        <div
          key={index}
          className={clsx(
            cls.tab,
            tab.toLowerCase() === activeTab && cls.activeTab,
          )}
          onClick={() => handleTabChange(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default AdminTabs;
