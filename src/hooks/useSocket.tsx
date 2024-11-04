import React from "react";
import { SocketContext } from "../contexts/SocketContext";

export const useSocket = () => React.useContext(SocketContext);
