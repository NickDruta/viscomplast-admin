import { useEffect, useState } from "react";

import { SponsorSection } from "widgets/SponsorSection";
import { AddPartner } from "features/AddPartner";
import {
  deletePartnerFile,
  getSponsorsSectionDescription,
  listPartnerFiles,
} from "entities/PartnersData";
import { SponsorSectionType } from "shared/schema";
import { LoadingWrapper } from "shared/ui";

import { AdminNavBar } from "admin-bundle/widgets/AdminNavBar";
import { AdminHeader } from "admin-bundle/entities/AdminHeader";
import {
  AdminAddItem,
  AdminBinButton,
  AdminWrapper,
} from "admin-bundle/shared/ui";

import cls from "./admin-partners.module.scss";

const AdminPartners = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [sponsor, setSponsor] = useState<SponsorSectionType | null>(null);
  const [partnerImages, setPartnerImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      const urls = await listPartnerFiles();
      setPartnerImages(urls);
    } catch (error) {
      console.error("Error loading partner images:", error);
    }

    try {
      const sponsorData = await getSponsorsSectionDescription();
      setSponsor(sponsorData);
    } catch (error) {
      console.error("Error fetching sponsor description:", error);
    }

    setLoading(false);
  };

  const handleDelete = (url: string) => {
    deletePartnerFile(url)
      .then(() => {
        fetchAllData();
      })
      .catch((error) => {
        console.error("Error deleting partner file:", error);
      });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <AdminWrapper>
      <div className={cls.wrapper}>
        <AdminNavBar />
        <div className={cls.adminContent}>
          <AdminHeader title="Parteneri" />
          <LoadingWrapper loading={loading}>
            <>
              {sponsor ? <SponsorSection sponsor={sponsor} /> : null}
              <div className={cls.dataWrapper}>
                {partnerImages.map((url, index) => (
                  <div key={index} className={cls.item}>
                    <img src={url} alt={`Partner ${index + 1}`} />
                    <AdminBinButton
                      className={cls.deleteItem}
                      onClick={() => handleDelete(url)}
                    />
                  </div>
                ))}

                <AdminAddItem onClick={() => setAddOpen(true)} />
              </div>
            </>
          </LoadingWrapper>
        </div>
      </div>

      {addOpen ? (
        <AddPartner
          isOpen={addOpen}
          onClose={() => {
            setAddOpen(false);
            fetchAllData();
          }}
        />
      ) : null}
    </AdminWrapper>
  );
};

export default AdminPartners;
