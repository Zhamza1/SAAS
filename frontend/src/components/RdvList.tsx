"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchRdvs } from "@/redux/slices/rdvSlice";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow } from "./Table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const RdvList = () => {
    const dispatch = useAppDispatch();
    const { rdvs, serverError, loading } = useAppSelector((state) => state.rdv);

    useEffect(() => {
        dispatch(fetchRdvs());
    }, [dispatch]);

    return (
        <Card className="mx-auto max-w-4xl">
            <CardHeader>
                <CardTitle className="text-2xl">Liste des Rendez-vous</CardTitle>
                <CardDescription>Visualisez tous les rendez-vous enregistrés.</CardDescription>
            </CardHeader>
            <CardContent>
                {serverError && (
                    <Alert variant="destructive">
                        <AlertTitle>Erreur</AlertTitle>
                        <AlertDescription>{serverError}</AlertDescription>
                    </Alert>
                )}
                {loading && <p className="text-center">Chargement...</p>}
                {!loading && rdvs.length === 0 && <p className="text-center">Aucun rendez-vous trouvé.</p>}
                {!loading && rdvs.length > 0 && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Coach</TableCell>
                                <TableCell>Client</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rdvs.map((rdv) => (
                                <TableRow key={rdv.id}>
                                    <TableCell>{rdv.id}</TableCell>
                                    <TableCell>
                                        {rdv.coach.name} {rdv.coach.firstname} ({rdv.coach.email})
                                    </TableCell>
                                    <TableCell>
                                        {rdv.client.name} {rdv.client.firstname} ({rdv.client.email})
                                    </TableCell>
                                    <TableCell>{new Date(rdv.date).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};
