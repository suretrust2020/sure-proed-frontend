import { createContext, useContext, useState, type ReactNode } from "react";
import { type SignupSchema } from "./schema";

interface SignupContextType {
  formData: Partial<SignupSchema>;
  updateFormData: (formData: Partial<SignupSchema>) => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<Partial<SignupSchema>>({});

  const updateFormData = (newData: Partial<SignupSchema>) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  return (
    <SignupContext.Provider value={{ formData, updateFormData }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
};
