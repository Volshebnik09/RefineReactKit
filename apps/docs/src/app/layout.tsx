"use client";
import "./globals.css";
import React from "react";
import { UIRegistry } from "@refine-react-kit/ui";
import { WithCustomTheme } from "@/entity/theme";

const MainBody = (props: React.PropsWithChildren) => {
  return (
    <body
      style={{
        background: "#aaa",
      }}
    >
      {props.children}
    </body>
  );
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en" style={{
      scrollBehavior: "smooth",
      fontFamily: "'Roboto', sans-serif",
    }}>
      <UIRegistry>
        <WithCustomTheme>
          <MainBody>{props.children}</MainBody>
        </WithCustomTheme>
      </UIRegistry>
    </html>
  );
}
