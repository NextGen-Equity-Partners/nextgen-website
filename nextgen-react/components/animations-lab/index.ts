import type { AnimationDemo } from "./types";
import { AiStackAnimation } from "./ai-stack";
import { DealFlowAnimation } from "./deal-flow";
import { TrustMapAnimation } from "./trust-map";
import { ValueFlywheelAnimation } from "./value-flywheel";

export const DEMO_ANIMATIONS: AnimationDemo[] = [
  {
    id: "deal-flow",
    label: "Deal Flow",
    tech: "Pipeline · Prozessklarheit",
    Component: DealFlowAnimation,
  },
  {
    id: "value-flywheel",
    label: "Value Creation Flywheel",
    tech: "Wertsteigerung · Momentum",
    Component: ValueFlywheelAnimation,
  },
  {
    id: "ai-stack",
    label: "AI Operating Stack",
    tech: "KI · Daten bis Umsetzung",
    Component: AiStackAnimation,
  },
  {
    id: "trust-map",
    label: "Trust Map",
    tech: "Beziehungen · Langfristigkeit",
    Component: TrustMapAnimation,
  },
];
