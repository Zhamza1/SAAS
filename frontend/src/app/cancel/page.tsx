import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

const Cancel = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 shadow-lg">
        <CardHeader className="flex justify-center">
          <XCircle className="w-16 h-16 text-red-500" />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-center text-xl font-semibold">Paiement Annulé</CardTitle>
          <p className="text-center text-gray-500 mt-2">
            Votre paiement a été annulé. Si vous avez des questions, n'hésitez pas à nous contacter.
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

export default Cancel;
