import { useAppContext } from "@/context/app";
import { useEffect } from "react";

export default function useResetGlobalElements(): void {
    const context = useAppContext();
    
    useEffect(() => {
        context.setOffCanvasOpen(false);
    }, []);
}