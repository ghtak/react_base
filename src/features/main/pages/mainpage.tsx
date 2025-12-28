import { useEffect } from "react";

export function MainPage(){
    useEffect(() => {
        console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
        console.log("123");
    }, []);
    return (
        <p>Main Page 화면입니다.</p>
    )
}