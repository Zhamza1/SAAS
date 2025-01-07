"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterData } from "@/schemas/authSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { registerUser, clearMessages } from "@/redux/slices/authSlice";
import { useEffect } from "react";

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const { successMessage, serverError, loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterData) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Inscription</CardTitle>
        <CardDescription>Créez un compte en remplissant le formulaire ci-dessous.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {serverError && (
            <Alert variant="destructive">
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}
          {successMessage && (
            <Alert>
              <AlertTitle>Succès</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} placeholder="m@example.com" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" type="text" {...register("name")} placeholder="Votre nom" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="firstname">Prénom</Label>
            <Input id="firstname" type="text" {...register("firstname")} placeholder="Votre prénom" />
            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Chargement..." : "S'inscrire"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
