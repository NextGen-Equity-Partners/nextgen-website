import type { AnimationDemo } from "./types";
import { PlatformConsolidationAnimation } from "./platform-consolidation";
import { BuyAndBuildTreeAnimation } from "./buy-and-build-tree";
import { EbitdaWaterfallAnimation } from "./ebitda-waterfall";
import { CompoundingGrowthAnimation } from "./compounding-growth";
import { DealPipelineAnimation } from "./deal-pipeline";
import { DachNetworkAnimation } from "./dach-network";
import { NeuralNetworkAnimation } from "./neural-network";
import { OrbitGroupAnimation } from "./orbit-group";
import { CrystalGrowthAnimation } from "./crystal-growth";
import { MagneticConvergenceAnimation } from "./magnetic-convergence";

export const DEMO_ANIMATIONS: AnimationDemo[] = [
  {
    id: "platform-consolidation",
    label: "Plattform & Add-ons",
    tech: "Buy & Build · Plattform wächst sichtbar",
    Component: PlatformConsolidationAnimation,
  },
  {
    id: "buy-and-build-tree",
    label: "Buy-and-Build Tree",
    tech: "M&A · Plattform mit Add-on-Andockungen",
    Component: BuyAndBuildTreeAnimation,
  },
  {
    id: "ebitda-waterfall",
    label: "EBITDA Bridge",
    tech: "Wertsteigerung · klassischer Waterfall",
    Component: EbitdaWaterfallAnimation,
  },
  {
    id: "compounding-growth",
    label: "Wertsteigerungs-Kurve",
    tech: "Compound Growth · 6 Jahre",
    Component: CompoundingGrowthAnimation,
  },
  {
    id: "deal-pipeline",
    label: "Deal Pipeline",
    tech: "Trichter · 100 → 50 → 12 → 3",
    Component: DealPipelineAnimation,
  },
  {
    id: "dach-network",
    label: "DACH-Netz",
    tech: "Region · aktive Beziehungen",
    Component: DachNetworkAnimation,
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
    tech: "Gruppe · langfristig um einen Kern",
    Component: OrbitGroupAnimation,
  },
  {
    id: "crystal-growth",
    label: "Kristall-Wachstum",
    tech: "Wachstum · Substanz, die sich entfaltet",
    Component: CrystalGrowthAnimation,
  },
  {
    id: "magnetic-convergence",
    label: "Magnetische Konvergenz",
    tech: "Partnerschaft · was zusammenkommt",
    Component: MagneticConvergenceAnimation,
  },
];
