import { toast } from 'react-toastify';

export const errorHandler = async (error) => {
    const errorMessage = error?.response?.data?.message || "Something went wrong";
    console.error(errorMessage);

    toast.error(errorMessage);
};

