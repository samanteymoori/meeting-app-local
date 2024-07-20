"use client";
import { createContext } from "react";
import { HomePageContextType } from "./HomePageContextType";

export const HomePageContext = createContext<HomePageContextType>({
  editableProfiles: null,
});
