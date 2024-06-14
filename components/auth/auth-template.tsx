import Image from "next/image";
import React, { FC, PropsWithChildren } from "react";

const AuthTemplate: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
			<div className="h-full lg:flex flex-col items-center justify-center px-4">
				<div className="text-center space-y-4 pt-16">
					<h1 className="font-bold text-3xl text-[#2e2a47]">Welcome back!</h1>
					<p className="text-base tex-[#7e8cca0]">
						Log in or Create account to get back to your dashboard!
					</p>
				</div>
				<div className="flex items-center justify-center mt-8">{children}</div>
			</div>
			<div className="h-full bg-blue-500 hidden lg:flex items-center justify-center flex-col">
				<Image src="/logo.svg" alt="logo" width={100} height={100} />
				<p className="text-white text-xs mt-2">Simplify, Amplify, Succeed.</p>
			</div>
		</div>
	);
};

export default AuthTemplate;
