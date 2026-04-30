import type { TwoDAnimationDemo } from "./types";
import { SignalFlow2D } from "./signal-flow";
import { ValueBridge2D } from "./value-bridge";
import { OperatingFlywheel2D } from "./operating-flywheel";
import { MarketMap2D } from "./market-map";
import { CompoundCurve2D } from "./compound-curve";
import { PlatformDock2D } from "./platform-dock";
import { DachTriangle2D } from "./dach-triangle";
import { DealFunnel2D } from "./deal-funnel";

export const TWO_D_ANIMATIONS: TwoDAnimationDemo[] = [
  {
    id: "platform-dock",
    kicker: "Plattform & Add-ons",
    title: "Eine Plattform waechst durch Andocken.",
    body: "Add-ons fliegen aus verschiedenen Richtungen auf den Kern zu, fusionieren und lassen die Plattform sichtbar groesser werden — die Buy-and-Build-Idee in einer Schleife.",
    Component: PlatformDock2D,
  },
  {
    id: "compound-curve",
    kicker: "Wertsteigerung",
    title: "Wert entsteht ueber Zeit.",
    body: "Eine ruhige, exponentielle Kurve mit Markern bei Y1, Y3, Y5 und Y10. Funktioniert direkt neben Text wie ein Investorenchart, ohne Ablenkung.",
    Component: CompoundCurve2D,
  },
  {
    id: "value-bridge",
    kicker: "EBITDA-Aufbau",
    title: "Vom Start zum Ziel.",
    body: "Bars und Trendlinie funktionieren direkt neben Text, ohne die Seite schwer zu machen.",
    Component: ValueBridge2D,
  },
  {
    id: "deal-funnel",
    kicker: "Pipeline",
    title: "Wenige werden viele.",
    body: "Aus 100 Gespraechen werden 50 Pruefungen, daraus 12 LOIs, am Ende drei Closings. Filtern ist Teil unserer Arbeit — und die wenigen, die durchkommen, sind die richtigen.",
    Component: DealFunnel2D,
  },
  {
    id: "signal-flow",
    kicker: "Deal Flow",
    title: "Von Erstkontakt zu Partnerschaft.",
    body: "Eine ruhige Linienanimation fuer Prozessseiten: Lead, Pruefung, Gespraech, Abschluss.",
    Component: SignalFlow2D,
  },
  {
    id: "dach-triangle",
    kicker: "Region",
    title: "DACH bleibt unser Spielfeld.",
    body: "Drei Standorte, dazwischen fliessen Pulse — leise, aber kontinuierlich. Genau wie die Beziehungen, aus denen unsere besten Deals entstehen.",
    Component: DachTriangle2D,
  },
  {
    id: "operating-flywheel",
    kicker: "Operating System",
    title: "People, Data und Operations im Loop.",
    body: "Ein kompakter Flywheel fuer Ansatz- oder KI-Abschnitte, der dauerhaft lebendig bleibt.",
    Component: OperatingFlywheel2D,
  },
  {
    id: "market-map",
    kicker: "Marktkarte",
    title: "Cluster erkennen, Prioritaeten setzen.",
    body: "Scan, Heatmap und Pins zeigen Marktintelligenz, ohne von der Aussage abzulenken.",
    Component: MarketMap2D,
  },
];
