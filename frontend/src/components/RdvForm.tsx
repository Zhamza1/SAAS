"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rdvSchema, RdvData } from "@/schemas/rdvSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { createRdv, clearMessages } from "@/redux/slices/rdvSlice";
import { useEffect } from "react";

export const RdvForm = () => {
    const dispatch = useAppDispatch();
    const { successMessage, serverError, loading } = useAppSelector((state) => state.rdv);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RdvData>({
        resolver: zodResolver(rdvSchema),
    });

    const onSubmit = (data: RdvData) => {
        dispatch(createRdv(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearMessages());
        };
    }, [dispatch]);

    return (
        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">Créer un Rendez-vous</CardTitle>
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
                    {successMessage && (
                        <Alert>
                            <AlertTitle>Succès</AlertTitle>
                            <AlertDescription>{successMessage}</AlertDescription>
                        </Alert>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="coachId">ID du Coach</Label>
                        <Input
                            id="coachId"
                            type="number"
                            {...register("coachId", {valueAsNumber: true})}
                            placeholder="Entrez l'ID du coach"
                        />
                        {errors.coachId && <p className="text-red-500 text-sm">{errors.coachId.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="clientId">ID du Client</Label>
                        <Input
                            id="clientId"
                            type="number"
                            {...register("clientId", {valueAsNumber: true})}
                            placeholder="Entrez l'ID du client"
                        />
                        {errors.clientId && <p className="text-red-500 text-sm">{errors.clientId.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="datetime-local" // Ensures proper datetime format in input
                            {...register("date")}
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Chargement..." : "Créer le Rendez-vous"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
