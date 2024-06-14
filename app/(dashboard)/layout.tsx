import Header from "@/components/header/header";
import React from "react";

type Props = { children: React.ReactNode };
const DashboardLayout = ({ children }: Props) => {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
};

export default DashboardLayout;
