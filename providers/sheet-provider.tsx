"use client";

import SheetAccount from "@/features/accounts/components/sheet-account";
import React from "react";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
	const isMounted = useMountedState();

	if (!isMounted) return null;
	return (
		<>
			<SheetAccount />
		</>
	);
};
