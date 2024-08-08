import {
  BookIcon,
  CalendarCheck,
  BaggageClaimIcon,
  HardHatIcon,
  User2Icon,
  GroupIcon,
  PieChartIcon,
} from "lucide-react";

export const appLinks = [
  { tag: "Dashboard", href: "/dashboard", icon: <PieChartIcon /> },
  { tag: "Admission", href: "/admission", icon: <BookIcon /> },
  { tag: "Events", href: "/events", icon: <CalendarCheck /> },
  { tag: "Equipments", href: "/equipments", icon: <BaggageClaimIcon /> },
  { tag: "Career", href: "/career", icon: <HardHatIcon /> },
];

export const adminLinks = [
  { tag: "Users", href: "/users", icon: <User2Icon /> },
  { tag: "Departments", href: "/departments", icon: <GroupIcon /> },
];

export const marketingLinks = [
  { tag: "Admission", href: "/admission" },
  { tag: "Events", href: "/events" },
  { tag: "Equipments", href: "/equipments" },
  { tag: "Career", href: "/career" },
];
