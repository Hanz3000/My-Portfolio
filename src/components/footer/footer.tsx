import React, { Suspense } from "react";
import SocialMediaButtons from "../social/social-media-icons";
import { config } from "@/data/config";

function CopyrightYear() {
  const year = new Date().getFullYear();
  return <>{year}</>;
}

function Footer() {
  return (
    <footer className="relative z-40 grid w-full shrink-0 grid-cols-1 items-center justify-items-center gap-3 border-t border-border px-4 py-6 md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch md:px-6">
      <p className="text-center text-xs text-gray-500 dark:text-gray-400 md:justify-self-start md:text-left">
        ©{" "}
        <Suspense fallback={null}>
          <CopyrightYear />
        </Suspense>{" "}
        {config.author}. All rights reserved.
      </p>
      <div className="justify-self-center md:col-start-2">
        <SocialMediaButtons />
      </div>
    </footer>
  );
}

export default Footer;
