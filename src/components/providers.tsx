import SocketContextProvider from "@/contexts/socketio";
import Preloader from "./preloader";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/toaster";

import { TooltipProvider } from "./ui/tooltip";

import { GameContextProvider } from "@/contexts/game-context";
import MotionPreferences from "./motion-preferences";
import { ProfileShowcaseProvider } from "@/contexts/profile-showcase";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    disableTransitionOnChange
  >
    <MotionPreferences>
      <Preloader>
        <ProfileShowcaseProvider>
          <SocketContextProvider>
            <GameContextProvider>
              <TooltipProvider>
                {children}
              </TooltipProvider>
            </GameContextProvider>
            <Toaster />
          </SocketContextProvider>
        </ProfileShowcaseProvider>
      </Preloader>
    </MotionPreferences>
  </ThemeProvider>;
};
