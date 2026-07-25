import { lazy } from "react";
import { HAFRIYAT_LOKASYONLAR } from "@/data/hafriyatData";

const HafriyatSehirSayfasi = lazy(() => import("./HafriyatSehirSayfasi"));

export const hafriyatRoutes = HAFRIYAT_LOKASYONLAR.map((lokasyon) => ({
  path: lokasyon.path,
  element: <HafriyatSehirSayfasi lokasyon={lokasyon} />,
}));
