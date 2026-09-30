"use client";

import type { ComponentProps } from "react";
import { selectService } from "@/lib/appointment-events";

/**
 * Link to the appointment form that also preselects a service in it.
 * Without JavaScript it is still a plain in-page link.
 */
export function ServiceLink({ service, onClick, ...props }: ComponentProps<"a"> & { service: string }) {
  return (
    <a
      href="#appointment"
      onClick={(e) => {
        selectService(service);
        onClick?.(e);
      }}
      {...props}
    />
  );
}
