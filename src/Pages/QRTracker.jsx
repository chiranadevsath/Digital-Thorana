import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function QRTracker() {
    useEffect(() => {
        const track = async () => {
            try {
                await supabase.from("qr_scans").insert({
                    qr_id: "thorana-main",
                    user_agent: navigator.userAgent,
                    referrer: document.referrer || "direct",
                });
            } catch (err) {
                console.error(err);
            }

            window.location.href = "/";
        };

        track();
    }, []);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#0d0a04",
                color: "#e6b84e",
                fontFamily: "Georgia",
            }}
        >
            Opening Digital Thorana...
        </div>
    );
}