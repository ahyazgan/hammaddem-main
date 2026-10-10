// Keep regional pages out of the initial home-page bundle.
import { lazy } from "react";
const MalzemeCimentoIstanbul = lazy(() => import("./MalzemeCimentoIstanbul"));
const MalzemeCimentoAnkara = lazy(() => import("./MalzemeCimentoAnkara"));
const MalzemeCimentoIzmir = lazy(() => import("./MalzemeCimentoIzmir"));
const MalzemeCimentoBursa = lazy(() => import("./MalzemeCimentoBursa"));
const MalzemeCimentoKocaeli = lazy(() => import("./MalzemeCimentoKocaeli"));
const MalzemeKalsitIstanbul = lazy(() => import("./MalzemeKalsitIstanbul"));
const MalzemeKalsitAnkara = lazy(() => import("./MalzemeKalsitAnkara"));
const MalzemeKalsitIzmir = lazy(() => import("./MalzemeKalsitIzmir"));
const MalzemeKalsitBursa = lazy(() => import("./MalzemeKalsitBursa"));
const MalzemeKalsitKocaeli = lazy(() => import("./MalzemeKalsitKocaeli"));
const MalzemeKirecIstanbul = lazy(() => import("./MalzemeKirecIstanbul"));
const MalzemeKirecAnkara = lazy(() => import("./MalzemeKirecAnkara"));
const MalzemeKirecIzmir = lazy(() => import("./MalzemeKirecIzmir"));
const MalzemeKirecBursa = lazy(() => import("./MalzemeKirecBursa"));
const MalzemeKirecKocaeli = lazy(() => import("./MalzemeKirecKocaeli"));
const MalzemeAlciIstanbul = lazy(() => import("./MalzemeAlciIstanbul"));
const MalzemeAlciAnkara = lazy(() => import("./MalzemeAlciAnkara"));
const MalzemeAlciIzmir = lazy(() => import("./MalzemeAlciIzmir"));
const MalzemeAlciBursa = lazy(() => import("./MalzemeAlciBursa"));
const MalzemeAlciKocaeli = lazy(() => import("./MalzemeAlciKocaeli"));
const MalzemeMermerTozuIstanbul = lazy(() => import("./MalzemeMermerTozuIstanbul"));
const MalzemeMermerTozuAnkara = lazy(() => import("./MalzemeMermerTozuAnkara"));
const MalzemeMermerTozuIzmir = lazy(() => import("./MalzemeMermerTozuIzmir"));
const MalzemeMermerTozuBursa = lazy(() => import("./MalzemeMermerTozuBursa"));
const MalzemeMermerTozuKocaeli = lazy(() => import("./MalzemeMermerTozuKocaeli"));
const MalzemeUcucuKulIstanbul = lazy(() => import("./MalzemeUcucuKulIstanbul"));
const MalzemeUcucuKulAnkara = lazy(() => import("./MalzemeUcucuKulAnkara"));
const MalzemeUcucuKulIzmir = lazy(() => import("./MalzemeUcucuKulIzmir"));
const MalzemeUcucuKulBursa = lazy(() => import("./MalzemeUcucuKulBursa"));
const MalzemeUcucuKulKocaeli = lazy(() => import("./MalzemeUcucuKulKocaeli"));
const MalzemeKumIstanbul = lazy(() => import("./MalzemeKumIstanbul"));
const MalzemeKumAnkara = lazy(() => import("./MalzemeKumAnkara"));
const MalzemeKumIzmir = lazy(() => import("./MalzemeKumIzmir"));
const MalzemeKumBursa = lazy(() => import("./MalzemeKumBursa"));
const MalzemeKumKocaeli = lazy(() => import("./MalzemeKumKocaeli"));
const MalzemeCakilIstanbul = lazy(() => import("./MalzemeCakilIstanbul"));
const MalzemeCakilAnkara = lazy(() => import("./MalzemeCakilAnkara"));
const MalzemeCakilIzmir = lazy(() => import("./MalzemeCakilIzmir"));
const MalzemeCakilBursa = lazy(() => import("./MalzemeCakilBursa"));
const MalzemeCakilKocaeli = lazy(() => import("./MalzemeCakilKocaeli"));
const MalzemeMicirIstanbul = lazy(() => import("./MalzemeMicirIstanbul"));
const MalzemeMicirAnkara = lazy(() => import("./MalzemeMicirAnkara"));
const MalzemeMicirIzmir = lazy(() => import("./MalzemeMicirIzmir"));
const MalzemeMicirBursa = lazy(() => import("./MalzemeMicirBursa"));
const MalzemeMicirKocaeli = lazy(() => import("./MalzemeMicirKocaeli"));
const MalzemeStabilizeIstanbul = lazy(() => import("./MalzemeStabilizeIstanbul"));
const MalzemeStabilizeAnkara = lazy(() => import("./MalzemeStabilizeAnkara"));
const MalzemeStabilizeIzmir = lazy(() => import("./MalzemeStabilizeIzmir"));
const MalzemeStabilizeBursa = lazy(() => import("./MalzemeStabilizeBursa"));
const MalzemeStabilizeKocaeli = lazy(() => import("./MalzemeStabilizeKocaeli"));

export const kombinasyonRoutes = [
  { path: "/malzeme/cimento/istanbul", element: <MalzemeCimentoIstanbul /> },
  { path: "/malzeme/cimento/ankara", element: <MalzemeCimentoAnkara /> },
  { path: "/malzeme/cimento/izmir", element: <MalzemeCimentoIzmir /> },
  { path: "/malzeme/cimento/bursa", element: <MalzemeCimentoBursa /> },
  { path: "/malzeme/cimento/kocaeli", element: <MalzemeCimentoKocaeli /> },
  { path: "/malzeme/kalsit/istanbul", element: <MalzemeKalsitIstanbul /> },
  { path: "/malzeme/kalsit/ankara", element: <MalzemeKalsitAnkara /> },
  { path: "/malzeme/kalsit/izmir", element: <MalzemeKalsitIzmir /> },
  { path: "/malzeme/kalsit/bursa", element: <MalzemeKalsitBursa /> },
  { path: "/malzeme/kalsit/kocaeli", element: <MalzemeKalsitKocaeli /> },
  { path: "/malzeme/kirec/istanbul", element: <MalzemeKirecIstanbul /> },
  { path: "/malzeme/kirec/ankara", element: <MalzemeKirecAnkara /> },
  { path: "/malzeme/kirec/izmir", element: <MalzemeKirecIzmir /> },
  { path: "/malzeme/kirec/bursa", element: <MalzemeKirecBursa /> },
  { path: "/malzeme/kirec/kocaeli", element: <MalzemeKirecKocaeli /> },
  { path: "/malzeme/alci/istanbul", element: <MalzemeAlciIstanbul /> },
  { path: "/malzeme/alci/ankara", element: <MalzemeAlciAnkara /> },
  { path: "/malzeme/alci/izmir", element: <MalzemeAlciIzmir /> },
  { path: "/malzeme/alci/bursa", element: <MalzemeAlciBursa /> },
  { path: "/malzeme/alci/kocaeli", element: <MalzemeAlciKocaeli /> },
  { path: "/malzeme/mermer-tozu/istanbul", element: <MalzemeMermerTozuIstanbul /> },
  { path: "/malzeme/mermer-tozu/ankara", element: <MalzemeMermerTozuAnkara /> },
  { path: "/malzeme/mermer-tozu/izmir", element: <MalzemeMermerTozuIzmir /> },
  { path: "/malzeme/mermer-tozu/bursa", element: <MalzemeMermerTozuBursa /> },
  { path: "/malzeme/mermer-tozu/kocaeli", element: <MalzemeMermerTozuKocaeli /> },
  { path: "/malzeme/ucucu-kul/istanbul", element: <MalzemeUcucuKulIstanbul /> },
  { path: "/malzeme/ucucu-kul/ankara", element: <MalzemeUcucuKulAnkara /> },
  { path: "/malzeme/ucucu-kul/izmir", element: <MalzemeUcucuKulIzmir /> },
  { path: "/malzeme/ucucu-kul/bursa", element: <MalzemeUcucuKulBursa /> },
  { path: "/malzeme/ucucu-kul/kocaeli", element: <MalzemeUcucuKulKocaeli /> },
  { path: "/malzeme/kum/istanbul", element: <MalzemeKumIstanbul /> },
  { path: "/malzeme/kum/ankara", element: <MalzemeKumAnkara /> },
  { path: "/malzeme/kum/izmir", element: <MalzemeKumIzmir /> },
  { path: "/malzeme/kum/bursa", element: <MalzemeKumBursa /> },
  { path: "/malzeme/kum/kocaeli", element: <MalzemeKumKocaeli /> },
  { path: "/malzeme/cakil/istanbul", element: <MalzemeCakilIstanbul /> },
  { path: "/malzeme/cakil/ankara", element: <MalzemeCakilAnkara /> },
  { path: "/malzeme/cakil/izmir", element: <MalzemeCakilIzmir /> },
  { path: "/malzeme/cakil/bursa", element: <MalzemeCakilBursa /> },
  { path: "/malzeme/cakil/kocaeli", element: <MalzemeCakilKocaeli /> },
  { path: "/malzeme/micir/istanbul", element: <MalzemeMicirIstanbul /> },
  { path: "/malzeme/micir/ankara", element: <MalzemeMicirAnkara /> },
  { path: "/malzeme/micir/izmir", element: <MalzemeMicirIzmir /> },
  { path: "/malzeme/micir/bursa", element: <MalzemeMicirBursa /> },
  { path: "/malzeme/micir/kocaeli", element: <MalzemeMicirKocaeli /> },
  { path: "/malzeme/stabilize/istanbul", element: <MalzemeStabilizeIstanbul /> },
  { path: "/malzeme/stabilize/ankara", element: <MalzemeStabilizeAnkara /> },
  { path: "/malzeme/stabilize/izmir", element: <MalzemeStabilizeIzmir /> },
  { path: "/malzeme/stabilize/bursa", element: <MalzemeStabilizeBursa /> },
  { path: "/malzeme/stabilize/kocaeli", element: <MalzemeStabilizeKocaeli /> },
];
