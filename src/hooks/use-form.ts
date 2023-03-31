import { useRouter } from "next/router";
import React from "react";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

interface UsernameFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export function useForm(method: (value: unknown) => Promise<Response>, redirect: string) {
    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<UsernameFormElement>) => {
        event.preventDefault();

        setLoading(true);

        const data = Object.fromEntries(new FormData(event.currentTarget));

        try {
            const response = await method(data);
            const json = await response.json();

            if (response.ok) {
                router.push(redirect);
            } else {
                setError(json.error);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, handleSubmit };
}
