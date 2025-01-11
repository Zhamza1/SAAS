import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const Success = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 shadow-lg">
        <CardHeader className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-center text-xl font-semibold">Paiement Réussi !</CardTitle>
          <p className="text-center text-gray-500 mt-2">
            Votre rendez-vous a été confirmé. Merci pour votre confiance !
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button variant="secondary">Retour à l'accueil</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Success;
