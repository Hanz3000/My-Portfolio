"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ProfileShowcaseContextValue = {
  isProfileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
  toggleProfile: () => void;
};

const ProfileShowcaseContext = createContext<ProfileShowcaseContextValue | null>(null);

export function ProfileShowcaseProvider({ children }: { children: ReactNode }) {
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <ProfileShowcaseContext.Provider value={{
      isProfileOpen,
      setProfileOpen,
      toggleProfile: () => setProfileOpen((open) => !open),
    }}>
      {children}
    </ProfileShowcaseContext.Provider>
  );
}

export function useProfileShowcase() {
  const context = useContext(ProfileShowcaseContext);
  if (!context) throw new Error("useProfileShowcase must be used within ProfileShowcaseProvider");
  return context;
}