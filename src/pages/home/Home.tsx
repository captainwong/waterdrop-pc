/* eslint-disable import/prefer-default-export */
import React from "react";
import { useUserInfoContext } from "@/hooks/userHooks";
// import styles from "./Home.module.css";

export const Home: React.FC = () => {
  const { store } = useUserInfoContext();
  return (
    <div>{store.tel}</div>
  );
}
