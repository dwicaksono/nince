import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
	href: string;
	label: string;
	isActive: boolean;
};
const NavButton = ({ href, isActive, label }: Props) => {
	return (
		<Button
			asChild
			size="sm"
			variant="outline"
			className={cn(
				"w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white brder-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white  border-none focus:bg-white/30 transition",
				isActive ? "bg-white/10 text-white" : "bg-transparent"
			)}>
			<Link href={href}>{label}</Link>
		</Button>
	);
};

export default NavButton;
