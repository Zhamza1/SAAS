"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rdvSchema, RdvData } from "@/schemas/rdvSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "@/lib/axios";

const stripePromise = loadStripe("pk_test_51PIDv1GO9b6wjgsN2GXoMsD353SOOiru1fzLBhVTIyg46HoSzsxRAk3ZQvjd7AL87aRE6LQnOHFHnKMx6SJfP9gX00AoaEwRjo");

export const RdvForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RdvData>({
    resolver: zodResolver(rdvSchema),
  });

 const onSubmit = async (data: RdvData) => {
  setLoading(true);
  setServerError(null);

  try {
    // Récupérer les informations du coach
    const coachResponse = await axiosInstance.get(`/users/${data.coachId}`);
    const coach = coachResponse.data;

    const requestData = {
      amount: coach.price,
      successUrl: "http://localhost:3000/success",
      cancelUrl: "http://localhost:3000/cancel",
      coachId: data.coachId,
      clientId: data.clientId,
      date: data.date,
    };

    const paymentResponse = await axiosInstance.post("/payments/create-checkout-session", requestData);

    const { url } = paymentResponse.data;

    const stripe = await stripePromise;
    if (stripe) {
      window.location.href = url; // Redirection vers l'URL Stripe
    }
  } catch (error: any) {
    console.error("Error in onSubmit:", error.response?.data || error.message);
    setServerError(error.response?.data?.error || "Une erreur est survenue.");
  } finally {
    setLoading(false);
  }
};


  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Prendre un Rendez-vous</CardTitle>
        <CardDescription>Remplissez les informations ci-dessous.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {serverError && (
            <Alert variant="destructive">
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="coachId">ID du Coach</Label>
            <Input
              id="coachId"
              type="number"
              {...register("coachId", { valueAsNumber: true })}
              placeholder="Entrez l'ID du coach"
            />
            {errors.coachId && <p className="text-red-500 text-sm">{errors.coachId.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="clientId">ID du Client</Label>
            <Input
              id="clientId"
              type="number"
              {...register("clientId", { valueAsNumber: true })}
              placeholder="Entrez l'ID du client"
            />
            {errors.clientId && <p className="text-red-500 text-sm">{errors.clientId.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="datetime-local"
              {...register("date")}
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Redirection..." : "Prendre un rendez-vous"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
