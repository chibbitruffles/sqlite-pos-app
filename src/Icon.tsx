import React from "react";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "./theme";

type FeatherName = React.ComponentProps<typeof Feather>["name"];
type IonName = React.ComponentProps<typeof Ionicons>["name"];

const FEATHER: Record<string, FeatherName> = {
  sparkles: "star",
  quote: "message-square",
  landmark: "map-pin",
  shapes: "triangle",
  feather: "feather",
  orbit: "globe",
  flower: "sun",
  key: "key",
  book: "book-open",
  compass: "compass",
  "user-round": "user",
  search: "search",
  sliders: "sliders",
  star: "star",
  mail: "mail",
  lock: "lock",
  plus: "plus",
  "arrow-left": "arrow-left",
  "arrow-up-right": "arrow-up-right",
  "trending-up": "trending-up",
  gift: "gift",
  copy: "copy",
  send: "send",
  check: "check",
  x: "x",
  bell: "bell",
};

const ION: Record<string, IonName> = {
  apple: "logo-apple",
  signal: "cellular",
  wifi: "wifi",
  battery: "battery-full",
};

export default function Icon({
  name,
  size = 18,
  color = colors.ink,
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  if (ION[name]) {
    return <Ionicons name={ION[name]} size={size} color={color} />;
  }
  const f = FEATHER[name] || "star";
  return <Feather name={f} size={size} color={color} />;
}
