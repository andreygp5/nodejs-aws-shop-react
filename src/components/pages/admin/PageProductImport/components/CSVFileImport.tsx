import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useImport } from "~/queries/imports";

type CSVFileImportProps = {
  title: string;
};

export default function CSVFileImport({ title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File | undefined>();
  const { mutateAsync } = useImport();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    if (!file) {
      return;
    }

    const fileName = file.name;
    const s3UploadUrl = await mutateAsync(fileName);

    console.log("File to upload: ", fileName);
    console.log("Uploading to: ", s3UploadUrl);
    const s3UploadResult = await fetch(s3UploadUrl, {
      method: "PUT",
      body: file,
    });

    console.log("Result: ", s3UploadResult);
    setFile(undefined);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
