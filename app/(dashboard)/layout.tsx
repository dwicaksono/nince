import Header from "@/components/header/header";
import React from "react";

type Props = { children: React.ReactNode };
const DashboardLayout = ({ children }: Props) => {
	return (
		<>
			<Header />
			<main className="px-4 py-8 lg:px-14 pb-36">{children}</main>
		</>
	);
};

export default DashboardLayout;
