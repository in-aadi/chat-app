"use client";

import { X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";

interface FileUploadProps {
	onChange: (url?: string) => void;
	value: string;
	endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
	const fileType = value?.split(".").pop();
	if (value && fileType !== "pdf") {
		return (
			<div className="relative h-20 w-20">
				<Image fill src={value} alt="Upload" className="rounded-full object-cover" />
				<button
					onClick={() => onChange("")}
					className="bg-rose-500 text-white rounded-full absolute top-0 right-0 p-1 shadow-sm"
					type="button"
				>
					<X className="h-4 w-4" />
				</button>
			</div>
		);
	}

	return (
		<UploadDropzone
			endpoint={endpoint}
			onClientUploadComplete={(res) => {
				onChange(res?.[0].url);
			}}
			onUploadError={(error: Error) => {
				console.log(error);
			}}
		></UploadDropzone>
	);
};
