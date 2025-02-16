import { createContext, useState } from "react";
import { Business } from "../models/business";

export const BusinessContext = createContext<{
  selectedBusiness: null | Business;
  setSelectedBusiness: any;
}>({ selectedBusiness: null, setSelectedBusiness: null });

const BusinessProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [selectedBusiness, setSelectedBusiness] = useState<null | Business>(
    null
  );
  return (
    <BusinessContext.Provider value={{ selectedBusiness, setSelectedBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessProvider;
