import { useState, useEffect } from 'react';
import { getRespondes } from '../api/vacancy';
import { Response } from '../types/vacancy';

export const useRespondes = () => {
    const [respondes, setRespondes] = useState<Response[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRespondes = async () => {
            try {
                setLoading(true);
                const respondesResponse = await getRespondes();
                setRespondes(respondesResponse);
            } catch  {
                setError('Не удалось загрузить отклики');
            } finally {
                setLoading(false);
            }
        };

        fetchRespondes();
    }, []);

    return { respondes, loading, error };
};