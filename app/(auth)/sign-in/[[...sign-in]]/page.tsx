import AuthTemplate from "@/components/auth/auth-template";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
export default function Page() {
	return (
		<AuthTemplate>
			<ClerkLoaded>
				<SignIn path="/sign-in" />
			</ClerkLoaded>
			<ClerkLoading>
				<Loader2 className="animate-spin  text-muted-foreground" />
			</ClerkLoading>
		</AuthTemplate>
	);
}
