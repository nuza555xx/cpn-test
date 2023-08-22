import { Alert, Box, Button, Typography } from '@mui/material';
import { FindInPageRounded as FindInPageRoundedIcon } from '@mui/icons-material';
import Image from 'next/image';
import { DragEvent, ChangeEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FileUpload, setFile } from '../../store/file';
import axios from 'axios';
import { v4 } from 'uuid';

function DropzoneComponent() {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [maxSize, setMaxSize] = useState<boolean>(false);
  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  async function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (event.dataTransfer.files.length > 0) {
      const files = await Promise.all(
        Array.from(
          { length: event.dataTransfer.files.length },
          async (_, i) => {
            const file = event.dataTransfer.files[i];

            if (file) {
              if (file.size > 1024 * 1024 * 20) {
                return setMaxSize(true);
              }
              setMaxSize(false);
              await uploadFile(file);

              return {
                name: file.name ?? '',
                type: file.type ?? '',
                size: file.size ?? 0,
              };
            }
          }
        )
      );

      dispatch(setFile({ files: files.filter((e) => e) as FileUpload[] }));
    }
  }

  async function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      const files = await Promise.all(
        Array.from({ length: event.target.files.length }, async (_, i) => {
          const file = event.target.files?.[i];

          if (file) {
            if (file.size > 1024 * 1024 * 20) {
              return setMaxSize(true);
            }

            setMaxSize(false);
            await uploadFile(file);

            return {
              name: file.name ?? '',
              type: file.type ?? '',
              size: file.size ?? 0,
            };
          }
        })
      );

      dispatch(setFile({ files: files.filter((e) => e) as FileUpload[] }));

      event.target.value = '';
    }
  }

  function handleUploadButtonClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  async function uploadFile(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post('http://localhost:3000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: {
          uuid: v4(),
          index: 1,
        },
        onUploadProgress: (data) => {
          console.log(data);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h5">Upload file</Typography>
        <Box
          sx={{
            m: 2,
            p: 2,
            textAlign: 'center',
            borderStyle: 'dashed',
            borderWidth: 2,
            borderRadius: 2,
            userSelect: 'none',
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Image
            src={'/vectors/folder.png'}
            width={60}
            height={60}
            alt="folder image"
          ></Image>
          <Typography variant="h6">Drag and drop file here.</Typography>
          <Typography variant="body1">Support all type file</Typography>
          <Box sx={{ my: 2 }}>
            <Button
              variant="contained"
              startIcon={<FindInPageRoundedIcon />}
              onClick={handleUploadButtonClick}
            >
              Browse file
            </Button>
          </Box>
          <Typography variant="caption">Maximum size: 20 MB.</Typography>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            multiple
          />
        </Box>
        {maxSize ? (
          <>
            {' '}
            <Box sx={{ m: 2 }}>
              <Alert severity="error">Maximum size: 20 MB!</Alert>
            </Box>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default DropzoneComponent;
