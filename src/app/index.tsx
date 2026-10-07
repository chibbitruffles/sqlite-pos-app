import React from "react";
import {
  Catalog,
  Customization,
  Library,
  Profile,
  Referral,
  SignIn,
  Splash,
  Welcome,
} from "../screens";
import InventoryScreen from "../screens/InventoryScreen";
import { useApp } from "../store";

export default function Home() {
  const { screen } = useApp();
  switch (screen) {
    case "splash":
      return <Splash />;
    case "welcome":
      return <Welcome />;
    case "customization":
      return <Customization />;
    case "referral":
      return <Referral />;
    case "signin":
      return <SignIn />;
    case "library":
      return <Library />;
    case "catalog":
      return <Catalog />;
    case "profile":
      return <Profile />;
    case "inventory":
      return <InventoryScreen />;
    default:
      return <Splash />;
  }
}
