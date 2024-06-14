import AuthTemplate from "@/components/auth/auth-template";
import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function Page() {
	return (
		<AuthTemplate>
			<ClerkLoaded>
				<SignUp path="/sign-up" />
			</ClerkLoaded>
			<ClerkLoading>
				<Loader2 className="animate-spin  text-muted-foreground" />
			</ClerkLoading>
		</AuthTemplate>
	);
}
