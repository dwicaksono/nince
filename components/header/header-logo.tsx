import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeaderLogo = () => {
	return (
		<Link href="#">
			<div className="items-start hidden lg:flex">
				<Image src="/logo.svg" alt="logo" height={28} width={28} />
				<p className="font-semibold text-2xl text-white">nance</p>
			</div>
		</Link>
	);
};

export default HeaderLogo;
