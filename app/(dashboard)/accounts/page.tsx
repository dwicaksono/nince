import CardAddAccount from "@/features/accounts/components/card-add-account";
import React from "react";
import { Payment } from "./columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}
const AccountPage = () => {
	return (
		<div className="max-w-screen-2xl mx-auto -mt-24 w-full pb-10">
			<CardAddAccount />
		</div>
	);
};

export default AccountPage;
