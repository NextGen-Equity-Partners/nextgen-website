import type { AnimationDemo } from "./types";
import { PlatformConsolidationAnimation } from "./platform-consolidation";
import { NeuralNetworkAnimation } from "./neural-network";
import { OrbitGroupAnimation } from "./orbit-group";
import { MagneticConvergenceAnimation } from "./magnetic-convergence";
import { DachNetworkAnimation } from "./dach-network";
import { CrystalGrowthAnimation } from "./crystal-growth";

export const DEMO_ANIMATIONS: AnimationDemo[] = [
  {
    id: "platform-consolidation",
    label: "Plattform-Konsolidierung",
    tech: "Buy & Build · Aus vielen wird eine",
    Component: PlatformConsolidationAnimation,
  },
  {
    id: "neural-network",
    label: "Neuronales Netzwerk",
    tech: "KI · Daten und Wissen, das fließt",
    Component: NeuralNetworkAnimation,
  },
  {
    id: "orbit-group",
    label: "Orbit-Gruppe",
    tech: "Gruppe · Langfristig um einen Kern",
    Component: OrbitGroupAnimation,
  },
  {
    id: "magnetic-convergence",
    label: "Magnetische Konvergenz",
    tech: "Partnerschaft · Was zusammenkommt",
    Component: MagneticConvergenceAnimation,
  },
  {
    id: "dach-network",
    label: "DACH-Netz",
    tech: "Region · Aktive Beziehungen",
    Component: DachNetworkAnimation,
  },
  {
    id: "crystal-growth",
    label: "Kristall-Wachstum",
    tech: "Wachstum · Substanz, die sich entfaltet",
    Component: CrystalGrowthAnimation,
  },
];
