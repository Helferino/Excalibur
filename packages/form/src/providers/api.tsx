"use client";

import { createContext, ReactNode, useContext } from "react";
import axios, { AxiosInstance, AxiosProgressEvent, AxiosResponse } from "axios";
import { FileUploadResponse } from "@/validators/api";

const API_URL = "https://dummyjson.com";
const API_URL_FILE = "https://api.escuelajs.co/api/v1/files/upload";

type ApiContextProps = {
  post: <T>(path: string, data: any) => Promise<AxiosResponse<T>>;
  upload: (
    file: File,
    onProgress?: (event: AxiosProgressEvent) => void
  ) => Promise<AxiosResponse<FileUploadResponse>>;
};

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

type ApiProviderProps = {
  children: ReactNode;
};

export function ApiProvider({ children }: ApiProviderProps) {
  const axiosInstance: AxiosInstance = axios.create({
    headers: { Authorization: `Bearer DUMMY_TOKEN` },
  });

  const post = async <T,>(
    path: string,
    data: any
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.post(API_URL + path, data);
  };

  // Add more methods here...

  const upload = async (
    file: File,
    onProgress?: (event: AxiosProgressEvent) => void
  ): Promise<AxiosResponse<FileUploadResponse>> => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return axiosInstance.post(API_URL_FILE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: onProgress,
    });
  };

  const contextValue: ApiContextProps = {
    post,
    upload,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
}

export function useApi(): ApiContextProps {
  const context = useContext(ApiContext);

  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }

  return context;
}
