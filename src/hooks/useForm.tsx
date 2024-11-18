import React from "react";
import { FormContext } from "../contexts/FormContext";

export const useFormData = () => React.useContext(FormContext);
