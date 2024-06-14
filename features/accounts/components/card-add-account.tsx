"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useSheetAccount } from "../hooks/useSheetAccount";
const CardAddAccount = () => {
	const { onOpen } = useSheetAccount();
	return (
		<Card className="border-none drop-shadow-md">
			<CardHeader className="lg:flex-row lg:items-center lg:justify-between">
				<CardTitle className="text-xl line-clamp-1">Add Account</CardTitle>
				<Button className="gap-x-2" size="sm" onClick={onOpen}>
					<PlusCircle className="size-4 text-white" />
					Add Account
				</Button>
			</CardHeader>
		</Card>
	);
};

export default CardAddAccount;
