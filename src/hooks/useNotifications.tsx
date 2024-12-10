import React from "react";
import { NotifyContext } from "../contexts/NotifyContext";

export const useNotify = () => React.useContext(NotifyContext);
